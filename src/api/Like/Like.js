export default {
  Like: {
    user: async ({ id }, _, { prisma }) => {
      return prisma.like.findUnique({ where: { id } }).user();
    },
    post: async ({ id }, _, { prisma }) => {
      return prisma.like.findUnique({ where: { id } }).post();
    },
  },
};
