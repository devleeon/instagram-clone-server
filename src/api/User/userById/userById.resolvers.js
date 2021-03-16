import prisma from "../../../util/prisma";
export default {
  Query: {
    userById: (_, args) => {
      const { id } = args;
      return prisma.user.findUnique({ where: { id } });
    },
  },
};
