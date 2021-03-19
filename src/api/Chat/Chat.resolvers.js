import prisma from "../../util/prisma";

export default {
  Chat: {
    participants: async ({ id }, _, { token, isAuthenticated }) => {
      const participants = await prisma.chat
        .findUnique({ where: { id } })
        .participants({ select: { username: true, avatar: true } });

      return participants;
    },
    participantsExceptMe: async ({ id }, _, { token, isAuthenticated }) => {
      const userId = await isAuthenticated(token);
      const participants = await prisma.chat
        .findUnique({ where: { id } })
        .participants({ select: { username: true, avatar: true, id: true } });
      let result = [];
      for (let i = 0; i < participants.length; i++) {
        if (participants[i].id !== userId) {
          result.push(participants[i]);
        }
      }
      return result;
    },
  },
};
