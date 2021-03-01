import { ApolloServer } from "apollo-server-express";
import { RedisPubSub } from "graphql-redis-subscriptions";
import express from "express";
import { createServer } from "http";
import logger from "morgan";
import schema from "./schema.js";
import cors from "cors";
import { isAuthenticated } from "./util/isAuthenticated.js";
import "./util/cloudinary.js";
import dotenv from "dotenv";
dotenv.config();
const pubsub = new RedisPubSub();
const PORT = process.env.PORT || 4000;
const app = express();
const server = new ApolloServer({
  schema,
  context: async ({ req, connection }) => {
    let token;
    if (connection) {
      // check connection for metadata
      token = connection.context;
    } else {
      // check from req 
      token = req.headers.token || "";
    }
    return {
      ...req,
      token,
      isAuthenticated,
      pubsub,
    };
  },
  subscriptions: {
    path: "/subscriptions",
  },
});
server.applyMiddleware({ app });

const options = {
  port: PORT,
};
app.set("proxy", 1);
app.use(logger("dev"));
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(options, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});
