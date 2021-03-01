import prisma from "../../../util/prisma";

export default {
  Mutation: {
    createChat: async (_, args, { token, isAuthenticated }) => {
      const userId = await isAuthenticated(token);
      const { toId } = args;
      const chat = await prisma.chat.findFirst({
        where: {
          AND: [
            { participants: { some: { id: userId } } },
            { participants: { some: { id: { in: toId } } } },
          ],
        },
      });

      if (!chat) {
        const result = await prisma.chat.create({
          data: {
            participants: {
              connect: [
                { id: userId },
                ...toId.map((id) => {
                  return { id: id };
                }),
              ],
            },
          },
        });
        return result;
      } else {
        return chat;
      }
    },
  },
};
