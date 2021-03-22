import { NEW_COMMENT } from "../../../util/constants";
import prisma from "../../../util/prisma";

export default {
  Mutation: {
    addComment: async (_, args, { token, isAuthenticated, pubsub }) => {
      const id = await isAuthenticated(token);
      const { postId, text } = args;
      try {
        const newComment = await prisma.comment.create({
          data: {
            text,
            userId: id,
            postId,
          },
        });
        await prisma.notification.create({
          data: {
            userId: id,
            commentId: newComment.id,
          },
        });
        pubsub.publish(NEW_COMMENT, { notification: { newComment } });
        return newComment;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
};
