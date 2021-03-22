import { NEW_MESSAGE } from "../../../util/constants";
import prisma from "../../../util/prisma";

export default {
  Mutation: {
    sendMessage: async (_, args, { token, isAuthenticated, pubsub }) => {
      const id = await isAuthenticated(token);
      const { chatId, text } = args;
      const room = await prisma.chat.findUnique({
        where: {
          id: chatId,
        },
      });
      const update = await prisma.chat.update({
        where: { id: chatId },
        data: { updatedAt: new Date() },
      });
      const message = await prisma.message.create({
        data: {
          text,
          from: { connect: { id } },
          chatRoom: { connect: { id: room.id } },
        },
      });
      pubsub.publish(NEW_MESSAGE, { newMessage: message });

      return true;
    },
  },
};
