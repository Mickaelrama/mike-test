import User from "../../models/user.model";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import verifyCredential from "../../utils/verifyCredential";

const createToken = (json) => {
  return jwt.sign(json, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

export default {
  Mutation: {
    register: async (_, { args }, context) => {
      // if the user wants to create ADMIN user
      if (args.role === "ADMIN" && context?.token) {
        await verifyCredential(context.token, "ADMIN");
      }
      const encryptedPassword = await bcrypt.hash(args.password, 10);
      const user = new User({
        ...args,
        password: encryptedPassword,
        _id: mongoose.Types.ObjectId(),
      });
      const { _id, username, email, role } = await user.save();
      return {
        _id,
        username,
        email,
        role,
        token: createToken({
          id: _id,
          username,
          email,
        }),
      };
    },
    login: async (_, { args: { usernameOrEmail, password } }) => {
      const currentUser = await User.findOne()
        .or([{ username: usernameOrEmail }, { email: usernameOrEmail }])
        .exec();

      if (!currentUser) {
        throw new Error("username or email don't exist.");
      }
      const isCorrectPassword = await bcrypt.compare(
        password,
        currentUser.password
      );

      if (!isCorrectPassword) {
        throw new Error("wrong password");
      }

      return {
        _id: currentUser._id,
        username: currentUser.username,
        email: currentUser.email,
        role: currentUser.role,
        token: createToken({
          id: currentUser._id,
          username: currentUser.username,
          email: currentUser.email,
        }),
      };
    },
  },
};
