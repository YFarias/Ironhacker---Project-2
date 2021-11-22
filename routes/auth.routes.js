 const { get } = require("mongoose"); //what is this? - F

const router = require("express").Router()
const User = require("./../models/User.model");
const Game = require("./../models/Game.model");
const bcrypt = require("bcryptjs");
const zxcvbn = require("zxcvbn");
const isLoggedIn = require("./../middleware/isLoggedIn");

//Defining the saltrounds to encrypt the password
const saltRounds = 10;
//Auth routes go here



/*
GET	/login	Renders login form view.
 Y
POST	/login	Sends Login form data 
to the server.{ email, password } Y
*/
router.get("/", (req,res)=>{
    let userisLoggedIn = false;
    if (req.session.user) {
        (userisLoggedIn = true)
    }
})


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

    //Check the Password Strength
    
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    
    if(!regex.test(password)){
        res.status(400).render("auth/signup", {
            errorMessage:
                //Message that will show when the password doesn't meet the criteria
                "Password must have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."
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
            return User.create({username: username, email: email, password: hashedPassword});
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
    res.render("auth/login")
})


router.post("/login", (req,res) => {
 const {email,password} = req.body
//Check if email and password are provided
 const emailNotProvided = !email || email === "";
 const passwordNotProvided = !password || password === "";

 if (emailNotProvided || passwordNotProvided) {
     res.render("auth/login", {
         errorMessage: "Provide email and password.",
     })
     
     return;
    }

let user;

//check if the user exist 

User.findOne({email:email})
    
    .then ((foundUser)=>{
        user = foundUser;

        if (!foundUser){
            throw new Error ("Login failed, try again!")
        }

        //Compare the Password 
        return bcrypt.compare(password,foundUser.password);
        
    })

    .then((isCorrectPassword)=>{
        if (!isCorrectPassword) {
            throw new Error ("Login failed, try again!");
        }else if (isCorrectPassword) {
            req.session.user = user
            res.redirect("/")
        }
    })
    .catch((err)=>{
        
        res.render("auth/login", {
            errorMessage: err.message || "Provide email and password."
        });
    });

        
 









});












module.exports = router;