Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
var cwidOriArray = ['4274','3357','3358','3359','3360','3361','3362','1353','1799','4198','3811','2723','2724','2725','4555','3235','2702','2703','3670','3454','3230'];
var cwidArray = ['4274','3357','3358','3359','3360','3361','3362','1353','1799','4198','3811','2723','2724','2725','4555','3235','2702','2703','3670','3454','3230'];
var strs = "";
var cwid = "";
var flag = 0;
var flagOri = 0;
var url = "/c/public/showflashvideo.jsp?tid=4078&cwid=";
var vars = window.location.search.substring(1).split("&");
for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == 'cwid'){
        cwid = pair[1];
        console.log(cwid);
    }
}
for (var j=0;j<cwidOriArray.length;j++) {
    if(cwid ==cwidOriArray[j]){
        flagOri = 1;
    }
}
for (var n=0;n<cwidArray.length;n++) {
    if(cwid == cwidArray[n]){
        flag = 1;
        cwidArray.remove(cwid);
        url += cwid;
    }
}
console.log(cwidArray);
if(flag == 0 && flagOri == 0){
    if(cwidArray.length>0){
        url = "/c/public/showflashvideo.jsp?tid=4078&cwid=" + cwidArray[0];
        window.location.href = url ;
    }
}else{
    console.log('正在播放:' + url);
}