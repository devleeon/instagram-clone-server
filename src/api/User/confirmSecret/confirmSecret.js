import { PrismaClient } from "@prisma/client";
import generateToken from "../../../util/generateToken";
export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const prisma = new PrismaClient();
      const user = await prisma.user.findUnique({ where: { email } });
      if (user.loginSecret === secret) {
        // delete loginSecret
        await prisma.user.update({
          where: { email },
          data: { loginSecret: "" },
        });
        // JWT
        return generateToken(user.id);
      } else {
        throw Error("Wrong email/secret combination");
      }
    },
  },
};
