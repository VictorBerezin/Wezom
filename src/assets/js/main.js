//jquery  import
window.$ = window.jQuery = require('jquery');
window.inputmask = require('inputmask/dist/jquery.inputmask.min');

$(document).ready(function () {
 //phone mask
 let phoneMaskCheck = $('input[type="tel"]');
 if (phoneMaskCheck.length) {
  $(phoneMaskCheck).inputmask({
   mask: "+380 (99) 999-99-99",
   clearIncomplete: true
  });
 }
});

//catalog menu
function catalogMenu() {
 const catalogBtn = document.querySelector('#catalogMenuTrigger');
 const catalogMenu = document.querySelector('#catalogMenu');

 let catalogMenuOpen = false;
 catalogBtn.addEventListener('click', () => {
  if (!catalogMenuOpen) {
   catalogBtn.classList.add('open');
   catalogMenu.classList.add('visible');
   catalogMenuOpen = true;
  } else {
   catalogBtn.classList.remove('open');
   catalogMenu.classList.remove('visible');
   catalogMenuOpen = false;
  }
 });

 document.addEventListener('click', function (e) {
  let catalogMenuContains = catalogMenu.contains(e.target);
  let catalogBtnContains = catalogBtn.contains(e.target);

  if (!catalogMenuContains && !catalogBtnContains) {
   catalogBtn.classList.remove('open');
   catalogMenu.classList.remove('visible');
   catalogMenuOpen = false;
  }
 });
}

//small basket menu
function smallBasket() {
 const smallBasketBtn = document.querySelector('#smallBasketTrigger');
 const smallBasket = document.querySelector('#smallBasket');

 let smallBasketOpen = false;
 smallBasketBtn.addEventListener('click', () => {
  if (!smallBasketOpen) {
   smallBasketBtn.classList.add('is-active');
   smallBasket.classList.add('visible');
   smallBasketOpen = true;
  } else {
   smallBasketBtn.classList.remove('is-active');
   smallBasket.classList.remove('visible');
   smallBasketOpen = false;
  }
 });

 document.addEventListener('click', function (e) {
  let smallBasketContains = smallBasket.contains(e.target);
  let smallBasketBtnContains = smallBasketBtn.contains(e.target);
  if (!smallBasketContains && !smallBasketBtnContains) {
   smallBasketBtn.classList.remove('is-active');
   smallBasket.classList.remove('visible');
   smallBasketOpen = false;
  }
 });
}


//catalog menu
function mobileMenu() {
 const mobileMenuBtn = document.querySelector('#mobileMenuTrigger');
 const mobileMenu = document.querySelector('#mobileMenu');
 const backdrop = document.querySelector('.backdrop');
 let bodyPage = document.body;

 let mobileMenuOpen = false;
 mobileMenuBtn.addEventListener('click', () => {
  if (!mobileMenuOpen) {
   mobileMenuBtn.classList.add('open');
   mobileMenu.classList.add('visible');
   backdrop.classList.add('is-active');
   mobileMenuOpen = true;
   bodyPage.style.overflow = 'hidden';
  } else {
   mobileMenuBtn.classList.remove('open');
   mobileMenu.classList.remove('visible');
   backdrop.classList.remove('is-active');
   mobileMenuOpen = false;
   bodyPage.style.overflow = '';
  }
 });

 document.addEventListener('click', function (e) {
  let mobileMenuContains = mobileMenu.contains(e.target);
  let mobileMenuBtnContains = mobileMenuBtn.contains(e.target);

  if (!mobileMenuContains && !mobileMenuBtnContains) {
   mobileMenuBtn.classList.remove('open');
   mobileMenu.classList.remove('visible');
   backdrop.classList.remove('is-active');
   mobileMenuOpen = false;
   bodyPage.style.overflow = '';
  }
 });
}

//load reviews
function loadReviews() {

 const showBtnReviews = document.querySelector('#loadCommentsBtn');
 let hideBtnReviews = document.querySelector('#hideCommentsBtn');
 let reviews = document.querySelector('#loadCommentsWrapper');
 showBtnReviews.addEventListener('click', function (e) {
  $.get('comments.json', {url: ''}, function (data) {
   $comments = JSON.parse(JSON.stringify(data));
   let commentsParse = $comments['comments'];
   let commentsParseLength = $comments['comments'].length;
   for (let i = 0; i < commentsParseLength; i++) {
    reviews.innerHTML += `
               <div class="product__review">
                <div class="product__review-head">
                 <div class="product__review-name">
                   ${commentsParse[i]['name']}
                 </div>

                 <div class="product__review-date">
                    ${commentsParse[i]['date']}
                 </div>

                 <div class="product__review-rating rating">
                 <div class="rating__stars" style="--rating:  ${commentsParse[i]['stars']};"></div>
                 </div>
                </div>

                <div class="product__review-body">
                   ${commentsParse[i]['message']}
                </div>
               </div>
    `;
   }
   showBtnReviews.style.display = "none";
   hideBtnReviews.style.display = "inline-flex";
  });
 });

 hideBtnReviews.addEventListener('click', function (e) {
  reviews.innerHTML = '';
  showBtnReviews.style.display = "inline-flex";
  hideBtnReviews.style.display = "none";
  $("html, body").animate({
   scrollTop: $(".product__item_reviews").offset().top - 80
  }, 800);
 });
}

//loading functions
document.addEventListener('DOMContentLoaded', () => {
 catalogMenu();
 smallBasket();
 mobileMenu();
 loadReviews();
});

