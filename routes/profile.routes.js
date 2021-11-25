const router = require("express").Router();
const isLoggedIn = require("./../middleware/isLoggedIn"); //imported this to have the logged in session
const User = require("./../models/User.model");


//cloudinary import <---fileuploader--->
const fileuploader = require("../config/cloudinary.config");

// Get /private profile view
router.get("/profile", isLoggedIn, async (req,res,next) =>{

    //If the user is still logged the layout with profile and logout still show
    let userIsLoggedIn = false;
    if(req.session.user) {
      userIsLoggedIn = true
    }
    const userID = req.session.user._id
    console.log('userID :', userID)
    const user = await User.findById(userID).populate('favoriteGames');
    res.render("profile", { userIsLoggedIn: userIsLoggedIn, user });
    
  });


  //EDIT PROFILE
  router.get("/edit", isLoggedIn, (req, res)=>{
   /*    User.findById(req.params.id) */

    res.render("users/edit-profile", { user: req.session.user})

  });

  router.post("/edit", (req,res)=> {
   
    const userID = req.session.user._id
    
    const {username,password} = req.body
   
    User.findByIdAndUpdate(userID, {username: username,password:password} )
    .then((data) => {
        console.log('data :', data)
    res.redirect("/profile")})
    .catch((error) => console.log(error));
});
      
    /* get the new info from the body
      find user and update
      redirect to user profile
   */






  module.exports = router;
