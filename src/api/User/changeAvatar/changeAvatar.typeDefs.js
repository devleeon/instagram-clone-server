import { gql } from "apollo-server-express";
export default gql`
  type ChangeResult {
    error: String
    url: String
  }
  type Mutation {
    changeAvatar(avatar: FileUpload!): ChangeResult!
  }
`;
