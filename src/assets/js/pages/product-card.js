import Swiper from "swiper";

const sliderThumbs = new Swiper('.slider__thumbs .swiper-container', {
 slidesPerView: 4,
 spaceBetween: 10,
 direction: 'vertical',
 navigation: {
  nextEl: '.slider__next',
  prevEl: '.slider__prev'
 },
 freeMode: true,
 breakpoints: {
  0: {
   direction: 'horizontal',
   slidesPerView: 4,
  },
  375: {
   direction: 'horizontal',
   slidesPerView: 5,
  },
  768: {
   slidesPerView: 5,
   direction: 'horizontal',
  },
  992: {
   slidesPerView: 5,
   direction: 'horizontal',
  },
  1200: {
   direction: 'vertical',
   slidesPerView: 3,
  },
  1500: {
   slidesPerView: 4,
  }
 }
});
const sliderImages = new Swiper('.slider__images .swiper-container', {

 direction: 'vertical',
 slidesPerView: 1,
 navigation: {
  nextEl: '.slider__next',
  prevEl: '.slider__prev'
 },
 effect: 'fade',
 fadeEffect: {
  crossFade: true
 },
 grabCursor: true,
 thumbs: {
  swiper: sliderThumbs
 },
 breakpoints: {
  0: {
   direction: 'horizontal',
  },
  1200: {
   direction: 'vertical',
  }
 }
});

const productAccordions = document.querySelectorAll(".product__accordion-item");

const productAccordionOpen = (productAccordion) => {
 const productAccordionContent = productAccordion.querySelector(".product__accordion-body");
 productAccordion.classList.add("is-opened");
 productAccordionContent.style.maxHeight = productAccordionContent.scrollHeight + "px";
};

const closeAccordion = (productAccordion) => {
 const productAccordionContent = productAccordion.querySelector(".product__accordion-body");
 productAccordion.classList.remove("is-opened");
 productAccordionContent.style.maxHeight = null;
};

productAccordions.forEach((productAccordion) => {
 const productAccordionTrigger = productAccordion.querySelector(".product__accordion-name");
 const productAccordionContent = productAccordion.querySelector(".product__accordion-body");

 productAccordionTrigger.onclick = () => {
  if (productAccordionContent.style.maxHeight) {
   closeAccordion(productAccordion);
  } else {
   // productAccordions.forEach((productAccordion) => closeAccordion(productAccordion));
   productAccordionOpen(productAccordion);
  }
 };
});
