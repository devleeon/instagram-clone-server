import { withFilter } from "apollo-server-express";
import { NEW_COMMENT, NEW_FOLLOWER, NEW_LIKE } from "../../../util/constants";
import prisma from "../../../util/prisma";
export default {
  Subscription: {
    newNotification: {
      subscribe: async (root, args, context, info) => {
        const { isAuthenticated, token } = context;
        const userId = await isAuthenticated(token.token);
        const notifications = await prisma.notification.findMany({
          where: { userId },
          orderBy: { createdAt: "desc" },
        });
        new Promise(() => {
          notifications.map(async (n) => {
            if (
              n.likeId === null &&
              n.commentId === null &&
              n.followerId === null
            ) {
              await prisma.$executeRaw`DELETE FROM "Notification" WHERE id = ${n.id};`;
            }
          });
        });
        return withFilter(
          (_, __, { pubsub }) =>
            pubsub.asyncIterator([NEW_COMMENT, NEW_LIKE, NEW_FOLLOWER]),
          async ({ newNotification }) => {
            return newNotification.userId === userId;
          }
        )(root, args, context, info);
      },
    },
  },
};
