import { gql } from "apollo-server-express";
export default gql`
  type Query {
    getProfilePost(username: String!, limit: Int!, offset: Int!): [Post]
  }
`;
