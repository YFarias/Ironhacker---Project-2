const { Schema, model } = require("mongoose");


// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    profilePicture: {  
      type: String, default:'https://tinyurl.com/96bb7ks' 
     },
    username: { 
      type: String, 
      unique: true,
      required: true },
      password: {type: String, 
    },

    
    favoriteGames :[ {type: Schema.Types.ObjectId,  ref: 'Game'} ],
  },

  /* {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  } */
);



const User = model("User", userSchema);

module.exports = User;
