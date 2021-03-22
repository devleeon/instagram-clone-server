import { NEW_FOLLOWER } from "../../../util/constants";
import prisma from "../../../util/prisma";
export default {
  Mutation: {
    follow: async (_, args, { token, isAuthenticated, pubsub }) => {
      const id = await isAuthenticated(token);
      const { username } = args;
      const followUser = await prisma.user.findUnique({
        where: { username },
      });
      if (!followUser) {
        return false;
      } else {
        try {
          const result = await prisma.user.update({
            where: { id },
            data: {
              following: { connect: { username } },
            },
          });
          const notif = await prisma.notification.create({
            data: {
              userId: followUser.id,
              followerId: id,
            },
          });
          pubsub.publish(NEW_FOLLOWER, {
            newNotification: notif,
          });
          return true;
        } catch {
          return false;
        }
      }
    },
  },
};
