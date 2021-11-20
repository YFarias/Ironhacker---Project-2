const express = require("express").Router
const router = express.Router();
const User = require("../models/User.model");
const Game = require("../models/Game.model");


//!Game Routes

//Create new Movies
router.get('/game', (req, res, next) => {
    Game.find()
    .then( gameListDB => {
      res.render('/views/games/searchgame.hbs', { gameListDB });
    })
    .catch( err => console.log("Error while displaying a form to create a games: ", err))
  })
  
  // post route to create movies
  {/* <form action="/movies" method="POST"> */}
  
  router.post('/games', (req, res, next) => {
    Game.create(req.body)
    .then( gameListDB => {
      // console.log("New movie: ", newMovie);
  
      // res.redirect ALWAYS has '/' because it is the URL
      res.redirect('/games')
    } )
    .catch( err => console.log("Error while creating a game: ", err))
  })
  
  // get all the movies from the DB
  
  route.get('/', (req, res, next) => {
    Movie.find()
    .then( moviesFromDB => {
      res.render('movies/movies', { moviesFromDB });
    })
    .catch( err => console.log("Error while displaying all the movies: ", err))
  })
  
  // delete route:
  {/* <form action="/movies/{{this._id}}/delete" method="POST"> */}
  movieRouter.post('/:id/delete', (req, res, next) => {
    Movie.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/movies')
    })
    .catch( err => console.log("Error while deleting a movie: ", err))
  })
  
  // edit the movie -get route to display the form
  {/* <a href="/movies/{{theMovie._id}}/edit">Edit the Movie</a> */}
  movieRouter.get('/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id)
    .then(foundMovie => {
      Celebrity.find()
      .then(allCelebs => {
        allCelebs.forEach(oneCeleb => {
          foundMovie.cast.forEach(oneCastMember => {
            // console.log("what is this: ", oneCastMember);
            if(oneCeleb._id.equals(oneCastMember)){
              oneCeleb.isInCast = true;
            }
          })
        })
        res.render('movies/edit-movie', { movie: foundMovie, allCelebs })
      })
    })
    .catch( err => console.log("Error while getting the movie for the edit form: ", err))
  })
  
  // post route to save the updates in the movie
  {/* <form action="/movies/{{movie._id}}/update" method="POST"> */}
  movieRouter.post('/:movieId/update', (req, res, next) => {
    // we can use 'req.body' since we used the same names as in our MOVIE model
    Movie.findByIdAndUpdate(req.params.movieId, req.body)
    .then( updatedMovie => {
      // if everything is fine, take me back to the details page so we can see the changes we made
      res.redirect(`/movies/${req.params.movieId}`);
    } )
    .catch( err => console.log("Error while getting updating the movie: ", err))
  })
  
  
  
  
  
  
  // details page:
    // movieId is a placeholder, can be any name
    movieRouter.get('/:movieId', (req, res, next) => {
      // cast is the array of IDs and we need full object so we need to use
      // .populate('cast) and pass the "cast" in the method because we are populating that specific field
      Movie.findById(req.params.movieId).populate('cast')
      .then( theMovie => {
        res.render('movies/movie-details', { theMovie })
      } )
      .catch( err => console.log("Error while displaying movie details: ", err))
  })
  
  module.exports = movieRouter;

/*Game List*/



/*
DELETE	/private/favorites/:GamesId	
Private route. Deletes the existing 
favorite from the current user.	 Y
*/




/*
GET	/private/Creator/ Private 
route. Renders edit-profile form 
view.	Y
PUT	/private/edit-profile	
Private route. Sends edit-profile
 info to server and updates user in DB.
 	{ Gamename, category, [URL]}Y
*/