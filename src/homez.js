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
        localStorage.setItem("x4", borrar2);
        localStorage.setItem("x7", borrar2);
        
        window.location="indexz.php";
    });   
});

mostrarCarrito();

$(document).ready(function() {
function checarAhora(){
var nm = localStorage.getItem("gggg");
var cd = 0;
if(nm == "si"){
  cd = 1;
  localStorage.setItem("kk", cd);
}else{
  cd = 0;
  localStorage.setItem("kk", cd);
}
}
setInterval(checarAhora, 100);
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
    window.location="indexz.php";
  }else{
    mos = mos + 1;
    if(mos == 1){
    
    //cargar el filtro de categorias.
    cargarCategories();

    //hacer una busqueda vacía inicial para que muestre todos los productos.
    searchByText();

    // var l = "";
        
    // localStorage.setItem("gggg", l);
    }
    
    
    /*Se ejecuta cuando cerramos la ventana de google*/
    // https://es.stackoverflow.com/questions/103956/c%C3%B3mo-detectar-el-evento-del-cierre-de-tu-p%C3%A1gina-web
  
  var nm = localStorage.getItem("kk");
  
  if(nm == 0){
  window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = "\o/";

  (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  if(confirmationMessage == true){
          /*Captura de datos escrito en los inputs*/        
          var exit = "";
          /*Guardando los datos en el LocalStorage*/
          localStorage.setItem("UserName", exit);
          localStorage.setItem("UserCode", exit);
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
    window.location="indexz.php";
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

          //cargar el filtro de categorias.
          cargarCategories();

          //hacer una busqueda vacía inicial para que muestre todos los productos.
          searchByText();

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

    // var nose = "UsuarioX";
    var borrar = "";
    if(nombre == ""){
      /*Mostrar datos almacenados*/      
    // document.getElementById("nombre").innerHTML = nose;
    // window.location="indexd.php";
    
    /*Borrar los datos en el LocalStorage*/
    localStorage.setItem("UserName", borrar);
    localStorage.setItem("UserCode", borrar);
    }else{
      /*Mostrar datos almacenados*/      
    document.getElementById("nombre").innerHTML = nombre;
    }
  }
  setInterval(mostrarUsuario, 100);
});


  function cargarCategories(){

    console.log("Mostrando las categorias");

     //Lanzar petición AJAX.
    $.ajax({
        type: "GET",
        url: "http://35.167.62.109/storeutags/catalogs/categories",
        contentType: "application/json; charset=utf-8",
        dataType: "json",          
        success: function(data, status, jqXHR){

          $.each(data.data.categories, function (i, category) {

            var htmlCheckbox = '' +
            ' <div class="col-auto">'+
            ' <div class="form-check">' +
            '   <input class="form-check-input store_category" type="checkbox" onchange="searchByCategory();" name="category" value="' + category.description + '" id="category_' + i + '">' +
            '   <label class="form-check-label" for="category_' + i + '"> ' +
            '     ' + category.description + 
            '   </label>' + 
            ' </div>' +
            ' </div>';
            $("#enlistarCategorias").append(htmlCheckbox);
         

          });
            
        },  
        error: function(jqXHR, status){

            console.log("Error enviado petición");
            console.log(jqXHR);        

        }
    });

  }


  
  $(function() {

    $(document).on('change','.store_category',function(){
        if(this.checked) {
          document.getElementById("search").value = "";

          $("#divItems1").empty();
          $("#divItems2").empty();

          bucarPorCategoria();
        }else{
          document.getElementById("search").value = "";

          $("#divItems1").empty();
          $("#divItems2").empty();
          
          bucarPorCategoria();
        }
    });

// función por categoría
  function bucarPorCategoria(){
    console.log("iniciando busqueda por cateogria");
    var selectedCategories = '';
    $(".store_category").each(function(element, index, set){
      if ($(this).prop("checked")) {
        selectedCategories = selectedCategories + this.value + ';';
      }
    });

    //Cargar los producsots. 
    $.ajax({
        type: "GET",
        url: "http://35.167.62.109/storeutags/catalogs/items/by_category/" + selectedCategories,
        contentType: "application/json; charset=utf-8",
        dataType: "json",          
        success: function(data, status, jqXHR){                
            
            console.log(data);
            render_items(data);
            conteoTerminado(data);

            $("#divError").empty();

        },
        error: function(jqXHR, status){

            console.log("Error enviado petición");
            console.log(jqXHR);        

        }
    });

  }
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
  console.log("Se inició la búsqueda por texto");
        
  //Search by text
  $.ajax({
      type: "GET",
      url: "http://35.167.62.109/storeutags/catalogs/items/by_text/" + $("#search").val(),
      contentType: "application/json; charset=utf-8",
      dataType: "json",          
      success: function(data, status, jqXHR){
                        
          console.log(data);
          render_items(data);
          conteoTerminado(data);

          $("#divError").empty();

          icon();

          $('#category_1').prop('checked',false);
          $('#category_2').prop('checked',false);
          $('#category_3').prop('checked',false);
          $('#category_0').prop('checked',false);
          
      },
      error: function(jqXHR, status){

        // errorSearch(jqXHR);

          console.log("Error enviado petición");
          console.log(jqXHR);        

      }
  });

}


var algo = 0;
var acom = 0;
  function render_items(data){

    //Limpiar los productos.
    $("#divItems1").empty();
    $("#divItems2").empty();
    $("#divConteo").empty();

    algo = algo + 1;

    if(algo >= 4){
      algo = 0;
    }

    localStorage.setItem("x4", algo);

    xsd();

    //Agregarlos uno a uno.
    $.each(data.data.items, function(i, item) {

      acom = acom + 1;
    if(acom >= 5){
      acom = 1;
    }
      
      //Cargar el template.
      var html_ITEM = $("#template_item").html();

      // Reemplazar los comentarios.
      html_ITEM = html_ITEM.replace('<!--', '');
      html_ITEM = html_ITEM.replace('-->', '');

      // Reemplazar los valores.
      html_ITEM = html_ITEM.replace('ITEM_PRODUCT_ID', item.product_id);
      html_ITEM = html_ITEM.replace('ITEM_PRODUCT_ID2', item.product_id);
      html_ITEM = html_ITEM.replace('ITEM_SHORT_DESCRIPTION', item.short_description);
      html_ITEM = html_ITEM.replace('ITEM_LONG_DESCRIPTION', item.long_description);
      html_ITEM = html_ITEM.replace('ITEM_SMALL_IMAGE', item.images_small);
      html_ITEM = html_ITEM.replace('ITEM_PRICE', item.price);

      //Agregar el ITEM.
      if(acom == 1 || acom == 3){
        //Agregar el ITEM.
        $("#divItems1").append(html_ITEM);
        }
        if(acom == 2 || acom == 4){
        //Agregar el ITEM.
        $("#divItems2").append(html_ITEM);
        }

    });
  }


  function conteoTerminado(data){

    var xd = data.data.items.length;

    //Limpiar los productos.
    $("#divConteo").empty();

    //Cargar el template.
    var html_ITEM = $("#template_conteo").html();

    // Reemplazar los comentarios.
    html_ITEM = html_ITEM.replace('<!--', '');
    html_ITEM = html_ITEM.replace('-->', '');

    // Reemplazar los valores.
    html_ITEM = html_ITEM.replace('ITEM_CONTEO_PRODUCTOS', xd);

    //Agregar el ITEM.
    $("#divConteo").append(html_ITEM);
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

    localStorage.setItem("x7", cambio);
    
    var v1 = localStorage.getItem("x4");
    var v2 = localStorage.getItem("x7");
    if(v1 == v2){
    }else{
      localStorage.setItem("x4", v2);
      localStorage.setItem("x7", v2);
      $("#divError").empty();
    }

    //quitar animación
    setTimeout(function() {
      $(".icon").removeClass('fa fa-spinner fa-spin fa-1x fa-fw');
      $("#loading").fadeOut(100);
    },1000);

} 


function errorSearch(){

  $("#divConteo").empty();
  $("#divItems1").empty();
  $("#divItems2").empty();

  //Limpiar los productos.
  $("#divError").empty();

  //Cargar el template.
  var html_ITEM2 = $("#ningunaBusqueda").html();

  // Reemplazar los comentarios.
  html_ITEM2 = html_ITEM2.replace('<!--', '');
  html_ITEM2 = html_ITEM2.replace('-->', '');

  html_ITEM2 = html_ITEM2.replace('ITEM_DATA', $("#search").val());

  //Agregar el ITEM.
  $("#divError").append(html_ITEM2);
}

/*mostrar error */
function xsd(){  
  var v1 = localStorage.getItem("x4");
  var v2 = localStorage.getItem("x7");
  
  //Cargar el template.
  var html_ITEM = $("#template_item").html();
  
  if(html_ITEM == '<!---->'|true && v1 != v2){
    // alert("si");
    errorSearch();
  }else{
    $("#divError").empty();
  }
  }

  /*Guardar el ID y comprobar que realmente se guardo, para despues mostrar producto */
  function dataItemId(productId){
    var gg = "si";
    localStorage.setItem("gggg", gg);
    localStorage.setItem("saveItemId", productId);

    var prueba = localStorage.getItem("saveItemId");

    if(prueba == ""){

    }else{
      // alert(" " + prueba);
      window.location="productoz.html";
    }
  }

  /*Funcion Cargar y Mostrar datos*/
  function mostrarCarrito(){
    var sesIDD = localStorage.getItem("UserCode");
    if(sesIDD == ""){
      alert("No cuentas con una sesión activa, error 50126");
      /*Captura de datos escrito en los inputs*/        
      var exitz = "";
      /*Guardando los datos en el LocalStorage*/
      localStorage.setItem("UserName", exitz);
      localStorage.setItem("UserCode", exitz);
    }else{
      // console.log("Iniciando petición mostrar datos carrito");
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

  function btnCartd(){
    alert("SE MOSTRARÁ EL CARRITO");
  }

  