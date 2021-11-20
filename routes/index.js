const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//Routes

//games routes
const gamesRouter = require('../routes/game.routes');
app.use('/', gamesRouter);


module.exports = router;
