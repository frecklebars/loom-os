
$(document).ready(function(){
    
});

windowsIdCnt = 0;

function openPage(link, newTab=true){
    tab = "_self";
    if(newTab){
        tab = "_blank";
    }
    window.open("https\:\/\/" + link, tab);
}

function openWindow(title, link=""){
    switch (title) {
        case "fbash":
            link = "/bin/fbash/"
            break;
        case "freckleskies":
            link = "https://freckleskies.net"
            break;
        case "TODO":
            link = "/files/TODO/"
            break;
        case "about":
            link = "/files/about/"
            break;
        default:
            // TODO add not found
            return;
    }

    $.get("/win-template.html", function(response) {
        newWin = $.parseHTML(response);
        winID = ++windowsIdCnt;

        $(newWin).attr("id", "window-"+winID);
        $(newWin).find(".win-title").html(title);
        $(newWin).find(".winframe > iframe").attr("src", link);
        $(newWin).find(".close-win").attr("onclick", "closeWindow("+winID+")");

        $("#env").append(newWin);

        $(".window").css("z-index", "900");
        $(newWin).css("z-index", "1000");


        topPos = 100 + 30 * (Math.floor((windowsIdCnt-1)/4)) + 30 * (windowsIdCnt-1);
        leftPos = 300 + 30 * ((windowsIdCnt-1) % 4);

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
}

function _makeAllDraggable(){
    $(".window").draggable({
        handle: ".windowbar"
    })
}