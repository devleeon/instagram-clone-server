export default {
  Query: {
    getIntoChat: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;

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
