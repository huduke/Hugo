(() => {
  console.log('hello get-coupon');
  const moment = '2021-11-02 18:36'; // 抢购时间
  const ms = +new Date(moment); // 抢购时间毫秒值
  const ppre = +new Date(ms - 1000 * 1); // 提前 10 秒钟准备
  const pre = +new Date(ms - 1000 * 5); // 提前 5 秒钟准备
  const end = +new Date(ms + 1000 * 5); // 5 秒钟之后结束
  const coupons = document.querySelectorAll('div.coupon-btns');
  const couponBtn = coupons[0].querySelector('.btn');

  const getServerTime = async () => {
      return +new Date((await fetch(`?${ +new Date() }`, {
          method: 'head',
      }).then((res) => res.headers)).get("Date"));
  };

  const doTask = async () => {
      couponBtn && (couponBtn.click());
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
              if (now >= ppre) {
                  doTask();
              } 
          } else {
              console.log(`it's tooooo early...`);
          }
      });
  }, 500);
})();
