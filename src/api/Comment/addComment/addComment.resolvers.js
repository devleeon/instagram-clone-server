import { NEW_COMMENT } from "../../../util/constants";
import prisma from "../../../util/prisma";

export default {
  Mutation: {
    addComment: async (_, args, { token, isAuthenticated }) => {
      const id = await isAuthenticated(token);
      const { postId, text } = args;
      try {
        const newComment = await prisma.comment.create({
          data: { text, userId: id, postId },
        });

        console.log(newComment);
        return newComment;
      } catch {
        return null;
      }
    },
  },
};
