import { gql } from "apollo-server-express";
export default gql`
  type Mutation {
    sendMessage(chatId: String!, text: String!): Boolean!
  }
`;
