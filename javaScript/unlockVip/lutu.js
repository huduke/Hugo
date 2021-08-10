/*
LUTU视频 unlock vip by 渤涵
#LUTU解锁VIP无限看
#下载地址：
#https://s-lutu.me
[rewrite_local]
^https:\/\/api\.(.+)\.(cn|com)\/.+  url script-request-header tank0426/scripts/lutu/lutu.js
[MITM]
hostname = api.jyjnsc.com, api.syclzg.cn
*/

var modifiedHeaders = $request.headers;

modifiedHeaders['Authorization'] = 'Bearer e6EgBP-lexmTYa9xy8xqWb9QXcnHauNu61OXoqVfJZygFuJ85vfoq3zL6BO2-CZ6JKZmisBjC_dS-P2zx7OtKDAOOvZ9fFLbIBDO0ymSB0o';


$done({headers : modifiedHeaders});