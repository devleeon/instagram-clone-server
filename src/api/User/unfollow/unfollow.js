export default {
  Mutation: {
    unfollow: async (_, args, { token, isAuthenticated, prisma }) => {
      const user = await isAuthenticated(token, prisma);
      const { username } = args;
      const unfollowUser = await prisma.user.findUnique({
        where: { username },
      });
      if (!unfollowUser) {
        return false;
      } else {
        try {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              following: { disconnect: { username } },
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
