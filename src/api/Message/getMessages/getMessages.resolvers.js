import prisma from "../../../util/prisma";

export default {
  Query: {
    getMessages: async (_, { chatId, limit, offset }) => {
      const messages = await prisma.message.findMany({
        where: { chatId },
        take: limit,
        skip: offset,
        orderBy: { createdAt: "desc" },
      });
      return messages;
    },
  },
};
