import { gql } from "apollo-server-express";
export default gql`
  type Query {
    searchUsers(query: String!): [User]
  }
`;
