
const searchInput = document.getElementById("search-input")
const search = document.getElementById("search")
const searchResults = document.getElementById("search-results")
const apikey = "eba6418"
let title = ''
let html = ''
let movieArr = []
let htmlArr = []

search.addEventListener("submit", function(e) {
    e.preventDefault()
    title = searchInput.value
    searchMovie(title)
})

// send the search input to the API, create an array with movie IDs.
// call next function with that array 
function searchMovie(title) {
fetch (`https://www.omdbapi.com/?s=${title}&apikey=eba64618&type=movie&page=1`)
    .then (res => res.json())
    .then (data => {
        data.Search.forEach(function(movie){
                movieArr.push(movie.imdbID)
        })
        createMovieContent(movieArr)
    })
}

// semd the array of movie IDs to create an array with all the content necessary
// call next function with content array
function createMovieContent(arr) {
    htmlArr = []
    let completedRequests = 0
    const totalRequests = arr.length
    
    arr.forEach(function (movieId) {
        fetch (`https://www.omdbapi.com/?i=${movieId}&apikey=eba64618`)
            .then (res => res.json())
            .then (data => {
                // console.log(data)
                const movieObj = {
                    imdbID: data.imdbID,
                    title: data.Title,
                    poster: data.Poster,
                    rating: data.imdbRating,
                    runtime: data.Runtime,
                    genre: data.Genre,
                    plot: data.Plot
                }
                htmlArr.push(movieObj)
                
                // Increment counter and check if all requests are done
                completedRequests++
                if (completedRequests === totalRequests) {
                    console.log(htmlArr)
                    renderHtmlArr(htmlArr)
                }
                })
            })
        }

// use array to generate the html 
function renderHtmlArr(arr){
    html = ''
    arr.forEach(function(movieobj){
        html += `
        <div class="movie" id=${movieobj.imdbID}>
            <img src=${movieobj.poster} alt=${movieobj.title} poster/>
            <div class="movie-details">
                <div class="movie-details1">
                    <span class="movie-title">${movieobj.title}</span>
                    <span class="rating">${movieobj.rating}</span></div>
                <div class="movie-details2">
                    <span class="movie-runtime">${movieobj.runtime}</span>
                    <span class="movie-genre">${movieobj.genre}</span>
                    <span class="add=watchlist">Add to Watchlist</span>
                </div>
                <div class="movie-plot">${movieobj.plot}</div>
            </div>
        </div>
        `
    })
console.log(html)
searchResults.innerHTML = html
}


