import { gql } from "apollo-server-express";
export default gql`
  type FeedData {
    hasMore: Boolean!
    feed: [Post]
    cursor: String
  }
  type Query {
    getFeed(limit: Int!, cursor: String): FeedData
  }
`;
