var watchlistArray = JSON.parse(localStorage.getItem('array')) || []
console.log(watchlistArray);

var watchlistCard = $('.watchlist-container')

const main = $("body");
const removeBtn = $(".removeClass");

main.on("click", ".removeClass", removeFromList);


// const movieInfo = `https://api.themoviedb.org/3/search/movie?language=en-US&query=${convertSpaces(movieName)}&api_key=6c6fe5f85d17328e8be5488bcb10da64`

// psuedo code
// checkk watchlist array . movie === movieData //movieID
// for each, if else, ==== !===
// then display movie/watchlist on html

// remove from watchlist



function displayWatchlist() {
  for (var i = 0; i < watchlistArray.length; i++) {
    var movieData = watchlistArray[i]
    watchlistCard.append($(`
      <div class="card d-flex" style = "width: 30rem;" >
            <img class="card-img-top" src="${"https://image.tmdb.org/t/p/original/" + movieData.poster_path}" alt="No poster found!">
            <div class="card-body">
              <ul>
                <li>Plot: ${movieData.overview}</li>
                <li>Release Date: ${dayjs(movieData.release_date).format("M/D/YY")}</li>
                <li>User Rating: ${movieData.vote_average.toFixed(1)}</li>
                <li>Total User Reviews: ${movieData.vote_count}</li>
              </ul>
              <a href="#" class="btn removeClass btn-primary">Remove from watchlist</a>
            </div>
          </div >
   `
    ))
  }
  console.log(watchlistArray);

}
displayWatchlist()

function removeFromList() {
  $(this).parent().parent().remove()
  console.log('REMOVED');
}
