$(document).ready(function(){
    var students;
    var UEs;
    var ValidatedUE= {"list": []};
    var CurrentUE= {"list": []};
    var ValidatedUEID;
    var CurrentUEID;
    var firstClick=0;

    //Temporairement à cause de problème de cross platform, les variables suivaantes seront considérée comme les réponse des requêtes
    var offlineUEs = '{"status":"success","data":[{"id":18,"code":"2I5020","name":"Systèmes distribués","activities":[{"id":13,"name":"Sécurité physique et logicielle","code":"I502A","type":"course","hours":45,"local":""},{"id":14,"name":"Architecture distribuée","code":"I502L","type":"laboratory","hours":15,"local":""}],"prerequisites":[]},{"id":20,"code":"2I5040","name":"Infrastructure réseaux","activities":[{"id":15,"name":"Administration réseaux","code":"I504A","type":"course","hours":30,"local":""},{"id":16,"name":"Laboratoire d administration réseaux","code":"I504B","type":"laboratory","hours":30,"local":""},{"id":17,"name":"Compléments de réseaux","code":"I504C","type":"course","hours":15,"local":""},{"id":18,"name":"Data center","code":"I504D","type":"course","hours":15,"local":""}],"prerequisites":[]},{"id":21,"code":"2I4080","name":"Applications mobiles","activities":[{"id":19,"name":"Applications mobiles","code":"2I4080","type":"laboratory","hours":45,"local":""}],"prerequisites":[20]},{"id":22,"code":"2I5010","name":"Applications web avancées","activities":[{"id":20,"name":"Applications web avancées","code":"2I5010","type":"laboratory","hours":30,"local":""}],"prerequisites":[]}]}';
    var offlineStudents = '[{"id":1,"matricule":"42","first_name":"Christophe","last_name":"Das Wulf","current_ues":"[]","validated_ues":"[]"},{"id":2,"matricule":"43","first_name":"Guillaume","last_name":"Verfaille","current_ues":"[18,20]","validated_ues":"[21,22]"},{"id":3,"matricule":"1","first_name":"1","last_name":"1","current_ues":"[]","validated_ues":"[]"}]';
    //étape très importante pour manipuler les données, il faut impérativement les parser
    students = JSON.parse(offlineStudents);
    UEs = JSON.parse(offlineUEs);
    console.log(students);
    console.log(UEs);
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

    /*
    Tant que personne n'utilise l'interface, il faut cahcer les éléments non nécessaire
     */
    $("#tableSectionDiv").hide();
    $("#UEChoiceDiv").hide();
    $("#inscriptionButtonRow").hide();
    $("#inscriptionEntry").hide();
    $("#CancelUEChoice").hide();

    //quand quelqu'un clique sur le bouton se connecter, alors cette fonction est exécutée.
    $("#submit").click(function(){
        //les deux varialbes suivantes récupère les éléments matricule et password de l'interface
        var studentID = $("#studentID");
        var password = $("#password");
        ValidatedUE= {"list": []};
        CurrentUE= {"list": []};
        // il faut vider tous les tableaux pour s'assurer qu'ils sont vide
        $("#elementTableValidatedUE").empty();
        $("#elementTableCurrentUE").empty();
        $("#allUETalbe").empty();
        $("#inscriptionEntry").hide();
        $("#UEChoiceDiv").hide();
        $("#CancelUEChoice").hide();
    //check pour vérifier le contenu fournit par l'utilisateur
    if ((studentID.val() !== "") && (password.val() !== "")) {
        //$("#titre").text("Bienvenue, "+studentID.val()+" voici vos informations");
        //si les entrées sont correctes, alors il faut afficher le premier tableau et le bouton
        //$('#tableSectionDiv').load('tableSection.html');
        $('#tableSectionDiv').show();
        $("#inscriptionButtonRow").show();

        //---------------------------------------logique pour récupérer les UE validée et en cours------------------------------------------------------
        for(var i in students){
            if (students[i].matricule === studentID.val()){
                $("#titre").text("Bienvenue, "+students[i].first_name+" voici vos informations");
                ValidatedUEID = JSON.parse(students[i].validated_ues);
                CurrentUEID = JSON.parse(students[i].current_ues);
            }
        }
        //les variables ValidateUEID et CurrentUEID contiennent chacune un tableau contenant les id des UE.
        console.log("UE validée: ",ValidatedUEID);
        console.log("UE en cours: ",CurrentUEID);

        for( var j in UEs.data){
            console.log(UEs.data[j]);
            for(var h in ValidatedUEID) {
                //si dans la liste de UE, il y a un UE qui à un id qui se trouve dans ValidatedUEID, il faut enregister cette UE
                //dans la variable ValidatedUE
                if (UEs.data[j].id === ValidatedUEID[h]) {
                    ValidatedUE.list.push(UEs.data[j]);
                    $("#elementTableValidatedUE").append('<tr><td>'+UEs.data[j].name+'</td><td>15</td></tr>');

                }
            }
            for(var g in CurrentUEID) {
                //si dans la liste de UE, il y a un UE qui à un id qui se trouve dans currentUEID, il faut enregister cette UE
                //dans la variable CurrentUE
                if (UEs.data[j].id === CurrentUEID[g]) {
                    CurrentUE.list.push(UEs.data[j]);
                    $("#elementTableCurrentUE").append('<tr><td>'+UEs.data[j].name+'</td><td>15</td></tr>');
                }
            }
            }
        //$("#elementTableValidatedUE").append('<tr><td>'+ValidatedUE.list[0].name+'</td><td><input type="button" id="addUE" style="margin: 5px;" class="btn btn-primary btn-success" value="Ajouter"/></td></tr>');
        console.log(ValidatedUE);
        console.log(CurrentUE);
        //----------------------------------------------------------------------------------------------
    }
    else{
        //si les informations fournie par l'utilisateur sont incorrecte, alors il faut l'informé de son erreur
        alert("erreur, il manque des informations");
    }
  });


$("#inscription").click(function(){
    $("#inscriptionEntry").show();
    var studentID = $("#studentID");
    var fname = $("#fname");
    var lname = $("#lname");
    var step = "ok";

    console.log("matricule "+studentID.val());
    if(studentID.val() != "" && lname.val() != "" && fname.val() != ""){
      console.log("no problemo");
      //--------------------------------------------------------------------------------------------------------
        $.each( students, function( key, value ) {
            console.log( "key", key, "value", value );
            console.log(value.matricule);
            if ((value.matricule != studentID.val()) && (value.first_name != fname.val())){
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
            var formData = {first_name: fname.val(),last_name: lname.val(),matricule: studentID.val()};
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
    }else{// si l'utilisateur à déja cliqué sur le bouton pour s'inscrire et qu'il fournit des données incorrecte, il est informé de son erreur
        if(firstClick == 1){
            alert("veuillez compléter correctement toutes les informations");
        } else{
            firstClick = 1;
        }

    }

});

  $("#inscriptionButton").click(function(){
      //$('#UEChoiceDiv').load('UEChoiceRow.html');
      $("#allUETalbe").empty();
      $('#UEChoiceDiv').show();
      $("#CancelUEChoice").show();
      //--------------------------------------------------
      for( var j in UEs.data){
          $("#allUETalbe").append('<tr><td>'+UEs.data[j].name+'</td><td>15</td></tr>');
      }



  });
  $("#CancelUEChoiceButton").click(function(){
    $("#UEChoiceDiv").hide();
      $("#CancelUEChoice").hide();
      $("#allUETalbe").empty();
    //alert("annuler");
  });
});
$("#test").click(function(){
    //alert("test");
});



function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/*function check(form)/*function to check studentID & password
{

alert("envoi de la requete nom:"+document.login.studentID.value+" mdp:"+document.login.pswrd.value+"")/*displays error message

}*/

function addUEToTable(id, UE) {
    $("#elementTableUE").append('<tr><td>UE.name</td><td><input type="button" id="addUE" style="margin: 5px;" class="btn btn-primary btn-success" value="Ajouter"/></td></tr>');

}
