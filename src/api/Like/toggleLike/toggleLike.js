import { NEW_LIKE } from "../../../util/constants";

export default {
  Mutation: {
    toggleLike: async (_, args, { token, isAuthenticated, prisma, pubsub }) => {
      const { postId } = args;
      const user = await isAuthenticated(token, prisma);
      const existingLike = await prisma.like.findFirst({
        where: { AND: [{ postId }, { userId: user.id }] },
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
            user: { connect: { id: user.id } },
          },
        });
        pubsub.publish(NEW_LIKE, {
          liked: result,
        });
      }
      return true;
    },
  },
};
