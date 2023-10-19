var watchlistArray = JSON.parse(localStorage.getItem('array')) || [];
console.log(watchlistArray);

var watchlistCard = $('.watchlist-container');

displayWatchlist();

const main = $("body");
const removeBtn = $(".removeClass");

main.on("click", ".removeClass", removeFromList);

function displayWatchlist() {
  for (var i = 0; i < watchlistArray.length; i++) {
    var movieData = watchlistArray[i]
    watchlistCard.append($(`
      <div class="card d-flex border" style="width: 20rem;" >
            <img class="card-img-top" src="${"https://image.tmdb.org/t/p/original/" + movieData.poster_path}" alt="No poster found!">
            <div class="card-body">
              <ul>
                <li>Plot: ${movieData.overview}</li>
                <li>Release Date: ${dayjs(movieData.release_date).format("M/D/YY")}</li>
                <li>User Rating: ${movieData.vote_average.toFixed(1)}</li>
                <li>Total User Reviews: ${movieData.vote_count}</li>
              </ul>
              <a id="${movieData.original_title}" href="#" class="btn removeClass btn-danger">Remove from watchlist</a>
            </div>
          </div >
   `
    ))
  }
  console.log(watchlistArray);

}
displayWatchlist()


function removeFromList() {
  var movieName = $(this).attr("id");

  console.log(movieName);

  var movieArray = JSON.parse(localStorage.getItem("array"));

  for (var i = 0; i < movieArray.length; i++) {

    if (movieArray[i].original_title === movieName)
      movieArray.splice(i, 1);
  }

  localStorage.setItem("array", JSON.stringify(movieArray));

  $(this).parent().parent().remove();
}

function removingStorage() {
  localStorage.removeItem("array", removeFromList())
}