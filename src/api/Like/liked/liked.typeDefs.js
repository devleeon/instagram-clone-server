import { gql } from "apollo-server-express";
export default gql`
  type Subscription {
    liked(postId: String!): Like
  }
`;
