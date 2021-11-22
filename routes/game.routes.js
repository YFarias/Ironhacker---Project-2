const express = require('express');
const router = express.Router();

const User = require("../models/User.model");
const Game = require("../models/Game.model");


//Game Routes


//Game search 

router.get("/search", (req, res) => {
  const gameTitle = req.query.gameTitle; 

  //Finding the game we want in a more fluid way    {title: { $regex: gameTitle, $option: "i"} }
  Game.find( {title: { $regex: gameTitle, $options: "i"} })
  .then((gameList) => { //array with games found 
    res.render("games/gamelist", {gameList: gameList})
  })

  .catch((err) => console.log(err));
})



//Games router
router.get("/games", (req, res) => {
  Game.find()
  .then((gameList) => { //array with games found 
    res.render("games/gamelist", {gameList: gameList})
  })

  .catch((err) => console.log(err));
})


//Adding a game to the library

router.get("/games/add", (req, res) => {
  res.render("games/addgame");
})

router.post("/games/add", (req, res) => {
  const { title, username} = req.body;

  Game.create({title, username})
  console.log("game created")
    .then((createdGame) => {
      res.render("games/addgame")
    })

    .catch((err) => console.log(err))
})

  



  //* / GET /game find by id
  /* router.get("/views/games/gamelist.hbs", (req, res) => {
    Game.findOne({ _id: req.params.gameId })
      .then((game) => res.render({ data: game }))
      .catch((error) => console.log(error));
  });
  
  // POST /game/gameId
  router.post("/views/games/gamelist/:gamesId", (req, res) => {
    Album.findOneAndUpdate({ _id: req.params.gamesId }, req.body, { new: true })
      .then((gameId) => res.render("/views/games/gamelist/:gameId",{ data: gameId }))
      .catch((error) => console.log(error));
  });
  
  // POST /games/:gamesId/delete
  router.post("/games/gamelist/:gamesId/delete", (req, res) => {
    Game.findByIdAndDelete(req.params.gamesId)
      .then(() => res.sendStatus(204))
      .catch((error) => console.log(error));
  }); */ 

 
  module.exports = router;



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