/*
微信公众号：ios黑科技
官方网站：s7aa.cn

圈X
[rewrite_local]
#探探解锁会员无限看
^http:\/\/iykhb\.xyz:8080\/tantan\/mobile\/tantan\/user\/(login|addNm) url script-response-body tantan.js
^http:\/\/iykhb\.xyz:8080\/tantan\/mobile\/tantan\/user\/addNm url response-body "code":\d+ response-body "code":1

[mitm]
hostname= iykhb.xyz:8080

探探：（只有网页版）
http://iykhb.xyz?uid=r8meotq9

*/



var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);


const p1 = '/login';
const p2 = '/addNm';


if (url.indexOf(p1) != -1) {
    obj.data.frequency = 5201314,
    obj.data.name = "ios黑科技",
    obj.data.isVip = "1",
    obj.data.maturityDates = "2099-09-09 12:29:46",
    body = JSON.stringify(obj);
} 
if (url.indexOf(p2) != -1) {
    obj.data.frequency = 5201314,
    obj.data.name = "ios黑科技",
    obj.data.isVip = "1",
    obj.data.maturityDates = "2099-09-09 12:29:46",
    body = JSON.stringify(obj);
} 
$done({body});
