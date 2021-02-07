export default {
  Query: {
    seeProfile: async (_, args, { prisma }) => {
      const { username } = args;
      const user = await prisma.user.findUnique({ where: { username } });
      return user;
    },
  },
};
