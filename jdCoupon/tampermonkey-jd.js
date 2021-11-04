// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @AuThor       You
// @match        https://birth.m.jd.com/babelDiy/Zeus/3DMauchBtuvSfu5XwMW1hgdZeLxr/index.html
// @grant        none
// ==/UserScript==
 
(function() {
    'use strict';
    // https://birth.m.jd.com/babelDiy/Zeus/3DMauchBtuvSfu5XwMW1hgdZeLxr/index.html
    const keywords = ['鸡蛋', '媛38号果冻橙柑橘','京觅 精品琯溪蜜柚',]; // 想要的关键词
    const moument = '2019-11-06 10:00'; // 抢购时间
 
    const ms = +new Date(moument); // 抢购时间毫秒值
    const pre = +new Date(ms - 1000 * 5); // 提前 5 秒钟准备
    const end = +new Date(ms + 1000 * 60 * 3); // 三分钟之后结束
 
    let reloaded = false;
 
    // 滚动百亿补贴列表，使其全部加载出来
    const scroll = () => {
        const part1 = document.querySelector('#NavPart1'); // 列表容器
        for (let i = 0; i < 18; i++) {
            setTimeout(() => {
                part1.scrollIntoView(false);
            }, 100 * i);
        }
    };
 
    // 获取服务器时间戳
    const getServerTime = async () => {
        return +new Date((await fetch(`?${ +new Date() }`, {
            method: 'head',
        }).then((res) => res.headers)).get("Date"));
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
                if (now >= ms) {
                    // 到点页面不会自动刷新，需要手动加载一下
                    if (now - ms < 810) {
                        // FIXME
                        location.reload();
                    }
                    if (!reloaded) {
                        // FIXME
                        //location.reload();
                        reloaded = true;
                        setTimeout(scroll, 600);
                    }
                    const part1 = document.querySelector('#NavPart1'); // 列表容器
                    const items = part1.querySelectorAll('div.BillionSubsidy-content-item-coupon');
                    for (let item of items) {
                        const name = item.querySelector('div.BillionSubsidy-content-item-coupon-name');
                        for (let key of keywords) {
                            if (name.innerText.includes(key)) {
                                console.log(`key: [${ key }], matched: [${ name.innerText }]`);
                                const right = item.querySelector('div.BillionSubsidy-content-item-coupon-right-container');
                                const down = item.querySelector('div.BillionSubsidy-content-item-coupon-right-down');
                                if (right.innerText.includes('限量') && !right.innerText.includes('开抢')) {
                                    console.log(`wanna [${ key }], matched ${ name.innerText }`);
                                    if (down) {
                                        console.info(`--- ${ name.innerText } ---`);
                                        down.click();
                                        //down.remove();
                                        console.info(`*** u get it ***`);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }, 800);
    // Your code here...
})();