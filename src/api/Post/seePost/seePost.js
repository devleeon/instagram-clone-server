import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default {
  Query: {
    seePost: async (_, args) => {
      const { id } = args;
      const post = await prisma.post.findUnique({
        where: {
          id,
        },
      });
      const comments = await prisma.comment.findMany({
        where: { postId: id },
        include: { user: { select: { username: true } } },
      });

      const photos = await prisma.post.findUnique({ where: { id } }).photos();
      return { post, comments, photos };
    },
  },
};
