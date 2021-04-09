document.onkeydown = function(e){
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 116){
      bPreguntar = false;
    }
   }
  
  var bPreguntar = true;
       
  window.onbeforeunload = preguntarAntesDeSalir;
   
  function preguntarAntesDeSalir()
  {
    if (bPreguntar)
      if(bPreguntar == true){
        closeWindow();
      }
      return;
  }
  
  $(document).ready(function(){    
      $('#cerrarse').click(function(){        
          bPreguntar = false;
        
          closeWindow();
          
          window.location="indexo.html";
      });   
  });
  
  function closeWindow(){
    // window.close();
    /*Captura de datos escrito en los inputs*/        
    var borrar = "";
    var borrar2 = 0;
    /*Guardando los datos en el LocalStorage*/
    localStorage.setItem("SaveCorreo", borrar);
    localStorage.setItem("SavePass", borrar);
    localStorage.setItem("UserName", borrar);
    localStorage.setItem("UserCode", borrar);
    localStorage.setItem("saveItemId", borrar);
    localStorage.setItem("x4", borrar2);
    localStorage.setItem("x7", borrar2);
  }
  
  mostrarCarrito();
  mostrarCompra();
  
  /*Checar si hay una sesión activa*/
  $(document).ready(function() {	
    var check = localStorage.getItem("UserName");
    var cor = localStorage.getItem("SaveCorreo");
    var pas = localStorage.getItem("SavePass");
    var one = 0;
    var mos = 0;
  
    function checarsesion(){
    if(cor == "" && pas == ""){
  
    if(check == ""){
      mos = mos + 1;
      if(mos == 1){
      closeWindow();
      alert("No cuentas con una sesión activa, error 50126");
      }
      window.location="logino.html";
    }else{
      mos = mos + 1;
      if(mos == 1){
  
      // var l = "";
          
      // localStorage.setItem("gggg", l);
      }
  
  
  
  
  
  
  
  
  
  
  
    }
    
    }else{
    if(check == ""){
      mos = mos + 1;
      if(mos == 1){
      closeWindow();
      alert("No cuentas con una sesión activa, error 50126");
      }
      window.location="logino.html";
    }else{
      one = one + 1;
    }
    if(one == 1){
      $.ajax({
        url: "http://35.167.62.109/storeutags/security/login",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            email:cor,
            password:pas,
        }),
        dataType: 'json',
        success: function(resp) {
          if(resp.error_code == "EmailAndPasswordDoesNotMatch"){
            alert("Usuario y/o contraseña incorrectos");
            closeWindow();
        }
        else{
            var nom = resp.data.customer.first_name;
            localStorage.setItem("UserName", nom);
  
            var code = resp.data.session_id;
            localStorage.setItem("UserCode", code);
  
            bPreguntar = false;
  
            // alert("¡¡¡Bienvenido otra vez " + nom + "!!!");
            
        }
        },       
    });
    }
    }
    }
    setInterval(checarsesion, 100);
  });
  
  /*Funcion Cargar y Mostrar datos*/
  $(document).ready(function() {	
    function mostrarUsuario(){
      /*Obtener datos almacenados*/
      var nombre = localStorage.getItem("UserName");
  
      if(nombre == ""){
      
      /*Borrar los datos en el LocalStorage*/
      closeWindow();
      }else{
        /*Mostrar datos almacenados*/      
      document.getElementById("nombre").innerHTML = nombre;
      }
    }
    setInterval(mostrarUsuario, 100);
  });
  
  
  //funcion por la tecla ENTER o INTRO
  $("#search").keypress(function(e) {
    if(e.which == 13) {
       // Acciones a realizar, por ej: enviar formulario.
       searchByText();
    }
  });
  
  
  //Buscar por texto
  function searchByText(){
      bPreguntar = false;
  
      icon();
  
      localStorage.setItem("searchbarra", $('#search').val());
  
      // var bar = localStorage.getItem("searchbarra");
  
      // alert(" " + $('#search').val());
  
      window.location="homeo.html";
  
  
  }
  
  
    var cambio = 0;
    function icon(){
  
      //mostrar animación
      setTimeout(function() {
        $("#loading").fadeIn(100);
        $(".icon").addClass('fa fa-spinner fa-pulse fa-1x fa-fw');
      },100);
      
      // cambio = cambio + 1;
      cambio = 1;
      if(cambio == 1){
          $('.icon').removeClass('fa fa-spinner fa-pulse fa-1x fa-fw').addClass('fa fa-spinner fa-spin fa-1x fa-fw');
      }
      if(cambio == 2){
          $('.icon').removeClass('fa fa-spinner fa-spin fa-1x fa-fw').addClass('fa fa-circle-o-notch fa-spin fa-1x fa-fw');
      }
      if(cambio == 3){
        $('.icon').removeClass('fa fa-circle-o-notch fa-spin fa-1x fa-fw').addClass('fa fa-refresh fa-spin fa-1x fa-fw');
      }
      if(cambio >= 4){
        $('.icon').removeClass('fa fa-refresh fa-spin fa-1x fa-fw').addClass('fa fa-spinner fa-pulse fa-1x fa-fw');
        cambio = 0;
      }
  
      //quitar animación
      setTimeout(function() {
        $(".icon").removeClass('fa fa-spinner fa-spin fa-1x fa-fw');
        $("#loading").fadeOut(100);
      },1000);
  
  } 
  
  
  
    /*Funcion Cargar y Mostrar datos*/
    function mostrarCarrito(){
      var sesIDD = localStorage.getItem("UserCode");
    //   console.log(" " + sesIDD);
      if(sesIDD == ""){
        closeWindow();
        // alert("No cuentas con una sesión activa, error 50126");
      }else{
        console.log("Iniciando petición de mostrar datos carrito actual");
      $.ajax({
        url: "http://35.167.62.109/storeutags/cart/get_details",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            session_id:sesIDD,
        }),
        dataType: 'json',
        success: function(resp) {
            if(resp.error_code == "SessionDoesNotExist"){
                alert("¡¡Upps... ocurrio un problema al momento de mostrar el carrito.!!");
                console.log("¡¡Upps... ocurrio un problema al momento de mostrar el carrito.!!");
                // window.location="homeo.html";
                closeWindow();
            }
            else{
  
                console.log(resp);
  
                var asdx = resp.data.items_quantity;
                var xcvx = resp.data.sub_total;
                var dvgr = resp.data.total;
  
                document.getElementById("quant").innerHTML = asdx;
                document.getElementById("total").innerHTML = xcvx;
  
                localStorage.setItem("cartcart", asdx);
                localStorage.setItem("allofall", dvgr);

                icon();
  
                // if(asdx == 0){
                //   bPreguntar = false;
                //   window.location="homeo.html";
                // }else{

                
                // }
  
            }
        },       
    });
      }
    }
  
  
    function btnCartd(){
        // alert("SE MOSTRARÁ EL CARRITO");
        var cart = 0;
        cart = localStorage.getItem("cartcart");
      
        if(cart == 0){
          bPreguntar = false;
          window.location="info.html";
        }else{
          bPreguntar = false;
          window.location="carto.html";
        }
      }

    function redirecttohome(){
        bPreguntar = false;
        window.location="homeo.html";
    }

    function redirecttopedidos(){
        bPreguntar = false;
        window.location="historial.html";
    }

    $(document).ready(function(){    
        $('#ingsistem').click(function(){        
            bPreguntar = false;
            alert("funciona");
            
            // window.location="indexo.html";
        });   
    });

    /*Funcion Cargar y Mostrar datos*/
    function mostrarCompra(){

        var dayPay = localStorage.getItem("dayofpay");
        var idPay = localStorage.getItem("idofpaypal");
        var allPay = localStorage.getItem("saveallofpay");

        if(dayPay == "" && idPay == "" && allPay == ""){

            bPreguntar = false;
            alert("Lo sentimos, está pantalla nomas se puede mostrar una vez.");
            window.location="historial.html";

        }else{

        document.getElementById("mostrara").innerHTML = dayPay;
        document.getElementById("mostrare").innerHTML = idPay;
        document.getElementById("mostraras").innerHTML = allPay;

        var borrar = "";

        localStorage.setItem("dayofpay", borrar);
        localStorage.setItem("idofpaypal", borrar);
        localStorage.setItem("saveallofpay", borrar);
        }
    }

    function btnProduct(){
        // alert("ok");
        bPreguntar = false;
        window.location="historial.html";
      }