import { gql } from "apollo-server-express";

export default gql`
  type Query {
    getSaved(username: String!, limit: Int!, offset: Int!): [Save]
  }
`;
