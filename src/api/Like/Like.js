export default {
  Like: {
    user: ({ id }, _, { prisma }) =>
      prisma.like.findUnique({ where: { id } }).user(),
    post: ({ id }, _, { prisma }) =>
      prisma.like.findUnique({ where: { id } }).post(),
  },
};
