const movies = [
{
    id: 1,
    title: "Peaky Blinders",
    genre: "Action",
    poster: "assets/peakyblinders.jpg"
},
{
    id: 2,
    title: "La Casa de Papel",
    genre: "Crime",
    poster: "assets/LaCasadePapel.jpg"
},
{
    id: 3,
    title: "The Godfather",
    genre: "Crime",
    poster: "assets/TheGodfather.jpg"
},
{
    id: 4,
    title: "Breaking Bad",
    genre: "Crime",
    poster: "assets/breakingbad.jpg"
},
{
    id: 5,
    title: "The Vampire Diaries",
    genre: "Drama",
    poster: "assets/thevampirediaries.jpg"
},
{
    id: 6,
    title: "Friends",
    genre: "Comedy",
    poster: "assets/friends.jpg",
},
{
    id: 7,
    title: "Game of Thrones",
    genre: "Fantasy",
    poster: "assets/got.jpg",
},
{
    id: 8,
    title: "Teen Wolf",
    genre: "Fantasy",
    poster: "assets/teenwolf.jpg",
},
{
    id: 9,
    title: "The Walking Dead",
    genre: "Horror",
    poster: "assets/walkingdead.jpg",
}
];
localStorage.setItem("movies", JSON.stringify(movies));
const storedMovies = JSON.parse(localStorage.getItem("movies"));

console.log(storedMovies);
const moviesContainer = document.getElementById("movies-container");

storedMovies.forEach(movie => {
    moviesContainer.innerHTML += `
        <div class="movie-card">
            <img src="${movie.poster}" alt="${movie.title}">
            <h2>${movie.title}</h2>
            <p>${movie.genre}</p>
        </div>
    `;
});