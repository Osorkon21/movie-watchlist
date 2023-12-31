const body = $("body");
const movieNameInput = $("#movie-name-input");
const carouselContainer = $(".carousel-container");
const cardContainer = $(".card-container");
const submitBtn = $(".submit-btn");
const searchMovieName = $(".search-movie-name");
const watchlistAlert = $(".watchlist-alert");

// movies added to watchlist are stored here
var movieArray = JSON.parse(localStorage.getItem('array')) || [];

var currentMovieData;

// images are keyed by id to this array - whatever image is clicked on, tell where it is in this list by matching ids to array index numbers
var trendingList;

var secondsToDisplay = 2;

body.on("click", ".clickable-img", onWatchlistBtnClick);
body.on("click", ".watchlist-btn", onWatchlistBtnClick);

function popupNotification(movieName) {
  watchlistAlert.attr("class", "text-center h5 watchlist-alert");
  watchlistAlert.text(`${movieName} added to your watchlist!`);

  var timer = setInterval(function () {
    secondsToDisplay--;

    if (secondsToDisplay === 0) {
      clearInterval(timer);
      watchlistAlert.attr("class", "d-none text-center h5 watchlist-alert");
      secondsToDisplay = 2;
    }
  }, 1000);
}

function onWatchlistBtnClick() {
  const imgID = $(this).attr("id");
  var movieName;

  if (imgID == 20) {
    movieName = currentMovieData.original_title;

    if (!isNameAlreadyPresent(movieName)) {
      saveToLocalStorage(currentMovieData);
    }
    else
      return;
  }
  else {
    movieName = trendingList[imgID].original_title;

    if (!isNameAlreadyPresent(movieName)) {
      saveToLocalStorage(trendingList[imgID]);
    }
    else
      return;
  }

  // pop up "you have added this movie to watchlist" up top
  popupNotification(movieName);
}

function isNameAlreadyPresent(movieName) {
  for (var i = 0; i < movieArray.length; i++) {
    var name = movieArray[i].original_title;

    if (movieName === name)
      return true;
  }

  return false;
}

body.on("click", ".submit-btn", onMovieNameInput);

getTrendingMovies();

async function getTrendingMovies() {
  const trendingMovies = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=6c6fe5f85d17328e8be5488bcb10da64`;
  const trendingResponse = await fetch(trendingMovies);
  const trendingData = await trendingResponse.json();

  populateCarousel(trendingData.results);

  trendingList = trendingData.results;
}

function onMovieNameInput(e) {
  e.preventDefault();
  var movieName = movieNameInput.val();
  getMovieInfo(movieName);
}

async function getMovieInfo(movieName) {

  const movieInfo = `https://api.themoviedb.org/3/search/movie?language=en-US&query=${convertSpaces(movieName)}&api_key=6c6fe5f85d17328e8be5488bcb10da64`;

  const movieResponse = await fetch(movieInfo);
  const movieData = await movieResponse.json();

  if (movieData.results.length !== 0) {
    movieNameInput.val("");
    movieNameInput.attr("placeholder", "movie name")
    cardContainer.empty();
    addMovieCard(movieData.results[0]);
    currentMovieData = movieData.results[0];
  }
  else {
    movieNameInput.val("");
    movieNameInput.attr("placeholder", "Movie not found!");
  }
}

function convertSpaces(movieName) {
  for (var i = 0; i < movieName.length; i++)
    if (movieName[i] === " ")
      movieName[i] = "+";

  return movieName;
}

function addMovieCard(movieData) {
  searchMovieName.text(movieData.original_title);

  cardContainer.append($(`
      <div class="card d-flex" style="width: 30rem;">
        <img id ="20" class="card-img-top clickable-img" src="${"https://image.tmdb.org/t/p/original/" + movieData.poster_path}" alt="No poster found!">
        <div class="card-body">
          <ul>
            <li>Plot: ${movieData.overview}</li>
            <li>Release Date: ${dayjs(movieData.release_date).format("M/D/YY")}</li>
            <li>User Rating: ${movieData.vote_average.toFixed(1)}</li>
            <li>Total User Reviews: ${movieData.vote_count}</li>
          </ul>
          <a href="#" id="20" class="btn btn-primary watchlist-btn">Add to Watchlist</a>
        </div>
      </div>
    `));
}

function populateCarousel(movieData) {
  carouselContainer.append($(`      
  <div id="trending-carousel" class="carousel slide"  data-bs-ride="carousel" style="width: 30rem;">
    <div class="carousel-inner">
      <div class="carousel-item active w-100">
        <img id ="0" class="d-block w-100 clickable-img" src="${"https://image.tmdb.org/t/p/original/" + movieData[0].poster_path}" alt="No poster found!">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#trending-carousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#trending-carousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`));

  const carouselInner = $(".carousel-inner");

  for (var i = 1; i < movieData.length; i++) {
    carouselInner.append($(`
      <div class="carousel-item w-100">
        <img id ="${i}" class="d-block w-100 clickable-img" src="${"https://image.tmdb.org/t/p/original/" + movieData[i].poster_path}" alt="No poster found!">
      </div>`))
  }
}

function saveToLocalStorage(movieData) {
  movieArray.push(movieData);
  localStorage.setItem("array", JSON.stringify(movieArray));
}
