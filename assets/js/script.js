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

// Variable yang berisi link API dan API KEY
const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "95ad9b662a7ad6aff36991bdfe9270f5";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
const IMG_URL = "https://image.tmdb.org/t/p/w500";


// Fungsi untuk menampilkan Top Rated Movies 
async function getTopRatedMovies() {
  const response = await fetch(API_URL + "/movie/top_rated?api_key=" + API_KEY);
  const data = await response.json();
  const topRatedMovies = data.results.slice(0, 3) // mengambil 3 movie top rated
  
  console.log(topRatedMovies);
  
  const topRatedId = document.getElementById('topRated');
  topRatedId.innerHTML = '';

  topRatedMovies.forEach(movie => {
    const {id, title, backdrop_path, vote_average} = movie;
    const topRatedEl = document.createElement('div');
    topRatedEl.classList.add('swiper-slide', 'swiper-img');
    topRatedEl.innerHTML = `
        <img src="${BACKDROP_URL + backdrop_path}" alt="${title}">
        <div class="swiper-text">
            <span>${vote_average}</span>
            <h1>${title}</h1>
            <a href="#" class="btn-main">See Detail</a>
        </div>
    `;

    topRatedId.appendChild(topRatedEl);

  });

}

// Memanggil Fungsi getTopRatedMovies
getTopRatedMovies();


// Fungsi untuk menampilkan Popular Movies
async function getPopularMovies() {
  const response = await fetch(API_URL + "/movie/popular?api_key=" + API_KEY);
  const data = await response.json();
  const popularMovies = data.results.slice(0, 10) // mengambil 10 movie popular
  
  const popularId = document.getElementById('popular');
  popularId.innerHTML = '';

  popularMovies.forEach(movie => {
    const {id, title, poster_path, release_date, vote_average} = movie;
    const popularEl = document.createElement('div');
    popularEl.classList.add('card-main', 'swiper-slide');
    popularEl.innerHTML = `
      <a href="" class="link-movies">
          <div class="card-img">
              <img src="${IMG_URL + poster_path}" alt="${title}">
          </div>
          <h3>${title}</h3>
          <span>${release_date}</span>
      </a>
    `;

    popularId.appendChild(popularEl);
    
  });
}

// Memanggil Fungsi getPopularMovies
getPopularMovies();


// Fungsi untuk menampilkan Upcoming Movies
async function getUpcomingMovies() {
  const response = await fetch(API_URL + "/movie/upcoming?api_key=" + API_KEY);
  const data = await response.json();
  const upcomingMovies = data.results.slice(0, 10) // mengambil 10 upcoming movies 

  const upcomingId = document.getElementById('upcomingMovies');
  upcomingId.innerHTML = '';

  upcomingMovies.forEach(movie => {
    const {id, title, poster_path, release_date, vote_average} = movie;
    const upcomingEl = document.createElement('div');
    upcomingEl.classList.add('card-main');
    upcomingEl.innerHTML = `
      <a href="" class="link-movies">
        <div class="card-img new-img">
            <img src="${IMG_URL + poster_path}" alt="${title}">
        </div>
        <h3>${title}</h3>
        <span>${release_date}</span>
      </a>
    `;

    upcomingId.appendChild(upcomingEl);

  });
}

// Memanggil fungsi getUpcomingMovies
getUpcomingMovies();


const AllMoviesContainer = document.getElementById('all-movies-container'); 
const loadMoreBtn = document.getElementById('load-more-btn');
let currentPage = 1;

// Fungsi untuk menampilkan seluruh movie
async function getAllMovies(page) {
  
  const response = await fetch(API_URL + "/movie/popular?api_key=" + API_KEY + "&page=" + page);
  const data = await response.json();
  const allMovies = data.results;

  const allMoviesId = document.getElementById('allMovies');
  allMoviesId.innerHTML = '';
  
  allMovies.forEach(movie => {
    const {id, title, poster_path, release_date, vote_average} = movie;
    const allMoviesEl = document.createElement('div');
    allMoviesEl.classList.add('card-main');
    allMoviesEl.innerHTML = `
      <a href="" class="link-movies">
        <div class="card-img new-img">
            <img src="${IMG_URL + poster_path}" alt="${title}">
        </div>
        <h3>${title}</h3>
        <span>${release_date}</span>
      </a>
    `;

    allMoviesId.appendChild(allMoviesEl);

  })

  loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    getAllMovies(currentPage);
    console.log(currentPage);
  });
}

// Memanggil Fungsi getAll Movies
getAllMovies(currentPage);