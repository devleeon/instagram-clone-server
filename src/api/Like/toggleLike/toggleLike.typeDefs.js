import { gql } from "apollo-server-express";
export default gql`
  type Mutation {
    toggleLike(postId: String!): Boolean!
  }
`;
