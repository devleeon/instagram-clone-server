import { NEW_MESSAGE } from "../../../util/constants";
import prisma from "../../../util/prisma";

export default {
  Mutation: {
    sendMessage: async (_, args, { token, isAuthenticated, pubsub }) => {
      const user = await isAuthenticated(token, prisma);
      const { id, text, to } = args;
      let room;
      if (id === undefined) {
        // chat room doesn't exist
        room = await prisma.chat.create({
          data: {
            participants: {
              connect: [
                ...to.map((id) => {
                  return { id };
                }),
                { id: user.id },
              ],
            },
          },
        });
      } else {
        // the chat already exists
        room = await prisma.chat.findUnique({
          where: {
            id,
          },
        });
      }
      const message = await prisma.message.create({
        data: {
          text,
          from: { connect: { id: user.id } },
          to: {
            connect: [
              ...to.map((id) => {
                return { id };
              }),
            ],
          },
          chatRoom: { connect: { id: room.id } },
        },
      });
      pubsub.publish(NEW_MESSAGE, {
        notification: { message },
      });
      return true;
    },
  },
};
