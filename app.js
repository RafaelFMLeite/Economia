window.addEventListener("scroll", function(){
    let header = document.querySelector('.header')
    header.classList.toggle('roll', window.scrollY > 0) 
//adicionando uma classe chamada 'roll' dinamicamente para o header pelo javascript quando a rolagem for maior que 0   
})