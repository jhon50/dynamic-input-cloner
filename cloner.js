function cloner(name, element){
    var Counter = Number($("#"+name+"Counter").val());

    //when action is add, there are no existing records
    if(!Counter){
        //there is already a blank field, when user clicks Add there will be two.
        Counter = 1;
    }
    function clone() {

        var clone = $(this).parents(".clonedInput").clone(true);
        clone.find("."+name).val("");
        clone.find(".main").val(0);

        clone.find("."+name).attr({
            "name": name+"s[" + Counter + "]["+element+"]",
            "id": name+"s-" + Counter + "-"+element
        });

        clone.find(".id").remove();
        clone.find(".main") .attr("name", name+"s[" + Counter + "][main]");

        //increment because you have inserted another entry
        Counter++;

        clone.insertAfter(".clonedInput."+name+":last");
    }

    function remove() {
        var element = $(this);
        var parent = element.parents("tr");
        var isMain = Number(parent.find(".main").val());
        if(isMain){
            alert("You cannot remove the main one.");
            return false;
        }
        parent.remove();
        Counter--;
        var elementId = parent.find(".id").val();

        if(elementId != null){
	   // server side only if you follow conventions 
           $.ajax({
                url: "/"+name+"s/delete/"+elementId,
                type: 'POST',
                success: function() {
                    // Do something with the result
                    alert("deletado com sucesso!");
                },
            });
        }
    }

    $("button.clone."+name).on("click", clone);
    $("button.remove."+name).on("click", remove);

    $("select.main").on("change", function() {
        
        var element = $(this);
        var value = Number(element.val());
        
        if (value) {
            
            // user selected "Yes"
            // change others to "No" to indicate they are not the
	    // main one, except this
            $("select.main").not(element).each(function() {
                $(this).val(0);
            });

        } else {

            // user selected "NO"
            element.val(1);
            alert("Selecione 1 como principal.");
        }
    });
}
