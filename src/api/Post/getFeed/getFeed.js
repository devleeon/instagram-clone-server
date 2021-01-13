import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default {
  Query: {
    getFeed: async (_, __, { request, isAuthenticated }) => {
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
      // const comments = await prisma.comment.findMany({
      //   where: { postId: id },
      //   include: { user: { select: { username: true } } },
      // });
      // const photos = await prisma.post.findUnique({ where: { id } }).photos();
      return posts;
    },
  },
};
