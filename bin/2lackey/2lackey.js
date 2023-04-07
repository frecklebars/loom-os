lackeymode = "deckstats"

$(document).ready(function(){
    $("#tolackey-in").bind("input propertychange", function(){
        switch (lackeymode){
            case "deckstats":
                $("#tolackey-out").val(parseDeckstats(this.value));
                break;
        
            default:
                $("#tolackey-out").val("mode not implemented");
        }
    });

    $(".tolackey-mode").click(function(){
        $(".active-mode").removeClass("active-mode");
        $(this).addClass("active-mode");
        lackeymode = $(this).text();
    });
});

function parseDeckstats(intext){
    outtext = "";

    intext = intext.split("\n");

    intext.forEach(inline => {
        commander = false;
        if(inline.includes("#!Commander")){
            commander = true;
        }
        setRegExp = /\[[^\[\]]+\] /;
        inline = inline.replace(setRegExp, "")
        inline = inline.split("#")[0];
        inline = inline.split("//")[0];
        if(inline.length > 0){
            if(commander){
                inline += "\n"
            }
            outtext += inline;
            outtext += "\n";
        }
    });

    return outtext;
}
