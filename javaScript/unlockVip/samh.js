/*
app下载地址：商店搜索：飒漫画
^https:\/\/m\.samh\.xndm\.tech\/(userapi\/info\/v1\/getuserinfo|api\/v1\/comics\/getcomicinfo_body) url script-response-body samh.js

MITM = m.samh.xndm.tech
公众号：木木IOS分享 原十三座州府
群1077223830
*/

var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

const vip = '/userapi/info/v1/getuserinfo';
const vipinfo = '/api/v1/comics/getcomicinfo_body';

if (url.indexOf(vip) != -1) {
	obj.data.goldviptime = "199999999";
	obj.data.day= 99;
	obj.data.isvip= 1;
	obj.data.diamonds="9999";
	body = JSON.stringify(obj);
 }
 if (url.indexOf(vipinfo) != -1) {
 	obj["limit_free"] = "true";
 	body = JSON.stringify(obj);
  }

   
 
 $done({body});
