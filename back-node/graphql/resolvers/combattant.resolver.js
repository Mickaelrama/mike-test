import Combattant from "../../models/combattant.model";
import mongoose from "mongoose";
import verifyCredential from "../../utils/verifyCredential";

export default {
  Mutation: {
    async addCombattant(_, { args }, { token, socket }) {
      await verifyCredential(token, "USER");
      const combattant = new Combattant({
        ...args,
        _id: mongoose.Types.ObjectId(),
      });
      const createdCombattant = await combattant.save();
      socket.emit("NEW_COMBATTANT", true);
      return createdCombattant;
    },
  },
  Query: {
    async getCombattants() {
      return await Combattant.find().exec();
    },
  },
};
