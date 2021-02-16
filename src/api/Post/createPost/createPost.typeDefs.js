import { gql } from "apollo-server-express";
export default gql`
  type Mutation {
    createPost(location: String, caption: String, urls: [String]): UploadResult!
  }

  type UploadResult {
    post: Post!
    user: User!
    photos: [Photo!]!
  }
`;
