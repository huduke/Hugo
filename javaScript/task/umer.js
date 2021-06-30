/*
优麦医生签到脚本

更新时间: 2020.12.01 15:00
脚本兼容: QuantumultX, Surge4, Loon

获取Cookie说明：
打开优麦医生App，如通知成功获取Cookie, 则可以使用此签到脚本.
获取Cookie后, 请将Cookie脚本禁用并移除主机名，以免产生不必要的MITM.
脚本将在每天上午9:00执行, 您可以修改执行时间。

**********************
QuantumultX 脚本配置:
**********************
[task_local]
# 优麦医生签到
0 9 * * * https://ooxx.be/js/umer.js, tag=优麦医生, img-url=https://ooxx.be/js/icon/umer.png, enabled=true

[rewrite_local]
# 获取优麦医生Cookie
https?:\/\/api\.umer\.com\.cn\/.*getCurrentUmerSign url script-request-header https://ooxx.be/js/umer.js

[mitm] 
hostname= api.umer.com.cn

**********************
Surge 4.2.0+ 脚本配置:
**********************
[Script]
优麦医生签到 = type=cron,cronexp=0 9 * * *,script-path=https://ooxx.be/js/umer.js

获取优麦医生Cookie = type=http-request,pattern=https?:\/\/api\.umer\.com\.cn\/.*getCurrentUmerSign,script-path=https://ooxx.be/js/umer.js

[MITM] 
hostname= api.umer.com.cn

************************
Loon 2.1.0+ 脚本配置:
************************

[Script]
# 优麦医生签到
cron "0 9 * * *" script-path=https://ooxx.be/js/umer.js

# 获取优麦医生Cookie
http-request https?:\/\/api\.umer\.com\.cn\/.*getCurrentUmerSign script-path=https://ooxx.be/js/umer.js

[Mitm] 
hostname= api.umer.com.cn

*/
const $ = API("UMER",true);
const appName = `优麦医生`;
const CookieUM = $.read("CookieUM");
if (typeof $request != "undefined") {
  GetCookie()
} else if (CookieUM) {
  const regex = /appVersion=([A-Za-z0-9]+)/;
  const appVersion = regex.exec(CookieUM)[1];
  const ver = appVersion.toString().replace(/\B(?=(\d{1})+(?!\d))/g, ".");
  const headers = {
      "User-Agent": `UmerChat/${ver} (iPhone; iOS 13.3.1; Scale/2.00)`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.umer.com.cn"
  };
  request = {
      url: `https://api.umer.com.cn/healthchat/doctor/getDoctorPsnInfo.do?${CookieUM}`,
      headers: headers
  };
  $.http.post(request)
    .then((resp) => {
      const data = resp.body;
      if (data.indexOf("fail") >= 0) {
        //$.delete("CookieUM");
        $.notify(appName, "签到失败：Cookie失效⁉️请重新获取⚠️", "")
      } else {
        let res = JSON.parse(data);
        var total = res.data.maidou;
        GetSignNum(total);
      }
      $.log(appName+" 签到🔔\n"+"getDoctorPsnInfo"+"\n"+data)
    });
} else {
  $.notify(appName, "签到失败：请先获取Cookie⚠️", "")
}

function GetSignNum(total) {
  let todo = `getCurrentUmerSign`;
  request.url = request.url.replace("getDoctorPsnInfo",todo);
  $.http.post(request)
    .then((resp) => {
      const data = resp.body;
      let res = JSON.parse(data);
      let dayOfWeek = res.data["dayOfWeek"];
      let signs = res.data["signs"];
      if (signs.indexOf(dayOfWeek) < 0) {
        Checkin(total);
      } else {
        info = `签到失败：今日已签到‼️`;
        let todo = `setUmerSign`;
        request.url = request.url.replace("getCurrentUmerSign",todo);
        GetDays(info, total);
      }
      $.log(todo+"\n"+data);
    });
}

function Checkin(total) {
  let todo = `setUmerSign`;
  request.url = request.url.replace("getCurrentUmerSign",todo);
  $.http.post(request)
    .catch((err) => $.notify(appName, "签到失败⚠️", JSON.stringify(err)))
    .then((resp) => {
      const data = resp.body;
      let res = JSON.parse(data);
      let coins = res.data.maidou;
      if (coins && coins.match(/\d/g)) {
        total = parseInt(total) + parseInt(coins);
        info = `签到成功：麦豆 +${coins}💰`;
      } else {
        info = `签到成功：麦豆 +0💰`;
      }
      GetDays(info, total);
      $.log(todo+"\n"+data);
    });
}

function GetDays(info, total) {
  let todo = `getContinuedUmerSignNum`;
  request.url = request.url.replace("setUmerSign",todo);
  $.http.post(request)
    .then((resp) => {
      const data = resp.body;
      let res = JSON.parse(data);
      let days = res.data.signs;
      info += `\n已连续签到：${days} 天🎉  麦豆总计：${total}💰`;
      $.notify(appName, "", info);
      $.log(todo+"\n"+data);
    });
      $.done();
}

function GetCookie() {
  var UMER = $request.url.split("?")[1];
  if ($.read("CookieUM")) {
    if ($.read("CookieUM") !== UMER) {
      $.write(UMER, "CookieUM");
      if ($.read("CookieUM") !== UMER) {
        $.notify("更新优麦医生Cookie失败‼️", "", "")
      } else {
        $.notify("更新优麦医生Cookie成功 🎉", "", "")
      }
    }
  } else {
    $.write(UMER, "CookieUM");
    if ($.read("CookieUM") !== UMER) {
      $.notify("首次写入优麦医生Cookie失败‼️", "", "")
    } else {
      $.notify("首次写入优麦医生Cookie成功 🎉", "", "")
    }
  }
  $.done();
}


