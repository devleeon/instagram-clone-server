import { gql } from "apollo-server-express";
export default gql`
  type Mutation {
    createPost(location: String, caption: String, photos: [FileUpload]): Post
  }
`;
