import prisma from "../../util/prisma";

export default {
  Save: {
    user: async ({ id }) => {
      return prisma.save.findUnique({ where: { id } }).user();
    },
    post: async ({ id }) => {
      return prisma.save.findUnique({ where: { id } }).post();
    },
  },
};
