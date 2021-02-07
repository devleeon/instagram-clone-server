export default {
  Post: {
    photos: ({ id }, _, { prisma }) =>
      prisma.post.findUnique({ where: { id } }).photos(),
    comments: ({ id }, _, { prisma }) =>
      prisma.post.findUnique({ where: { id } }).comments(),
    user: ({ id }, _, { prisma }) =>
      prisma.post.findUnique({ where: { id } }).user(),
    likes: ({ id }, _, { prisma }) =>
      prisma.post.findUnique({ where: { id } }).likes(),
    isLiked: async (root, _, { token, isAuthenticated, prisma }) => {
      const user = await isAuthenticated(token, prisma);
      const { id: postId } = root;
      const result = await prisma.like.findFirst({
        where: { AND: [{ postId }, { userId: user.id }] },
      });
      return Boolean(result);
    },
    numberOfLikes: async (root, _, { prisma }) => {
      const { id } = root;
      return prisma.like.count({ where: { postId: id } });
    },
    numberOfComments: async (root, _, { prisma }) => {
      const { id } = root;
      return prisma.comment.count({ where: { postId: id } });
    },
  },
};
