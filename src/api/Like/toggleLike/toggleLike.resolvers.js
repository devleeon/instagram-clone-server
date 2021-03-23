import { NEW_LIKE } from "../../../util/constants";
import prisma from "../../../util/prisma";

export default {
  Mutation: {
    toggleLike: async (_, args, { token, isAuthenticated, pubsub }) => {
      const { postId } = args;
      const userId = await isAuthenticated(token);
      const existingLike = await prisma.like.findFirst({
        where: { AND: [{ postId }, { userId }] },
      });
      let result;
      if (Boolean(existingLike)) {
        // const result = await prisma.like.delete({
        //   where: { id: existingLike.id },
        // });
        result = await prisma.$executeRaw`DELETE FROM "Like" WHERE id = ${existingLike.id};`;
      } else {
        const post = await prisma.post.findUnique({
          where: { id: postId },
        });
        if (!post) {
          // post doesn't exist
          return false;
        }
        result = await prisma.like.create({
          data: {
            post: { connect: { id: postId } },
            user: { connect: { id: userId } },
          },
        });
        if (post.userId !== userId) {
          // post owner doesn't equal to the logged in user
          // then send a notification
          const notif = await prisma.notification.create({
            data: {
              userId: post.userId,
              likeId: result.id,
            },
          });
          pubsub.publish(NEW_LIKE, {
            newNotification: notif,
          });
        }
      }
      return true;
    },
  },
};
