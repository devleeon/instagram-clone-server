import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id, location, caption, action } = args;
      const isOwner = await prisma.post.findFirst({
        where: { AND: [{ userId: user.id }, { id }] },
      });
      const post = await prisma.post.findUnique({ where: { id } });

      if (!isOwner) {
        throw Error("Invalid approach. You are not the owner of the post.");
      }
      if (!post) {
        throw Error("The post does not exist.");
      }
      switch (action) {
        case "EDIT":
          await prisma.post.update({
            where: { id },
            data: {
              location,
              caption,
            },
          });
          return true;
        default:
          //action === "DELETE"
          await prisma.$executeRaw`DELETE FROM "Post" WHERE id = ${id};`;
          return true;
      }
    },
  },
};
