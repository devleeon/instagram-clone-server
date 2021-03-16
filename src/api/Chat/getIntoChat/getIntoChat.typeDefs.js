import { gql } from "apollo-server-express";
export default gql`
  type Query {
    getIntoChat(chatId: String!): Chat!
  }
`;
