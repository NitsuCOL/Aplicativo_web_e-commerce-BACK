const contenedorPrincipal = document.querySelector('.category-container');
const filtro = document.getElementById('filtro');
const flecha = filtro.querySelector('svg');
const contendorFiltros = document.querySelector('.filter-container');
const limpiarCategoria = document.getElementById('limpiar-category');
const RadiosFiltro= document.getElementsByName("prenda")
const contenedorProductos=document.getElementById("pc")

let anchoReducido = false;

//EVENTO QUE ABRE LA OPCION DE FILTRO
filtro.addEventListener('click', () => {
    if (anchoReducido) {
        contenedorPrincipal.style.width = '100%';
        flecha.style.transform = 'rotate(0deg)';
        contendorFiltros.classList.add('hide');
    } else {
        contenedorPrincipal.style.width = '80%';
        flecha.style.transform = 'rotate(180deg)';
        contendorFiltros.classList.remove('hide');
    }
    anchoReducido = !anchoReducido;
});

//EVENTO QUE LIMPIA TODOS LOS INPUTS DE LAS CATEGORIAS
limpiarCategoria.addEventListener('click', () =>{
    const radioBtn = document.getElementsByName('prenda');

    radioBtn.forEach(radio => {
        radio.checked = false;
        
    });
    InitProducts()
});
//EVENTO PARA APLICAR FILTROS
const RadiosCheck=(path)=>{
Aplicar=""
for(radio in RadiosFiltro){
    RadiosFiltro[radio].onclick = function() {
        IdRadio=this.id
        fetch(path)
        .then(response => response.json())
        .then(data => {
          contenedorProductos.innerHTML=""
          Productos=data
          Productos.forEach(function(Articulo){
            if(Articulo.categoria==IdRadio){
                JsonIndividual=JSON.stringify(Articulo)
                contenedorProductos.innerHTML+=`<div class="card">
                <div class="img-container" onclick="IdvArticulo(${JsonIndividual},${path})">
                    <img class="img-front" src="${Articulo.foto1}" alt="${Articulo.nombre}">
                    <img class="img-back" src="${Articulo.foto2}" alt="${Articulo.nombre}">
                </div>
                <div class="info-products-card">
                    <h4>${Articulo.nombre}</h4>
                    <p>$ ${Articulo.precio}</p>
                </div>
            </div>`
            }
          })
        })
        .catch(error => console.error('Error al obtener el archivo JSON:', error));

    }
}
}

//CAMBIO DE OPCIONES DE FILTRO SI SE CARGA DE MUJER SALE BLUSAS Y SI ES HOMBRE O NIÑO SALE CAMISAS

const FiltroSegunPagina=(cat)=>{
    Cambio=document.getElementById("cambio")
    if(cat=="0" || cat=="2"){
        Cambio.innerHTML=`
        <div class="camisas">
            <input type="radio" title="radio_" id="camisas" name="prenda">
            <label for="camisas">
                <p>
                    Camisas
                </p>
            </label>
        </div>`
    }else if(cat=="1"){
        Cambio.innerHTML=`
        <div class="blusas">
            <input type="radio" title="radio_" id="blusas" name="prenda">
            <label for="blusas">
                <p>
                    Blusas
                </p>
            </label>
        </div>`

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

//CARGA DE INFORMACION
const InitProducts=()=>{
    cat=localStorage.getItem("Categoria")
    //cambio de opciones de filtro segun la categoria cargada
    FiltroSegunPagina(cat)
    //OBTENER PATH AL CUAL SOLICITAR INFO
    path=getPath(cat)
    //ACTIVACION DE LOS RADIO BUTTON PARA FILTRO
    RadiosCheck(path)
    fetch(path)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    contenedorProductos.innerHTML=""
    Productos=data
    Productos.forEach(function(Articulo){
        idArt=parseInt(Articulo.id)

        contenedorProductos.innerHTML+=`<div class="card">
        <div class="img-container" onclick="IdvArticulo(${idArt},${cat})">
            <img class="img-front" src="${Articulo.foto1}" alt="${Articulo.nombre}">
            <img class="img-back" src="${Articulo.foto2}" alt="${Articulo.nombre}">
        </div>
        <div class="info-products-card">
            <h4>${Articulo.nombre}</h4>
            <p>${Articulo.precio}</p>
        </div>
    </div>`
    })
    
    
  })
  .catch(error => console.error('Error al obtener el archivo JSON:', error));
}


//ABRIR PAGINA DONDE SE MUESTRA TODO LO DEL ARTICULO
const IdvArticulo=(Id,cat)=>{
    path=getPath(cat)
    console.log(Id)
    info={"id":Id,
        "path":path}
    localStorage.setItem("Articulo",JSON.stringify(info))
    window.location.href="product.html"
}