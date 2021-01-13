import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default {
  Query: {
    userById: (_, args, {}) => {
      const { id } = args;
      return prisma.user.findUnique({ where: { id } });
    },
  },
};
