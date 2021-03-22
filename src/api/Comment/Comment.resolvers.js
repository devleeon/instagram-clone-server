import prisma from "../../util/prisma";

export default {
  Comment: {
    user: async ({ id }) => prisma.comment.findUnique({ where: { id } }).user(),
    post: async ({ id }) => prisma.comment.findUnique({ where: { id } }).post(),
  },
};
