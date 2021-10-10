import _ from 'lodash';
import './style.scss' ; 
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

// configure Swiper
Swiper.use([Navigation, Pagination]);

let swiper = new Swiper('.vitrine', {
  slidesPerView: "auto",
  spaceBetween: 30,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    600: {
      centeredSlides: false,
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

function setTopo(){
  $(window).scrollTop(0);
}
$(window).bind('scroll', setTopo);