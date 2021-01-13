import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default {
  Mutation: {
    unfollow: async (_, args, { request, isAuthenticated }) => {
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
