import prisma from "../../../util/prisma";
import generateToken from "../../../util/generateToken";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { secret, email } = args;
      const user = await prisma.user.findUnique({ where: { email } });
      if (secret !== user.loginSecret) {
        return {
          error: {
            message: `Secret is wrong`,
            location: "secret",
          },
        };
      }

      return { token: generateToken(user.id), user };
    },
  },
};
