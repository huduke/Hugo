
(() => {
  const moment = '2021-11-10 20:00'; // 抢购时间
  const ms = +new Date(moment); // 抢购时间毫秒值
  const pre = +new Date(ms - 1000 * 5); // 提前 5 秒钟准备
  const end = +new Date(ms + 1000 * 3); // 3 秒钟之后结束
  const coupons = document.querySelectorAll('div.free_coupon_module')[0].querySelectorAll('a.coupon');
  const couponBtn0 = coupons[0].querySelector('.newbutton');
  const couponBtn1 = coupons[1].querySelector('.newbutton');
  const couponBtn2 = coupons[2].querySelector('.newbutton');

  const getServerTime = async () => {
      return +new Date((await fetch(`?${ +new Date() }`, {
          method: 'head',
      }).then((res) => res.headers)).get("Date"));
  };

  const intervalId = setInterval(() => {
      console.log(`it is running...`);
      getServerTime().then(now => {
          // 结束了
          if (now >= end) {
              console.info(`it's time to end.`);
              clearInterval(intervalId);
              return;
          }
          // 准备时间
          if (now >= pre) {
            couponBtn0.click();
            couponBtn1.click();
            couponBtn2.click();
          } else {
              console.log(`it's too early...`);
          }
      });
  }, 500);
})();
