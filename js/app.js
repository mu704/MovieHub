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