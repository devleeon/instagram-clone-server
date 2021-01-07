import { PrismaClient } from "@prisma/client";

export default {
  Mutation: {
    createUser: async (_, args) => {
      const prisma = new PrismaClient();
      const { username, email, firstname = "", lastname = "", bio = "" } = args;
      const user = prisma.user.create({
        data: { username, email, firstname, lastname, bio },
      });
      return user;
    },
  },
};
