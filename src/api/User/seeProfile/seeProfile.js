import { PrismaClient } from "@prisma/client";

export default {
  Query: {
    seeProfile: async (_, args, {}) => {
      const prisma = new PrismaClient();
      const { username } = args;
      const user = await prisma.user.findUnique({ where: { username } });
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
