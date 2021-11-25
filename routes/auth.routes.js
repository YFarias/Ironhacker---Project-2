const router = require("express").Router()
const User = require("./../models/User.model");
const Game = require("./../models/Game.model");
const bcrypt = require("bcryptjs");
const zxcvbn = require("zxcvbn");
const isLoggedIn = require("./../middleware/isLoggedIn");
const errorHandling = require("../error-handling");

//Defining the saltrounds to encrypt the password
const saltRounds = 10;
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
    const { username, password } = req.body;


    //Check if these credentials are provided
    const usernameNotProvided = !username || username === "";
    const passwordNotProvided = !password || password === "";

    if(usernameNotProvided || passwordNotProvided){
        res.render("auth/signup", {
            errorMessage: "Please provide username and password"
        });
    }

    //Check the Password Strength
    
    const regex = /(?=.*\d).{6,}/;
    
    if(!regex.test(password)){
        res.status(400).render("auth/signup", {
            errorMessage:
                //Message that will show when the password doesn't meet the criteria
                "Password must have at least 6 chars and must contain at least one number."
        })
    }


    //Check if username is taken

    User.findOne({username: username})
        .then((foundUser) => {
            if(foundUser){
                throw new Error("Username is taken.");
            }

            //Generating salt string
            return bcrypt.genSalt(saltRounds)
        })

        .then((salt) => {
            //Encrypting the password
            return bcrypt.hash(password, salt);
        })

        .then((hashedPassword) => {
            //Create a new user
            return User.create({username: username,  password: hashedPassword});
        })
        .then((createdUser) => {
            //Redirecting the created user to the homepage
            res.redirect("/");
        })

        .catch((err) => {
            res.render("auth/signup", {errorMessage: err.message || "Error while signing up, try again."})
        })
})





//Login
/*
POST	/login	Sends Login form data 
to the server.{ email, password } Y
*/
router.get("/login", (req,res)=>{
    res.render("auth/login");
});


router.post("/login", (req,res) => {
 const { username, password } = req.body;
//Check if email and password are provided

 const usernameNotProvided = !username || username === "";
 const passwordNotProvided = !password || password === "";

 if (usernameNotProvided || passwordNotProvided) {
     res.render("auth/login", {
         errorMessage: "Provide username and password.",
     })
     
     return;
    }
    
    let user;
  // Check if the user exists

  User.findOne({ username: username })
    .then((foundUser) => {
      user = foundUser;

      if (!foundUser) {
        throw new Error("Wrong credentials");
      }

      // Compare the passwords
      return bcrypt.compare(password, foundUser.password);
    })
    .then((isCorrectPassword) => {
      if (!isCorrectPassword) {
        throw new Error("Wrong credentials");
      } else if (isCorrectPassword) {
        req.session.user = user;
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.render("auth/login", {
        errorMessage: err.message || "Provide username and password.",
      });
    });
    console.log("Login ativo ") //TEST IF LOGIN IS TRUE 
});


//logout
router.get("/logout", isLoggedIn, (req,res) =>{
    req.session.destroy ((err)=> {
        if(err) {
            return res.render("error");
        }
      res.redirect("/");
    });
    
});




module.exports = router;