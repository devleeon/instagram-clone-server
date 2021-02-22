import { withFilter } from "apollo-server-express";
import { NEW_MESSAGE } from "../../../util/constants";
import prisma from "../../../util/prisma";
export default {
  Subscription: {
    liked: {
      subscribe: async (_, args, { token, isAuthenticated }) => {
        const id = await isAuthenticated(token);
        const chats = await prisma.chat.findMany({
          where: { participants: { some: { id } } },
        });
        return withFilter(
          (_, __, { pubsub }) => pubsub.asyncIterator(NEW_MESSAGE),
          ({ notification }, { chatId }) => {
            return notification.liked.postId === chatId;
          }
        );
      },
    },
  },
};
