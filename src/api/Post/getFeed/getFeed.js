export default {
  Query: {
    getFeed: async (_, __, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      const followers = await prisma.user
        .findUnique({
          where: {
            id: user.id,
          },
        })
        .following();
      const posts = await prisma.post.findMany({
        where: {
          user: { id: { in: [...followers.map((user) => user.id), user.id] } },
        },
        orderBy: { createdAt: "desc" },
      });
      return posts;
    },
  },
};
