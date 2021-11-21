// Middleware for the logged in session

//check if the request has a valid cookie 

function isLoggedIn (req, res , next) {
    if(!req.session.user) {
        return res.redirect('/login')
    }

    next();

}


module.exports = isLoggedIn;