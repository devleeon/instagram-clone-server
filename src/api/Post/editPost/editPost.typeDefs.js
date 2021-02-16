import { gql } from "apollo-server-express";
export default gql`
  enum ACTIONS {
    EDIT
    DELETE
  }
  type Mutation {
    editPost(
      id: String!
      location: String
      caption: String
      action: ACTIONS!
    ): Boolean!
  }
`;
