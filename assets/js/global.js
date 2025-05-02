
//Funcion para determinar que informacion cargar en la pagina de categoria
const elegirCategoria=(CAT)=>{
    if(CAT==0){
        localStorage.setItem("Categoria","0")
    }else if(CAT==1){
        localStorage.setItem("Categoria","1")
    }else if(CAT==2){
        localStorage.setItem("Categoria","2")
    }
    if(window.location.href.includes("index.html")){
        window.location.href="views/category.html"
    }else{
        window.location.href="category.html"
    }

}
