import prisma from "../../util/prisma";

export default {
  Message: {
    from: async ({ id }) => {
      return prisma.message
        .findUnique({ where: { id } })
        .from({ select: { username: true, avatar: true } });
    },
  },
};
