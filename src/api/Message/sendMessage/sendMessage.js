import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, text, to } = args;
      const { user } = request;
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
      console.log(message);
      return true;
    },
  },
};
