var otab = document.getElementById("tab");
var thead = otab.tHead;
var oths = thead.rows[0].cells;
var tbody = otab.tBodies[0];
var rows = tbody.rows;

var data = null;
var xhr = new XMLHttpRequest;
xhr.open("get","data.txt",false);
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
        var val = xhr.responseText;
        data = utils.jsonParse(val)
    }
};
xhr.send(null);

//数据绑定
function bind(){
    var frg = document.createDocumentFragment();
    for(var i = 0; i < data.length; i++){
        var cur = data[i];
        var otr = document.createElement("tr");
        for(var key in cur){
            var otd = document.createElement("td");
            if(key === "sex"){
                otd.innerHTML = cur[key] === 0 ? "女" : "男";
            }else{
                otd.innerHTML = cur[key];
            }
            otr.appendChild(otd)
        }
        frg.appendChild(otr);
    }
    tbody.appendChild(frg);
    frg = null;
}
bind()

//隔行变色
function changeBg(){
    for(var i = 0; i < rows.length; i++){
        rows[i].className = i % 2 !== 0 ? "bg" : null;
    }
}
changeBg();

//表格排序方法
function sort(n){
    var _this = this;
    var arr = utils.listToArray(rows);
    _this.flag *= -1;
    for(var j = 0; j < oths.length; j++){
        if(oths[j] !== this){
            oths[j].flag = -1;
        }
    }
    arr.sort(function(a,b){
        var curinn = a.cells[n].innerHTML;
        var nextinn = b.cells[n].innerHTML;
        if(isNaN(curinn) || isNaN(nextinn)){
            return curinn.localeCompare(nextinn)*_this.flag;
        }
        return (parseFloat(curinn) - parseFloat(nextinn))* _this.flag;
    })
    var frg = document.createDocumentFragment();
    for(var i = 0; i < arr.length; i++){
        frg.appendChild(arr[i])
    }
    tbody.appendChild(frg);
    frg = null;
    changeBg();
}
//所有具有cursor样式实现点击排序
for(var i = 0; i < oths.length; i++){
    var curth = oths[i];
    curth.index = i;
    curth.flag = -1;
    if(curth.className === "cursor"){
        curth.onclick = function(){
            sort.call(this,this.index);
        }
    }
}