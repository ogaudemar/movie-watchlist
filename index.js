
const searchInput = document.getElementById("search-input")
const search = document.getElementById("search")
const searchResults = document.getElementById("search-results")
const apikey = "eba6418"
let title = ''
let html = ''

search.addEventListener("submit", function(e) {
    e.preventDefault()
    title = searchInput.value
    searchMovie(title)
})

function searchMovie(title) {
fetch (`https://www.omdbapi.com/?s=${title}&apikey=eba64618`)
    .then (res => res.json())
    .then (data => {
        console.log(data.Search)
        data.Search.forEach(function(movie){
            html += `
            <div class="movie" id="">
                <img src=${movie.Poster} alt=""/>
                <div class="movie-details">
                    <div class="movie-details1">
                        <span class="movie-title">${movie.Title}</span>
                        <span class="rating"></span></div>
                    <div class="movie-details2">
                        <span class="movie-duration"></span>
                        <span class="movie-genre"></span>
                        <span class="add=watchlist">Watchlist</span>
                    </div>
                    <div class="movie-summary"></div>
                </div>
            </div>
            `
            console.log(movie.Title)
        })
        searchResults.innerHTML = html
    })
}

// searchMovie("guardians of the galaxy")

// fetch ("https://www.omdbapi.com/?t=gattaca&apikey=eba64618") 
//     .then (res => res.json())
//     .then (data => console.log(data))

