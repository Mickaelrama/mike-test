import mongoose from "mongoose";

const Combat = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  playerOne: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Combattant",
  },
  playerTwo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Combattant",
  },
  playerOneHealth: Number,
  playerTwoHealth: Number,
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Combattant",
  },
});

export default mongoose.model("Combat", Combat);
