import { gql } from "apollo-server-express";

export default gql`
  type Query {
    getMessages(chatId: String!, limit: Int, offset: Int): [Message]
  }
`;
