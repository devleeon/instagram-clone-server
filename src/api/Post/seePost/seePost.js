export default {
  Query: {
    seePost: async (_, args, { prisma }) => {
      const { id } = args;
      const post = await prisma.post.findUnique({
        where: {
          id,
        },
      });
      const numberOfLikes = await prisma.like.count({ where: { postId: id } });
      const comments = await prisma.comment.findMany({
        where: { postId: id },
        include: { user: { select: { username: true } } },
      });

      return { post, comments, numberOfLikes };
    },
  },
};
