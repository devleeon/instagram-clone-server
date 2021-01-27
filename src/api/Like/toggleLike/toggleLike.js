export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const existingLike = await prisma.like.findFirst({
        where: { AND: [{ postId }, { userId: user.Id }] },
      });
      if (existingLike) {
        // const result = await prisma.like.delete({
        //   where: { id: existingLike.id },
        // });
        const result = await prisma.$executeRaw`DELETE FROM "Like" WHERE id = ${existingLike.id};`;
        console.log("deleted likes : ", result);
      } else {
        await prisma.like.create({
          data: {
            post: { connect: { id: postId } },
            user: { connect: { id: user.id } },
          },
        });
        console.log("created a like successfully");
      }
      return true;
    },
  },
};
