const express = require('express');
const router = express.Router();

const User = require("../models/User.model");
const Game = require("../models/Game.model");


//!Game Routes

//Game list router 
// GET /games
router.get("/games", (req, res) => {
  res.render("games/gamelist")
});

router.post("/games", (req, res) => {
    res.render("games/gamelist")
  });
  
  



  // GET /game find by id
  router.get("/views/games/gamelist.hbs", (req, res) => {
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
  });

 
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