import { generateSecret } from "../../../util/generateSecret";
import { sendSecretMail } from "../../../util/sendMail";
import { PrismaClient } from "@prisma/client";

export default {
  Mutation: {
    requestSecret: async (_, args, {}) => {
      const prisma = new PrismaClient();
      const { emailOrUsername } = args;
      const user = await prisma.user.findUnique(
        emailOrUsername.includes("@")
          ? {
              where: { email: emailOrUsername },
            }
          : {
              where: { username: emailOrUsername },
            }
      );
      if (!user) {
        if (emailOrUsername.includes("@")) {
          return {
            error: {
              message: `Email address ${emailOrUsername} doesn't exist \nPlease sign up first`,
              location: "emailOrUsername",
            },
          };
        } else {
          // wrong username
          return {
            error: {
              message: `The username ${emailOrUsername} doesn't exist \nPlease sign up first`,
              location: "emailOrUsername",
            },
          };
        }
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
