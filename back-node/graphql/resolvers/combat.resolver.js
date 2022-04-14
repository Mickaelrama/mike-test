import Combat from "../../models/combat.model";
import Combattant from "../../models/combattant.model";
import Match from "../../models/match.model";
import verifyCredential from "../../utils/verifyCredential";
import mongoose from "mongoose";

export default {
  Mutation: {
    async addCombat(_, { args: { match, combattant } }, { token, socket }) {
      const currentUser = await verifyCredential(token, "USER");
      const { domicile, exterieur } = await Match.findById(match).exec();
      const { HP } = await Combattant.findById(combattant).exec();
      const dataTosave = {
        _id: mongoose.Types.ObjectId(),
        match,
        playerOne: domicile == currentUser.id ? combattant : null,
        playerTwo: exterieur == currentUser.id ? combattant : null,
        playerOneHealth: domicile == currentUser.id ? HP : null,
        playerTwoHealth: exterieur == currentUser.id ? HP : null,
      };
      const combat = new Combat(dataTosave);
      const { _id } = await combat.save();
      socket.emit("CREATED_COMBAT", {
        ...dataTosave,
        _id,
        domicile,
        exterieur,
        token,
      });
      return _id;
    },
    async actionCombat(
      _,
      {
        args: { _id, action, combattant, domicile, exterieur, attackedPlayer },
      },
      { token, socket }
    ) {
      await verifyCredential(token, "USER");
      const currentCombat = await Combat.findById(_id)
        .populate("playerTwo playerOne")
        .exec();

      if (!currentCombat.playerOne || !currentCombat.playerTwo) {
        throw new Error("PlayerOne and PlayerTwo are required.");
      }

      const attackType = action === "FRAPPER" ? "ST" : "MP";

      const healthToModify =
        attackedPlayer === "playerTwo" ? "playerTwoHealth" : "playerOneHealth";

      const currentHealthAfterAttack = parseFloat(
        currentCombat[healthToModify] -
          (combattant === currentCombat.playerOne._id
            ? currentCombat.playerOne[attackType]
            : currentCombat.playerTwo[attackType])
      );

      await Combat.updateOne(
        { _id },
        {
          [healthToModify]: currentHealthAfterAttack,
        }
      ).exec();

      socket.emit("ATTACKED", {
        _id,
        domicile,
        exterieur,
        [healthToModify]: currentHealthAfterAttack,
      });

      return _id;
    },
    async joinCombat(
      _,
      { args: { _id, match, combattant } },
      { token, socket }
    ) {
      const currentUser = await verifyCredential(token, "USER");
      const { domicile, exterieur } = await Match.findById(match).exec();
      const { HP } = await Combattant.findById(combattant).exec();
      const keyToEdit = currentUser.id == domicile ? "playerOne" : "playerTwo";
      await Combat.updateOne(
        { _id },
        { [keyToEdit]: combattant, [`${keyToEdit}Health`]: HP }
      ).exec();
      socket.emit("JOINED_COMBAT", {
        _id,
        domicile,
        exterieur,
        [keyToEdit]: combattant,
        [`${keyToEdit}Health`]: HP,
      });
      return _id;
    },
  },
};
