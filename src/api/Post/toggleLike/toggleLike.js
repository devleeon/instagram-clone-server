import { PrismaClient } from "@prisma/client";
import { isAuthenticated } from "../../../util/isAuthenticated";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      const prisma = new PrismaClient();
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const post = await prisma.post.findUnique({ where: { id: postId } });
      const existingLike = await prisma.like.findFirst({
        where: { postId, userId: user.Id },
      });
      if (existingLike) {
        await prisma.like.delete(existingLike);
      } else {
        await prisma.like.create({
          data: {
            post: { connect: { id: postId } },
            user: { connect: { id: user.id } },
          },
        });
      }
      return true;
    },
  },
};
