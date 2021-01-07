import generateToken from "../../../util/generateToken";
export default {
  Mutation: {
    confirmSecret: async (_, args, { prisma }) => {
      const { email, secret } = args;
      const user = await prisma.user.findUnique({ where: { email } });
      if (user.loginSecret === secret) {
        // JWT
        return generateToken(user.id);
      } else {
        throw Error("Wrong email/secret combination");
      }
    },
  },
};
