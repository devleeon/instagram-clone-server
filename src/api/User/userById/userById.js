import { PrismaClient } from "@prisma/client";

export default {
  Query: {
    userById: (_, args, {}) => {
      const prisma = new PrismaClient();
      const { id } = args;
      return prisma.user.findUnique({ where: { id } });
    },
  },
};
