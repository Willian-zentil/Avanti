import _ from 'lodash';
import './style.scss' ; 
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

// config Swiper
Swiper.use([Navigation, Pagination]);

let swiper = new Swiper('.vitrine', {
  slidesPerView: "auto",
  spaceBetween: 50,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    600: {
      centeredSlides: false,
      slidesPerView: 4,
    },
  },
});

let swiperProd = new Swiper('.promo', {
  slidesPerView: "auto",
  spaceBetween: 30,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
      centeredSlides: false,
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 30,
      centeredSlides: false,
    },
  },
})

//menu 
document.querySelector(".menu-hamburguer").addEventListener("click", ()=> {
  document.querySelector(".bg-gray").classList.add('ativo');
  document.querySelector(".menu-mob").classList.add('ativo');
  document.querySelector(".home").classList.add('ativo');
});

document.querySelector(".close-menu").addEventListener("click", ()=> {
  document.querySelector(".bg-gray").classList.remove('ativo');
  document.querySelector(".menu-mob").classList.remove('ativo');
  document.querySelector(".home").classList.remove('ativo');
});

window.onload = function (){
  //api 
  let cardProdPromocao = '';
  let cardProdMaisVendidos = '';
  fetch('../api/product.json')
    .then(resp => resp.json())
    .then(resp => resp[0].items)
    .then((resp) => {

      //promoção do dia vitrine
      for (let i = 0; i < 2; i++) {

        cardProdPromocao += `<div class="card-produto swiper-slide" data-id="${resp[i].id}"><a href=""><img src="./prod-img.webp"></a><h4>${resp[i].name}</h4><div class="price"><span>${resp[i].bestPrice}</span><span>${resp[i].sellingPrice}</span></div><div class="input-qtd"><div><button class="btn-plus"><img src="./icon-plus.png" alt=""></button><input type="number" value="1"><button class="btn-minus"><img src="./icon-minus.webp" alt=""></button></div></div><button class="buy ${resp[i].available <= 0 ? "off" : "active" }">adicionar</button></div>`;
  
      }
      document.querySelector(".promo-produtos .swiper-wrapper").innerHTML = cardProdPromocao;

      //os mais vendidos
      for (let i = 0; i < 6; i++) {

        cardProdMaisVendidos += `<div class="card-produto swiper-slide" data-id="${resp[i].id}"><a href=""><img src="./prod-img.webp"></a><h4>${resp[i].name}</h4><div class="price"><span>${resp[i].bestPrice}</span><span>${resp[i].sellingPrice}</span></div><div class="input-qtd"><div><button class="btn-plus"><img src="./icon-plus.png" alt=""></button><input type="number" value="1"><button class="btn-minus"><img src="./icon-minus.webp" alt=""></button></div></div><button class="buy ${resp[i].available <= 0 ? "off" : "active" }">${resp[i].available <= 0 ? "Indisponivel" : "Adicionar" }</button></div>`;
  
      }
      document.querySelector(".mais-vendidos .swiper-wrapper").innerHTML = cardProdMaisVendidos;
    })
  
  setTimeout(() => {
    //botão comprar
    let btnCompra = document.querySelectorAll(".buy.active")
    let id;
    let qtd;
    let input;
    let element;
    let tot = 0;
    
    for (let index = 0; index < btnCompra.length; index++) {
      btnCompra[index].addEventListener("click", (e)=>{

        id = parseInt(e.target.parentElement.attributes[1].value);
        input = parseInt(e.target.offsetParent.childNodes[3].children[0].children[1].value);

        qtd = parseInt(localStorage.getItem(id));

        if(localStorage.getItem(id) > 0){
          if(input <= qtd){
            qtd -= input;
            tot = parseInt(localStorage.getItem("total"));
            tot += input;

            localStorage.setItem("total", tot);
          }else {
            alert('quantidade não disponivel')
          }
          localStorage.setItem(id, qtd);
          if(localStorage.getItem(id) == 0){
            e.target.classList.add('off');
            e.target.disabled = true;
            e.target.innerHTML = "Indisponivel"

            element = document.querySelectorAll('[data-id="'+ e.target.parentElement.attributes[1].value +'"]');
            for (let n = 0; n < element.length; n++) {
              element[n].childNodes[4].classList.add('off');
              element[n].childNodes[4].disabled = true;
            }
          }
          document.querySelector(".flag").innerHTML = tot;
        }

        if(document.querySelector(".flag").innerHTML){
          document.querySelector(".flag").classList.remove('off');
        }else{
          document.querySelector(".flag").classList.add('off');
        }

      })
    }
    
  }, 1000);

  //load products
  fetch('../api/product.json')
  .then(resp => resp.json())
  .then(resp => resp[0].items)
  .then((resp) => {
    for (let i = 0; i < resp.length; i++) {
      //localStorage.setItem('meuGato', 'Tom');
      //id = qtd
      localStorage.setItem(resp[i].id, resp[i].available);
    } 
  })
  .catch(function(error) {
    console.log(error);
  });
  localStorage.setItem("total", 0);
}