import prisma from "../../../util/prisma";

export default {
  Query: {
    getIntoChat: async (_, args, { token, isAuthenticated }) => {
      const userId = await isAuthenticated(token);
      const { id } = args;

      const chat = await prisma.chat.findFirst({
        where: { AND: [{ id }, { participants: { some: { id: userId } } }] },
      });
      const messages = await prisma.chat
        .findFirst({
          where: { AND: [{ id }, { participants: { some: { id: userId } } }] },
        })
        .messages();
      if (!chat) {
        throw Error("Invalid approach. You can not access to the room.");
      } else {
        return { ...chat, messages };
      }
    },
  },
};
