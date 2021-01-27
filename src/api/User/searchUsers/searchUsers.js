export default {
  Query: {
    searchUsers: async (_, args, { prisma }) => {
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
      });
      return users;
    },
  },
};
