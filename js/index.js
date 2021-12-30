$(document).ready(function(){
    setInterval(setStatusBar, 1);
});

function setStatusBar(){
    var date = new Date();

    var yr = addZero(date.getFullYear() % 100);
    var mon = date.getMonth();
    var dtday = addZero(date.getDate());
    var day = date.getDay();
    var h = addZero(date.getHours());
    var m = addZero(date.getMinutes());
    var s = addZero(date.getSeconds());
    var ms = addZero(date.getMilliseconds() % 100);

    var time = h + ":" + m + ":" + s + ":" + ms;
    var date = weekday[day] + " " + dtday + " " + month[mon] + " " + yr;

    $("#time").text(date + " - " + time);
}

function addZero(n){
    if(n<10) return '0'+n;
    return n;
}

var weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
var month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];