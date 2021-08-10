/*
duipin unlock vip by 渤涵
#独品社区解锁会员
#下载地址：（任意号注册不限制，不收验证码）（邀请码：K4GPHE）
#https://wws.lanzous.com/s/seyou01 
#https://wws.lanzous.com/s/seyou02
[rewrite_local]
^http:\/\/lfwmkj\.com\/(api\/user\/personal|api\/community\/edit) url script-response-body tank0426/scripts/duipin/duipin.js
[MITM]
hostname = lfwmkj.com
*/

var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);


const p1 = '/api/community/edit';
const p2 = '/api/user/personal';


if (url.indexOf(p1) != -1) {
    obj = {
  "code": 200,
},
    body = JSON.stringify(obj);
} 
if (url.indexOf(p2) != -1) {
    obj.data.vip = 1,
    obj.data.vip_time = "2099-09-09 09:09:09",
    body = JSON.stringify(obj);
} 
$done({body});