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
  mostrarPedidos();
  
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
      window.location="loginou.html";
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
      window.location="loginou.html";
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
  
                document.getElementById("quant").innerHTML = asdx;
                document.getElementById("total").innerHTML = xcvx;

                icon();
  
            }
        },       
    });
      }
    }


    /*Funcion Cargar y Mostrar datos*/
    function mostrarPedidos(){
        var sesIDDD = localStorage.getItem("UserCode");
      //   console.log(" " + sesIDD);
        if(sesIDDD == ""){
          closeWindow();
          // alert("No cuentas con una sesión activa, error 50126");
        }else{
          console.log("Iniciando petición de mostrar historial");
        $.ajax({
          url: "http://35.167.62.109/storeutags/order/get_orders",
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({
              session_id:sesIDDD,
          }),
          dataType: 'json',
          success: function(resp) {
              if(resp.error_code == "SessionDoesNotExist" || resp.error_code == "MandatoryFields"){
                  alert("¡¡Upps... ocurrio un problema al momento de mostrar el hisorial.!!");
                  console.log("¡¡Upps... ocurrio un problema al momento de mostrar el historial.!!");
                //   window.location="homeo.html";
                closeWindow();
              }
              else{
    
                  console.log(resp);

                  render_items(resp);
                  conteoTerminado(resp);

                  icon();
    
              }
          },       
      });
        }
      }
  
  
    function render_items(data){
  
      //Limpiar los productos.
      $("#divItemsCart").empty();
  
      //Agregarlos uno a uno.
      $.each(data.data.orders, function(i, item) {
        
        //Cargar el template.
        var html_ITEM = $("#template_productCart").html();
  
        // Reemplazar los comentarios.
        html_ITEM = html_ITEM.replace('<!--', '');
        html_ITEM = html_ITEM.replace('-->', '');

        var str = item.date_order; 
        var fechactual = str.substr(0, str.length-15);
        var fechactualult = str.substr(8, str.length-13);
        var queyaquede = fechactual + fechactualult + 1;

        var fecha = new Date(queyaquede);
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var fechactualnew = fecha.toLocaleDateString("es-MX", options);
  
        // Reemplazar los valores.
        html_ITEM = html_ITEM.replace('ITEM_ORDER', fechactualnew);
        html_ITEM = html_ITEM.replace('ITEM_TOTAL', item.total);
        // html_ITEM = html_ITEM.replace('ITEM_TOTAL', item.total);

        var estatual = item.status;
        var estapagado = "Pagado";

        if(estatual == "completed"){

            html_ITEM = html_ITEM.replace('ITEM_STATUS', estapagado);

        }else{

            html_ITEM = html_ITEM.replace('ITEM_STATUS', estatual);

        }

        html_ITEM = html_ITEM.replace('ITEM_PAYPAL', item.paypal_order_id);

        var coment = item.comments;
        var gtr = "N/A";

        if(coment == ""){

            html_ITEM = html_ITEM.replace('ITEM_COMMENTS', gtr);

        }else{

            html_ITEM = html_ITEM.replace('ITEM_COMMENTS', coment);

        }
  
        //Agregar el ITEM.
        $("#divItemsCart").append(html_ITEM);
  
      });
    }


    function conteoTerminado(data){

        var xd = data.data.orders.length;
    
        //Limpiar los productos.
        $("#divItemsCartP2").empty();
    
        if(xd > 1){
    
        //Cargar el template.
        var html_ITEM = $("#template_conteo").html();
    
        }else{
    
        //Cargar el template.
        var html_ITEM = $("#template_conteo2").html();
    
        }
    
        // Reemplazar los comentarios.
        html_ITEM = html_ITEM.replace('<!--', '');
        html_ITEM = html_ITEM.replace('-->', '');
    
        // Reemplazar los valores.
        html_ITEM = html_ITEM.replace('ITEM_CONTEO_PRODUCTOS', xd);
    
        //Agregar el ITEM.
        $("#divItemsCartP2").append(html_ITEM);
    
      }
  
  
      function btnCartd(){
        // alert("SE MOSTRARÁ EL CARRITO");
        var cart = 0;
        cart = localStorage.getItem("cartcart");
      
        if(cart == 0){
          bPreguntar = false;
          window.location="historial.html";
        }else{
          bPreguntar = false;
          window.location="carto.html";
        }
      }

      function btnProduct(){
        // alert("ok");
        bPreguntar = false;
        window.location="historial.html";
      }