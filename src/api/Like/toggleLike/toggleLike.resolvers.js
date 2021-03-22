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
        result = await prisma.like.create({
          data: {
            post: { connect: { id: postId } },
            user: { connect: { id: userId } },
          },
        });
        await prisma.notification.create({
          data: {
            userId,
            likeId: result.id,
          },
        });
        pubsub.publish(NEW_LIKE, {
          notification: { liked: result },
          liked: result,
        });
      }
      return true;
    },
  },
};
