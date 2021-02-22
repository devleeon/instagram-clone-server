import { gql } from "apollo-server-express";
export default gql`
  type Subscription {
    messageNotification(chatId: String!): Message
  }
`;
