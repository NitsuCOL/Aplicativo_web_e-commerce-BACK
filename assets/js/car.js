const span1 = document.getElementById('span-1');//INPUT PARA PAGAR CON PAYPAL
const span2 = document.getElementById('span-2');//INPUT PARA PAGAR CON TARJETA DE CREDITO
const btnPagoConfirmado = document.getElementById('pago-confirmado');//BOTON PARA PAGAR LOS PRODUCTOS
const contenedorModal = document.getElementsByClassName('general-modal-container')[0];//CONTENEDOR DEL MODAL
const btnPedidoRealizado = document.getElementById('btnPedidoRealizado');//BOTON DEL MODAL
const contenedorCarritoVacio = document.getElementsByClassName('carVoid-container')[0];//CONTENEDOR DEL CARRITO VACIO
const contenedorCarrito = document.getElementsByClassName('car-container')[0];//CONTENEDOR DEL CARRITO CUANDO TIENE PORDUCTOS

//ESTO PERMITE QUE SE SELECCIONE EL METODO DE PAGO EN EL MODAL
span1.addEventListener('click', () => {
    span1.classList.add('active');
    span2.classList.remove('active');
});

span2.addEventListener('click', () => {
    span2.classList.add('active');
    span1.classList.remove('active');
});
//-------------------------------------------------

//METODO PARA QUE SE ABRA EL MODAL AL ACEPTAR LA COMPRA
btnPagoConfirmado.addEventListener('click', () =>{
    contenedorModal.classList.remove('hiden');
    document.body.classList.add('no-scroll');
});
//------------------------------------------------------

//METODO PARA CONFIRMAR LA COMPRA
btnPedidoRealizado.addEventListener('click', () => {
    if (span1.classList.contains('active') || span2.classList.contains('active')) {
        contenedorModal.classList.add('hiden');
        document.body.classList.remove('no-scroll');
        contenedorCarrito.classList.add('hiden');
        contenedorCarritoVacio.classList.remove('hiden');
    } else {
        alert('Por favor selecciona un método de pago antes de continuar.');
    }
});
//--------------------------------