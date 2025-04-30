const contenedorPrincipal = document.querySelector('.category-container');
const filtro = document.getElementById('filtro');
const flecha = filtro.querySelector('svg');
const contendorFiltros = document.querySelector('.filter-container');
const limpiarCategoria = document.getElementById('limpiar-category');

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
});

//CARGA DE INFORMACION
const InitProducts=()=>{
    cat=localStorage.getItem("Categoria")
    path=""
    if(cat=="0"){
        path='../assets/jsons/hombres.json'
    }else if(cat=="1"){
        path='../assets/jsons/mujeres.json'
    }else if(cat=="2"){
        path='../assets/jsons/niños.json'
    }
    console.log(path)
    fetch(path)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    contenedorProductos=document.getElementById("pc")
    Productos=data
    Productos.forEach(function(Articulo){
        contenedorProductos.innerHTML+=`<div class="card">
        <div class="img-container" onclick="Articulo(${Articulo.id})">
            <img class="img-front" src="${Articulo.foto1}" alt="${Articulo.nombre}">
            <img class="img-back" src="${Articulo.foto2}" alt="Camisa cuello sport parte traseta">
        </div>
        <div class="info-products-card">
            <h4>${Articulo.nombre}</h4>
            <p>$ ${Articulo.precio}</p>
        </div>
    </div>`
    })
    
    
  })
  .catch(error => console.error('Error al obtener el archivo JSON:', error));
}
