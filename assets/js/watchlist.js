var watchlistArray = JSON.parse(localStorage.getItem('array') || "[]")

  // psuedo code
  // checkk watchlist array . movie === movieData //movieID
  // for each, if else, ==== !===
  // then display movie/watchlist on htmlk

  // remove from watchlist


  `
  < div class="card d-flex" style = "width: 30rem;" >
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
      </div >
    `

