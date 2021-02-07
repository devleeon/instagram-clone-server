import { NEW_COMMENT } from "../../../util/constants";

export default {
  Mutation: {
    addComment: async (_, args, { token, isAuthenticated, prisma }) => {
      const user = await isAuthenticated(token, prisma);
      const { postId, text } = args;
      try {
        const result = await prisma.post.update({
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
