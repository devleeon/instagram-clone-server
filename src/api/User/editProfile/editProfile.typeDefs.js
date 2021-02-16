import { gql } from "apollo-server-express";
export default gql`
  type Mutation {
    editProfile(
      username: String
      email: String
      firstname: String
      lastname: String
      bio: String
    ): User!
  }
`;
