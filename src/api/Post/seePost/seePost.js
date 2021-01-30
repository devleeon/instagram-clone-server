export default {
  Query: {
    seePost: async (_, args, { prisma }) => {
      const { postId } = args;
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      return post;
    },
  },
};
