import { withFilter } from "apollo-server-express";
import { NEW_FOLLOWER, NEW_LIKE } from "../../../util/constants";

export default {
  Subscription: {
    notification: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator([NEW_FOLLOWER, NEW_LIKE]),
        (payload, variables) => {
          console.log(payload);
          return (
            payload.notification.liked.post.user.username === variables.username
          );
        }
      ),
    },
  },
};

// withFilter((_, __, { pubsub }) =>
//         pubsub.asyncIterator(NEW_LIKE, (payload, variables) => {
//           return payload.liked.postId === variables.postId;
//         })
//       ),
