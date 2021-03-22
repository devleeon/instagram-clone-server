import { withFilter } from "apollo-server-express";
import { NEW_COMMENT } from "../../../util/constants";
import prisma from "../../../util/prisma";
export default {
  Subscription: {
    newNotification: {
      subscribe: async (root, args, conext, info) => {
        const { userId } = args;

        return withFilter(
          (_, __, { pubsub }) => pubsub.asyncIterator([NEW_COMMENT]),
          async (payload, { userId }) => {
            const { notification } = payload;
            return notification.newComment.userId === userId;
          }
        )(root, args, conext, info);
      },
    },
  },
};
