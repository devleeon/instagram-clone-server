export default {
  Query: {
    chatList: async (_, __, { token, isAuthenticated, prisma }) => {
      const user = await isAuthenticated(token, prisma);
      const chats = await prisma.chat.findMany({
        where: { participants: { some: { id: user.id } } },
      });

      if (!chats) {
        throw Error("Invalid approach. You can not access to the room.");
      } else {
        return chats;
      }
    },
  },
};
