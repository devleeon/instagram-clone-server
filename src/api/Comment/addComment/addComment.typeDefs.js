import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    addComment(postId: String!, text: String!): Comment
  }
`;
