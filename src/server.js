import { ApolloServer, PubSub } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
// import { RedisPubSub } from "graphql-redis-subscriptions";
import { createServer } from "http";
import logger from "morgan";
import schema from "./schema";
import "./util/cloudinary";
import { isAuthenticated } from "./util/isAuthenticated";
dotenv.config();
// const redisOptions = {
//   host: REDIS_DOMAIN_NAME,
//   port: PORT_NUMBER,
//   retryStrategy: (times) => {
//     // reconnect after
//     return Math.min(times * 50, 2000);
//   },
// };
// const pubsub = new RedisPubSub();
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
      token,
      isAuthenticated,
      pubsub,
    };
  },
  subscriptions: {
    path: "/subscriptions",
    onConnect: (params) => {
      return params;
    },
  },
});
server.applyMiddleware({ app });

const options = {
  port: PORT,
};
app.set("trust proxy", true);
app.use(logger("tiny"));
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
