const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const gameSchema = new Schema(
  {
    title: {type: String, require:true},
    category: {type: String, default: 'N/D'},
    /* category: {
      type:String,
      enum:["Action","Adventure","War","Strategy","Sports",
      "RPG","Race","Simulation"]},
    url: {type: String}, */
    /* creator: {type: Schema.Types.ObjectId,  ref: 'User'}, */
    image: {type: String , default:'https://tinyurl.com/96bb7ks'},
    url: {type: String }
  
  }
);

const Game = model("Game", gameSchema);

module.exports = Game;
