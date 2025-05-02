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
        idProduct=Producto.id
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
                <a href="#" title="btn" onclick="Botones(${idProduct})" type="button" id="btn-agg">Agregar al carrito</a>
                <div class="description-container">
                    <div class="title-container">
                        <h3>Descripción</h3>
                    </div>
                    <p>${Producto.descripcion.replace(/\n/g ,"<br>")}</p>
                </div>
            </div>
        </div>`
        
        }
    })
    
    
  })
  .catch(error => console.error('Error al obtener el archivo JSON:', error));

}

const Botones=(id)=>{
    Carrito=localStorage.getItem("Carrito")
    console.log(Carrito)
    if(Carrito!=null){
        Carrito=JsonArray(JSON.parse(Carrito))
        Carrito.push([['id:',id],['cant',1]])
        Carrito=ArrayJson(Carrito)
        localStorage.setItem("Carrito",Carrito)
    }else if(Carrito==null){
        info={
            id:id,
            cant:1
        }
        Carrito=localStorage.setItem("Carrito",JSON.stringify(info))
    }
    contenedorModal.classList.remove('hide');


    setTimeout(() => {
        contenedorModal.classList.add('hide');
    }, 1000);
// });
}

const JsonArray=(Carrito)=>{
    var result = [];
    dato=[]
    j=0
    for(var i in Carrito){
        dato.push([i,Carrito[i]])
        if(j==1){
            result.push(dato)
            dato=[]
            j=0
        }
        j++
    }    
    return result
}

const ArrayJson=(Carrito)=>{
    console.log(Carrito)
    j=0
    var result = "[";
    for(var i in Carrito){
        if(j==1){
            result+=","
            j=0
        }
        Iter=Carrito[i]
        result+=`{
            "id":${Iter[0][1]},
            "cant":${Iter[1][1]}
        }`;
        j++
    }
    result+="]"
    
    return result
}

