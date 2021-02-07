export default {
  Query: {
    getIntoChat: async (_, args, { token, isAuthenticated, prisma }) => {
      const user = await isAuthenticated(token, prisma);
      const { id } = args;

      const chat = await prisma.chat.findFirst({
        where: { AND: [{ id }, { participants: { some: { id: user.id } } }] },
      });
      const messages = await prisma.chat
        .findFirst({
          where: { AND: [{ id }, { participants: { some: { id: user.id } } }] },
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
