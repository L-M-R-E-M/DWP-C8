$(document).ready(function(){    
    $('#cerrarse').click(function(){        
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
        
        window.location="indexz.html";
    });   
});

$(document).ready(function(){    
  $('#atras').click(function(){    
      
      window.location="homez.html";
  });   
});

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
    alert("No cuentas con una sesión activa, error 50126");
    }
    window.location="indexz.html";
  }else{
    mos = mos + 1;
    if(mos == 1){
    var na = "";
        
    localStorage.setItem("gggg", na);

    //cargar el producto.
    cargarProducto();

    }
    
    
    /*Se ejecuta cuando cerramos la ventana de google*/
    // https://es.stackoverflow.com/questions/103956/c%C3%B3mo-detectar-el-evento-del-cierre-de-tu-p%C3%A1gina-web
    var nm = localStorage.getItem("gggg");
  
  if(nm == ""){
  window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = "\o/";

  (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  if(confirmationMessage == true){
          /*Captura de datos escrito en los inputs*/        
          var exit = "";
          /*Guardando los datos en el LocalStorage*/
          localStorage.setItem("UserName", exit);
          localStorage.setItem("UserCode", exit);
          localStorage.setItem("saveItemId", exit);
}
  return confirmationMessage;                            //Webkit, Safari, Chrome
});


}
          





  }
  
  }else{
  if(check == ""){
    mos = mos + 1;
    if(mos == 1){
    alert("No cuentas con una sesión activa, error 50126");
    }
    window.location="indexz.html";
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
      }
      else{
          var nom = resp.data.customer.first_name;
          localStorage.setItem("UserName", nom);

          var code = resp.data.session_id;
          localStorage.setItem("UserCode", code);

          //cargar el producto.
          cargarProducto();

          // alert("¡¡¡Bienvenido otra vez " + nom + "!!!");
          
      }
      },       
  });
  }
  }
  }
  setInterval(checarsesion, 1000);
});

/*Funcion Cargar y Mostrar datos*/
$(document).ready(function() {	
  function mostrarUsuario(){
    /*Obtener datos almacenados*/
    var nombre = localStorage.getItem("UserName");
    // var nose = "UsuarioX";
    var borrar = "";
    if(nombre == ""){
      /*Mostrar datos almacenados*/      
    // document.getElementById("nombre").innerHTML = nose;
    // window.location="indexd.php";
    
    /*Borrar los datos en el LocalStorage*/
    localStorage.setItem("UserName", borrar);
    localStorage.setItem("UserCode", borrar);
    localStorage.setItem("saveItemId", borrar);
    }else{
      /*Mostrar datos almacenados*/      
    document.getElementById("nombre").innerHTML = nombre;
    }
  }
  setInterval(mostrarUsuario, 1000);
});


function cargarProducto(){

  console.log("Iniciando carga de producto");

  var prod = localStorage.getItem("saveItemId");


//Search by text
$.ajax({
  type: "GET",
  url: "http://35.167.62.109/storeutags/catalogs/item_details/" + prod,
  contentType: "application/json; charset=utf-8",
  dataType: "json",          
  success: function(data, status, jqXHR){
                    
      console.log(data);
      mostrarProducto(data);

      // $("#divError").empty();
      
  },
  error: function(jqXHR, status){

      console.log("Error enviado petición");
      console.log(jqXHR);        

  }
});

}


function mostrarProducto(data){

  //Limpiar los productos.
  $("#divProduct").empty();

  //Agregarlos uno a uno.
  $.each(data.data.items, function(i, item) {
    
    //Cargar el template.
    var html_ITEM = $("#template_product").html();

    // Reemplazar los comentarios.
    html_ITEM = html_ITEM.replace('<!--', '');
    html_ITEM = html_ITEM.replace('-->', '');

    // Reemplazar los valores.
    html_ITEM = html_ITEM.replace('ITEM_SHORT_DESCRIPTION', item.short_description);
    html_ITEM = html_ITEM.replace('ITEM_LONG_DESCRIPTION', item.long_description);
    html_ITEM = html_ITEM.replace('ITEM_HTML_DETAILS', item.html_details);
    html_ITEM = html_ITEM.replace('ITEM_PRICE', item.price);
    html_ITEM = html_ITEM.replace('ITEM_SMALL_IMAGE1', item.images_small);
    html_ITEM = html_ITEM.replace('ITEM_SMALL_IMAGE2', item.images_small);
    html_ITEM = html_ITEM.replace('ITEM_SMALL_IMAGE3', item.images_small);
    html_ITEM = html_ITEM.replace('ITEM_SMALL_IMAGE4', item.images_small);
    html_ITEM = html_ITEM.replace('ITEM_LARGE_IMAGE', item.images_large);
    html_ITEM = html_ITEM.replace('ITEM_GALLERY_IMAGE1', item.images_gallery.image);

    //Agregar el ITEM.
    $("#divProduct").append(html_ITEM);

  });
}

