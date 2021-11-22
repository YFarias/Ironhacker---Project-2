const router = require("express").Router();
const isLoggedIn = require("./../middleware/isLoggedIn"); //imported this to have the logged in session

//Homepage route
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});




//games routes
const gamesRouter = require('../routes/game.routes');
//app.use('/', gamesRouter); // what is this? its not defined and giving an error



//Private routes
// Get /private






module.exports = router;
