import { withFilter } from "apollo-server-express";
import { NEW_LIKE } from "../../../util/constants";

export default {
  Subscription: {
    liked: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(NEW_LIKE),
        (payload, variables) => {
          return payload.liked.postId === variables.postId;
        }
      ),
    },
  },
};
