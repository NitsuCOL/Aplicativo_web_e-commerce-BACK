const btnAgregar = document.getElementById('btn-agg');
const contenedorModal = document.querySelector('.modal-container');

btnAgregar.addEventListener('click', () =>{
    contenedorModal.classList.remove('hide');

    setTimeout(() => {
        contenedorModal.classList.add('hide');
    }, 1000);
});