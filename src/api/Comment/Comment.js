export default {
  Comment: {
    user: async ({ id }, _, { prisma }) =>
      prisma.comment.findUnique({ where: { id } }).user(),
  },
};
