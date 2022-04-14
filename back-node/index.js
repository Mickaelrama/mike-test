import { createServer } from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import mongoose from "mongoose";
import * as configEnv from "dotenv";
import typeDefs from "./graphql/type-defs";
import resolvers from "./graphql/resolvers";

configEnv.config();

const PORT = 4000;

const startServer = async () => {
  // create server 
  const app = express();
  app.use(cors());
  const httpServer = createServer(app);
  const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  // init socket
  io.on("connection", () => {});

  // Set up ApolloServer.
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const server = new ApolloServer({
    schema,
    context: (http) => ({
      req: http.req,
      token: http.req.headers.authorization
        ? http.req.headers.authorization.replace("Bearer", "").trim()
        : null,
      socket: io,
    }),
  });

  // database connection
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      // after db is connected we turn on the server
      await server.start();
      server.applyMiddleware({ app });

      httpServer.listen(PORT, () => {
        console.log(
          `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
        );
      });
    })
    .catch((e) => {
      console.log(e.message);
    });
};

startServer();
