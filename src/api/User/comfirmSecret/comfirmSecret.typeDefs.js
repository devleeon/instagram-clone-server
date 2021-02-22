import { gql } from "apollo-server-express";
export default gql`
  type Mutation {
    confirmSecret(secret: String!, email: String!): UserResult!
  }
`;
