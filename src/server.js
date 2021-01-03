require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

// graphql server has a built-in express server
server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`✅server running on http://localhost:${PORT}`)
);
