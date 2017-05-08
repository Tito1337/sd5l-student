$(document).ready(function(){
  $("#tableSecion").hide();
  $("#inscriptionRow").hide();
  $("#UEChoiceRow").hide();

  $("#submit").click(function(){
    var userid = $("#userid").val();
    $("#tableSecion").show();
    $("#inscriptionRow").show();
    $("#titre").text("Bienvenue, "+userid+" voici vos informations");
    //alert("submit clicked by "+userid);
  });
  $("#inscriptionButton").click(function(){
    $("#UEChoiceRow").show();
  });
  $("#CancelUEChoiceButton").click(function(){
    $("#UEChoiceRow").hide();
  });
});
// app_2 ==tableSecion
//
/*function check(form)/*function to check userid & password
{

alert("envoi de la requete nom:"+document.login.userid.value+" mdp:"+document.login.pswrd.value+"")/*displays error message

}*/
