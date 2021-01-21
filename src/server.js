require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./util/isAuthenticated";
import cors from "cors";
const PORT = process.env.PORT || 4000;
const server = new GraphQLServer({
  schema,
  context: (req) => ({
    ...req,
    isAuthenticated,
  }),
});

// graphql server has a built-in express server
server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`✅server running on http://localhost:${PORT}`)
);

// prisma.user.deleteMany();
// const allUser = async () => {
//   return await prisma.user.findMany();
// };
// console.log(allUser());
