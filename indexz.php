<!doctype html>
<html lang="en">
  <head>
    <title>Index</title>  
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" href="#" />      
    <link rel="stylesheet" href="bootstrap4/css/bootstrap.min.css">
    <link href='https://fonts.googleapis.com/css?family=Lato:300,400,500' rel='stylesheet' type='text/css'>
	  <link rel="stylesheet" href="estilos.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="./jquery/jquery-3.3.1.min.js"></script>
    <!-- <script src="./popper/popper.min.js"></script> -->
    <script src="./bootstrap4/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

  </head>
  <body>
     <header style="height: 70px">
        <div class="card-header">

            <!-- https://fontawesome.com/v4.7.0/examples/ -->
            
              <div class="form-row justify-content-end">
                <form id="form1" name="form1" class="needs-validation" novalidate></form>
                <div class="col-md-4 mb-3">
                  <div class="input-group">
                    <input name="search" autofocus="autofocus" type="text" class="form-control" id="search" placeholder="Buscar producto" required>
                    <div class="input-group-append">
                      <button id="loading" class="btn btn-primary" type="button" onclick="searchByText()"> <i class="fa fa-spinner fa-pulse fa-1x fa-fw icon"></i>
                        <span class="sr-only">Loading...</span> </button>
                      <button class="btn btn-primary" id="boton" name="boton" type="button" onclick="searchByText()">Buscar</button>
                    </div>
                  </div>   
                </div>
              </form>
                <div class="col-md-auto">
                <div class="text-right">
                <div class="card-header">Hola, <label type="text" id="nombre"></label></div>
                </div>
              </div>
              <div class="col-md-auto">
              <div class="form-row justify-content-center">
                  <div class="text">
                  <button id="btnCart" class="btn btn-secondary" type="button" onclick="btnCartds()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <span><strong>0</strong></span>
                  </button>
                  </div>
                </div>
                <p><span><strong>$0.00 MXN</strong></span></p>
              </div>
              <div class="col-md-auto">
                  <div class="text-right">
                  <button type="button" class="btn btn-primary" id="cerrarse">Iniciar Sesión</button>
                  </div>
              </div>
              </div>
              
            <br>

            <div class="justify-content-start">
                <!-- Contenido genereado desde la respuesta del servidor. -->
                <div class="row" id="enlistarCategorias">
                </div>
            </div>

        
        </div>
     </header> 
    <div style="height: 92px;"></div>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
            <div class="card shadow-lg p-3 mb-5 bg-white ">
        <div class="card-body">

        <!-- Contenido genereado desde la respuesta de la búsqueda.r -->
        <div class="col-8" id="divError"></div>
        <div class="col" id="divConteo"></div>
        <div class="row justify-content-center">
        <div class="col-6" id="divItems1"></div>
        <div class="col-6" id="divItems2"></div>
        </div>
        
        </div>   
    </div>
            </div>       
        </div>                  
    </div>


    <div id="template_conteo" style="display: none;">
      
      
        
                      <!-- <div>
                        <h1>ITEM_CONTEO_PRODUCTOS, productos encontrados</h1>
                      </div>
                <hr class="mb-4">   -->
   
    </div>



    <div id="ningunaBusqueda" style="display: none;">
                  
      
        <!-- <div class="row">

            <div class="col">
              <div class="card-body">
                <div class="row mb-4">
                  <div class="col-md-4 col-lg-3 col-xl-3">
                    <a href="logind.html">                             
                      <img class="img-fluid w-100" src="https://thumbs.dreamstime.com/b/lupa-trastornada-s%C3%ADmbolo-no-encontrado-lindo-y-s-fracasado-122205900.jpg"> 
                    </a>
                  </div>
                  <div class="col-md-5 col-lg-9 col-xl-9">
                    <div class="d-flex justify-content-between">
                      <div>
                        <br/>
                        <h5>LO SENTIMOS</h5>                                                       
                        <p class="text-muted text-uppercase small">No se pudo encontrar ningún dato de: "ITEM_DATA" :,V</p>
                      </div>
                      <div>
                        <br/>
                        <p><span><strong></strong></span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="mb-4">  
              </div>
          </div>

      </div> -->
    </div>



    <div id="template_item" style="display: none;">
      <!--
      
        <div class="row">

            <div class="col">
              <div class="card-body">
                <div class="row mb-4">
                  <div class="col-md-4 col-lg-3 col-xl-3">
                    <a href="loginz.html" onClick="dataItemIdindex(ITEM_PRODUCT_ID);">                             
                      <img class="img-fluid w-100" src="ITEM_SMALL_IMAGE"> 
                    </a>
                  </div>
                  <div class="col-md-5 col-lg-9 col-xl-9">
                    <div class="d-flex justify-content-between">
                      <div>
                        <br/>
                        <a href="loginz.html" onClick="dataItemIdindex(ITEM_PRODUCT_ID2);"> 
                        <h5>ITEM_SHORT_DESCRIPTION</h5>
                        </a>                                                       
                        <p class="text-muted text-uppercase small">ITEM_LONG_DESCRIPTION</p>
                      </div>
                      <div>
                        <br/>
                        <p><span><strong>$ITEM_PRICE</strong></span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="mb-4">  
              </div>
          </div>

      </div> -->
    </div>

   
    <script src="./src/indexz.js"></script> 	 
  </body>
</html>