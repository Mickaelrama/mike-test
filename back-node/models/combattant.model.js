import mongoose from "mongoose";

const Combattant = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nom: {
    type: String,
    required: true,
  },
  HP: {
    type: Number,
    default: 100,
  },
  MP: {
    type: Number,
    default: 30,
    max: 100,
  },
  ST: {
    type: Number,
    default: 40,
    max: 100,
  },
});

export default mongoose.model("Combattant", Combattant);
