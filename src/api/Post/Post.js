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
    isLiked: async (root, _, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id: postId } = root;
      const result = await prisma.post.findFirst({
        where: {
          AND: [{ id: postId }, { likes: { some: { userId: user.id } } }],
        },
      });

      return Boolean(result);
    },
    numberOfLikes: async (root, _, { prisma }) => {
      const { id } = root;
      return prisma.like.count({ where: { postId: id } });
    },
  },
};
