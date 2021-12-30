
$(document).ready(function(){
    fbash();
    $('#fbashinput').focus();
});

function fbash(){
    $('#fbashinput').keypress(function(e) {
        if(e.which == 13){
            var inln = $('#fbashinput').val();
            $('#fbashinput').val("");

            printLn(inln, withps1=true);
            
            parseCommand(inln);
        }
    });
}

function parseCommand(inln){
    var commands = inln.split(" ");
    switch(commands[0]){
        case "":
            break;
        case "clear":
            execClear();
            break;
        case "help":
            execHelp();
            break;
        case "echo":
            execEcho(commands.slice(1));
            break;

        //case "fill":
        //    for (let index = 0; index < 30; index++) {
        //        printLn("fillllllll");
        //    }

        default:
            unrecognisedCommand(commands[0]);
    }
    
    scrollToBottom();
}

// COMMANDS ----------------

function unrecognisedCommand(command){
    newln = "fbash: ";
    newln += command
    newln += ": unrecognised command"
    printLn(newln);
}

function execClear(){
    $("#fbashbody").html("");
}

function execHelp(){
    $.get("/bin/fbash/fbash-help.html", function(response){
        help = $.parseHTML(response);
        $("#fbashbody").append(help);
    });
}

function execEcho(args){
    var echo = args.join(" ");
    printLn(echo);
}

// UTIL FUNCS ---------------

function printLn(ln, withps1=false){
    pln = "<p>";

    if(withps1){
        pln += "<span class='ps1'>[ <span class='username'>guest</span>@loom <span class='path'>~</span> ]$ </span>"
    }

    pln += ln;
    pln += "</p>";

    $("#fbashbody").append(pln);
}

function scrollToBottom(){
    window.scrollTo(0,document.body.scrollHeight);
}