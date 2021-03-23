import { NEW_COMMENT } from "../../../util/constants";
import prisma from "../../../util/prisma";

export default {
  Mutation: {
    addComment: async (_, args, { token, isAuthenticated, pubsub }) => {
      const id = await isAuthenticated(token);
      const { postId, text } = args;
      const post = await prisma.post.findUnique({
        where: { id: postId },
        select: { userId: true },
      });
      if (!post) {
        // post doesn't exist
        console.log("post doesn't exist");
        return null;
      }
      try {
        const newComment = await prisma.comment.create({
          data: {
            text,
            userId: id,
            postId,
          },
        });
        if (post.userId !== id) {
          // post owner doesn't equal to the logged in user
          // then send a notification
          const notif = await prisma.notification.create({
            data: {
              userId: post.userId,
              commentId: newComment.id,
            },
          });
          pubsub.publish(NEW_COMMENT, {
            newNotification: notif,
          });
        }
        return newComment;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
};
