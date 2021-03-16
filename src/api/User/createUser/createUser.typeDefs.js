import { gql } from "apollo-server-express";
export default gql`
  type Mutation {
    createUser(
      username: String!
      emailOrPhone: String!
      password: String!
      firstname: String
    ): UserResult!
  }
`;
