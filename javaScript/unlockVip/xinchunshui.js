/*
新春水视频 unlock vip by 渤涵
#新春水解锁无限看
#下载地址：
#https://tm9ji.com/share?code=7K5W8
[rewrite_local]
^https:\/\/api\.(sumsun|klettdayeare|kjregister)\.(top|com)\/api\/vip\/newshow url reject-200
^https:\/\/api\.(sumsun|klettdayeare|kjregister)\.(top|com)\/api\/banner\/show url reject-200
^https:\/\/api\.(sumsun|klettdayeare|kjregister)\.(top|com)\/api\/user\/profile\/ url script-response-body tank0426/scripts/xinchunshui/xinchunshui.js
[MITM]
hostname = api.sumsun.top, api.klettdayeare.com, api.kjregister.com
*/

let obj = JSON.parse($response.body);
obj = "Yjt6dn18OyM7KSkpKSk7NTttfGFtOyM7amx6enxqajs1O314bXg7I2I7d3B6cld4dHw7Iztwdmrwooj+voj/k5k7NTt4b3hteGs7Izt4b3hteGs2KykrKCktKCo2LX98Kighf3sgeCEtLSwqLXt4KX99eyEvKnh7LS4hLHw3fXhteDs1O358d318azsjKTU7bHp2fXw7IzsoKi0pLyorKjs1O3B3b3BtfFp2fXw7IzsuUixOITs1O2l4a3x3bVB9OyMoKy0uLy4sKjU7b3B9fHZRcGptV2x0OyMvKTU7eG9RcGptV2x0OyMoLTU7b3B9fHZaeHpxfFdsdDsjLTU7b3B9fHZVcHJ8V2x0OyMrNTt4b1VwcnxXbHQ7Iyk1O3B3b3BtfFdsdDsjKi81O3h+fHdNdm14dTsjKTU7eH58d207Iyk1O3BqVXB0cG07Iyk1O3BqVXZ+cHc7Iyg1O29waTsjYjtvcGk7Iyk1O2t8bnhrfU12bXh1OyMpNyk1O3pxeGt+fE12bXh1OyMpNyk1O31reG5Ndm14dTsjKTcpNTt9a3huVXZ6cjsjKTcpNTt/fHw7Iyk3KWQ1O352dX07I2I7anB+d1B3S3ZuOyMoNTtqcH53VXhqbV14bXw7IzsrKSsoNCktNCgqOSkrIyoqIywrOzU7anB+d012fXhgOyMoNTt+dnV9SnB+dzsjLjU7enF4a358TXZteHU7Iyk3KSk1O31reG5Ndm14dTsjKTcpKTU7fWt4blV2enI7Iyk3KSk1O352dX1VeG98OyMrLjU7fnZ1fUxqfDsjKTU7enZsaXZ3aldsdHt8azsjKi4hZDU7aXV4YF14YDsjYjtpdXhgV2x0OyM0KDU7eHVrfHh9YFdsdDsjNCg1O2lrfG9deGBXbHQ7IzQoNTt4dWt8eH1gSWt8b1dsdDsjNChkNTtwald8bkxqfGs7I21rbHxkZA==";

$done({body: JSON.stringify(obj)});