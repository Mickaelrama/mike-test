import mongoose from "mongoose";

const Match = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  domicile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  exterieur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  done: Boolean,
});

export default mongoose.model("Match", Match);
