export default {
  Query: {
    userById: (_, args, { prisma }) => {
      const { id } = args;
      return prisma.user.findUnique({ where: { id } });
    },
  },
};
