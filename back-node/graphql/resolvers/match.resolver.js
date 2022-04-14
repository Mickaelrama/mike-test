import mongoose from "mongoose";
import verifyCredential from "../../utils/verifyCredential";
import Match from "../../models/match.model";

export default {
  Mutation: {
    async addMatch(_, { domicile }, { token, socket }) {
      await verifyCredential(token, "USER");
      const match = new Match({ domicile, _id: mongoose.Types.ObjectId() });
      const createdMath = await match.save();
      socket.emit("NEW_MATCH", true);
      return createdMath;
    },
    async joinMatch(_, { args: { _id, exterieur } }, { token, socket }) {
      await verifyCredential(token, "USER");
      await Match.updateOne({ _id }, { exterieur }).exec();
      const match = await Match.findById(_id).exec();
      socket.emit("JOINED_MATCH", match);
      return _id;
    },
  },
  Query: {
    async getDispoMatches(_, _args, { token }) {
      await verifyCredential(token, "USER");
      // we fetch all matches which don't have exterieur and is not done.
      return await Match.find({ done: null, exterieur: null })
        .populate("domicile exterieur")
        .exec();
    },
  },
};
