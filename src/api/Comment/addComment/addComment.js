export default {
  Mutation: {
    addComment: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      // needed to add timestamp
      const { postId, text } = args;
      const { user } = request;

      try {
        await prisma.post.update({
          where: { id: postId },
          data: {
            comments: { create: { text, user: { connect: { id: user.id } } } },
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
