const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const gameSchema = new Schema(
  {
    title: {type:String, require:true},
    /* category: {
      type:String,
      enum:["Action","Adventure","War","Strategy","Sports",
      "RPG","Race","Simulation"]},
    url: {type: String}, */
    username: {type: [Schema.Types.ObjectId],  ref: 'User'},
  
  }
);

const Game = model("Game", gameSchema);

module.exports = Game;
