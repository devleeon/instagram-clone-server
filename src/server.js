require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import { PrismaClient } from "@prisma/client";

const PORT = process.env.PORT || 4000;
const server = new GraphQLServer({
  schema,
  context: (req) => ({
    ...req,
    prisma: new PrismaClient(),
  }),
});

// graphql server has a built-in express server
server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`✅server running on http://localhost:${PORT}`)
);

// prisma.user.deleteMany();
// const allUser = async () => {
//   return await prisma.user.findMany();
// };
// console.log(allUser());
