import { gql } from "apollo-server-express";
export default gql`
  type Query {
    whoLikesPost(postId: String!, limit: Int!, offset: Int): [Like]
  }
`;
