import { PrismaClient } from "@prisma/client";
import { isAuthenticated } from "../../../util/isAuthenticated";

export default {
  Mutation: {
    createPost: async (_, args, { request }) => {
      const prisma = new PrismaClient();
      isAuthenticated(request);
      const { user } = request;
      const { location, caption } = args;
      const post = prisma.post.create({
        data: { location, caption, user: { connect: { id: user.id } } },
      });

      return post;
    },
  },
};
