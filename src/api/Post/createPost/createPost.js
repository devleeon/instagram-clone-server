export default {
  Mutation: {
    createPost: async (_, args, { request, prisma, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { location, caption } = args;
      const post = await prisma.post.create({
        data: { location, caption, user: { connect: { id: user.id } } },
      });
      return { ...post, user };
    },
  },
};
