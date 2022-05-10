// ==UserScript==
// @name         视屏
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description   try to take over the world!
// @author       You
// @connect      ce2.esnai.net
// @include      *://ce2.esnai.net/c/public/showflashvideo.jsp*
// @icon         https://www.google.com/s2/favicons?domain=jd.com
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    //每1分钟修改静态参数
    const intervalId = setInterval(() => {
        console.log(`修改静态参数...`);
        //alert(navigator.userAgent);
        runminutes = 8;
        mouse_minutes = 300;
    }, 60000); 
    //每30秒检查是否暂停
    const intervalIds = setInterval(() => {
        console.log(`检查是否暂停...`);
          var className = document.getElementsByClassName('pv-playpause')[0].className;
          if(className.indexOf("pv-icon-pause") < 0 ){
              //等加载出来
              setTimeout(5000);
              //刷新界面后是暂停的，需要手动播放；
              player.HTML5.play();
          }
    }, 30000);

    //需要看的视频
    var cwidArray = ['4198','3811','2723','2724','2725','4555','3235','2702','2703','3670','3454','3230'];
    const intervalIdss = setInterval(() => {
      console.log(`工作中...`);
      // Array.prototype.remove = function(val) {
      //   var index = this.indexOf(val);
      //   if (index > -1) {
      //       this.splice(index, 1);
      //   }
      // };
      var flag = 0;
      var cwid = "";
      var url = "/c/public/showflashvideo.jsp?tid=4078&cwid=";
      var urlNow = "";
      var urlNext = "";
      var vars = window.location.search.substring(1).split("&");
      //获取cwid
      for (var i=0;i<vars.length;i++) {
          var pair = vars[i].split("=");
          if(pair[0] == 'cwid'){
              cwid = pair[1];
              console.log('cwid=' + cwid);
          }
      }
      for (var n=0;n<cwidArray.length;n++) {
          if(cwid == cwidArray[n]){
              flag = 1;
              //cwidArray.remove(cwid);
              GM_setValue('cwidNow', cwid);
              urlNow = url + cwid;
              console.log('正在播放:' + urlNow);
              if(n != cwidArray.length-1){
                GM_setValue('cwidNext', cwidArray[n+1]);
                urlNext = url + cwidArray[n+1];
                GM_setValue('urlNext', urlNext);
                console.log('将要播放:' + urlNext);
              }else{
                GM_setValue('cwidNext', null);
                console.log('播放列表已结束');
              }
          }
      }
      //
      if(flag == 0){
      // var len = cwidArray.length;
      // var m = Math.floor(Math.random() * len);
      //url = "/c/public/showflashvideo.jsp?tid=4078&cwid=" + cwidArray[m];       
        if (typeof GM_getValue("cwidNext") != 'object') {
            var urlNext = GM_getValue('urlNext');
            console.log('未在播放列表，将要播放:' + urlNext);
            setTimeout(3000);
            window.location.href = urlNext ;
        }
      }
      }, 60000);
  })();