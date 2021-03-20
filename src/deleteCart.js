/*eliminar carrito actual */
function eliminarCarrito(){  
    var sesionActualCarro = localStorage.getItem("UserCode");

    $.ajax({
        url: "http://35.167.62.109/storeutags/cart/remove_all",
        type: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({
            session_id:sesionActualCarro,
        }),
        dataType: 'json',
        success: function(resp) {
            if(resp.error_code == "SessionDoesNotExist"){
                alert("No hay ninguna sesión activa");
                window.location="deleteCart.html";
            }
            else{
                alert("Se eliminó exitosamente el carrito de la sesión actual");
                window.location="deleteCart.html";
            }
        },       
    });
}