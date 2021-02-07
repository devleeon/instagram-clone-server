export default {
  Mutation: {
    editProfile: async (_, args, { request, isAuthenticated, prisma }) => {
      const user = await isAuthenticated(request, prima);
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
