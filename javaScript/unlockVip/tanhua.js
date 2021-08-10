/*
探花视频 unlock vip by 渤涵
#探花解锁VIP会员
#下载地址无需注册
#https://tanhua.app
[rewrite_local]
^https:\/\/1008610010\.laikanshu\.top\/Member\/getUserInfo url script-response-body tank0426/scripts/tanhua/tanhua.js
[MITM]
hostname = 1008610010.laikanshu.top
*/

let obj = JSON.parse($response.body);
obj = {
  "status": "200",
  "msg": "杩斿洖鎴愬姛",
  "data": {
    "member_name": "buehen",
    "mobile": "18800000808",
    "head_pic": "http://999.junc.vip/uploads/admin/202010/5f9b91e0a6fe0.jpg",
    "parent_id": 206,
    "user_viptime": "2099-09-09",
    "status": 1,
    "is_vip": 1
  }
}
;

$done({body: JSON.stringify(obj)});