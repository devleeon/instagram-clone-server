import { gql } from "apollo-server-express";
export default gql`
  type Subscription {
    notification(username: String!): Notification
  }
`;
