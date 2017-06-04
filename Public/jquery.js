var students;
var thisStudent;
var UEs;
var ValidatedUE= {"list": []};
var CurrentUE= {"list": []};
var ValidatedUEID;
var CurrentUEID;
var firstClick=0;
var URL = "http://194.110.69.74:3000/students";
var URLUe = 'http://localhost:3001/api/ue';

//la fonction suivante s'éxécute quand la page est chargée.
$(document).ready(function(){
    //Temporairement à cause de problème de cross platform, les variables suivaantes seront considérée comme les réponse des requêtes
    var offlineUEs = '{"status":"success","data":[{"id":18,"code":"2I5020","name":"Systèmes distribués","activities":[{"id":13,"name":"Sécurité physique et logicielle","code":"I502A","type":"course","hours":45,"local":""},{"id":14,"name":"Architecture distribuée","code":"I502L","type":"laboratory","hours":15,"local":""}],"prerequisites":[]},{"id":20,"code":"2I5040","name":"Infrastructure réseaux","activities":[{"id":15,"name":"Administration réseaux","code":"I504A","type":"course","hours":30,"local":""},{"id":16,"name":"Laboratoire d administration réseaux","code":"I504B","type":"laboratory","hours":30,"local":""},{"id":17,"name":"Compléments de réseaux","code":"I504C","type":"course","hours":15,"local":""},{"id":18,"name":"Data center","code":"I504D","type":"course","hours":15,"local":""}],"prerequisites":[]},{"id":21,"code":"2I4080","name":"Applications mobiles","activities":[{"id":19,"name":"Applications mobiles","code":"2I4080","type":"laboratory","hours":45,"local":""}],"prerequisites":[20]},{"id":22,"code":"2I5010","name":"Applications web avancées","activities":[{"id":20,"name":"Applications web avancées","code":"2I5010","type":"laboratory","hours":30,"local":""}],"prerequisites":[]}]}';
    //var offlineStudents = '[{"id":1,"matricule":"42","first_name":"Christophe","last_name":"Das Wulf","current_ues":"[]","validated_ues":"[]"},{"id":2,"matricule":"43","first_name":"Guillaume","last_name":"Verfaille","current_ues":"[18,20]","validated_ues":"[21,22]"},{"id":3,"matricule":"1","first_name":"1","last_name":"1","current_ues":"[]","validated_ues":"[]"}][{"_id":"5919973a4cdd6828bd8b7110","matricule":"44","first_name":"Christophe","last_name":"De Wolf","__v":19,"current_ues":[22,23,24,44],"validated_ues":[18,20,21]},{"_id":"59199c8f9690182d02527c24","matricule":"45","first_name":"Benjamin","last_name":"Aiglon","__v":2,"current_ues":[20,4243],"validated_ues":[]},{"_id":"5919a832197c9c2ec8fd00a9","first_name":"Xavier","last_name":"Verdonck","matricule":"11","__v":0,"current_ues":[],"validated_ues":[]},{"_id":"5919b5b3197c9c2ec8fd00b8","first_name":"pierre","last_name":"lalouche","matricule":"70","__v":0,"current_ues":[],"validated_ues":[]},{"_id":"59317cf877a7281e781e3e97","first_name":"De Wolf","last_name":"Christophe","matricule":"4243","__v":0,"current_ues":[],"validated_ues":[]},{"_id":"5933c2c6b2256c056561a46f","first_name":"tata","last_name":"toto","matricule":"69","__v":0,"current_ues":[],"validated_ues":[]},{"_id":"5933c36ab2256c056561a470","first_name":"gaga","last_name":"heheho","matricule":"66","__v":0,"current_ues":[],"validated_ues":[]}]
    //étape très importante pour manipuler les données, il faut impérativement les parser sinon il est impossible de manipuler les données
    //students = JSON.parse(offlineStudents);
    UEs = JSON.parse(offlineUEs);

    //-------------------------------------------Requête pour récupérer les students--------------------
    GetStudents();
    //--------------------------------------------Requête pour récupérer les UE---------------------------
    GetUes();
    console.log('students respond by API',students);
    console.log('UE respond by API',UEs);

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
        //pour éviter l'affichage d'UE dans les tableaux due au student précédent, les deux variables suivantes sont réinitialisée
        ValidatedUE= {"list": []};
        CurrentUE= {"list": []};
        /*
         Tant que personne n'utilise l'interface, il faut cahcer les éléments non nécessaire
         il faut vider tous les tableaux pour s'assurer qu'ils sont vide et que tous les élément soit reset ou caché
         */
        $("#elementTableValidatedUE").empty();
        $("#elementTableCurrentUE").empty();
        $("#allUETalbe").empty();
        $("#inscriptionEntry").hide();
        $("#UEChoiceDiv").hide();
        $("#CancelUEChoice").hide();
        //pour s'assurer d'avoir la dernière version des students, il faut refaire une requête
        GetStudents();
    //check pour vérifier le contenu fournit par l'utilisateur
    if ((studentID.val() !== "") && (password.val() !== "")) {
        //si les entrées sont correctes, alors il faut afficher le premier tableau et le bouton
        $('#tableSectionDiv').show();
        $("#inscriptionButtonRow").show();

        //---------------------------------------logique pour récupérer les UE validée et en cours------------------------------------------------------
        for(var i in students){
            if (students[i].matricule === studentID.val()){
                //si l'utilisateur qui tente de ce connecter existe alors:
                $("#titre").text("Bienvenue, "+students[i].first_name+" voici vos informations");
                //récupération de l'id de ce student
                thisStudent = students[i]._id;
                console.log("l'id est: ",thisStudent);
                //récupération des UE validées et en cours de ce student
                ValidatedUEID = students[i].validated_ues;
                CurrentUEID =  students[i].current_ues;
            }
        }
        //les variables ValidateUEID et CurrentUEID contiennent chacune un tableau contenant les id des UE.
        console.log("UE validée: ",ValidatedUEID);
        console.log("UE en cours: ",CurrentUEID);

        for( var j in UEs.data){
            for(var h in ValidatedUEID) {
                //si dans la liste de UE, il y a un UE qui à un id qui se trouve dans ValidatedUEID, il faut enregister cette UE
                //dans la variable ValidatedUE
                if (UEs.data[j].id === ValidatedUEID[h]) {
                    ValidatedUE.list.push(UEs.data[j]);
                    //pour chaque UE validée par le student, il faut ajouter une ligne dans le tableau
                    $("#elementTableValidatedUE").append('<tr><td>'+UEs.data[j].name+'</td><td>15</td></tr>');

                }
            }
            for(var g in CurrentUEID) {
                //si dans la liste de UE, il y a un UE qui à un id qui se trouve dans currentUEID, il faut enregister cette UE
                //dans la variable CurrentUE
                if (UEs.data[j].id === CurrentUEID[g]) {
                    CurrentUE.list.push(UEs.data[j]);
                    //pour chaque UE en cours du student, il faut ajouter une ligne dans le tableau
                    $("#elementTableCurrentUE").append('<tr><td>'+UEs.data[j].name+'</td><td>15</td></tr>');
                }
            }
            }
        console.log(ValidatedUE);
        console.log(CurrentUE);
        //----------------------------------------------------------------------------------------------
    }
    else{
        //si les informations fournie par l'utilisateur sont incorrecte, alors il faut l'informé de son erreur
        alert("erreur, il manque des informations");
    }
  });

