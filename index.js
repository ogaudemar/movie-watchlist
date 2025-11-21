
const searchInput = document.getElementById("search-input")
const search = document.getElementById("search")
const searchResults = document.getElementById("search-results")
const savedWatchlist = document.getElementById("saved-watchlist")

const apikey = "eba6418"
let title = ''
let html = ''
let movieArr = []
let htmlArr = []
// define watchlist 
    let watchlist = []
    let storedWatchlist = localStorage.getItem('watchlist')
    if (storedWatchlist) {
        watchlist = JSON.parse(storedWatchlist)
    }
// console.log(watchlist)

function noResults() {
    searchResults.innerHTML = '<div class="no-results" id="no-results">Unable to find what you’re looking for. Please try another search.</div>'}

if (search) {    
search.addEventListener("submit", function(e) {
    
    e.preventDefault()
    title = searchInput.value
    searchMovie(title)
})
}

// send the search input to the API, create an array with movie IDs.
// call next function with that array 
function searchMovie(title) {
movieArr = []
fetch (`https://www.omdbapi.com/?s=${title}&apikey=eba64618&type=movie&page=1`)
    .then (res => res.json())
    .then (data => {
        if (data.Search) {
            data.Search.forEach(function(movie){
                    movieArr.push(movie.imdbID)
            })
            createMovieContent(movieArr)
        } else { noResults()}
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
                const movieObj = {
                    imdbID: data.imdbID,
                    title: data.Title,
                    poster: data.Poster,
                    rating: data.imdbRating,
                    runtime: data.Runtime,
                    genre: data.Genre,
                    plot: data.Plot,
                    imdbVotes: data.imdbVotes,
                    year: data.Year,
                    saved: false
                }
                //check saved watchlists and determine .saved value
                if (watchlist.some(obj => obj.imdbID === movieObj.imdbID)){
                    movieObj.saved = true
                    console.log(`${movieObj.title} already saved!`)}
                //push movie object into result list

                htmlArr.push(movieObj)
                
                // Increment counter and check if all requests are done
                completedRequests++
                if (completedRequests === totalRequests) {
                    //sort movies in decreasing order of popularity
                    htmlArr.sort((a,b) => Number(b.imdbVotes) - Number(a.imdbVotes))
                    // console.log(htmlArr)
                    renderHtmlArr(htmlArr,searchResults)
                    
                }
                })
            })
        }

// function to render html in some element based on movie list array
function renderHtmlArr(arr,someElement){
    html = ''
    if (arr.length>0) {
    arr.forEach(function(movieobj){
        html += `
                    <div class="movie" >
                        <img src=${movieobj.poster} alt=${movieobj.title} poster/>
                        <div class="movie-details">
                            <div class="movie-details1">
                                <span class="movie-title">${movieobj.title}</span><span class="year">(${movieobj.year})</span>
                                <span class="rating"><img src="/img/star_icon.png"/>${movieobj.rating}</span></div>
                            <div class="movie-details2" id=${movieobj.imdbID}>
                                <span class="movie-runtime">${movieobj.runtime}</span>
                                <span class="movie-genre">${movieobj.genre}</span>
                                <span class="watchlist" id="wishlist" data-wishlist=${movieobj.imdbID}>
                                    ${movieobj.saved ? '<img class="watchlist-icon" src="/img/minus_icon.png"/>' : '<img class="watchlist-icon" src="/img/plus_icon.png"/>'} Watchlist
                                </span>
                            </div>
                            <div class="movie-plot">${movieobj.plot}</div>
                        </div>
                    </div>
                `
    })
    someElement.innerHTML = html  
    }  else {
        noResults()   
    }
}

// ADD TO/REMOVE FROM WATCHLIST
document.addEventListener('click', function(e){      
    if(e.target.dataset.wishlist){
        if (search) {handleWishlistClick(e.target.dataset.wishlist,htmlArr)}
        if (savedWatchlist) {handleWishlistClick(e.target.dataset.wishlist,watchlist)}
    }
})

function handleWishlistClick (movieId,arr) {
    // console.log(watchlist)
    //filter the main movie array from the search to only the object with the right ID
    //and save that into a new object
    const newMovieObj = arr.filter(movie => movie.imdbID === movieId)[0]
        //if not saved, push the new object onto the watchlist array 
    if (!newMovieObj.saved) {
        watchlist.unshift(newMovieObj)
        //no need to change button here as we will render page with proper saved logic
        //or if already saved, remove movie from watchlist array
        } else {
        const indexToRemove = watchlist.findIndex (item => item.imdbID === newMovieObj.imdbID)
        if (indexToRemove !== -1) {
            watchlist.splice(indexToRemove, 1) 
            }    
        }
    //modify new object to mark it as saved
    newMovieObj.saved = !newMovieObj.saved
        //debugging
    //  console.log(newMovieObj.saved)
    //store the object in local storage
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
    console.log(watchlist)
//create function to remove from watchlist (both on result page and on watchlist page)
     if (search) {renderHtmlArr(arr,searchResults)   }
     if (savedWatchlist) {renderHtmlArr(arr,savedWatchlist) }
}

//Improve with awesome icons
//<i class="fa-solid fa-circle-minus"></i>


// WATCHLIST PAGE

//render object in watchlist if existing
if(savedWatchlist && watchlist) {
    renderHtmlArr(watchlist,savedWatchlist) 
}

// document.addEventListener('click', function(e){      
//     if(e.target.dataset.wishlist){
//         // handleWishlistClick(e.target.dataset.wishlist)
//         console.log(e.target)
//     }
// })

