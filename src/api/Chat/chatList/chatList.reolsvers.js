import prisma from "../../../util/prisma";

export default {
  Query: {
    chatList: async (_, __, { token, isAuthenticated }) => {
      const id = await isAuthenticated(token);
      const chats = await prisma.chat.findMany({
        where: { participants: { some: { id } } },
      });

      if (!chats) {
        throw Error("Invalid approach. You can not access to the room.");
      } else {
        return chats;
      }
    },
  },
};
