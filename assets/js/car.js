const span1 = document.getElementById('span-1');//INPUT PARA PAGAR CON PAYPAL
const span2 = document.getElementById('span-2');//INPUT PARA PAGAR CON TARJETA DE CREDITO
const btnPagoConfirmado = document.getElementById('pago-confirmado');//BOTON PARA PAGAR LOS PRODUCTOS
const contenedorModal = document.getElementsByClassName('general-modal-container')[0];//CONTENEDOR DEL MODAL
const btnPedidoRealizado = document.getElementById('btnPedidoRealizado');//BOTON DEL MODAL
const contenedorCarritoVacio = document.getElementsByClassName('carVoid-container')[0];//CONTENEDOR DEL CARRITO VACIO
const contenedorCarrito = document.getElementsByClassName('car-container')[0];//CONTENEDOR DEL CARRITO CUANDO TIENE PORDUCTOS
const modalConfirmarPago = document.getElementById('comfirm');//CONTENEDOR DEL MODAL QUE CONFIRMA EL PAGO

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
        modalConfirmarPago.classList.remove('hiden');
        setTimeout(() => {            
            modalConfirmarPago.classList.add('hiden');
            contenedorCarrito.classList.add('hiden');
            contenedorCarritoVacio.classList.remove('hiden');
        }, 1000);
    } else {
        alert('Por favor selecciona un método de pago antes de continuar.');
    }
});
//--------------------------------

//METODO PARA AUMENTAR LA CANTIDAD DE LOS PRODUCTOS MEDIANTE EL SELECTOR
const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const quantitySpan = document.getElementById('quantity');

let quantity = 1;

decreaseBtn.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        quantitySpan.textContent = quantity;
    }
});

increaseBtn.addEventListener('click', () => {
    quantity++;
    quantitySpan.textContent = quantity;
});

//---------------------------------------------------------------------

//FUNCION DEL BOTON DEL BASURERO DE LOS PRODUCTOS
// Selecciona el contenedor que siempre EXISTE
const productsContainer = document.querySelector('.products-car-container');

// Delegamos el evento click
productsContainer.addEventListener('click', function(e) {
    // Verificamos si el click fue en el ícono de basura o dentro de él
    if (e.target.closest('.trash-icon')) {
        // Subimos hasta encontrar la tarjeta completa
        const cardCar = e.target.closest('.card-car');

        if (cardCar) {
            cardCar.remove(); // Elimina el producto
        }
    }
});
//_------------------------------------------