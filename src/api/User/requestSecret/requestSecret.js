import { PrismaClient } from "@prisma/client";
import { generateSecret } from "../../../util/generateSecret";
import { sendSecretMail } from "../../../util/sendMail";
export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const prisma = new PrismaClient();
      const { email } = args;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        //no user exists
        return false;
      }
      const secret = generateSecret();
      await prisma.user.update({
        where: { email },
        data: { loginSecret: secret },
      });
      sendSecretMail(email);
      return true;
    },
  },
};
