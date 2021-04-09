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
              // window.location="productoo.html";
              closeWindow();
          }
          else{

              console.log(resp);

              var asdx = resp.data.items_quantity;
              var xcvx = resp.data.sub_total;

              document.getElementById("quant").innerHTML = asdx;
              document.getElementById("total").innerHTML = xcvx;

              localStorage.setItem("cartcart", asdx);

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
      html_ITEM = html_ITEM.replace('ITEM_PRODUCT_ID', item.product_id);
      html_ITEM = html_ITEM.replace('ITEM_PRODUCT_ID2', item.product_id);
      html_ITEM = html_ITEM.replace('ITEM_PRODUCT_ID3', item.product_id);
      html_ITEM = html_ITEM.replace('ITEM_SHORT_DESCRIPTION', item.short_description);
      html_ITEM = html_ITEM.replace('ITEM_LONG_DESCRIPTION', item.long_description);
      html_ITEM = html_ITEM.replace('ITEM_SMALL_IMAGE', item.images_small);
      html_ITEM = html_ITEM.replace('ITEM_PRICE', item.price);
      html_ITEM = html_ITEM.replace('ITEM_QUANTITY', item.quantity);
      html_ITEM = html_ITEM.replace('ITEM_PRICE_SUB', item.sub_total);

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
      bPreguntar = false;
      window.location="carto.html";
  }

  function deletePCart(idProduct){
    console.log("Iniciando la eliminación del ID: " + idProduct);
    var sesionActualCarro = localStorage.getItem("UserCode");

    $.ajax({
        url: "http://35.167.62.109/storeutags/cart/remove_item",
        type: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({
            session_id:sesionActualCarro,
            item_id:idProduct,
        }),
        dataType: 'json',
        success: function(resp) {
            if(resp.error_code == "SessionDoesNotExist" || resp.error_code == "ItemDoesNotExist"
            || resp.error_code == "ItemOrderDoesNotExist"){
                alert(" " + resp.error_code);
                closeWindow();
            }
            else{
                mostrarCarrito();
            }
        },       
    });
  }


    var conte = 0;
    var save = 0;
    function upadateCart(idCart){

        var sesIDDD = localStorage.getItem("UserCode");
        var dataInput = $('#'+idCart).val()

        conte = conte + 1;

        if(conte >= 2 && save != idCart){
            conte = 1;
        }

        if(conte == 1){
        save = idCart;
        localStorage.setItem("position", save);
        }

        if(dataInput == 0){
            deletePCart(idCart);
        }else{
           

        if(conte >= 2){
            console.log("Iniciando actualización del ID: " + save);
            // alert(" " +  dataInput);

        $.ajax({
            url: "http://35.167.62.109/storeutags/cart/update_item",
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                session_id:sesIDDD,
                item_id:save,
                item_quantity:dataInput
            }),
            dataType: 'json',
            success: function(resp) {
                if(resp.error_code == "SessionDoesNotExist" || resp.error_code == "InvalidQuantity"
                || resp.error_code == "ItemDoesNotExist" || resp.error_code == "ItemOrderDoesNotExist"
                || resp.error_code == "MandatoryFields"){
                    alert(" " + resp.error_code);
                    closeWindow();
                }
                else{
                    conte = 0;
                    mostrarCarrito();
                }
            },       
        });
        }
    
    }
        
    }


var conte2 = 0;
var save2 = 0;
$(document).click(function outWindows(event) {
            
            
    event.stopPropagation();
    event.preventDefault();
    event.stopImmediatePropagation();

    conte2 = conte2 + 1;

    var posi = localStorage.getItem("position");

    if(conte2 >= 2 && save2 != posi){
        conte2 = 1;
    }

    if(conte2 == 1){
    save2 = posi;
    localStorage.setItem("position", save2);
    // alert(" " +  save2);
    }

    if(conte2 >= 2){
        upadateCart(save2);
        conte2 = 0;
    }
});


function validar(e) {
   
   
   
  tecla = (document.all) ? e.keyCode : e.which;
  if (tecla==8) return true; //Tecla de retroceso (para poder borrar)
  if (tecla==44) return true; //Coma ( En este caso para diferenciar los decimales )
  if (tecla==48) return true;
  if (tecla==49) return true;
  if (tecla==50) return true;
  if (tecla==51) return true;
  if (tecla==52) return true;
  if (tecla==53) return true;
  if (tecla==54) return true;
  if (tecla==55) return true;
  if (tecla==56) return true;
  patron = /1/; //ver nota
  te = String.fromCharCode(tecla);
  return patron.test(te);
}

function goToPayNow(){

  bPreguntar = false;

  window.location="checkout.html";

}

function btnProduct(){
  // alert("ok");
  bPreguntar = false;
  window.location="historial.html";
}

    

        
   

    
    