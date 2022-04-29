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
    const intervalId = setInterval(() => {
        console.log(`it is running...`);
        //alert(navigator.userAgent);
        runminutes = 8;
        mouse_minutes = 300;
    }, 60000);
    const intervalIds = setInterval(() => {
        console.log(`it is checking...`);
          if(jQuery('.pv-controls-left button')[0].className.indexOf("pv-icon-pause") < 0 ){
              setTimeout(3000); // 等加载出来
              //首次进入界面是暂停的，需要手动播放；
              player.HTML5.play();
          }
    }, 30000);

    var cwidArrayOri = ['1353','1799','4198','3811','2723','2724','2725','4555','3235','2702','2703','3670','3454','3230'];
    GM_setValue('cwidArrayOri', cwidArrayOri);
    const intervalIdss = setInterval(() => {
      console.log(`it is working...`);
      Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
      };
      var cwid = "";
      var flag = 0;
      var url = "/c/public/showflashvideo.jsp?tid=4078&cwid=";
      var urlNow = "";
      var urlFor = "";
      var vars = window.location.search.substring(1).split("&");
      //获取cwid
      for (var i=0;i<vars.length;i++) {
          var pair = vars[i].split("=");
          if(pair[0] == 'cwid'){
              cwid = pair[1];
              console.log('cwid=' + cwid);
          }
      }
      //
      var cwidArray = [];
      if(!GM_getValue('cwidArray')){

      }else{
        cwidArray = GM_getValue('cwidArray');
      }
      for (var n=0;n<cwidArray.length;n++) {
          if(cwid == cwidArray[n]){
              flag = 1;
              cwidArray.remove(cwid);
              GM_setValue('cwidArray', cwidArray);
              urlNow = url + cwid;
              if(cwidArray.length>0){
                  urlFor = url + cwidArray[0];
              }else{
                  urlFor = urlNow;
              }
              console.log('正在播放:' + urlNow);
              console.log('将要播放:' + urlFor);
              GM_setValue('urlFor', urlFor);
          }
      }
      //
      if(flag == 0){
          if(cwidArray.length>0){
            // var len = cwidArray.length;
            // var m = Math.floor(Math.random() * len);
            //url = "/c/public/showflashvideo.jsp?tid=4078&cwid=" + cwidArray[m];
            var urlNext = GM_getValue('urlFor');
            console.log('未在播放列表，将要播放:' + urlNext);
            setTimeout(3000);
            window.location.href = urlNext ;
          }
      }
      }, 60000);
  })();