import prisma from "../../../util/prisma";

export default {
  Query: {
    getFeed: async (_, args, { token, isAuthenticated }) => {
      const id = await isAuthenticated(token);
      const { limit, offset } = args;
      const followers = await prisma.user
        .findUnique({
          where: {
            id,
          },
        })
        .following();
      let posts;
      if (!offset) {
        //first request
        posts = await prisma.post.findMany({
          take: limit,
          where: {
            user: {
              id: { in: [...followers.map((user) => user.id), id] },
            },
          },
          orderBy: { createdAt: "desc" },
        });
      } else {
        posts = await prisma.post.findMany({
          take: limit,
          where: {
            user: {
              id: { in: [...followers.map((user) => user.id), id] },
            },
          },
          orderBy: { createdAt: "desc" },
          skip: offset,
        });
      }
      return posts;
    },
  },
};
