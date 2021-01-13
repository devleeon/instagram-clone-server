import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default {
  Query: {
    chatList: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
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
