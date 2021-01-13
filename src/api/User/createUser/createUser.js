import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default {
  Mutation: {
    createUser: async (_, args, {}) => {
      const { username, email, firstname, lastname, bio } = args;
      const user = await prisma.user.create({
        data: {
          username,
          email,
          firstname,
          lastname,
          bio,
        },
      });
      return user;
    },
  },
};