// const testTwo =
// [
//     {
//         "imdbID": "tt0116282",
//         "title": "Fargo",
//         "poster": "https://m.media-amazon.com/images/M/MV5BNjg4MWE0MjEtODFhNy00MjA5LTg5ODktMzgwNWFmZTAwNjBlXkEyXkFqcGc@._V1_SX300.jpg",
//         "rating": "8.1",
//         "runtime": "98 min",
//         "genre": "Crime, Drama, Thriller",
//         "plot": "Minnesota car salesman Jerry Lundegaard's inept crime falls apart due to his and his henchmen's bungling and the persistent police work of the quite pregnant Marge Gunderson."
//     },
//     {
//         "imdbID": "tt0029752",
//         "title": "Wells Fargo",
//         "poster": "https://m.media-amazon.com/images/M/MV5BZjdhOGFhYmYtMTNlOC00NTVhLWFmNWYtZTEyZDBlNzkwNzhiXkEyXkFqcGc@._V1_SX300.jpg",
//         "rating": "6.3",
//         "runtime": "97 min",
//         "genre": "Drama, History, Western",
//         "plot": "The life and career of a Wells Fargo official frames this fictionalized account of the express company's formation."
//     },
//     {
//         "imdbID": "tt0382026",
//         "title": "Fargo",
//         "poster": "https://m.media-amazon.com/images/M/MV5BMTRmNGFlZGUtODY5ZC00YjJlLTk0ZDMtYjBhZDI1OGQ5YjU1XkEyXkFqcGdeQXVyMjk3NTUyOTc@._V1_SX300.jpg",
//         "rating": "7.2",
//         "runtime": "60 min",
//         "genre": "Crime, Drama",
//         "plot": "Marge Gunderson, the still pregnant police chief of Brainerd, Minnesota, investigates the murder of a town pharmacist, shot in a snowy parking lot by a stranger who was helping jump his car battery. Meantime, an old man dies of ex..."
//     },
//     {
//         "imdbID": "tt0044603",
//         "title": "Fargo",
//         "poster": "https://m.media-amazon.com/images/M/MV5BODAyOGUxOGItOTkyZC00YTIyLWE4ZmUtOTgxZjk3ZDdmMjQxXkEyXkFqcGdeQXVyNTM0MDc1ODE@._V1_SX300.jpg",
//         "rating": "6.6",
//         "runtime": "69 min",
//         "genre": "Western",
//         "plot": "Bill's brother dies due to a stampede started by cattlemen. Barb wire is installed to keep herds away from lands cultivated by farmers. The cattlemen state that the wire is dangerous to their herds but lose the case in court. War ..."
//     },
//     {
//         "imdbID": "tt4095828",
//         "title": "Fargo: This Is a True Story",
//         "poster": "https://m.media-amazon.com/images/M/MV5BNTAxOTljYjMtNzFkYi00YTRmLWE5ZjEtZWZkZTExMzU3MzdjXkEyXkFqcGc@._V1_SX300.jpg",
//         "rating": "8.9",
//         "runtime": "28 min",
//         "genre": "Documentary, Short",
//         "plot": "N/A"
//     },
//     {
//         "imdbID": "tt0224377",
//         "title": "Wells Fargo Days",
//         "poster": "https://m.media-amazon.com/images/M/MV5BNDZkNTY4OGYtZTVkYy00NWNkLTljNjUtY2NlOTBhYzAzNGJlXkEyXkFqcGdeQXVyNTUyNzA5ODE@._V1_SX300.jpg",
//         "rating": "5.6",
//         "runtime": "20 min",
//         "genre": "Short, Western",
//         "plot": "Gunman Bob McAdams arrives in Sunrise, turns in his gun and promises to avoid trouble. He even chooses not to fight a gambler who cheats him. But when robbers shoot his good friend, he straps on his gun again and takes off in purs..."
//     },
//     {
//         "imdbID": "tt0022880",
//         "title": "Fargo Express",
//         "poster": "https://m.media-amazon.com/images/M/MV5BMTU5Nzc3OTE5Nl5BMl5BanBnXkFtZTgwOTEzMjQ4NjE@._V1_SX300.jpg",
//         "rating": "7.1",
//         "runtime": "61 min",
//         "genre": "Western",
//         "plot": "When Mort loses his and Ken's money at poker, Goss gets him to rob the stage. He is captured, identified by his palomino horse. Ken tries to clear him by robbing a stage while riding a palomino, but he also gets caught."
//     },
//     {
//         "imdbID": "tt0033601",
//         "title": "Fighting Bill Fargo",
//         "poster": "https://m.media-amazon.com/images/M/MV5BMTNhOWEyMzUtM2Q3ZS00MjlhLWFmYzEtOWJkOGMwNDJkOTVmXkEyXkFqcGdeQXVyMzc5ODc1MDY@._V1_SX300.jpg",
//         "rating": "6.1",
//         "runtime": "57 min",
//         "genre": "Action, Comedy, Western",
//         "plot": "A man faces frontier corruption when he returns home to help his sister run their late father's newspaper."
//     },
//     {
//         "imdbID": "tt6615342",
//         "title": "Fargo: Year Two - Waffles and Bullet Holes: A Return to Sioux Falls",
//         "poster": "N/A",
//         "rating": "8.4",
//         "runtime": "N/A",
//         "genre": "Documentary",
//         "plot": "N/A"
//     },
//     {
//         "imdbID": "tt0033587",
//         "title": "The Fargo Kid",
//         "poster": "https://m.media-amazon.com/images/M/MV5BZTdjNWI0YmEtNmI2NC00MWE1LWFhOWItYzA1ODJiYjY4M2NmXkEyXkFqcGdeQXVyMDMxMjQwMw@@._V1_SX300.jpg",
//         "rating": "6.0",
//         "runtime": "63 min",
//         "genre": "Drama, Western",
//         "plot": "In this light comedy, the Fargo Kid rides into town on an outlaw's horse and when mistaken for him, is hired to kill a man. There is a reward for the outlaw and the Kid's pal Whoppper not realizing what has happened, alerts the Sh..."
//     }
// ]

//                 renderHtmlArr(testTwo)
