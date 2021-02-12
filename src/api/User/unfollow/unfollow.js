import prisma from "../../../util/prisma";
export default {
  Mutation: {
    unfollow: async (_, args, { token, isAuthenticated }) => {
      const id = await isAuthenticated(token);
      const { username } = args;
      const unfollowUser = await prisma.user.findUnique({
        where: { username },
      });
      if (!unfollowUser) {
        return false;
      } else {
        try {
          await prisma.user.update({
            where: { id },
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
