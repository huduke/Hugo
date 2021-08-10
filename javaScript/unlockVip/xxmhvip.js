
/*QQ群528680197
转载请注明出处
圈x
[rewrite_local]
#羞羞漫画解锁会员
^http:\/\/c\.banghankeji\.com\/common\/MemberInfo\/getEntityByCode  url script-response-body https://raw.githubusercontent.com/qianmo001/ACL4SSR/rm/xxmhvip.js
hostname= c.banghankeji.com
下载地址：商店搜索羞羞漫画即可
使用方法：需要登录才可破解，未登录无法破解
*/
var body = $response.body; 
var obj = JSON.parse(body); 

obj.MemberInfo.isVip=1;
obj.MemberInfo.integralSum=999999;


body = JSON.stringify(obj);
$done(body); 