//si l'utilisateur veut créer un nouveau student, cette fonction est éxécutée quand l'utilisateur clique sur inscription
$("#inscription").click(function(){
    //affichage détaillé pour la création d'un nouveau student
    $("#inscriptionEntry").show();
    var studentID = $("#studentID");
    var fname = $("#fname");
    var lname = $("#lname");
    var step = "ok";
    //vérification des informations fournie par l'utilisateur
    if(studentID.val() !=="" && lname.val() !== "" && fname.val() !== ""){
      console.log("no problemo");
      //--------------------------------------------------------------------------------------------------------
        $.each( students, function( key, value ) {
            console.log( "key", key, "value", value );
            console.log(value.matricule);
            if ((value.matricule !== studentID.val()) && (value.first_name !== fname.val())){
                // l'étape est validée si l'utilisateur ne tente pas de recréer un student  déjà existant
                step = "ok";
            } else{
                step = "nok";
            }
        });
        //si tout est ok, alors une requête est envoyée pour créer un nouveau student
        if (step === "ok"){
            console.log("Requête POST");
            var formData = {first_name: fname.val(),last_name: lname.val(),matricule: studentID.val()};
            $.ajax({
                type: 'POST',
                url: URL,
                //url: 'http://localhost:3000/students',
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
        if(firstClick === 1){
            alert("veuillez compléter correctement toutes les informations");
        } else{
            firstClick = 1;
        }

    }

});
//si l'utilisateur clique sur le bouton "s'inscrire à de nouvelles UE" alors le tableau d'inscription apparait.
  $("#inscriptionButton").click(function(){
      $("#allUETalbe").empty();
      $('#UEChoiceDiv').show();
      $("#CancelUEChoice").show();
      //--------------------------pour chaque UE, une ligne est ajoutée au tableau------------------------
      for( var j in UEs.data){
          $("#allUETalbe").append('<tr><td><input name="selector[]" id="'+UEs.data[j].id+'" class="ads_Checkbox" type="checkbox" value="1" /></td><td>'+UEs.data[j].name+'</td><td>15</td></tr>');
      }
});
// cette fonction est éxécutée quand l'utilisateur clique sur le bouton "S'inscrire"
$('#save_value').click(function(){
    var val = [];
    //pour chaque checkbox qui à été checkée
    $(':checkbox:checked').each(function(i){
        val[i] = parseInt($(this).attr('id'));
        $(this).prop('checked', false);
        //si l'UE qui à été sélectionnée par l'utilisateur n'est pas déja une UE du student alors une requête pour l'ajouter est envoyé
        for(var g in CurrentUE) {
            if (val[1] === CurrentUE[g]) {
                $.ajax({
                    type: 'POST',
                    url: URL + '/' + thisStudent + '/current_ues',
                    data: {id: "" + val[i] + ""},
                    success: function (data) {
                        $("#submit").click();
                        console.log(data);
                    },
                    error: function () {
                        console.log('La requête n\'a pas abouti');
                    }
                });
            }else{
                $("#submit").click();
            }
        }

    }
    );
    console.log(val);
    console.log(thisStudent);

    });
// cette fonnction est éxécutée quand l'utilisateur clique sur le bouton annuler
  $("#CancelUEChoiceButton").click(function(){
      //quand l'utilisateur annule l'inscription au UE, il faut vider et cacher le tableau d'inscription
    $("#UEChoiceDiv").hide();
      $("#CancelUEChoice").hide();
      $("#allUETalbe").empty();
  });
});

//fonction qui fait une requête pour réccupérer la liste complète de student
function GetUes() {

    $.ajax({
        type: 'GET',
        url: URLUe,
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
}
//fonction qui fait une requête pour réccupérer la liste complète de UE
function GetStudents() {
    console.log("requête GET");
    $.ajax({
        type: 'GET',
        url: URL,
        //url: 'http://localhost:3000/students',
        header: 'Access-Control-Allow-Origin: *',
        contentType: 'application/json',
        timeout: 3000,
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            students = data;
            console.log('students respond by API',students);
        },
        error: function() {
            console.log('La requête n\'a pas abouti');
        }
    });
}
