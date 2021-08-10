/*
50度灰视频 unlock vip by 渤涵
#50度灰解锁VIP无限看
#下载地址
#http://club.i50dh.net/chan/h50269/G5yU
[rewrite_local]
^http:\/\/(.+)\.fiftymvapi\.(.+):8080\/api\.php\/api\/.+ url script-request-header tank0426/scripts/50duhui/50duhui.js
^http:\/\/(.+)\.fiftymvapi\.(.+):8080\/api\.php\/api\/user\/userinfo url script-response-body tank0426/scripts/50duhui/50duhui.js
^https:\/\/m3u8\.91-tv\.me\/.+ url script-response-body tank0426/scripts/50duhui/50duhui.js
[MITM]
hostname = *.fiftymvapi.*:8080
*/

var modifiedHeaders = $request.headers;

modifiedHeaders['Cookie'] = '__cfduid=d92360490b14c409b14c785add28ca87f1618378333';

$done({headers : modifiedHeaders});