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
                var dvgr = resp.data.total;
  
                document.getElementById("quant").innerHTML = asdx;
                document.getElementById("total").innerHTML = xcvx;
  
                localStorage.setItem("cartcart", asdx);
                localStorage.setItem("allofall", dvgr);
  
                if(asdx == 0){
                  bPreguntar = false;
                  window.location="homeo.html";
                }else{
  
                render_items(resp);
                render_itemsP2(resp);
                icon();
                }
  
            }
        },       
    });
      }
    }
  
  
    function render_items(data){
  
      //Limpiar los productos.
      $("#divItemsCart").empty();
  
      //Agregarlos uno a uno.
      $.each(data.data.items, function(i, item) {
        
        //Cargar el template.
        var html_ITEM = $("#template_productCart").html();
  
        // Reemplazar los comentarios.
        html_ITEM = html_ITEM.replace('<!--', '');
        html_ITEM = html_ITEM.replace('-->', '');
  
        // Reemplazar los valores.
        html_ITEM = html_ITEM.replace('ITEM_SHORT_DESCRIPTION', item.short_description);
        html_ITEM = html_ITEM.replace('ITEM_QUANTITY', item.quantity);
  
        //Agregar el ITEM.
        $("#divItemsCart").append(html_ITEM);
  
      });
    }
  
  
    function render_itemsP2(data){
  
      //Limpiar los productos.
      $("#divItemsCartP2").empty();
        
        //Cargar el template.
        var html_ITEM = $("#template_productCartP2").html();
  
        // Reemplazar los comentarios.
        html_ITEM = html_ITEM.replace('<!--', '');
        html_ITEM = html_ITEM.replace('-->', '');
  
        // Reemplazar los valores.
        html_ITEM = html_ITEM.replace('ITEM_SUB_TOTAL', data.data.sub_total);
        html_ITEM = html_ITEM.replace('ITEM_TAXES', data.data.taxes);
        html_ITEM = html_ITEM.replace('ITEM_TOTAL', data.data.total);
  
        //Agregar el ITEM.
        $("#divItemsCartP2").append(html_ITEM);
    }
  
  
    function btnCartd(){
      // alert("SE MOSTRARÁ EL CARRITO");
      var cart = 0;
      cart = localStorage.getItem("cartcart");
    
      if(cart == 0){
        bPreguntar = false;
        window.location="checkout.html";
      }else{
        bPreguntar = false;
        window.location="carto.html";
      }
    }

    paypal.Buttons({
		
        locale: 'en_MX',	
        style: {
            size: 'responsive',
            color: 'blue',
            shape: 'rect',
            label: 'pay'
        },
    
        createOrder: function(data, actions) {								
            return actions.order.create({					
                purchase_units: [{
                    amount: {
                        // value: $("#ventaTotal").val()
                        value: localStorage.getItem("allofall")
                    },
                    description: 'Compra en Store UTAGS México',
                    item: {
                        name: 'Compra en Store UTAGS México',
                        unit_amount: $("#txtAmount").val(),
                        quantity: '1'
                    }
                }] 
                , application_context: { 
                    shipping_preference: 'NO_SHIPPING',
                    brand_name: 'Store UTAGS México' 
                } 
            }); 
        }, 

        onApprove: function(data, actions) {					
            return actions.order.capture().then(function(details) {						
                console.log(details);
                //Hacer la petición al servicio 35.167.62.109/storeutags/order/create_order 

                var sesIDDD = localStorage.getItem("UserCode");
                // var payDetail = JSON.stringify(details);
                var payDetail = details;

                    console.log("Iniciando petición de order/create");
      $.ajax({
        url: "http://35.167.62.109/storeutags/order/create",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            session_id:sesIDDD,
            paypal_payment_details:payDetail,
        }),
        dataType: 'json',
        success: function(resp) {
            if(resp.error_code == "SessionDoesNotExist" || resp.error_code == "MandatoryFields"){
                bPreguntar = false;
                alert(" " + resp.error_code);
                console.log(" " + resp.error_code);
                // window.location="checkout.html";
                closeWindow();
            }else{
  
                console.log(resp);
  
                var alf = resp.original_request.paypal_payment_details.create_time;
                var bra = resp.original_request.paypal_payment_details.id;

                $.each(resp.original_request.paypal_payment_details.purchase_units, function(i, item) {
                  var char = item.amount.value;
                  localStorage.setItem("saveallofpay", char);
                  // alert(" " + char);
                });

                var str = alf; 
                var fechactual = str.substr(0, str.length-10);
                var horactualna = str.substr(11, str.length-2);
                var horactual = horactualna.substr(0, str.length-1);
                var union = fechactual + " " + horactual;
  
                localStorage.setItem("dayofpay", union);
                localStorage.setItem("idofpaypal", bra);

                mostrarCarrito();
  
                bPreguntar = false;
                window.location="info.html";
                // alert("okey" + alf + " " + bra + " " + char);
  
            }
        },       
    });

                

                					

            });
        }, 

        onError: function (err) {					
            alert("Ocurrió un errror en PayPal. Intenta nuevamente.");	
        }, 

        onCancel: function (data, actions) {					
            alert("Tu pago no fue recibido. Intenta nuevamente.");					
        }
        
    }).render('#paypal-button-container');


    function btnProduct(){
      // alert("ok");
      bPreguntar = false;
      window.location="historial.html";
    }