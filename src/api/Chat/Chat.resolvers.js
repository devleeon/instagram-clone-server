import prisma from "../../util/prisma";

export default {
  Chat: {
    participants: async ({ id }) => {
      return prisma.chat.findUnique({ where: { id } }).participants();
    },
  },
};
