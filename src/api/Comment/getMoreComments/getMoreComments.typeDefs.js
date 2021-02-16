import { gql } from "apollo-server-express";
export default gql`
  type Query {
    getMoreComments(postId: String!, limit: Int!, offset: Int!): [Comment]
  }
`;
