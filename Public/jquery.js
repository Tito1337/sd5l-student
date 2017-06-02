$(document).ready(function(){
    var students;
    var UEs;
    var ValidatedUE;
    var ValidateUEID;
    var CurrentUE;
    var CurrentUEID;
    var firstClick=0;
    //-------------------------------------------Requête pour récupérer les students--------------------
    console.log("requête GET");
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/students',
        header: 'Access-Control-Allow-Origin: *',
        contentType: 'application/json',
        timeout: 3000,
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            students = data;
        },
        error: function() {
            console.log('La requête n\'a pas abouti');
        }
    });
    //--------------------------------------------Requête pour récupérer les UE---------------------------
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3001/api/ue',
        header: 'Access-Control-Allow-Origin: *',
        contentType: 'application/json',
        timeout: 3000,
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            UEs = data;
        },
        error: function() {
            console.log('La requête n\'a pas abouti');
        }
    });
    console.log(students);
    console.log(UEs);

    $("#tableSecion").hide();
    $("#inscriptionRow").hide();
    $("#UEChoiceRow").hide();
    $("#inscriptionEntry").hide();

    $("#submit").click(function(){
        var userid = $("#userid");
        var password = $("#password");

    if ((userid.val() !== "") && (password.val() !== "")) {
        $("#titre").text("Bienvenue, "+userid.val()+" voici vos informations");
        $("#tableSecion").show();
        $("#inscriptionRow").show();

        var offlineUEs = [{"id":18,"code":"2I5020","name":"Systèmes distribués","activities":[{"id":13,"name":"Sécurité physique et logicielle","code":"I502A","type":"course","hours":45,"local":""},{"id":14,"name":"Architecture distribuée","code":"I502L","type":"laboratory","hours":15,"local":""}],"prerequisites":[]},{"id":20,"code":"2I5040","name":"Infrastructure réseaux","activities":[{"id":15,"name":"Administration réseaux","code":"I504A","type":"course","hours":30,"local":""},{"id":16,"name":"Laboratoire d'administration réseaux","code":"I504B","type":"laboratory","hours":30,"local":""},{"id":17,"name":"Compléments de réseaux","code":"I504C","type":"course","hours":15,"local":""},{"id":18,"name":"Data center","code":"I504D","type":"course","hours":15,"local":""}],"prerequisites":[]},{"id":21,"code":"2I4080","name":"Applications mobiles","activities":[{"id":19,"name":"Applications mobiles","code":"2I4080","type":"laboratory","hours":45,"local":""}],"prerequisites":[20]},{"id":22,"code":"2I5010","name":"Applications web avancées","activities":[{"id":20,"name":"Applications web avancées","code":"2I5010","type":"laboratory","hours":30,"local":""}],"prerequisites":[]}];
        var offlineStudents = [{"id":1,"matricule":"42","first_name":"Christophe","last_name":"Das Wulf","current_ues":"[]","validated_ues":"[]"},{"id":2,"matricule":"43","first_name":"Guillaume","last_name":"Verfaille","current_ues":"[332,334]","validated_ues":"[221,222]"}];
        students = offlineStudents;
        UEs = offlineUEs;
        //---------------------------------------------------------------------------------------------
        jQuery.each( students, function( key, value ) {

            if (value.matricule === userid.val()){
                ValidatedUEID = value.validated_ues;
                CurrentUEID = value.current_ues;
            }
            console.log(value.matricule);
        });
        jQuery.each( UEs, function( key, value ) {
            if (value.id === ValidatedUEID.val()){
                ValidatedEU += value.validated_ues;

            }
            if (value.id === CurrentEUID.val()){
                CurrentUE += value.current_ues;
            }
            console.log(value.ValidateUE);
        });

        //----------------------------------------------------------------------------------------------
    }
    else{
        alert("erreur, il manque des informations");
    }
  });


$("#inscription").click(function(){
    $("#inscriptionEntry").show();
    var userid = $("#userid");
    var fname = $("#fname");
    var lname = $("#lname");
    var step = "ok";

    console.log("matricule "+userid.val());
    if(userid.val() != "" && lname.val() != "" && fname.val() != ""){
      console.log("no problemo");
      //--------------------------------------------------------------------------------------------------------
        jQuery.each( students, function( key, value ) {
            console.log( "key", key, "value", value );
            console.log(value.matricule);
            if ((value.matricule != userid.val()) && (value.first_name != fname.val())){
                step = "ok";
            } else{
                step = "nok";
            }
        });
        //var student = Response;
        //console.log(student);
        //console.log(student.matricule);
        //step ="ok";
        //if (jQuery.isEmptyObject(Response)){
        if (step == "ok"){
            console.log("Requête POST");
            var formData = {first_name: fname.val(),last_name: lname.val(),matricule: userid.val()};
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/students',
                data: formData,
                success: function(data) {
                    console.log(data);},
                error: function() {
                    console.log('La requête n\'a pas abouti'); }
            });
        }
        $("#fname").val('');
        $("#lname").val('');
        console.log("success");
        //console.log(Response);
      //---------------------------------------------------------------------------------------------------------
    }else{
        if(firstClick == 1){
            alert("veuillez compléter correctement toutes les informations");
        } else{
            firstClick = 1;
        }

    }

});

  $("#inscriptionButton").click(function(){
    $("#UEChoiceRow").show();
  });
  $("#CancelUEChoiceButton").click(function(){
    $("#UEChoiceRow").hide();
  });
});

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/*function check(form)/*function to check userid & password
{

alert("envoi de la requete nom:"+document.login.userid.value+" mdp:"+document.login.pswrd.value+"")/*displays error message

}*/

function addValidateUE(item, index) {
    $("#elementTableUE").append("<tr><td>"+item+"</td><td>45</td></tr>");
}
