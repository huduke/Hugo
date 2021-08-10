/*
Emby unlock vip by 渤涵
#Emby解锁会员
[rewrite_local]
https:\/\/pan\.baidu\.com\/rest\/2\.0\/membership\/user url script-response-body tank0426/scripts/bdcloud/bdcloud.js
[MITM]
hostname = pan.baidu.com
*/

obj={"product_infos":[{"product_id":"5310897792128633390","start_time":1417260485,"end_time":2147483648,"buy_time":"1417260485","cluster":"offlinedl","detail_cluster":"offlinedl","product_name":"gz_telecom_exp"},{"product_name":"svip2_nd","product_description":"\u8d85\u7ea7\u4f1a\u5458","function_num":0,"start_time":1553702399,"buy_description":"","buy_time":0,"product_id":"1","auto_upgrade_to_svip":0,"end_time":1672502399,"cluster":"vip","detail_cluster":"svip","status":0}],"currenttime":1573473597,"reminder":{"reminderWithContent":[],"advertiseContent":[]},"request_id":7501873289383875000,"guide_data":{"title":"\u8d85\u7ea7\u4f1a\u5458 SVIP","content":"\u5df2\u62e5\u6709\u6781\u901f\u4e0b\u8f7d\x2b\u89c6\u9891\u500d\u901f\u7279\u6743","button":{"text":"\u4f1a\u5458\u4e2d\u5fc3","action_url":"https://pan.baidu.com/wap/vip/user?from=myvip2#svip"}}};$done({body:JSON['stringify'](obj)});