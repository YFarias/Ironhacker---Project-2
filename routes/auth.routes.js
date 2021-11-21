/* const { get } = require("mongoose"); what is this? */

const router = require("express").Router()
const User = require("./../models/User.model");
const Game = require("./../models/Game.model");
//Auth routes go here



/*
GET	/login	Renders login form view.
 Y
POST	/login	Sends Login form data 
to the server.{ email, password } Y
*/



//SIGN UP ROUTES

router.get("/signup", (req, res) => {
    res.render('auth/signup')
});


//post signup

router.post("/signup", (req, res) => {
    //get username, email and password from the req.body
    const { username, email, password } = req.body;


    //Check if these credentials are provided
    const usernameNotProvided = !username || username === "";
    const emailNotProvided = !email || email === "";
    const passwordNotProvided = !password || password === "";

    if(usernameNotProvided || emailNotProvided || passwordNotProvided){
        res.render("auth/signup", {
            errorMessage: "Please provide username, email and password"
        });
    }

})





module.exports = router;