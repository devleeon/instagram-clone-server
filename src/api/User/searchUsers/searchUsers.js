// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

export default {
  Query: {
    searchUsers: async (_, args, { prisma }) => {
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
