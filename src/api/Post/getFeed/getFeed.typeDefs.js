import { gql } from "apollo-server-express";
export default gql`
  type Query {
    getFeed(limit: Int!, offset: Int): [Post]
  }
`;
