export default {
  Query: {
    getFeed: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { limit, offset } = args;
      const { user } = request;
      const followers = await prisma.user
        .findUnique({
          where: {
            id: user.id,
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
              id: { in: [...followers.map((user) => user.id), user.id] },
            },
          },
          orderBy: { createdAt: "desc" },
        });
      } else {
        posts = await prisma.post.findMany({
          take: limit,
          where: {
            user: {
              id: { in: [...followers.map((user) => user.id), user.id] },
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
