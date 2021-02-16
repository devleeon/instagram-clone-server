import prisma from "../../../util/prisma";
export default {
  Mutation: {
    editProfile: async (_, args, { token, isAuthenticated }) => {
      const id = await isAuthenticated(token);
      const { username, email, firstname, lastname, bio } = args;
      try {
        const user = await prisma.user.update({
          where: {
            id,
          },
          data: { username, email, firstname, lastname, bio },
        });
        return user;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
