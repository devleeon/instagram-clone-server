import prisma from "../../../util/prisma";
export default {
  Query: {
    me: async (_, __, { isAuthenticated, token }) => {
      const id = await isAuthenticated(token);
      const user = prisma.user.findUnique({ where: { id } });
      return user;
    },
  },
};
