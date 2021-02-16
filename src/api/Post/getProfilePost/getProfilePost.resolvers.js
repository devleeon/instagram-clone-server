import prisma from "../../../util/prisma";

export default {
  Query: {
    getProfilePost: async (_, args) => {
      const { username, limit, offset } = args;
      const posts = await prisma.post.findMany({
        take: limit,
        where: {
          user: {
            username: { in: [username] },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: offset,
      });
      return posts;
    },
  },
};
