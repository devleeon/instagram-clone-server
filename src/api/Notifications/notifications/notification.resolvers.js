import { withFilter } from "apollo-server-express";
import { NEW_FOLLOWER, NEW_LIKE } from "../../../util/constants";

export default {
  Query: {
    notification: (_, args) => {
      const { username } = args;
    },
  },
};

// withFilter((_, __, { pubsub }) =>
//         pubsub.asyncIterator(NEW_LIKE, (payload, variables) => {
//           return payload.liked.postId === variables.postId;
//         })
//       ),
