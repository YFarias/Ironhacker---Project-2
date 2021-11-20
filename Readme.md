Project 2

Description
It´s a platform of free games.


User Stories
1) 404 - As a user I want to see a 404 page when I go to a page.
2) 500 - As a user I want to see a Internal Server Error 500 if happens.
3) Homepage - As a user I want to be able to access the game List, the Rank of best games and new reviews login and signup.
4) Sign up - As a user I want to sign up on the Homepage.
5) Login - As a user I want to be able to log in on the Homepage. 
6) Profile -  As a user I can add games to my favorite list.And I have Creator mode I  can add the game i created and share with the others players. 
7) Favorite list - As a user I want to see the list of my favorite and delete them.
8) Add Game - "Creator mode" As a creator I need informed Name of the game, the category, image and url the game.
9) Logout - As a user I want to be able to log out from the Homepage so that I can make sure no one will access my account
10) Edit user - As a user I want to be able to edit my profile.
result - As a user I want to see the list and my preferences.
11) Game list - As a user I want to see more details of the games, be able to play and add it as favorites.

Server Routes (Back-end):
Method	Route	Description	Request - Body

GET	/	Main page route. Renders home index view.	 F

GET	/login	Renders login form view. Y
POST	/login	Sends Login form data to the server.{ email, password } Y

GET	/signup	Renders signup form view. F
POST	/signup	Sends Sign Up info to the server and creates user in the DB. F{email, password}

GET	/private/edit-profile	Private route. Renders edit-profile form view.	Y

PUT	/private/edit-profile	Private route. Sends edit-profile info to server and updates user in DB.	{ email, password, [Name],} Y

GET	/private/favorites	Private route. Render the favorites view.	F
POST	/private/favorites/	Private route. Adds a new favorite for the current user.	{ gameName, category, URL} F

GET	/private/Creator/ Private route. Renders edit-profile form view.	Y
PUT	/private/edit-profile	Private route. Sends edit-profile info to server and updates user in DB.	{ Gamename, category, [URL]}Y

DELETE	/private/favorites/:GamesId	Private route. Deletes the existing favorite from the current user.	 Y

GET	/Game	Renders Game-list view.	F
GET	/Game/details/:id	Renders Game-details view for the USERS.	F

Models
Game model Y (done!)

{
    name: String,
    category: {
        type: String,
        enum: ["war", "adventure", "sport"]
    }
    url: String
    user: {
    type: mongoose.Schema.Ty......
ref:, .........
    }

}

User model F 

{
  name: String,
  email: String,
  password: String,
  favorites: [mongoose.type.Schema.ObjectId , ref.....]
}




Links
Git
The url to your repository and to your deployed project

Repository Link

Deploy Link


Slides
The url to your presentation slides

Slides Link

Contributors
FirstName LastName - <github-username> - <linkedin-profile-link>

FirstName LastName - <github-username> - <linkedin-profile-link>