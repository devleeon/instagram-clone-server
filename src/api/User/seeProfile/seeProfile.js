import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default {
  Query: {
    seeProfile: async (_, args, {}) => {
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
