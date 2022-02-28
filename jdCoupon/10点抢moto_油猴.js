// ==UserScript==
// @name         10点抢moto券
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @connect      coupon.m.jd.com
// @include      *://coupon.m.jd.com/coupons/show.action*
// @icon         https://www.google.com/s2/favicons?domain=jd.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const moment = '2021-11-09 10:00'; // 抢购时间
  const ms = +new Date(moment); // 抢购时间毫秒值
  const pre = +new Date(ms - 1000 * 5); // 提前 5 秒钟准备
  const end = +new Date(ms + 1000 * 3); // 3 秒钟之后结束
  const coupons = document.querySelectorAll('div.coupon-btns');
  const couponBtn = coupons[0].querySelector('.btn');
  const reloadedKey = 'reloaded' + moment;
  // 获取服务器时间戳
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
          // 结束了
          if (now >= end) {
              console.info(`it's time to end.`);
              clearInterval(intervalId);
              return;
          }
          const reloadedValue = sessionStorage.getItem(reloadedKey);
          // 准备时间
          if (now >= pre) {
              if ('true' != reloadedValue) {
                  sessionStorage.setItem(reloadedKey, 'true');
                  location.reload();
              }
              doTask();
          } else {
              console.log(`it's too early...`);
          }
      });
  }, 500);
})();