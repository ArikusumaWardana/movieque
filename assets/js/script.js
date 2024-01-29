// Variable yang berisi link API dan API KEY
const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "95ad9b662a7ad6aff36991bdfe9270f5";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
let queryParams = new URLSearchParams(window.location.search);


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
            <span>${vote_average} <i class='bx bxs-star' style='color:#fffa00'  ></i></span>
            <h1>${title}</h1>
            <a href="detail-movies.html?movie_id=${id}" class="btn-main">See Detail</a>
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
      <a href="detail-movies.html?movie_id=${id}" class="link-movies">
          <div class="card-img">
              <img src="${IMG_URL + poster_path}" alt="${title}" title="${title}">
          </div>
            <h3 class="d-block text-truncate" style="max-width: 184px;">${title}</h3>
          <div class="d-flex justify-content-between align-items-center">
            <span>${release_date}</span>
            <span>${vote_average} <i class='bx bxs-star' style='color:#fffa00'  ></i></span>
          </div>
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
      <a href="detail-movies.html?movie_id=${id}" class="link-movies">
        <div class="card-img new-img">
            <img src="${IMG_URL + poster_path}" alt="${title}" title="${title}">
        </div>
        <h3 class="d-block text-truncate" style="max-width: 184px;">${title}</h3>
        <div class="d-flex justify-content-between align-items-center">
          <span>${release_date}</span>
          <span>${vote_average} <i class='bx bxs-star' style='color:#fffa00'  ></i></span>
        </div>
      </a>
    `;

    upcomingId.appendChild(upcomingEl);

  });
}

// Memanggil fungsi getUpcomingMovies
getUpcomingMovies();

