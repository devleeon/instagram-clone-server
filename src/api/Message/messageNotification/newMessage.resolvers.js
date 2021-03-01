import { withFilter } from "apollo-server-express";
import { NEW_MESSAGE } from "../../../util/constants";
import prisma from "../../../util/prisma";
export default {
  Subscription: {
    newMessage: {
      subscribe: async (root, args, conext, info) => {
        const { chatId } = args;
        const room = await prisma.chat.findUnique({
          where: { id: chatId },
          select: { id: true },
        });
        if (!room) {
          throw Error("room doesn't exist");
        }
        return withFilter(
          (_, __, { pubsub }) => pubsub.asyncIterator([NEW_MESSAGE]),
          ({ newMessage }, { chatId }) => {
            return newMessage.chatId === chatId;
          }
        )(root, args, conext, info);
      },
    },
  },
};
