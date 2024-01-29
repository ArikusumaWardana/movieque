// Scroll Y Navbar  
let header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('bg-nav', window.scrollY > 0 );
});


// Swiper Carousel
var swiper = new Swiper(".jumbotron", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


// Swiper Popular
var swiper = new Swiper(".popular-container", {
  spaceBetween: 20,
  loop:true,
  autoplay: {
    delay:3000,
    disableOnInteraction:false,
  },
  centeredSlides:true,
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    568: {
      slidesPerView: 3,
    },
    768:  {
      slidesPerView: 4,
    },
    968: {
      slidesPerView:5
    },
  },
});


function popup() {
  const dropdown = document.querySelector('#dropdown-main')
  this.addEventListener('click', function() {
    dropdown.classList.toggle('dropdown-none')
  })
}
