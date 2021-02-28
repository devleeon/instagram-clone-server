import prisma from "../../util/prisma";

export default {
  Chat: {
    participants: async ({ id }) => {
      const participants = await prisma.chat
        .findUnique({ where: { id } })
        .participants({ select: { username: true, avatar: true } });
      return participants;
    },
  },
};
