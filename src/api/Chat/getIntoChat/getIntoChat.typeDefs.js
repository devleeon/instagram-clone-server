import { gql } from "apollo-server-express";
export default gql`
  type Query {
    getIntoChat(toId: String!): Chat!
  }
`;