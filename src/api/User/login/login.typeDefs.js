import { gql } from "apollo-server-express";
export default gql`
  type Mutation {
    login(emailOrUsername: String!, password: String!): UserResult!
  }
`;
