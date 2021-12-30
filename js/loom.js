
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
        $(newWin).find(".close-win").attr("onclick", "closeWindow("+winID+")");

        $("#env").append(newWin);

        $(".window").css("z-index", "900");
        $(newWin).css("z-index", "1000");


        topPos = 50 + 10 * (Math.floor((winCnt-1) / 8)) + 15 * (winCnt-1);
        leftPos = 300 + 30 * ((winCnt-1) % 8);

        $(newWin).css("top", topPos);
        $(newWin).css("left", leftPos);

        $(newWin).draggable({
            handle: ".windowbar",
            scroll: false
        });

        $(newWin).mousedown(function(){
            $(".window").css("z-index", "900");
            $(this).css("z-index", "1000");
        })
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


function getWinData(win){
    // defaults
    wwidth = "800px";
    wheight = "550px";

    switch (win) {
        case "fbash":
            link = "/bin/fbash/"
            title = "fbash"
            break;

        //case "freckleskies":
        //    link = "https://freckleskies.net"
        //    break;

        case "TODO":
            link = "/files/TODO/"
            title = "/files/TODO.md"
            wwidth = "500px"
            break;

        case "about":
            link = "/files/about/"
            title = "/files/about.md"
            break;
            
        default:
            // TODO add not found
            return "not_found";
    }

    wd = {
        "link": link,
        "title": "LOOM://" + title,
        "width": wwidth,
        "height": wheight
    }
    return wd;
}