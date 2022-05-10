// ==UserScript==
// @name         视屏
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description   try to take over the world!
// @author       You
// @connect      ce2.esnai.net
// @include      *://ce2.esnai.net/c/public/showflashvideo.jsp*
// @icon         https://www.google.com/s2/favicons?domain=jd.com
// @grant        none
// @grant        unsafeWindow
// ==/UserScript==

(function() {
  //每1分钟修改静态参数
  const intervalId = setInterval(() => {
      console.log(`modify static params...`);
      //alert(navigator.userAgent);
      runminutes = 8;
      mouse_minutes = 300;
  }, 60000);
  //每30秒检查是否暂停
  const intervalIds = setInterval(() => {
      console.log(`check is pause...`);
        var className = document.getElementsByClassName('pv-playpause')[0].className;
        if(className.indexOf("pv-icon-pause") < 0 ){
            //等加载出来
            setTimeout(5000);
            //刷新界面后是暂停的，需要手动播放；
            player.HTML5.play();
        }
  }, 10000);
})();