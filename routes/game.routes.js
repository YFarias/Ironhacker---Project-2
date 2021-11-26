const express = require("express");
const router = express.Router();
const isLoggedIn = require("./../middleware/isLoggedIn");
const User = require("../models/User.model");
const Game = require("../models/Game.model");

//cloudinary import <---fileuploader--->
const fileuploader = require("../config/cloudinary.config");

//Game Routes

//Game search

router.get("/search", (req, res) => {
  const gameTitle = req.query.gameTitle;

  //Finding the game we want in a more fluid way
  Game.find({ title: { $regex: gameTitle, $options: "i" } })
  
    .then((gameList) => {
      //array with games found
      res.render("games/gamelist", { gameList: gameList });
    })

    .catch((err) => console.log(err));
});

//Games router - displays the list of games created on the DB

router.get("/games", (req, res) => {
  Game.find()
    .then((gameList) => {
      //array with games found

      res.render("games/gamelist", {
        gameList: gameList,
        user: req.session.user,
      });
    })

    .catch((err) => console.log(err));
});

//Adding a game to the library

router.get("/games/add", isLoggedIn, (req, res) => {
  res.render("games/addgame", { user: req.session.user });
});

router.post("/games/add", fileuploader.single("image"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { title, category, url} = req.body;
  let imageUrl = "https://tinyurl.com/96bb7ks"

  if (req.file){
    imageUrl = req.file.path
  }
  
  Game.create({ title, category, url, image: imageUrl })
    .then((createdGame) => {
      console.log("game created", createdGame);
      res.redirect("/games");
    })

    .catch((err) => console.log(err));
});

router.get("/games/:gameId/favorites", (req, res) => {
  const userId = req.session.user._id;
  const gameId = req.params.gameId;

  console.log("UID:", userId);
  console.log("gID:", gameId);

  User.findByIdAndUpdate(
    userId,
    {
      $push: { favoriteGames: gameId },
    },
    { new: true }
  )
    .then((updatedUser) => {
      console.log(updatedUser);
      res.redirect("/profile");
    })

    .catch((err) => console.log(err));
});


//Delete from favourites

router.post("/games/:gameId/delete", (req, res) => {
  const userId = req.session.user._id;
  const gameId = req.params.gameId;

  User.findByIdAndUpdate(userId, {
    $pull: {
      favoriteGames: gameId 
    }
  }, {new:true})
    .then((user) => {
     res.redirect("/profile")
    })
    .catch((err) => console.log(err))
})



module.exports = router;


