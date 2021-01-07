export default {
  Mutation: {
    deletePost: async (_, args, { request, prisma, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const post = await prisma.post.findUnique({ where: { id: postId } });
      if (!post) {
        // the post doesn't exist
        return false;
      } else if (user.id !== post.userId) {
        // logged in user isn't the owner of the post
        return false;
      } else {
        await prisma.post.delete({ where: { id: postId } });
        return true;
      }
    },
  },
};
