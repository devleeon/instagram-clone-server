import prisma from "../../../util/prisma";

export default {
  Query: {
    getIntoChat: async (_, args, { token, isAuthenticated }) => {
      const userId = await isAuthenticated(token);
      const { toId } = args;

      const chat = await prisma.chat.findFirst({
        where: {
          AND: [
            { participants: { some: { id: userId } } },
            { participants: { some: { id: toId } } },
          ],
        },
      });
      // const messages = await prisma.chat
      //   .findFirst({
      //     where: { AND: [{ id }, { participants: { some: { id: userId } } }] },
      //   })
      //   .messages({ take: 15 });
      if (!chat) {
        await prisma.chat.create({
          data: {
            participants: { connect: { id: userId } },
            participants: { connect: { id: toId } },
          },
        });
      } else {
        return chat;
      }
    },
  },
};
