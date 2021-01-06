import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    sayGoodbye: async () => {
      console.log(await prisma.user.findMany());
      return "Byebye!";
    },
  },
};
