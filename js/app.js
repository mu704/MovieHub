const movies = [
{
    id: 1,
    title: "Peaky Blinders",
    genre: "Action",
    poster: "assets/peakyblinders.jpg",
    cast: "Cillian Murphy, Paul Anderson",
    plot: "The Shelby family builds a criminal empire in Birmingham.",
    rating: "8.8/10"
},
{
    id: 2,
    title: "La Casa de Papel",
    genre: "Crime",
    poster: "assets/LaCasadePapel.jpg",
    cast: "Úrsula Corberó, Álvaro Morte",
    plot: "A mysterious man called The Professor plans the biggest heist in Spain.",
    rating: "8.2/10"
},
{
    id: 3,
    title: "Breaking Bad",
    genre: "Crime",
    poster: "assets/breakingbad.jpg",
    cast: "Bryan Cranston, Aaron Paul",
    plot: "A chemistry teacher starts producing methamphetamine after being diagnosed with cancer.",
    rating: "9.5/10"
},
{
    id: 4,
    title: "Friends",
    genre: "Comedy",
    poster: "assets/friends.jpg",
    cast: "Jennifer Aniston, Courteney Cox, Matt LeBlanc",
    plot: "Six friends share their everyday lives in New York City.",
    rating: "8.9/10"
},
{
    id: 5,
    title: "The Godfather",
    genre: "Crime",
    poster: "assets/TheGodfather.jpg",
    cast: "Marlon Brando, Al Pacino",
    plot: "The story of the powerful Corleone mafia family.",
    rating: "9.2/10"
},
{
    id: 6,
    title: "The Vampire Diaries",
    genre: "Fantasy",
    poster: "assets/thevampirediaries.jpg",
    cast: "Nina Dobrev, Ian Somerhalder, Paul Wesley",
    plot: "A teenage girl falls in love with a vampire while supernatural events unfold.",
    rating: "7.7/10"
},
{
    id: 7,
    title: "Game of Thrones",
    genre: "Fantasy",
    poster: "assets/got.jpg",
    cast: "Emilia Clarke, Kit Harington",
    plot: "Noble families fight for control of the Iron Throne in Westeros.",
    rating: "9.2/10"
},
{
    id: 8,
    title: "Teen Wolf",
    genre: "Fantasy",
    poster: "assets/teenwolf.jpg",
    cast: "Tyler Posey, Dylan O'Brien",
    plot: "A teenager becomes a werewolf and protects his town from supernatural threats.",
    rating: "7.7/10"
},
{
    id: 9,
    title: "The Walking Dead",
    genre: "Horror",
    poster: "assets/walkingdead.jpg",
    cast: "Andrew Lincoln, Norman Reedus",
    plot: "A group of survivors struggles to stay alive during a zombie apocalypse.",
    rating: "8.1/10"
},
];
if (!localStorage.getItem("movies")) {
    localStorage.setItem("movies", JSON.stringify(movies));
}
const storedMovies = JSON.parse(localStorage.getItem("movies"));
const selectedMovieId = localStorage.getItem("selectedMovie");
const selectedMovie = storedMovies.find(movie => movie.id == selectedMovieId);
let storedReviews = [];
async function renderReviews() {
    if (!reviewsContainer) {
        return;
    }

    const response = await fetch("http://localhost:3000/reviews");
    storedReviews = await response.json();

    reviewsContainer.innerHTML = "";

    const movieReviews = storedReviews.filter(review =>
        review.movieId == selectedMovieId
    );

    movieReviews.forEach(review => {
        reviewsContainer.innerHTML += `
            <p><strong>${review.rating}/10</strong> - ${review.comment}</p>
        `;
    });
    if (movieReviews.length > 0) {
    const total = movieReviews.reduce((sum, review) => sum + Number(review.rating), 0);

    const average = total / movieReviews.length;

    averageRating.textContent = "Average rating: " + average.toFixed(1) + "/10";
} else {
    averageRating.textContent = "Average rating: No reviews";
}
}


if (document.getElementById("movie-poster")) {
    document.getElementById("movie-poster").src = selectedMovie.poster;
    document.getElementById("movie-title").textContent = "Title: " + selectedMovie.title;
    document.getElementById("movie-genre").textContent = "Genre: " + selectedMovie.genre;
    document.getElementById("movie-cast").textContent = "Cast: " + selectedMovie.cast;
    document.getElementById("movie-plot").textContent = "Plot: " + selectedMovie.plot;
    document.getElementById("movie-rating").textContent = "Rating: " + selectedMovie.rating;
}
console.log(storedMovies);
const moviesContainer = document.getElementById("movies-container");
const searchInput = document.getElementById("search-input");
const genreFilter = document.getElementById("genre-filter");
const actorSearch = document.getElementById("actor-search");
const reviewsContainer = document.getElementById("reviews-container");
const reviewForm = document.getElementById("review-form");
const reviewRating = document.getElementById("review-rating");
const reviewComment = document.getElementById("review-comment");
const averageRating = document.getElementById("average-rating");
if (reviewsContainer) {
    renderReviews();
}

if (reviewForm) {
    reviewForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const review = {
             movieId: selectedMovieId,
             username: currentUser.username,
             rating: reviewRating.value,
             comment: reviewComment.value
        };

        await fetch("http://localhost:3000/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        });

        renderReviews();

        reviewForm.reset();
    });
}


function renderMovies(movies) {
    moviesContainer.innerHTML = "";
    if (movies.length === 0) {
    moviesContainer.innerHTML = "<h2>No results found</h2>";
    return;
}

    movies.forEach(movie => {
        moviesContainer.innerHTML += `
            <div class="movie-card">
                <a href="moviedetails.html"
                   onclick="localStorage.setItem('selectedMovie', ${movie.id})">
                    <img src="${movie.poster}" alt="${movie.title}">
                    <h2>${movie.title}</h2>
                    <p>${movie.genre}</p>
                </a>
            </div>
        `;
    });
}

if (moviesContainer) {
    renderMovies(storedMovies);
}
function filterMovies() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;
    const actorTerm = actorSearch.value.toLowerCase();

    const filteredMovies = storedMovies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm);
        const matchesGenre = selectedGenre === "" || movie.genre === selectedGenre;
        const matchesActor = actorTerm === "" || movie.cast.toLowerCase().includes(actorTerm);

        return matchesSearch && matchesGenre && matchesActor;
    });

    renderMovies(filteredMovies);
}

if (searchInput) {
    searchInput.addEventListener("input", filterMovies);
}

if (genreFilter) {
    genreFilter.addEventListener("change", filterMovies);
}
if (actorSearch) {
    actorSearch.addEventListener("input", filterMovies);
}


const registerForm = document.getElementById("register-form");

if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("register-username").value;
        const password = document.getElementById("register-password").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({
            username: username,
            password: password
});

localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful!");

        registerForm.reset();
    });
}