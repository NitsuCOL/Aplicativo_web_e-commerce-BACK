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

//-------------------------------------------------------------------

//FUNCION DEL BOTON DEL BASURERO DE LOS PRODUCTOS
// Selecciona el contenedor que siempre EXISTE
const productsContainer = document.querySelector('.products-car-container');

// Delegamos el evento click
// productsContainer.addEventListener('click', function(e) {
//     // Verificamos si el click fue en el ícono de basura o dentro de él
//     if (e.target.closest('.trash-icon')) {
//         // Subimos hasta encontrar la tarjeta completa
//         const cardCar = e.target.closest('.card-car');

//         if (cardCar) {
//             cardCar.remove(); // Elimina el producto

//         }
//     }
// });
// //_------------------------------------------


// FUNCION PARA LA CARGA DEL CARRITO
const CargaCarrito = ()=>{
    Carrito=localStorage.getItem("Carrito")
    if(Carrito!=null){
        Carrito=Carrito.split(",")
        Carrito.forEach(producto => {
        
        if(producto<20){
            Peticion(producto,0)
        }else if(producto>=20 && producto<40){
            Peticion(producto,1)
        }else if(producto>=40 && producto<60){
            Peticion(producto,2)
        }
    });
    }else{
        contenedorCarritoVacio.classList.remove('hiden');
        document.body.classList.add('no-scroll');
   }
    
    
}

const getPath=(cat)=>{
    path=""
    if(cat=="0"){
        path='../assets/jsons/hombres.json'

    }else if(cat=="1"){
        path='../assets/jsons/mujeres.json'

    }else if(cat=="2"){
        path='../assets/jsons/niños.json'

    }
    return path
}

const Peticion=(id,cat)=>{
    contenedorProductos=document.getElementById("products-container")
    fetch(getPath(cat))
    .then(response =>response.json())
    .then(data =>{
    Productos=data
    Productos.forEach(function(Producto){
        if(Producto.id==id){
        idProduct=Producto.id
        contenedorProductos.innerHTML+=`
            <div class="card-car">
            <div class="img-small-container">
                <img src="${Producto.foto1}" alt="Foto 1">
            </div>
            <div class="card-car-info-container">
                <div class="card-title-container">
                    <p>${Producto.nombre}</p>
                </div>
                <div class="other-info-card-container">
                    <div class="price-product">
                        <p>${Producto.precio}</p>
                    </div>
                    <div class="options-card-container">
                        <div class="selector-products">
                            <button onclick="Menos(${Producto.id},this)" class="decrease" type="button">-</button>
                            <span class="quantity">1</span>
                            <button onclick="Mas(this)"  class="increase" type="button">+</button>
                        </div>
                        <div class="trash-button-card">
                            <svg onclick="Eliminar(${Producto.id},this)" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" class="bi bi-trash3-fill trash-icon" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        `
        }
    })

    Calcular()
    })
    .catch(error => console.error('Error al obtener el archivo JSON:', error));
}

const Calcular=()=>{
    preciosDivs=document.querySelectorAll(".price-product")
    cantidades=document.querySelectorAll(".selector-products")
    // console.log(cantidades)
    total=0
    for(var i=0;i<preciosDivs.length;i++){
        const p=preciosDivs[i].querySelector('p')
        const c=cantidades[i].querySelector('span')
        // console.log(c.textContent+"\n"+p.textContent)
        
        if(p){
            const precio = parseFloat(p.textContent)
        if (!isNaN(precio)) {
                total += precio*parseInt(c.textContent);
        }
        }
    }
    // console.log(total)
    document.getElementById('total-pago').textContent=total
}


//AUMENTAR UNIDADES DEL PRODUCTO
const Mas=(boton)=>{
    padre=boton.parentNode
    cantidad=padre.querySelector('span')
    cantidad.textContent=parseInt(cantidad.textContent)+1
    Calcular()
}

//REDUCIR UNIDADES DEL PRODUCTO
const Menos=(id,boton)=>{
    padre=boton.parentNode
    cantidad=padre.querySelector('span')
    cantidad.textContent=parseInt(cantidad.textContent)-1
    if(cantidad.textContent==0){
        Eliminar(id,boton)
    }
    Calcular()
}

//FUNCION DE ELIMINAR EL PRODUCTO DEL CARRITO
const Eliminar=(id,boton)=>{
    

    Carrito=localStorage.getItem("Carrito")
    Carrito=Carrito.split(",")
    if(Carrito.length==1){
        localStorage.removeItem("Carrito")
        CargaCarrito()

    }else{
        localStorage.setItem("Carrito",Carrito.filter(n=> n!=id))
        Calcular()

    }
    const cardCar = boton.closest('.card-car');

        if (cardCar) {
            cardCar.remove(); // Elimina el producto

        }

}


//Preguntar si eliminar un producto
const Confirmar=()=>{
    Delete=document.getElementById("delete")
    Delete.classList.remove("hiden")
}







