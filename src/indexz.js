$(document).ready(function(){    
    $('#cerrarse').click(function(){        
        /*Captura de datos escrito en los inputs*/   
        var borrar2 = 0;
        
        localStorage.setItem("x1", borrar2);
        localStorage.setItem("x2", borrar2);  

        window.location="loginz.html";
    });   
});

          //cargar el filtro de categorias.
        cargarCategories();

        //hacer una busqueda vacía inicial para que muestre todos los productos.
        searchByText();

/*Funcion Cargar y Mostrar datos*/
$(document).ready(function() {	
    function mostrarUsuario(){
      /*Obtener datos almacenados*/
      var nombres = localStorage.getItem("UserName");
      var noses = "UsuarioX";
      if(nombres == ""){
        /*Mostrar datos almacenados*/      
      document.getElementById("nombre").innerHTML = noses;
      }else{
        /*Mostrar datos almacenados*/      
      // document.getElementById("nombre").innerHTML = nombres;
      window.location="homez.html";
      }
    }
    setInterval(mostrarUsuario, 100);
  });


  /*Iniciar sesión por default*/
$(document).ready(function() {
  var corr = localStorage.getItem("SaveCorreo");
  var pass = localStorage.getItem("SavePass");	
  
  function iniciarSesion(){
    if(corr == "" && pass == ""){
      //En este  apartado no pasa nada aún
    }else{
      window.location="homez.html";
    }
  }
  setInterval(iniciarSesion, 100);
});


  function cargarCategories(){

    console.log("Iniciando carga de categorias");

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
    $("#divError").empty();

    algo = algo + 1;

    if(algo >= 4){
      algo = 0;
    }

    localStorage.setItem("x1", algo);

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
      html_ITEM = html_ITEM.replace('ITEM_SHORT_DESCRIPTION', item.short_description);
      html_ITEM = html_ITEM.replace('ITEM_LONG_DESCRIPTION', item.long_description);
      html_ITEM = html_ITEM.replace('ITEM_SMALL_IMAGE', item.images_small);
      html_ITEM = html_ITEM.replace('ITEM_PRICE', item.price);

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

    localStorage.setItem("x2", cambio);
    
    var v1 = localStorage.getItem("x1");
    var v2 = localStorage.getItem("x2");
    if(v1 == v2){
    }else{
      localStorage.setItem("x1", v2);
      localStorage.setItem("x2", v2);
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
var v1 = localStorage.getItem("x1");
var v2 = localStorage.getItem("x2");

//Cargar el template.
var html_ITEM = $("#template_item").html();

if(html_ITEM == '<!---->'|true && v1 != v2){
  // alert("si");
  errorSearch();
}else{
  $("#divError").empty();
}
}


function btnCartds(){
  window.location="loginz.html";
}