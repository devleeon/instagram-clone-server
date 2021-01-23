import { PrismaClient } from "@prisma/client";
import argon from "argon2";
import generateToken from "../../../util/generateToken";
const prisma = new PrismaClient();
export default {
  Mutation: {
    createUser: async (_, args, {}) => {
      const { username, emailOrPhone, firstname, password } = args;
      const hash = await argon.hash(password);
      const user = await prisma.user.create(
        emailOrPhone.includes("@")
          ? {
              data: {
                username,
                email: emailOrPhone,
                firstname,
                password: hash,
              },
            }
          : {
              data: {
                username,
                phoneNo: emailOrPhone,
                firstname,
                password: hash,
              },
            }
      );
      return user;
    },
  },
};
