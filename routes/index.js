const router = require("express").Router();

//Homepage route
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


//games routes
const gamesRouter = require('../routes/game.routes');
//app.use('/', gamesRouter); // what is this? its not defined






module.exports = router;
