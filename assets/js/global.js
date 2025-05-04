const arr=["car.html","category.html","loginAndRegister.html","product.html"]

//Funcion para determinar que informacion cargar en la pagina de categoria
const elegirCategoria=(CAT)=>{
    if(CAT==0){
        localStorage.setItem("Categoria","0")
    }else if(CAT==1){
        localStorage.setItem("Categoria","1")
    }else if(CAT==2){
        localStorage.setItem("Categoria","2")
    }
    verify=arr.some(local=>window.location.href.includes(local))
    if(verify){
        window.location.href="category.html"
    }else{
        window.location.href="views/category.html"
    }

}

