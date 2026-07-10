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
if (searchInput) {
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();

        const filteredMovies = storedMovies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm)
        );

        renderMovies(filteredMovies);
    });
}