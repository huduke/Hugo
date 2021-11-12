// ==UserScript==
// @name         10点白条
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @connect      prodev.m.jd.com
// @include      *://prodev.m.jd.com/jdjr/active/*
// @icon         https://www.google.com/s2/favicons?domain=jd.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const moment = '2021-11-09 10:00'; // 抢购时间
  const ms = +new Date(moment); // 抢购时间毫秒值
  const pre = +new Date(ms - 1000 * 5); // 提前 5 秒钟准备
  const end = +new Date(ms + 1000 * 3); // 3 秒钟之后结束

  const couponOne = document.querySelectorAll('div.one');
  const couponThree = document.querySelectorAll('div.three');
  const couponBtnOne10 = couponOne[0].querySelector('.lazyload-img');
  const couponBtnOne10_1 = couponThree[0].querySelectorAll('a.expo')[0].querySelector('.lazyload-img');
  const couponBtnOne10_2 = couponThree[0].querySelectorAll('a.expo')[1].querySelector('.lazyload-img');
  const couponBtnOne10_3 = couponThree[0].querySelectorAll('a.expo')[2].querySelector('.lazyload-img');
  const reloadedKey = 'reloaded' + moment;
  // 获取服务器时间戳
  const getServerTime = async () => {
      return +new Date((await fetch(`?${ +new Date() }`, {
          method: 'head',
      }).then((res) => res.headers)).get("Date"));
  };

  const doTask = async () => {
    couponBtnOne10 && (couponBtnOne10.click());
    couponBtnOne10_1 && (couponBtnOne10_1.click());
    couponBtnOne10_2 && (couponBtnOne10_2.click());
    couponBtnOne10_3 && (couponBtnOne10_3.click());
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