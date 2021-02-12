import prisma from "../../../util/prisma";
export default {
  Mutation: {
    follow: async (_, args, { token, isAuthenticated }) => {
      const id = await isAuthenticated(token);
      const { username } = args;
      const followUser = await prisma.user.findUnique({
        where: { username },
      });
      if (!followUser) {
        return false;
      } else {
        try {
          const result = await prisma.user.update({
            where: { id },
            data: {
              following: { connect: { username } },
            },
          });
          pubsub.publish(NEW_FOLLOWER, {
            newFollower: result,
          });
          return true;
        } catch {
          return false;
        }
      }
    },
  },
};