var ilu = 0;
var bvh = 0;
var valorSrcC= "";
/*Guardar imgaen producto */
function dataMoveImage(img){
  ilu = ilu + 1;

  var whoIsGod = localStorage.getItem("GOD");
  var whoIsKind = localStorage.getItem("KIND");

  var valorSrcA= "";
  var valorSrcB= $("#imgLarge").attr("src");
  if(ilu == 1){
    valorSrcC= $("#imgLarge").attr("src");
  }
  if(img == 1){
    valorSrcA= $("#1").attr("src");
  }
  if(img == 2){
    valorSrcA= $("#2").attr("src");
  }
  if(img == 3){
    valorSrcA= $("#3").attr("src");
  }
  if(img == 4){
    valorSrcA= $("#4").attr("src");
  }
  if(img == 5){
    ilu = 0;
    bvh = 1;
    valorSrcA= $("#5").attr("src");
    // alert("sererg");
    // window.location="productoz.html";
    $('#imgLarge').replaceWith('<img id="imgLarge" class="img-fluid w-100" src="'+valorSrcC+'">');
    $('#newImg'+img).replaceWith('<a href="#!" onClick="dataMoveImage("'+whoIsKind+'");" id="newImg"'+whoIsKind+'""><img id="'+whoIsKind+'" class="img-fluid w-50" src="'+whoIsGod+'"></a>');
  }else{
    //este if es el de default ya que siempre se va a meter, una vez comenzando el programa
    if(ilu <= 1 || bvh == 1){
      $('#imgLarge').replaceWith('<img id="imgLarge" class="img-fluid w-100" src="'+valorSrcA+'">');
      $('#newImg'+img).replaceWith('<a href="#!" onClick="dataMoveImage(5);" id="newImg5"><img id="5" class="img-fluid w-50" src="'+valorSrcC+'"></a>');
      bvh = 0;
    }
    if(ilu >= 2){
      $('#imgLarge').replaceWith('<img id="imgLarge" class="img-fluid w-100" src="'+valorSrcA+'">');
      $('#'+img).replaceWith('<img id="'+img+'" class="img-fluid w-50" src="'+whoIsGod+'">');
      bvh = 0;
    }
  }
  if(img > 0 && img < 6){
    localStorage.setItem("GOD", valorSrcA);
    localStorage.setItem("KIND", img);
  }

  console.log("Mostrando la imagen: " + img);

  
  
  
}


/*Función añadir al carro*/
function addCart(){
  var cant = $('#cantidad').val();
  var sesID = localStorage.getItem("UserCode");
  var itemID = localStorage.getItem("saveItemId");

  if(cant == "" || cant == 0){
    alert('Ponga un numero mayor a "0".');
  }else{
    console.log("Iniciando petición carrito");
    // alert("Es: " + cant);
    $.ajax({
      url: "http://35.167.62.109/storeutags/cart/add_item",
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
          session_id:sesID,
          item_id:itemID,
          item_quantity:cant,

      }),
      dataType: 'json',
      success: function(resp) {
          if(resp.error_code == "SessionDoesNotExist" || resp.error_code == "ItemDoesNotExist" ||
             resp.error_code == "InavlidQuantity" || resp.error_code == "MandatoryFilds"){
              alert("¡¡Upps... ocurrio un problema al momento de añadir al carrito.!!");
              console.log("¡¡Upps... ocurrio un problema al momento de añadir al carrito.!!");
              window.location="productoz.html";
          }
          else{
            var opcion = confirm("¿Quieres seguir comprando?");
            if (opcion == true) {
                // mensaje = "Has clickado OK";
                // alert("Se añadió al carrito con éxito");
                window.location="homez.html";
            } else {
              // mensaje = "Has clickado Cancelar";
                //  alert("Se añadió al carrito con éxito");
            }
          }
      },       
  });
  }
  
}

/*Funcion Cargar y Mostrar datos cada 3 segundos*/
$(document).ready(function() {	
  function mostrarCarrito(){
    var sesIDD = localStorage.getItem("UserCode");
    if(sesIDD == ""){
      alert("No cuentas con una sesión activa, error 50126");
      /*Captura de datos escrito en los inputs*/        
      var exitz = "";
      /*Guardando los datos en el LocalStorage*/
      localStorage.setItem("UserName", exitz);
      localStorage.setItem("UserCode", exitz);
      localStorage.setItem("saveItemId", exitz);
    }else{
      // console.log("Iniciando petición mostrar datos carrito cada 3 segundos");
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
              window.location="productoz.html";
          }
          else{
            var asdx = resp.data.items_quantity;
            var xcvx = resp.data.sub_total;

            document.getElementById("quant").innerHTML = asdx;
            document.getElementById("total").innerHTML = xcvx;
          }
      },       
  });
    }
  }
  setInterval(mostrarCarrito, 3000);
});

// //alerta
// function alerta()
//     {
//     // var mensaje;
//     var opcion = confirm("¿Quieres seguir comprando?");
//     if (opcion == true) {
//         // mensaje = "Has clickado OK";
//         window.location="homez.html";
// 	} else {
// 	    // mensaje = "Has clickado Cancelar";
// 	}
// 	// document.getElementById("ejemplo").innerHTML = mensaje;
// }


function btnCart(){
  alert("SE MOSTRARÁ EL CARRITO");
}

