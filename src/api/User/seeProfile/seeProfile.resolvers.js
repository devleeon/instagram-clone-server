import prisma from "../../../util/prisma";
export default {
  Query: {
    seeProfile: async (_, args) => {
      const { username } = args;
      const user = await prisma.user.findUnique({ where: { username } });
      return user;
    },
  },
};
