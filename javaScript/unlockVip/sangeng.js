/*
三更 unlock vip by 渤涵
#三更解锁VIP无限看
#下载地址：https://blwtgwe.cn/5858489?tmp=dy&dir=0
[rewrite_local]
^http[s]?:\/\/api.(txt2021|kaqcn).(buzz|com)\/api\/user\/voucher url reject-200
^http[s]?:\/\/api.(txt2021|kaqcn).(buzz|com)\/api\/.+  url script-request-header tank0426/scripts/sangeng/sangeng.js
[MITM]
hostname = api.txt2021.buzz, api.kaqcn.com
*/

var modifiedHeaders = $request.headers;

modifiedHeaders['seq'] = 'B08EA77B-D13C-4977-B420-A613A1149783';

modifiedHeaders['User-Agent'] = 'FourInOne/3.3.3 (iPhone; iOS 13.5; Scale/2.00)';

modifiedHeaders['token'] = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyXzU4NTg0ODkiLCJleHAiOjE5MzI4MDU4NzN9._OMLgq-wKEpXwI9t1WJBX_-Pn9aIskrxjoVZo6zXAGY5xbklc6RUd7skCdadyhAMzsKZCmtLm2FxFgHrXoZg7w';

$done({headers : modifiedHeaders});