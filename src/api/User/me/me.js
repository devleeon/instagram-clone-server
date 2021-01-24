import { PrismaClient } from "@prisma/client";

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      const prisma = new PrismaClient();
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
