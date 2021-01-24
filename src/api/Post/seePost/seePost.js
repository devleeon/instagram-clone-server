export default {
  Query: {
    seePost: async (_, args, { prisma }) => {
      const { id } = args;
      const post = await prisma.post.findUnique({
        where: {
          id,
        },
      });

      return post;
    },
  },
};
