import { NEW_COMMENT } from "../../../util/constants";
import prisma from "../../../util/prisma";

export default {
  Mutation: {
    addComment: async (_, args, { token, isAuthenticated }) => {
      const id = await isAuthenticated(token);
      const { postId, text } = args;
      try {
        const result = await prisma.post.update({
          where: { id: postId },
          data: {
            comments: { create: { text, user: { connect: { id } } } },
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
