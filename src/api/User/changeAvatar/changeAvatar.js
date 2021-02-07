export default {
  Mutation: {
    changeAvatar: async (
      _,
      args,
      { isAuthenticated, prisma, token, storage }
    ) => {
      const user = await isAuthenticated(token, prisma);
      return args.file.then((file) => {
        return file;
      });
    },
  },
};
