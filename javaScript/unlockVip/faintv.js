/*
FainTV unlock vip by 渤涵
#FainTV解锁会员去广告
[rewrite_local]
^http:\/\/ftvn\.hawsing\.com\.tw:3000\/client\/login url script-response-body tank0426/scripts/faintv/faintv.js
[MITM]
hostname = ftvn.hawsing.com.tw:3000
另一种简单方法：
[filter_local]
#FainTV去广告
host, googleads.g.doubleclick.net, reject
*/

var obj = JSON.parse($response.body);

obj.role = 2;
obj.sync = "2027-02-28T06:31:27.761Z";
obj.noAdDate = "2099-09-09T19:40:44.053Z";
obj.noAdDate_Adult = "2099-09-09T19:40:44.053Z";
obj.freeTime = 0;

$done({body: JSON.stringify(obj)}); 