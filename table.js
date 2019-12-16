var otab = document.getElementById("tab");
var thead = otab.tHead;
var oths = thead.rows[0].cells;
var tbody = otab.tBodies[0];
var rows = tbody.rows;
console.log(rows)

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
function sort(){
    oths[1].flag *= -1;
    var arr = utils.listToArray(rows);
    arr.sort(function(a,b){
        return (parseFloat(a.cells[1].innerHTML) - parseFloat(b.cells[1].innerHTML))* oths[1].flag;
    })
    var frg = document.createDocumentFragment();
    for(var i = 0; i < arr.length; i++){
        frg.appendChild(arr[i])
    }
    tbody.appendChild(frg);
    frg = null;
    changeBg();
}
oths[1].flag = -1;
oths[1].onclick = function(){
    sort();
}