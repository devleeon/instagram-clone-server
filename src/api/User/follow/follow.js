export default {
  Mutation: {
    follow: async (_, args, { token, isAuthenticated, prisma }) => {
      const user = await isAuthenticated(token, prisma);
      const { username } = args;
      const followUser = await prisma.user.findUnique({
        where: { username },
      });
      if (!followUser) {
        return false;
      } else {
        try {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              following: { connect: { username } },
            },
          });
          return true;
        } catch {
          return false;
        }
      }
    },
  },
};
