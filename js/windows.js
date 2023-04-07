// make draggable
function draggable(win){
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    $(win).find(".windowbar")[0].onmousedown = dragMouseDown;

    function dragMouseDown(e){
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e){
        e = e || window.event;
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        $(win).css("top", ($(win).offset().top - pos2) + "px");
        $(win).css("left", ($(win).offset().left - pos1) + "px");
    }

    function closeDragElement(){
        document.onmouseup = null;
        document.onmousemove = null;
    }

}

function getWinData(win){
    // defaults
    wwidth = "800px";
    wheight = "550px";

    switch (win) {
        case "fbash":
            link = "/bin/fbash/"
            break;
        
        case "2lackey":
            link = "/bin/2lackey/"
            break;

        //case "freckleskies":
        //    link = "https://freckleskies.net"
        //    break;

        case "about":
            link = "/files/about/"
            break;

        case "TODO":
            link = "/files/TODO/"
            wwidth = "500px"
            break;

            
        default:
            // TODO add not found
            return "not_found";
    }

    wd = {
        "link": link,
        "title": `[ LOOM://${link.slice(1, link.length-1)} ]`,
        "width": wwidth,
        "height": wheight
    }
    return wd;
}