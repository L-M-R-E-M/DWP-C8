// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    var net = 0;
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          net = 1;
          //alert("Complete todos los apartados");
        }
        if(form.checkValidity() === true){
          $('form').on('submit', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            
            $.ajax({
                url: "http://35.167.62.109/storeutags/security/create_account",
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    first_name: $('#nombre').val(),
                    middle_name:$('#apellido').val(),
                    last_name:$('#apellido2').val(),
                    phone_number:$('#telefono').val(),
                    address: {
                        city:$('#ciudad').val(),
                        state:$('#estado').val(),
                    },
                    email:$('#ema').val(),
                    password:$('#pass1').val(),
                    password_confirmation:$('#pass2').val()
                }),
                dataType: 'json',
                success: function(resp) {
                    if(resp.error_code == "DuplicatedAccount"){
                        alert("Este correo esta ya esta en uso");
                    }
                    else{
                        alert("Usuario guardado");
                        //$("form")[0].reset();
                        window.location="loginze.html";
                    }
                },       
            });
            
            
            });
        }
      form.classList.add('was-validated');

      }, false);
    });
    
  }, false);
})();



$(function() {

  $(document).on('change','#invalidCheck',function(){
      if(this.checked) {
        coincideRecapcha();
      }
  }); 

  function coincideRecapcha(){
    //validar reCAPCHA
    var response = grecaptcha.getResponse();
  
    if(response.length === 0){
      
      $('#boton').attr("disabled", true);
      $('#invalidCheck').prop('checked',false);
      alert("¡¡Captcha no verificado!!");
    } else {
      //alert("Captcha verificado");
      $('#boton').attr("disabled", false);
      
    }
  }
});

$(document).ready(function() {	
  function validarRecapcha(){
    //validar el estado del CAPCHA cada 3 segundos
    var res = grecaptcha.getResponse();
  
    if(res.length === 0){
      
      $('#boton').attr("disabled", true);

    } else {
      
      $('#boton').attr("disabled", false);
      
    }
  }
  setInterval(validarRecapcha, 3000);
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
            $('#invalidCheck').prop('checked',false);
          
            //}
          	
          }else{
            span.text(min).addClass('negacion');
            
              XD = 1;
              
          }
        
      }
  }  
    
  $("#form1").on('submit', function(evt){
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
          $('#passstrength').html('Contraseña Muy Débil.');
  } else if (strongRegex.test($(this).val())) {
          $('#passstrength').className = 'ok';
          $('#passstrength').html('Contraseña Fuerte!');
  } else if (mediumRegex.test($(this).val())) {
          $('#passstrength').className = 'alert';
          $('#passstrength').html('Contraseña Media!');
  } else {
          $('#passstrength').className = 'error';
          $('#passstrength').html('Contraseña Débil!');
  }
  return true;
});

$(document).ready(function(){    
  $('#iniciar').click(function(){  
      window.location="loginze.html";
  });   
});



