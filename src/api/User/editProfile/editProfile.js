import { PrismaClient } from "@prisma/client";

export default {
  Mutation: {
    editProfile: async (_, args, { request, isAuthenticated }) => {
      const prisma = new PrismaClient();
      isAuthenticated(request);
      const { user } = request;
      const { username, email, firstname, lastname, bio } = args;
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: { username, email, firstname, lastname, bio },
      });
      return user;
    },
  },
};
