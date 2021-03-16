import { gql } from "apollo-server-express";
export default gql`
  type MoreComments {
    comments: [Comment]
    hasMore: Boolean!
    cursor: String!
  }
  type Query {
    getMoreComments(postId: String!, limit: Int, cursor: String): MoreComments
  }
`;
