
/*
By:❤小白不白❤
QQ群528680197
转载请注明出处
圈x
[rewrite_local]
#雪梨解锁会员
^https:\/\/m\.pearkin\.com\/api(\/account|\/movie)(\/IndexDetail|\/IsVip|\/WatchMovieNew)  url script-response-body  https://raw.githubusercontent.com/qianmo001/xiaobaibubai/rm/xlsp.js
[mitm]
hostname= m.pearkin.com
破解内容：视频无线看，有问题加群反馈
*/

var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

const vip = '/api/account/IndexDetail';

const dspq = '/api/video/watch/';

const isvip = '/api/account/IsVip';

const zwzm = '/api/movie/WatchMovieNew';

const cv = '/api/Account/CheckVip';

if (url.indexOf(vip) != -1) {
  obj.nickName = "️小白不白️";
  obj.vipEndTime = "2099-03-09";
  obj.cartoonVip = true;
  obj.vipLevel = 101;
  obj.cartoonVipEndTime = "2099-03-09";
 body = JSON.stringify(obj);
 }

if (url.indexOf(isvip) != -1) {
  obj.value = true;
 body = JSON.stringify(obj);
 }
 
 if (url.indexOf(zwzm) != -1) {
  obj.canWath = true;
 body = JSON.stringify(obj);
 }

if (url.indexOf(dspq) != -1) {
  obj.value = true;
  obj.message = 0;
 body = JSON.stringify(obj);
 }

if (url.indexOf(cv) != -1) {
  obj.value = true;
  obj.message = 0;
 body = JSON.stringify(obj);
 }

$done({body});
