const apiKey = "3dc134555214f93dd090d9a9f52abde3";
const genresButton = document.getElementById("genresBtn");
const trendingButton = document.getElementById("trendingBtn");
const exMachinaButton = document.getElementById("exMachinaBtn");
const genresRef = document.getElementById("lijstGenres");
const trendingRef = document.getElementById("personGrid");
const exMachinaRef = document.getElementById("overzichtFilm");

// Lijst met genres

genresButton.addEventListener("click", function(e){
    e.preventDefault();
    zoekGenres();
});

function zoekGenres() {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        genereerLijst(data.genres);
    })
    .catch(error => console.log(error))
}

function genereerLijst(genres){
    genresRef.innerHTML = genres.map(
        genre => `<li>${genre.name}</li>`
    ).join("");
}



// Trending personen

trendingButton.addEventListener("click", function(e){
    e.preventDefault();
    zoekTrending();
});

function zoekTrending() {
    fetch(`https://api.themoviedb.org/3/trending/person/week?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        genereerTrending(data.results);
    })
    .catch(error => console.log(error))
}

function genereerTrending(persons){
    trendingRef.innerHTML = persons.map(
        person => `
        <div class="person">
            <img src="https://image.tmdb.org/t/p/w500/${person.profile_path}">
            <p>${person.name}</p>
        </div>`
    ).join("");
}



// Alle info over de film "Ex Machina"

exMachinaButton.addEventListener("click", function(e){
    e.preventDefault();
    overzichtExMachina();
});

function overzichtExMachina() {
    fetch(`https://api.themoviedb.org/3/movie/264660?api_key=${apiKey}&language=en-US`)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        exMachinaRef.innerHTML = `
        <div id="exMachinaOverzicht">
            <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}">
            <p>Titel: ${data.original_title}</p>
            <p>Duration: ${data.runtime}m</p>
            <p>Release date: ${data.release_date}</p>
            <p>Overview: ${data.overview}</p>
            <p>Budget: $${data.budget}</p>
            <p>Revenue: $${data.revenue}</p>
        </div>
        `
    })
    .catch(error => console.log(error))
}

// function genereerOverzicht(movie) {
//     exMachinaRef.innerHTML = movie.map(
//         person => `
//         <div class="person">
//             <img src="https://image.tmdb.org/t/p/w500/${person.profile_path}"
//             <p>${person.name}</p>
//         </div>`
//     ).join("");
// }