// prettier-ignore
// OpenAPI from Peng-YM
/*********************************** API *************************************/
function ENV(){const e="undefined"!=typeof $task,t="undefined"!=typeof $loon,s="undefined"!=typeof $httpClient&&!t,o="function"==typeof require&&"undefined"!=typeof $jsbox;return{isQX:e,isLoon:t,isSurge:s,isNode:"function"==typeof require&&!o,isJSBox:o,isRequest:"undefined"!=typeof $request,isScriptable:"undefined"!=typeof importModule}}function HTTP(e={baseURL:""}){const{isQX:t,isLoon:s,isSurge:o,isScriptable:i,isNode:n}=ENV(),r=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;const u={};return["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"].forEach(l=>u[l.toLowerCase()]=(u=>(function(u,l){l="string"==typeof l?{url:l}:l;const a=e.baseURL;a&&!r.test(l.url||"")&&(l.url=a?a+l.url:l.url);const h=(l={...e,...l}).timeout,c={onRequest:()=>{},onResponse:e=>e,onTimeout:()=>{},...l.events};let f,d;if(c.onRequest(u,l),t)f=$task.fetch({method:u,...l});else if(s||o||n)f=new Promise((e,t)=>{(n?require("request"):$httpClient)[u.toLowerCase()](l,(s,o,i)=>{s?t(s):e({statusCode:o.status||o.statusCode,headers:o.headers,body:i})})});else if(i){const e=new Request(l.url);e.method=u,e.headers=l.headers,e.body=l.body,f=new Promise((t,s)=>{e.loadString().then(s=>{t({statusCode:e.response.statusCode,headers:e.response.headers,body:s})}).catch(e=>s(e))})}const $=h?new Promise((e,t)=>{d=setTimeout(()=>(c.onTimeout(),t(`${u} URL: ${l.url} exceeds the timeout ${h} ms`)),h)}):null;return($?Promise.race([$,f]).then(e=>(clearTimeout(d),e)):f).then(e=>c.onResponse(e))})(l,u))),u}function API(e="untitled",t=!1){const{isQX:s,isLoon:o,isSurge:i,isNode:n,isJSBox:r,isScriptable:u}=ENV();return new class{constructor(e,t){this.name=e,this.debug=t,this.http=HTTP(),this.env=ENV(),this.node=(()=>{if(n){return{fs:require("fs")}}return null})(),this.initCache();Promise.prototype.delay=function(e){return this.then(function(t){return((e,t)=>new Promise(function(s){setTimeout(s.bind(null,t),e)}))(e,t)})}}initCache(){if(s&&(this.cache=JSON.parse($prefs.valueForKey(this.name)||"{}")),(o||i)&&(this.cache=JSON.parse($persistentStore.read(this.name)||"{}")),n){let e="root.json";this.node.fs.existsSync(e)||this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.root={},e=`${this.name}.json`,this.node.fs.existsSync(e)?this.cache=JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.cache={})}}persistCache(){const e=JSON.stringify(this.cache,null,2);s&&$prefs.setValueForKey(e,this.name),(o||i)&&$persistentStore.write(e,this.name),n&&(this.node.fs.writeFileSync(`${this.name}.json`,e,{flag:"w"},e=>console.log(e)),this.node.fs.writeFileSync("root.json",JSON.stringify(this.root,null,2),{flag:"w"},e=>console.log(e)))}write(e,t){if(this.log(`SET ${t}`),-1!==t.indexOf("#")){if(t=t.substr(1),i||o)return $persistentStore.write(e,t);if(s)return $prefs.setValueForKey(e,t);n&&(this.root[t]=e)}else this.cache[t]=e;this.persistCache()}read(e){return this.log(`READ ${e}`),-1===e.indexOf("#")?this.cache[e]:(e=e.substr(1),i||o?$persistentStore.read(e):s?$prefs.valueForKey(e):n?this.root[e]:void 0)}delete(e){if(this.log(`DELETE ${e}`),-1!==e.indexOf("#")){if(e=e.substr(1),i||o)return $persistentStore.write(null,e);if(s)return $prefs.removeValueForKey(e);n&&delete this.root[e]}else delete this.cache[e];this.persistCache()}notify(e,t="",l="",a={}){const h=a["open-url"],c=a["media-url"];if(s&&$notify(e,t,l,a),i&&$notification.post(e,t,l+`${c?"\n多媒体:"+c:""}`,{url:h}),o){let s={};h&&(s.openUrl=h),c&&(s.mediaUrl=c),"{}"===JSON.stringify(s)?$notification.post(e,t,l):$notification.post(e,t,l,s)}if(n||u){const s=l+(h?`\n点击跳转: ${h}`:"")+(c?`\n多媒体: ${c}`:"");if(r){require("push").schedule({title:e,body:(t?t+"\n":"")+s})}else console.log(`${e}\n${t}\n${s}\n\n`)}}log(e){this.debug&&console.log(`[${this.name}] LOG: ${e}`)}info(e){console.log(`[${this.name}] INFO: ${e}`)}error(e){console.log(`[${this.name}] ERROR: ${e}`)}wait(e){return new Promise(t=>setTimeout(t,e))}done(e={}){s||o||i?$done(e):n&&!r&&"undefined"!=typeof $context&&($context.headers=e.headers,$context.statusCode=e.statusCode,$context.body=e.body)}}(e,t)}
/*****************************************************************************/