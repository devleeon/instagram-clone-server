import { gql } from "apollo-server-express";
export default gql`
  type Mutation {
    changeAvatar(avatar: FileUpload!): File!
  }
`;
