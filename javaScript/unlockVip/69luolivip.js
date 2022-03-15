/*
微信公众号：ios黑科技
官方网站：ioshkj.com

圈X:

[rewrite_local]

#69萝莉解锁VIP无限看
^https:\/\/h5\.501you\.me\/h5\/.+ url script-request-header http://ox.xmkczs.com/quantumultX/luolivip.js

[mitm]
hostname = *.501you.me

69萝莉下载地址
https://69luolic.com?us=KCJZEF

*/


var modifiedHeaders = $request.headers;

modifiedHeaders['uid'] = '4039083';
modifiedHeaders['token'] = '577770fe0920620a9a9cdf8d0050f8e2';
modifiedHeaders['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1';
modifiedHeaders['Cookie'] = 'avatar=https%3A%2F%2Fixbtxi.yechunyang.com%2Fmedia%2Fheadico%2F9.bnc%3Fext%3D.png%26_v%3D%26time%3D1643644800%26token%3D2e37e1ad13e6fc6739593edc26bd4047; bindCode=59JZEF; nickname=%E5%B8%88%E6%A6%95%E9%BB%9B; token=577770fe0920620a9a9cdf8d0050f8e2; uid=4039083; username=2VJZEF';

$done({headers : modifiedHeaders});
