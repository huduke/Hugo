/*
丝瓜视频 unlock vip by 渤涵
#丝瓜解锁VIP视频无限看
#下载地址
#https://sigua001.com?_s=KKLADF
[rewrite_local]
^http:\/\/api-01\.sssggg666\.com:8089\/cxapi\/.+ url script-request-header tank0426/scripts/sigua/sigua.js
[MITM]
hostname = api-01.sssggg666.com:8089
*/

var modifiedHeaders = $request.headers;

modifiedHeaders['uid'] = '6972841';
modifiedHeaders['token'] = 'fbee5bc861f17d7e1ef5530d3cfc458a';

$done({headers : modifiedHeaders});