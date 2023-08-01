window.addEventListener("scroll", function(){
    let header = document.querySelector('.header')
    header.classList.toggle('roll', window.scrollY > 0) 
//adicionando uma classe chamada 'roll' dinamicamente para o header pelo javascript quando a rolagem for maior que 0   
// Obtenha a referência para a logo
const logo = document.querySelector('.logo');

// Obtenha a posição da segunda seção (ou qualquer seção que você deseja que a mudança ocorra)
const segundaSecao = document.querySelector('#manual').offsetTop;

// Defina uma função para verificar a posição da página
function changeLogoOnScroll() {
  // Obtenha a posição vertical atual da página
  const posicaoAtual = window.pageYOffset || document.documentElement.scrollTop;

  // Verifique se a posição da página ultrapassou a posição da segunda seção
  if (posicaoAtual >= segundaSecao) {
    // Se estiver abaixo ou na posição da segunda seção, mostre a segunda logo
    logo.classList.remove('logo1');
    logo.classList.add('logo2');
  } else {
    // Caso contrário, mostre a primeira logo
    logo.classList.remove('logo2');
    logo.classList.add('logo1');
  }
}

// Adicione um evento de rolagem à janela para chamar a função
window.addEventListener('scroll', changeLogoOnScroll);




})
