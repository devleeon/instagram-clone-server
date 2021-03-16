import { gql } from "apollo-server-express";
export default gql`
  type User {
    id: ID!
    avatar: String
    createdAt: String!
    updatedAt: String!
    email: String
    username: String!
    password: String!
    firstname: String
    lastname: String
    phoneNo: String
    fullname: String
    bio: String
    followedBy: [User]
    following: [User]
    numberOfFollowers: Int!
    numberOfFollowings: Int!
    numberOfPosts: Int!
    amIFollowing: Boolean!
    posts: [Post]
    likes: [Like]
    comments: [Comment]
    chatRooms: [Chat]
    loginSecret: String
    isSelf: Boolean!
    notifications: Notification
    saved: [Save]
    tagged: [Tagged]
  }

  type Post {
    id: ID!
    createdAt: String!
    updatedAt: String!
    location: String
    caption: String
    user: User!
    photos: [Photo!]!
    comments: [Comment]
    likes: [Like]
    isLiked: Boolean!
    numberOfLikes: Int!
    numberOfComments: Int!
    isSaved: Boolean!
    hasMoreComments: Boolean!
  }
  type Save {
    id: ID!
    createdAt: String!
    user: User!
    userId: String!
    post: Post!
    postId: String!
  }
  type Tagged {
    id: ID!
    user: User!
    userId: String!
    photo: Photo!
    photoId: String!
  }
  type Like {
    id: ID!
    user: User!
    userId: String!
    post: Post!
    postId: String!
  }

  type Comment {
    id: ID!
    createdAt: String!
    updatedAt: String!
    text: String!
    user: User!
    post: Post!
  }

  type Photo {
    id: ID!
    url: String!
    post: Post!
    tagged: [Tagged]
  }

  type Chat {
    id: ID!
    createdAt: String!
    updatedAt: String!
    participants: [User!]!
    messages: [Message]
  }

  type Message {
    id: ID!
    createdAt: String!
    updatedAt: String!
    text: String!
    chatRoom: Chat!
    from: User!
    fromId: String!
  }
  type Notification {
    id: ID!
    user: User!
    userId: String!
    createdAt: String!
    newLikes: [Like]
    newFollowers: [User]
    newComments: [Comment]
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  scalar FileUpload
`;
