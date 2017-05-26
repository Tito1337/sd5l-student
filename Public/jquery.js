$(document).ready(function(){
    var students;
    var UEs;
    var ValidatedUE;
    var CurrentUE;
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

    $("#submit").click(function(){
        var userid = $("#userid");
        var password = $("#password");

    if ((userid.val() !== "") && (password.val() !== "")) {
        $("#titre").text("Bienvenue, "+userid.val()+" voici vos informations");
        $("#tableSecion").show();
        $("#inscriptionRow").show();

        //---------------------------------------------------------------------------------------------
        jQuery.each( students, function( key, value ) {

            if (value.matricule === userid.val()){
                ValidatedUE = value.validated_ues;
                CurrentUE = value.current_ues;
            }
            console.log(value.matricule);
        });
        jQuery.each( allUE, function( key, value ) {
            if (value.id === ValidatedEU[key].val()){
                ValidatedEU += value.validated_ues;
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
    var userid = $("#userid");
    var fname = $("#fname");
    var lname = $("#lname");
    //var step = "nok";
    console.log("matricule "+userid.val());
    if(userid.val() !== "" && lname.val() !== "" && fname.val() !== ""){
      console.log("requête GET");
      //--------------------------------------------------------------------------------------------------------
        jQuery.each( students, function( key, value ) {
            console.log( "key", key, "value", value );
            console.log(value.matricule);
        });
        //var student = Response;
        //console.log(student);
        //console.log(student.matricule);
        //step ="ok";
        if (jQuery.isEmptyObject(Response)){
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
        console.log("success");
        console.log(Response);
      //---------------------------------------------------------------------------------------------------------
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
