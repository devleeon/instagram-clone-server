import prisma from "../../../util/prisma";

export default {
  Query: {
    getFeed: async (_, { limit = 5, cursor }, { token, isAuthenticated }) => {
      const id = await isAuthenticated(token);
      const followers = await prisma.user
        .findUnique({
          where: {
            id,
          },
        })
        .following();
      let posts;
      const allPosts = await prisma.post.findMany({
        where: {
          user: {
            id: { in: [...followers.map((user) => user.id), id] },
          },
        },
        orderBy: { createdAt: "desc" },
        select: { createdAt: true, id: true },
      });
      if (!cursor) {
        //first request
        posts = await prisma.post.findMany({
          take: limit + 1,
          where: {
            user: {
              id: { in: [...followers.map((user) => user.id), id] },
            },
          },
          orderBy: { createdAt: "desc" },
        });
      } else {
        posts = await prisma.post.findMany({
          take: limit + 1,
          cursor: { id: cursor },
          where: {
            user: {
              id: { in: [...followers.map((user) => user.id), id] },
            },
          },
          orderBy: { createdAt: "desc" },
        });
      }
      return {
        feed: posts.slice(0, limit),
        cursor: posts.length ? posts[posts.length - 1].id : null,
        hasMore: posts.length
          ? posts[limit > posts.length ? posts.length - 1 : limit - 1].id !==
            allPosts[allPosts.length - 1].id
          : false,
      };
    },
  },
};
