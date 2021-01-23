import { PrismaClient } from "@prisma/client";
import generateToken from "../../../util/generateToken";
import argon from "argon2";

export default {
  Mutation: {
    login: async (_, args) => {
      const prisma = new PrismaClient();
      const { emailOrUsername, password } = args;
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
        // wrong username
        return {
          error: {
            message: `The username ${emailOrUsername} doesn't exist`,
            location: "emailOrUsername",
          },
        };
      }

      const valid = await argon.verify(user.password, password);

      if (!valid) {
        // wrong password
        return {
          error: {
            message: `wrong password`,
            location: "password",
          },
        };
      }
      return { token: generateToken(user.id), user };

      // if (user.loginSecret === secret) {
      //   // delete loginSecret
      //   await prisma.user.update({
      //     where: { email },
      //     data: { loginSecret: "" },
      //   });
      //   // JWT
      //   return generateToken(user.id);
      // } else {
      //   throw Error("Wrong email/secret combination");
      // }
    },
  },
};
