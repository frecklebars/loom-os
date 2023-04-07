
$(document).ready(function(){
    
});

windowsId = 0;
winCnt = 0;

function openPage(link, newTab=true){
    tab = "_self";
    if(newTab){
        tab = "_blank";
    }
    window.open("https\:\/\/" + link, tab);
}

function openWindow(win, link=""){
    
    winData = getWinData(win);
    if(winData == "not_found") return;
    
    $.get("/win-template.html", function(response) {
        newWin = $.parseHTML(response);
        winID = ++windowsId;
        winCnt++;

        $(newWin).attr("id", "window-"+winID);
        $(newWin).css("width", winData["width"]);
        $(newWin).css("height", winData["height"]);
        $(newWin).find(".win-title").html(winData["title"]);
        $(newWin).find(".winframe > iframe").attr("src", winData["link"]);
        $(newWin).find(".close-win").attr("onmousedown", "closeWindow("+winID+")");

        $("#env").append(newWin);

        setActiveWindow(newWin, sentwin=true);

        topPos = 65 + 10 * (Math.floor((winCnt-1) / 8)) + 15 * (winCnt-1);
        leftPos = 100 + 30 * ((winCnt-1) % 8);

        $(newWin).css("top", topPos);
        $(newWin).css("left", leftPos);

        // $(newWin).draggable({
        //     handle: ".windowbar",
        //     scroll: false
        // });
        draggable(newWin);
        $(newWin).mousedown(setActiveWindow);
    });
}

function closeWindow(id){
    $("#window-"+id).remove();
    winCnt--;
}

function _makeAllDraggable(){
    $(".window").draggable({
        handle: ".windowbar"
    })
}

function setActiveWindow(win, sentwin=false){
    if(!sentwin){
        win = win.currentTarget;
    }
    $(".window").css("z-index", 900);
    $(".window").removeClass("active-window");
    $(win).css("z-index", 1000);
    $(win).addClass("active-window");
}