/*
麻豆短视频 unlock vip by 渤涵
#麻豆短视频解锁会员和付费
#下载地址无需注册
#https://mdsv01.com/?pc=5e339d60-7605-4ccc-bfb9-68bf84f784b7
[rewrite_local]
^https:\/\/mda\..+\.site\/api\/operation\/video\/buy url response-body "code":\d+ response-body "code":200
^https:\/\/mda\..+\.site\/api\/(auth\/login|mine\/myHome|wallet\/query) url script-response-body tank0426/scripts/madou/madou.js
[MITM]
hostname = mda.*.site
*/

let obj = JSON.parse($response.body);
obj.msg.user.vipLevel = "shallowCard";
obj.msg.user.vipExpire = 4092647115000;
obj.msg.user.name = "ios榛戠鎶€";
obj.msg.user.textMsgNum = 999;
obj.msg.user.voiceMsgNum = 888;
obj.msg.user.voteNum = 777;
obj.msg.balance = 666;

$done({body: JSON.stringify(obj)});