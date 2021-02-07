import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
// import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

// const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
// const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));
const allTypes = loadFilesSync(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = loadFilesSync(path.join(__dirname, "/api/**/*.js"));
const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(allTypes),
  resolvers: mergeResolvers(allResolvers),
});

export default schema;
