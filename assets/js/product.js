const contenedorModal = document.querySelector('.modal-container');
const ContenedorArticulo=document.getElementById("Articulo")



const IdvArticulo=()=>{
    Articulo=JSON.parse(localStorage.getItem("Articulo"))
    fetch(Articulo.path)
  .then(response => response.json())
  .then(data => {
    ContenedorArticulo.innerHTML=""
    Productos=data
    Productos.forEach(function(Producto){
        if(Producto.id==Articulo.id){
        ContenedorArticulo.innerHTML+=`
        <div class="product-container">
            <div id="carouselExample" class="carousel slide w-50">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="${Producto.foto1}">
                    </div>
                    <div class="carousel-item">
                        <img src="${Producto.foto2}">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <!--CONTENDEOR QUE CONTIENE LA INFORMACION DEL PRODUCTO-->
            <div class="info">
                <div class="title-container">
                    <h2>${Producto.nombre}</h2>
                </div>
                <a href="#" title="btn" type="button" id="btn-agg">Agregar al carrito</a>
                <div class="description-container">
                    <div class="title-container">
                        <h3>Descripción</h3>
                    </div>
                    <p>${Producto.descripcion.replace(/\n/g ,"<br>")}</p>
                </div>
            </div>
        </div>`
        Botones()
        }
    })
    
    
  })
  .catch(error => console.error('Error al obtener el archivo JSON:', error));

}

const Botones=()=>{
    const btnAgregar = document.getElementById('btn-agg');
    btnAgregar.addEventListener('click', () =>{
    contenedorModal.classList.remove('hide');

    setTimeout(() => {
        contenedorModal.classList.add('hide');
    }, 1000);
});
}
