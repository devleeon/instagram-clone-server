export default {
  Mutation: {
    createUser: async (_, args, { prisma }) => {
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
