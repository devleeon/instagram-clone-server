export default {
  Query: {
    userById: async (_, args, { prisma }) => {
      const { id } = args;
      return prisma.user.findUnique({ where: { id } });
    },
  },
};
