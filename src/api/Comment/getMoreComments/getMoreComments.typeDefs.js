import { gql } from "apollo-server-express";
export default gql`
  type MoreComments {
    comments: [Comment]
    hasMore: Boolean!
  }
  type Query {
    getMoreComments(postId: String!, limit: Int!, offset: Int!): MoreComments
  }
`;
