import { PrismaClient } from "@prisma/client";

export default {
  Query: {
    searchUsers: async (_, args, {}) => {
      const prisma = new PrismaClient();
      const { query } = args;
      console.log("query: ", query);
      const posts = await prisma.user.findMany({
        where: {
          OR: [
            { firstname: { contains: query } },
            { lastname: { contains: query } },
            { username: { contains: query } },
          ],
        },
      });
      return posts;
    },
  },
};
