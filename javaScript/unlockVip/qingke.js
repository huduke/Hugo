/*

圈X:

[rewrite_local]

#氢课付费内容
^https:\/\/console\.qker\.com\/linga\/api\/v1\/(course.+|user\/details) url script-response-body qingke.js

商店直接搜索 氢课

MITM = console.qker.com
*/


var body = $response.body;


body=body.replace(/vip\":\w+/g,'vip\":true').replace(/nickname\":.+?"/g,'nickname\":\"ios黑科技\"').replace(/free\":\w+/g,'free\":true').replace(/expireTime\":\w+/g,'expireTime\":4092579678000');


$done({body});
