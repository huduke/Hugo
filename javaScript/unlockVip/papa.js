/*
微信公众号：ios黑科技
官方网站：s7aa.cn

圈X
[rewrite_local]
#啪啪解锁视频无限看
^https:\/\/api\.papa\w+\.com(\/video\/api\/movie\/v2\/(play|[0-9]+)|\/uc\/user\/info|\/video\/api\/movie\/v2\/cache) url script-response-body papa.js

^https:\/\/api\.papa\w+\.com\/live\/api\/home\/announcement\/v1\/list url reject-200

[mitm]
hostname= api.papa???.com

啪啪直播下载地址：（任意注册不限制，不收验证码）
邀请码：PWTIHQ
http://uarnu.com/l1Uo0w4?icode=PWTIHQ

*/


var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

body=body.replace(/playRemainCnt":\d+/g,'playRemainCnt":99').replace(/cacheRemainCnt":\d+/g,'cacheRemainCnt":99').replace(/remainCnt":\d+/g,'remainCnt":99').replace(/isBanPost":\d+/g,'isBanPost":1').replace(/authorityFlag":\w+/g,'authorityFlag":true').replace(/superAdminFlag":\w+/g,'superAdminFlag":true').replace(/vipFlag":\w+/g,'vipFlag":true').replace(/level":\d+/g,'level":99').replace(/code":\d+/g,'code":200').replace(/remainCnt":\d+/g,'remainCnt":99').replace(/msg":".+?"/g,'msg":"操作成功"').replace(/data":\w+/g,'data":{"remainCnt":77}');


$done({body});