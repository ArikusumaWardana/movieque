// Variable yang berisi link API dan API KEY
const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "95ad9b662a7ad6aff36991bdfe9270f5";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
let queryParams = new URLSearchParams(window.location.search);

// Array Reviews
const reviews = [];

// Mengambil Data Detail Movies berdasarkan Id
async function getDetailMovies(id) {
    const response = await fetch(API_URL + "/movie/" + id + "?api_key=" + API_KEY);
    const data = await response.json();

    const detailId = document.getElementById('detailMovies');

    const detailMoviesEl = document.createElement('div');
    detailMoviesEl.classList.add('body-detail');
    detailMoviesEl.innerHTML = `
        <div class="backdrop-detail">
            <img src="${BACKDROP_URL + data.backdrop_path}" alt="" title="${data.title}">
        </div>
        <div class="container-detail">
            <div class="detail-body">
                <div class="top-detail d-flex">
                    <div class="left-detail mx-3">
                        <img src="${IMG_URL + data.poster_path}" alt="${data.title}" title="${data.title}">
                        <div class="btn-watchlist mt-3">
                            <button class="btn btn-dark d-flex align-items-center justify-content-center" onclick="addToWatchlist(${queryParams.get('movie_id')})">
                                <i class='bx bxs-bookmark mx-1' style='color:#ff2c1f'  ></i> 
                                <span class=" mx-1">Add to Watchlist</span>
                            </button>
                        </div>
                    </div>
                    <div class="right-detail mt-5 mx-3 d-block">
                        <div class="title-detail">
                            <h1 class="fw-bold">${data.title}</h1>
                        </div>
                        <div class="genre-body d-flex">
                        ${data.genres.map(genre => `
                            <div class="genre bg-dark d-inline-block py-2 px-3 rounded-1 me-1">
                                <span>${genre.name}</span>
                            </div>
                        `).join('')}
                        </div>
                        <div class="rating-duration-date mt-5 d-flex align-items-center bg-dark px-3 py-2 rounded-1">
                            <div class="rating mx-3">
                                <span><span style="color:#fff103">${data.vote_average}</span> <i class='bx bxs-star' style='color:#fff103'></i> From ${data.vote_count} Users</span>
                            </div>
                            <div class="duration mx-3">
                                <span>${data.runtime} Minutes</span>
                            </div>
                            <div class="date mx-3">
                                <span>Release on : ${data.release_date}</span>
                            </div>
                        </div>
                        <div class="detail-desc mt-3">
                            <p>
                                ${data.overview}
                            </p>
                        </div>
                        <div class="production-companies">
                            ${data.production_companies.map(production => `
                                <div class="production-img bg-light">
                                    <img  src="${production.logo_path ? IMG_URL + production.logo_path : 'assets/img/icon/no-image.png'}" alt="${production.name}" title="${production.name}">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    detailId.appendChild(detailMoviesEl);

}

// Fungsi untuk menambahkan movie ke watchlist
function addToWatchlist(movieId) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    // Melakukan pengecekan apakah movie tersebut sudah ada di watchlist atau belum & melakukan store ke localstorage
    if( !watchlist.some(movie => movie.id === movieId) ) {

        fetch(`${API_URL}/movie/${movieId}?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(movie => {
                watchlist.push({
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    vote_average: movie.vote_average
                });

                localStorage.setItem('watchlist', JSON.stringify(watchlist));

                alert(`"${movie.title}" has been added to watchlist`);
            })

            .catch(error => {
                console.error('Error fetching', error);
            });
    } else {
        alert('This movie is already in your watchlist');
    }
}

// Fungsi untuk menampilkan reviews
function displayReviews() {
    const reviewsList = document.getElementById('reviewResult');
    // Reset Current Data
    reviewsList.innerHTML = "";
    
    const reviewsEl = document.createElement('div');
    reviewsEl.classList.add('review-result-body');

    for(let i = 0; i < reviews.length; i++) {
        reviewsEl.innerHTML += `
        <div class="reviews-body">
            <div class="left-section d-flex">
                <div class="icon-review">
                    <img src="assets/img/icon/user-circle.png" class="">
                </div>
                <div class="reviews">
                    <span class="mx-3">User</span>
                    <p class="mx-3">${reviews[i]}</p>
                </div>
            </div>
            <div class="right-section">
                <button class="mx-1" type="button" onclick="updateReviews(${i})"><i class='bx bxs-pencil'></i></button>
                <button class="mx-1" type="button" onclick="deleteReviews(${i})"><i class='bx bxs-trash-alt'></i></button>
            </div>
        </div>
        `
    }

    reviewsList.appendChild(reviewsEl);
}

// Fungsi untuk membuat reviews
function createReviews() {
    const reviewsInput = document.getElementById('inputReviews');

    // melakukan pengecekan apakah value dari input kosong atau tidak
    if (reviewsInput.value !== "") {

        reviews.push(reviewsInput.value);

        reviewsInput.value = "";
    
        displayReviews();

    }

}

// Fungsi untuk membersihkan input reviews
function clearInput() {
    const reviewsInput = document.getElementById('inputReviews');
    
    reviewsInput.value = "";

}

// Fungsi untuk mengupdate Reviews
function updateReviews(index) {

    let valid = false;
    while(!valid) {
        let newReviews = prompt("Update The Reviews:", reviews[index]);

        if(newReviews == "") {
            alert("Please fill the form!");
            newReviews = reviews[index];
        } else if(newReviews !== null) {
            valid = true
            reviews[index] = newReviews
        } else {
            break;
        }
    }
    displayReviews();

}

// Fungsi untuk menghapus reviews
function deleteReviews(index) {
    const confirmDelete = confirm("Are you sure want to delete this reviews?");

    if(confirmDelete) {
        reviews.splice(index, 1);
        displayReviews();
    }
}

// Memanggil fungsi displayReviews()
displayReviews();