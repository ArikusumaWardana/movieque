// Variable yang berisi link API dan API KEY
const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "95ad9b662a7ad6aff36991bdfe9270f5";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
let queryParams = new URLSearchParams(window.location.search);


// Menampilkan film dalam watchlist
document.addEventListener('DOMContentLoaded', function () {
    // Memanggil fungsi displayWatchlist()
    displayWatchlist();
})


// Membuat fungsi displayWatchlist()
function displayWatchlist() {

    const watchlistContainer = document.querySelector('#watchlist .watchlist-container');

    // Mendapatkan data watchlist dari localstorage
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (watchlist.length > 0) {

        watchlistContainer.innerHTML = "";

        watchlist.forEach(movie => {
            const watchlistEl = document.createElement('div');
            watchlistEl.classList.add('card-main');
            watchlistEl.innerHTML = `
                <a href="detail-movies.html?movie_id=${movie.id}" class="link-movies">
                    <div class="card-img new-img">
                        <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}" title="${movie.title}">
                    </div>
                    <h3 class="d-block text-truncate" style="max-width: 184px;">${movie.title}</h3>
                </a>
                <div class="btn-remove" onclick="removeMovieFromWatchlist(${movie.id})">
                    <span>${movie.vote_average} <i class='bx bxs-star' style='color:#fffa00'  ></i></span>
                    <button><i class='bx bxs-trash-alt'></i></button>
                </div>
            `;

            watchlistContainer.appendChild(watchlistEl);

        });
    } else {
        watchlistContainer.innerHTML = `
            <div class="empty-watchlist">
                <h1>Your Watchlist is empty</h1>
            </div>
        `;
    }
}

// Membuat fungsi removeMovieFromWatchlist()
function removeMovieFromWatchlist(movieId) {

    // Mendapatkan data watchlist dari localstorage
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    const index = watchlist.findIndex(movie => movie.id == movieId);

    const confirmRemove = confirm("Are you sure want to remove this movie from your watchlist?");

    if(confirmRemove) {
        if (index !== -1) {
            // menghapus movie dari array watchlist
            watchlist.splice(index, 1);
    
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
    
            // refresh watchlist
            displayWatchlist();
        }
    }
}