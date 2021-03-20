// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    var cont = 0;
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          // alert("Complete todos los apartados");
        }
        if(form.checkValidity() === true){
          cont = cont + 1;
          // alert("XD");
        }
        if(cont == 1){
          llamarAjax();
        }
        function llamarAjax(){
                    event.preventDefault();
                    event.stopImmediatePropagation();
                  
                  $.ajax({
                      url: "http://35.167.62.109/storeutags/security/login",
                      type: 'POST',
                      contentType: 'application/json',
                      data: JSON.stringify({
                          email:$('#ema').val(),
                          password:$('#pass1').val(),
                      }),
                      dataType: 'json',
                      success: function(resp) {
                        if(resp.error_code == "EmailAndPasswordDoesNotMatch"){
                          cont = 0;
                          /*Captura de datos escrito en los inputs*/        
                          var correx = "";
                          var passsx = "";
                          /*Guardando los datos en el LocalStorage*/
                          localStorage.setItem("SaveCorreo", correx);
                          localStorage.setItem("SavePass", passsx);
                          alert("Usuario y/o contraseña incorrectos");
                          $("form")[0].reset();
                      }
                      else{
                          var nom = resp.data.customer.first_name;
                          localStorage.setItem("UserName", nom);

                          var code = resp.data.session_id;
                          localStorage.setItem("UserCode", code);

                          var ko = localStorage.getItem("saveItemId");

                          alert("¡¡¡Bienvenido " + nom + "!!!");

                          if(ko == ""){
                            // alert(" " + prueba);
                              window.location="homez.html";
                            }else{
                              // alert("sde");
                              window.location="productoz.html";
                            }
                      }
                      },       
                  });
        }
      form.classList.add('was-validated');

      }, false);
    });
    
  }, false);
})(); 



/*Iniciar sesión por default*/
$(document).ready(function() {
  var corr = localStorage.getItem("SaveCorreo");
  var pass = localStorage.getItem("SavePass");
  var nos = localStorage.getItem("UserName");
  var nas = localStorage.getItem("UserCode");	

  function iniciarSesion(){
    if(corr == "" && pass == "" || nos == "" && nas == ""){
      //En este  apartado no pasa nada aún
      // alert("entro");
    }else{
      window.location="homez.html";
    }
  }
  setInterval(iniciarSesion, 100);
});



function mostrarPassword(){
    var cambio = document.getElementById("pass1");

    if(cambio.type == "password"){
        cambio.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    }else{
        cambio.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
} 


$(document).ready(function () {
//CheckBox mostrar contraseña
$('#ShowPassword').click(function () {
    $('#Password').attr('type', $(this).is(':checked') ? 'text' : 'password');
});
});

$(function() {

  $(document).on('change','#remember',function(){
      if(this.checked) {
        guardarinicio();
      }else{
        borrarinicio();
      }
  }); 

  function guardarinicio(){
    /*Captura de datos escrito en los inputs*/        
    var corr = document.getElementById("ema").value;
    var pass = document.getElementById("pass1").value;
    /*Guardando los datos en el LocalStorage*/
    localStorage.setItem("SaveCorreo", corr);
    localStorage.setItem("SavePass", pass);
  }
  function borrarinicio(){
    /*Captura de datos escrito en los inputs*/        
    var corre = "";
    var passs = "";
    /*Guardando los datos en el LocalStorage*/
    localStorage.setItem("SaveCorreo", corre);
    localStorage.setItem("SavePass", passs);
  }
});

$(document).ready(function(){    
  $('#iniciar').click(function(){  
      window.location="loginze.html";
  });   
});