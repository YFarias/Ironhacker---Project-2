
// Get /private profile view
router.get("/profile", isLoggedIn, (req,res,next) =>{

    //If the user is still logged the layout with profile and logout still show
    let userIsLoggedIn = false;
    if(req.session.user) {
      userIsLoggedIn = true
    }
    res.render("profile", { userIsLoggedIn: userIsLoggedIn });
    
  });