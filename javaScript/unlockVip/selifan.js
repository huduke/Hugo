/*
涩里番视频 unlock vip by 渤涵
#涩里番VIP视频无限看
#下载地址
#https://slf506.com?_s=XELGEF
[rewrite_local]
^http:\/\/api-01\.apiselifan11\.com\/cxapi\/.+ url script-request-header tank0426/scripts/selifan/selifan.js
[MITM]
hostname = api-01.apiselifan11.com
*/

var modifiedHeaders = $request.headers;

modifiedHeaders['uid'] = '3092806';
modifiedHeaders['token'] = '90d44e34f308d1cb9a538fd4c3d0ca0e';

$done({headers : modifiedHeaders});