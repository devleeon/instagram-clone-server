require("dotenv").config();
import { ApolloServer, PubSub } from "apollo-server-express";
import express from "express";
import { createServer } from "http";
import logger from "morgan";
import schema from "./schema";
import "./util/firebase";
import { storage } from "./util/firebase";
import { isAuthenticated } from "./util/isAuthenticated";

const pubsub = new PubSub();
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
      storage,
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
app.use(logger("dev"));
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
