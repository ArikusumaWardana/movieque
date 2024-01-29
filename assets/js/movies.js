// Variable yang berisi link API dan API KEY
const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "95ad9b662a7ad6aff36991bdfe9270f5";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
let queryParams = new URLSearchParams(window.location.search);



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
      <a href="detail-movies.html?movie_id=${id}" class="link-movies">
        <div class="card-img new-img">
            <img src="${poster_path ? IMG_URL + poster_path : 'assets/img/icon/no-image.png'}" alt="${title}" title="${title}">
        </div>
        <h3 class="d-block text-truncate" style="max-width: 184px;">${title}</h3>
        <div class="d-flex justify-content-between align-items-center">
          <span>${release_date}</span>
          <span>${vote_average} <i class='bx bxs-star' style='color:#fffa00'  ></i></span>
        </div>
      </a>
    `;

    allMoviesId.appendChild(allMoviesEl);

  });

  if (page == data.total_pages) {
    loadMoreBtn.style.display = "none"
  }

}


// Memanggil Fungsi getAll Movies
getAllMovies(currentPage);  


// Membuat Fungsi Search Movies
async function searchMovies(keyword, page = 1) {
  if (queryParams.has('keyword')) {
    keyword = queryParams.get('keyword')
  }

  console.log(keyword);
  const response = await fetch(API_URL + "/search/movie?api_key=" + API_KEY + "&query=" + keyword + "&page=" + page);
  const data = await response.json();
  const searchedMovies = data.results;

  // Clear any previous search results
  const allMoviesId = document.getElementById('allMovies');
  allMoviesId.innerHTML = '';

  // Display the searched movies
  searchedMovies.forEach(movie => {
    const {id, title, poster_path, release_date, vote_average} = movie;
    const searchMoviesEl = document.createElement('div');
    searchMoviesEl.classList.add('card-main');
    searchMoviesEl.innerHTML = `
      <a href="detail-movies.html?movie_id=${id}" class="link-movies">
        <div class="card-img new-img">
            <img src="${poster_path ? IMG_URL + poster_path : 'assets/img/icon/no-image.png'}" alt="${title}" title="${title}">
        </div>
        <h3 class="d-block text-truncate" style="max-width: 184px;">${title}</h3>
        <div class="d-flex justify-content-between align-items-center">
          <span>${release_date}</span>
          <span>${vote_average} <i class='bx bxs-star' style='color:#fffa00'  ></i></span>
        </div>
      </a>
    `;

    allMoviesId.appendChild(searchMoviesEl);
  });

  if (page == data.total_pages) {
    loadMoreBtn.style.display = "none"
  }

}

  if (queryParams.has('keyword') && queryParams.get('keyword') != '') {
    searchMovies(queryParams.get('keyword'));
  }




// Menambah fitur pagination
loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  if(queryParams.has('keyword') && queryParams.get('keyword') != '') {
    searchMovies(queryParams.get('keyword'), currentPage);
  } else {
    getAllMovies(currentPage);
  }
});