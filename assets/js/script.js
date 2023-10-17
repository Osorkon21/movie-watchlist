const body = $("body");
const movieNameInput = $("#movie-name-input");
const cardContainer = $(".card-container");
const submitBtn = $(".submit-btn");
const searchMovieName = $(".search-movie-name");

body.on("click", ".submit-btn", onMovieNameInput);

// getTrendingMovies();

async function getTrendingMovies() {
  const trendingMovies = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=6c6fe5f85d17328e8be5488bcb10da64`;
  const trendingResponse = await fetch(trendingMovies);
  const trendingData = await trendingResponse.json();

  console.log(trendingData);

  for (var i = 0; i < trendingData.results.length; i++) {
    addMovieCard(trendingData.results[i]);
  }
}

function onMovieNameInput(e) {
  e.preventDefault();
  var movieName = movieNameInput.val();
  getMovieInfo(movieName);
}

async function getMovieInfo(movieName) {
  const movieInfo = `https://api.themoviedb.org/3/search/movie?language=en-US&query=${convertSpaces(movieName)}&api_key=6c6fe5f85d17328e8be5488bcb10da64`;

  const movieResponse = await fetch(movieInfo);

  console.log(movieResponse);

  const movieData = await movieResponse.json();

  console.log(movieData);

  if (movieData.results.length !== 0) {
    movieNameInput.val("");
    movieNameInput.attr("placeholder", "movie name")
    addMovieCard(movieData.results[0]);
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
  console.log(movieData);

  searchMovieName.text(movieData.original_title);

  cardContainer.append($(`
      <div class="card d-flex" style="width: 30rem;">
        <img class="card-img-top" src="${"https://image.tmdb.org/t/p/original/" + movieData.poster_path}" alt="No poster found!">
        <div class="card-body">
          <ul>
            <li>Plot: ${movieData.overview}</li>
            <li>Release Date: ${dayjs(movieData.release_date).format("M/D/YY")}</li>
            <li>User Rating: ${movieData.vote_average.toFixed(1)}</li>
            <li>Total User Reviews: ${movieData.vote_count}</li>
          </ul>
          <a href="#" class="btn btn-primary">Add to Watchlist</a>
        </div>
      </div>
    `));
}
