import { gql } from "apollo-server-express";
export default gql`
  type Mutation {
    sendMessage(id: String, text: String!, to: [String!]!): Boolean!
  }
`;
