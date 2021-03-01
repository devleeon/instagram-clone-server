import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const __dirname = path.resolve(path.dirname(""));

const allTypes = loadFilesSync(
  path.join(__dirname, "/src/api/**/*.typeDefs.js")
);
const allResolvers = loadFilesSync(
  path.join(__dirname, "/src/api/**/*.resolvers.js")
);
const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(allTypes),
  resolvers: mergeResolvers(allResolvers),
});

export default schema;
