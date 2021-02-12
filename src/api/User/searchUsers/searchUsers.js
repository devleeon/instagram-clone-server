import prisma from "../../../util/prisma";
export default {
  Query: {
    searchUsers: async (_, args) => {
      const { query } = args;
      console.log("query: ", query);
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { firstname: { contains: query } },
            { lastname: { contains: query } },
            { username: { contains: query } },
          ],
        },
        take: 20,
        orderBy: [
          { username: "asc" },
          { firstname: "asc" },
          { lastname: "asc" },
        ],
      });
      return users;
    },
  },
};
