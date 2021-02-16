import prisma from "../../util/prisma";

export default {
  Like: {
    user: async ({ id }) => {
      return prisma.like.findUnique({ where: { id } }).user();
    },
    post: async ({ id }) => {
      return prisma.like.findUnique({ where: { id } }).post();
    },
  },
};
