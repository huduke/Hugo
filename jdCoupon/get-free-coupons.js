// ==UserScript==
// @name         get-free-coupons
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  get free coupons
// @author       Coolman
// @match        https://prodev.m.jd.com/mall/active/2F3KrzC3cVRqVZNxoDoVgz5StZZ8/index.html*
// @grant        none
// ==/UserScript==
(() => {
  'use strict';

  // 生鲜好物低价购
  // https://prodev.m.jd.com/mall/active/2F3KrzC3cVRqVZNxoDoVgz5StZZ8/index.html
  const moument = '2019-11-08 20:00'; // 抢购时间

  const ms = +new Date(moument); // 抢购时间毫秒值
  const pre = +new Date(ms - 1000 * 5); // 提前 5 秒钟准备
  const end = +new Date(ms + 1000 * 60 * 1); // 一分钟之后结束

  // 获取服务器时间戳
  const getServerTime = async () => {
      return +new Date((await fetch(`?${ +new Date() }`, {
          method: 'head',
      }).then((res) => res.headers)).get("Date"));
  };

  const doTask = () => {
      const coupons = document.querySelectorAll('div.free_coupon a.coupon');
      for (let coupon of coupons) {
          console.log(coupon.innerText.replace('\n', ' '));
          if (coupon.classList.contains('coupon_today_receive')) {
              // 今日已领取
              console.log('今日已领取');
          } else if (coupon.classList.contains('coupon_today_empty')) {
              // 今日已抢完
              console.log('今日已抢完');
          } else if (coupon.classList.contains('coupon_receive')) {
              // 已领取
              console.log('已领取');
          } else if (coupon.classList.contains('coupon_empty')) {
              // 已抢完
              console.log('已抢完');
          } else {
              console.info('--- 抢它 ---')
              // coupon.click();
              // coupon.remove();
          }
      }
  };

  const intervalId = setInterval(() => {
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
                  doTask();
              }
          } else {
              console.info(`it's too early.`);
              clearInterval(intervalId);
              return;
          }
      });
  }, 800);
})();
