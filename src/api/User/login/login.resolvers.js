import argon from "argon2";
import generateToken from "../../../util/generateToken";
import prisma from "../../../util/prisma";

export default {
  Mutation: {
    login: async (_, args) => {
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

      const valid = await argon.verify(user.password, password);
      if (!valid) {
        // wrong password
        return {
          error: {
            message: "wrong password",
            location: "password",
          },
        };
      }
      return { token: generateToken(user.id), user };
    },
  },
};
