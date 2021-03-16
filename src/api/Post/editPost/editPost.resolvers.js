import prisma from "../../../util/prisma";
import cloudinary from "cloudinary";

export default {
  Mutation: {
    editPost: async (_, args, { token, isAuthenticated }) => {
      const userId = await isAuthenticated(token);
      const { id, location, caption, action } = args;
      const isOwner = await prisma.post.findFirst({
        where: { AND: [{ userId }, { id }] },
      });
      const post = await prisma.post.findUnique({ where: { id } });
      const photosLength = await (
        await prisma.post.findUnique({ where: { id } }).photos()
      ).length;
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
          for (let i = 0; i < photosLength; i++) {
            await cloudinary.v2.api.delete_resources(`post/${post.id}/${i}`);
          }
          await cloudinary.v2.api.delete_folder(`post/${post.id}`);
          return true;
      }
    },
  },
};
