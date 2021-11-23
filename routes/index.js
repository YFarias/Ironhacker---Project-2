const router = require("express").Router();
const isLoggedIn = require("./../middleware/isLoggedIn"); //imported this to have the logged in session

//Homepage route
/* GET home page */
router.get("/", (req, res, next) => {
  // Check if the incoming request has a valid cookie/session

  let userIsLoggedIn = false;
  if(req.session.user) {
    userIsLoggedIn = true
  }
  
  /* if (req.session.user) {
    userIsLoggedIn = true;
  } */
  console.log(req.session)
  console.log("Login esta funcionar:", userIsLoggedIn)
  res.render("index", { userIsLoggedIn: userIsLoggedIn });
});

//games routes
const gamesRouter = require('../routes/game.routes');

//Private routes


// Get /private profile view
router.get("/profile", isLoggedIn, (req,res,next) =>{
  res.render("secret-view");
  
});



module.exports = router;
