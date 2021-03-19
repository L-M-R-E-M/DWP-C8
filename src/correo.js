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
          }
          if(form.checkValidity() === true){
            cont = cont + 1;
            
          }
          if(cont == 1){
            llamarAjax();
          }
          if(cont == 2){
            llamarAjax2();
          }
          if(cont == 3){
            llamarAjax3();
          }
          function llamarAjax(){
            //Aquí declaras el objeto que pasarás como parámetro
                    event.preventDefault();
                    event.stopImmediatePropagation();
                  
                  $.ajax({
                      url: "http://35.167.62.109/storeutags/security/request_recovery_code",
                      type: 'POST',
                      contentType: 'application/json',
                      data: JSON.stringify({
                          email:$('#ema').val(),
                      }),
                      dataType: 'json',
                      success: function(resp) {
                          if(resp.error_code == "AccountDoesNotExist"){
                              cont = 0;
                              alert("Este correo no existe");
                              $("form")[0].reset();
                          }
                          else{
                              alert("Código enviado con éxito");
                              //$("form")[0].reset();
                            //   window.location="code.html";
                            $('#ema').attr("disabled", true);
                            $('#boton').attr("disabled", true);
                            $('#code').attr("disabled", false);
                              $('#boton2').attr("disabled", false);
                          }
                      },       
                  });
          }
          function llamarAjax2(){
            //Aquí declaras el objeto que pasarás como parámetro
                    event.preventDefault();
                    event.stopImmediatePropagation();
                  
                  $.ajax({
                      url: "http://35.167.62.109/storeutags/security/validate_recovery_code",
                      type: 'POST',
                      contentType: 'application/json',
                      data: JSON.stringify({
                          email:$('#ema').val(),
                          recovery_code:$('#code').val(),
                      }),
                      dataType: 'json',
                      success: function(resp) {
                          if(resp.error_code == "MailOrRecoveryCodeMatch"){
                              cont = 1;
                              alert("Código inválido");
                          }
                          else{
                              alert("Código válido");
                              //$("form")[0].reset();
                              //window.location="code.html";
                              // $('#form2').show(); //muestro mediante id
                              $('#pass1').attr("disabled", false);
                              $('#pass2').attr("disabled", false);
                              
                              $('#code').attr("disabled", true);
                              $('#boton2').attr("disabled", true);
                             
                          }
                      },       
                  });
          }
          function llamarAjax3(){
            //Aquí declaras el objeto que pasarás como parámetro
                    event.preventDefault();
                    event.stopImmediatePropagation();
                  
                  $.ajax({
                      url: "http://35.167.62.109/storeutags/security/update_password",
                      type: 'POST',
                      contentType: 'application/json',
                      data: JSON.stringify({
                          email:$('#ema').val(),
                          recovery_code:$('#code').val(),
                          password:$('#pass1').val(),
                          password_confirmation:$('#pass2').val()
                      }),
                      dataType: 'json',
                      success: function(resp) {
                          if(resp.error_code == "ViolatedRules"){
                              cont = 2;
                              alert("Cambio invalido");
                          }
                          else{
                              alert("Cambio exitoso");
                              //$("form")[0].reset();
                              window.location="loginz.html";
                          }
                      },       
                  });
          }
        form.classList.add('was-validated');
  
        }, false);
      });
      
    }, false);
  })();


  function mostrarPassword(){
    var cambio = document.getElementById("code");
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

$(document).ready(function() {
    //variables
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
      var pass1 = $('[name=pass1]');
      var pass2 = $('[name=pass2]');
      var confirmacion = "¡Ok válido!";
      var longitud = "La contraseña debe estar formada entre 8-10 carácteres (ambos inclusive)";
    var negacion = "No coinciden las contraseñas";
    var min = "La clave debe tener al menos [a-z], [A-Z], [0-9] y [&$%#/()*]";
    var XD = 0;
      //var vacio = "La contraseña no puede estar vacía";
      //oculto por defecto el elemento span
      var span = $('<span></span>').insertAfter(pass2);
    span.hide();
    
      //función que comprueba las dos contraseñas
      function coincidePassword(){
      var valor1 = pass1.val();
    var valor2 = pass2.val();
    
      //muestro el span
      span.show().removeClass();
      //condiciones dentro de la función
      
      // if(valor1.length==0 || valor1==""){
      // span.text(vacio).addClass('negacion');	
    // }
    //$("#form1").on('submit', function(evt){
      if(valor1.length<8 || valor1.length>10){
    span.text(longitud).addClass('negacion');
    
      XD = 1;
      
      }else{
      if(valor1 != valor2){
        span.text(negacion).addClass('negacion');	
        
          XD = 1;
          
        }else{
          if(strongRegex.test(valor1)){
            //if(valor1.length!=0 && valor1==valor2){
              span.text(confirmacion).removeClass("negacion").addClass('confirmacion');
              alert("¡¡CONTRASEÑAS CORRECTAS!!");
              XD = 0;
              $('#boton3').attr("disabled", false);
            
              //}
                
            }else{
              span.text(min).addClass('negacion');
              
                XD = 1;
                
            }
          
        }
    }  
      
    $("#form3").on('submit', function(evt){
    if (XD == 1) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  });	
    }
      pass2.keyup(function(){
      coincidePassword();
    });
    pass1.keyup(function(){
      coincidePassword();
      });
  });
  
  $('#pass1').keyup(function(e) {
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var enoughRegex = new RegExp("(?=.{6,}).*", "g");
    if (false == enoughRegex.test($(this).val())) {
            $('#pass').html('Contraseña Muy Débil.');
    } else if (strongRegex.test($(this).val())) {
            $('#pass').className = 'ok';
            $('#pass').html('Contraseña Fuerte!');
    } else if (mediumRegex.test($(this).val())) {
            $('#pass').className = 'alert';
            $('#pass').html('Contraseña Media!');
    } else {
            $('#pass').className = 'error';
            $('#pass').html('Contraseña Débil!');
    }
    return true;
  });

  $(document).ready(function(){    
    $('#iniciar').click(function(){  
        window.location="loginz.html";
    });   
  });
