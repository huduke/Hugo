(() => {
    console.log('hello get-plus-coupon');
    const keywords = [
        '鸡蛋',
    ]; // 想要的关键词
    const truePrice = 9.9; // 券后九块九的我都要辣！！
    const moment = '2020-01-08 10:00'; // 抢购时间

    const ms = +new Date(moment); // 抢购时间毫秒值
    const pre = +new Date(ms - 1000 * 10); // 提前 10 秒钟准备
    const end = +new Date(ms + 1000 * 60 * 3); // 三分钟之后结束

    const reloadedKey = `reloaded${ moment }`;

    const getServerTime = async () => {
        return +new Date((await fetch(`?${ +new Date() }`, {
            method: 'head',
        }).then((res) => res.headers)).get("Date"));
    };
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    let thoseWant = [];
    const reg = new RegExp(keywords.join('|'));
    const getAllNodes = async () => {
        const hasMore = document.querySelector('.floor-more-content');
        hasMore && (hasMore.click());
        await sleep(600); // 等渲染结果出来
        const all = document.querySelectorAll('.coupon-item');
        for (let item of all) {
            const goodsNameElem = item.querySelector('.goods-name-info');
            const allowancePriceElem = item.querySelector('.allowance-price');
            const couponBtn = item.querySelector('.coupon-btn');
            const goodsName = goodsNameElem ? goodsNameElem.innerText : '';
            const allowancePrice = allowancePriceElem ? allowancePriceElem.innerText.slice(1) : '';
            const bgImg = couponBtn ? getComputedStyle(couponBtn).backgroundImage : '';
            // 分别控制，不需要可单独注释掉
            if (isAvailable(bgImg) && reg.test(goodsName) && thoseWant.push(item)) {
                continue;
            }
            if (allowancePrice && allowancePrice <= truePrice && thoseWant.push(item)) {
                continue;
            }
        }
    };
    const doTask = async () => {
        await getAllNodes();
        for (let item of thoseWant) {
            const couponBtn = item.querySelector('.coupon-btn');
            couponBtn && (couponBtn.click());
        }
    };
    const isAvailable = (str) => {
        return str.includes('9FBMVEUAAACi');
    };
    const intervalId = setInterval(() => {
        console.log(`it is running...`);
        getServerTime().then(now => {
            console.log(`server time: ${ now }`);
            // 结束了
            if (now >= end) {
                console.info(`it's time to end.`);
                clearInterval(intervalId);
                return;
            }
            // 准备时间
            if (now >= pre) {
                console.log(`it's time to go...`);
                const reloadedValue = sessionStorage.getItem(reloadedKey);
                if (now >= ms) {
                    // 到点页面不会自动刷新，需要手动加载一下
                    if ('true' != reloadedValue) {
                        sessionStorage.setItem(reloadedKey, 'true');
                        location.reload();
                    }
                    doTask();
                } else {
                    if ('false' != reloadedValue) {
                        sessionStorage.setItem(reloadedKey, 'false');
                    }
                }
            } else {
                console.log(`it's tooooo early\n%c坐和放宽～`, 'font-size:21px;color:#03a6f0;border:2px red solid');
            }
        });
    }, 600);
})();
