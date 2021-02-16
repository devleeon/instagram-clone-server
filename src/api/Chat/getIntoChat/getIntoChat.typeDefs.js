import { gql } from "apollo-server-express";
export default gql`
  type Query {
    getIntoChat(id: String!): Chat!
  }
`;
