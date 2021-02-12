import prisma from "../../../util/prisma";

export default {
  Mutation: {
    savePost: async (_, args, { token, isAuthenticated }) => {
      const { postId } = args;
      const userId = await isAuthenticated(token);
      const isSaved = await prisma.save.findFirst({
        where: { AND: [{ postId }, { userId }] },
      });
      if (Boolean(isSaved)) {
        // const result = await prisma.like.delete({
        //   where: { id: existingLike.id },
        // });
        await prisma.$executeRaw`DELETE FROM "Save" WHERE id = ${isSaved.id};`;
        return false;
      } else {
        await prisma.save.create({
          data: {
            post: { connect: { id: postId } },
            user: { connect: { id: userId } },
          },
        });
      }
      return true;
    },
  },
};
