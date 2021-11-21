// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

//Changed the mongo URI for us to be able to connect it to Mongo Compass
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/Ironhacker---Project-2";

//Middleware for the sessions 
const session = require("express-session");

//Mongo store package that records the session
const MongoStore = require("connect-mongo");

//Middleware config (confirm this later - F)
module.exports = (app) => {
  app.use(logger("dev"));
}

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
