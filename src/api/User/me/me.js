import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const posts = await prisma.user
        .findUnique({ where: { id: user.id } })
        .posts();
      const following = await prisma.user
        .findUnique({ where: { id: user.id } })
        .following();
      const followedBy = await prisma.user
        .findUnique({ where: { id: user.id } })
        .followedBy();
      return { ...user, posts, following, followedBy };
    },
  },
};
