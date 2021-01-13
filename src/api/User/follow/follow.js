import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default {
  Mutation: {
    follow: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { followId } = args;
      const followUser = await prisma.user.findUnique({
        where: { id: followId },
      });
      if (!followUser) {
        return false;
      } else {
        try {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              following: { connect: { id: followId } },
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
