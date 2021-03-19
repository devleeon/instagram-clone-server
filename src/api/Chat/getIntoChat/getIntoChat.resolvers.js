import prisma from "../../../util/prisma";

export default {
  Query: {
    getIntoChat: async (_, args, { token, isAuthenticated }) => {
      const { chatId } = args;
      const chat = await prisma.chat.findUnique({ where: { id: chatId } });
      if (!chat) {
        throw Error("there is no chat");
      }
      return chat;
    },
  },
};
