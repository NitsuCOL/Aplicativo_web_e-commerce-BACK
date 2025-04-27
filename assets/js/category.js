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