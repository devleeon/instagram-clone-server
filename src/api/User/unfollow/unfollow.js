import { PrismaClient } from "@prisma/client";

export default {
  Mutation: {
    unfollow: async (_, args, { request, isAuthenticated }) => {
      const prisma = new PrismaClient();
      isAuthenticated(request);
      const { user } = request;
      const { unfollowId } = args;
      const unfollowUser = await prisma.user.findUnique({
        where: { id: unfollowId },
      });
      if (!unfollowUser) {
        return false;
      } else {
        try {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              following: { disconnect: { id: unfollowId } },
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
