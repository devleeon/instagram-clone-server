import { gql } from "apollo-server-express";
export default gql`
  type UserResult {
    user: User
    error: ErrorField
    token: String
  }
  type ErrorField {
    message: String!
    location: String!
  }
`;
