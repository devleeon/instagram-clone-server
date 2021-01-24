import { PrismaClient } from "@prisma/client";
import argon from "argon2";
import generateToken from "../../../util/generateToken";
const prisma = new PrismaClient();
export default {
  Mutation: {
    createUser: async (_, args, {}) => {
      const { username, emailOrPhone, firstname, password } = args;
      let doesExist, email, phoneNo;
      emailOrPhone.includes("@")
        ? (email = emailOrPhone)
        : (phoneNo = emailOrPhone);
      // check if username, email or phone number already exists.
      if (email) {
        doesExist = await prisma.user.findUnique({ where: { email } });
        if (doesExist) {
          // same email is already being used
          return {
            error: {
              message: `email address "${email}" is already being used`,
              location: "email",
            },
          };
        }
      }
      if (username) {
        doesExist = await prisma.user.findUnique({ where: { username } });
        if (doesExist) {
          // same username is already being used
          return {
            error: {
              message: `username "${username}" is already being used`,
              location: "username",
            },
          };
        }
      }
      if (phoneNo) {
        doesExist = await prisma.user.findUnique({ where: { phoneNo } });
        if (doesExist) {
          // same phoneNo is already being used
          return {
            error: {
              message: `phone number "${phoneNo}" is already being used`,
              location: "phoneNo",
            },
          };
        }
      }
      const hash = await argon.hash(password);
      const user = await prisma.user.create(
        emailOrPhone.includes("@")
          ? {
              data: {
                username,
                email,
                firstname,
                password: hash,
              },
            }
          : {
              data: {
                username,
                phoneNo,
                firstname,
                password: hash,
              },
            }
      );
      const token = generateToken(user.id);
      return { user, token };
    },
  },
};
