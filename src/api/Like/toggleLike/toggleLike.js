export default {
  Mutation: {
    toggleLike: async (_, args, { request, prisma, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const existingLike = await prisma.like.findFirst({
        where: { postId, userId: user.Id },
      });
      if (existingLike) {
        await prisma.like.deleteMany({ where: { postId, userId: user.Id } });
        console.log("deleted likes successfully");
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
