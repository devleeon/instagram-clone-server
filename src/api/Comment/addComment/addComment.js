import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default {
  Mutation: {
    addComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      // needed to add timestamp
      const { postId, text } = args;
      const { user } = request;

      try {
        await prisma.post.update({
          where: { id: postId },
          data: {
            comments: { create: { text, user: { connect: { id: user.id } } } },
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
