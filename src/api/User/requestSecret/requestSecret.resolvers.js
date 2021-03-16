import { generateSecret } from "../../../util/generateSecret";
import { sendSecretMail } from "../../../util/sendMail";
import prisma from "../../../util/prisma";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return {
          error: {
            message: `Email address ${email} doesn't exist \nPlease sign up first`,
            location: "email",
          },
        };
      }
      const secret = generateSecret();
      await prisma.user.update({
        where: { email: user.email },
        data: { loginSecret: secret },
      });
      sendSecretMail(email, secret, user.username);
      return true;
    },
  },
};
