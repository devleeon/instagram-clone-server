import prisma from "../../../util/prisma";
export default {
  Query: {
    getSaved: async (_, args) => {
      const { username, limit, offset } = args;
      const saved = await prisma.save.findMany({
        take: limit,
        skip: offset,
        orderBy: { createdAt: "desc" },
        where: {
          user: {
            username: { in: [username] },
          },
        },
      });
      return saved;
    },
  },
};
