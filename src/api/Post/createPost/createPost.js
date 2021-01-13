import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default {
  Mutation: {
    createPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { location, caption, urls } = args;
      try {
        const post = await prisma.post.create({
          data: {
            location,
            caption,
            user: { connect: { id: user.id } },
          },
        });
        urls.forEach(async (url) => {
          await prisma.photo.create({
            data: { url, post: { connect: { id: post.id } } },
          });
        });
        const photos = await prisma.post
          .findUnique({ where: { id: post.id } })
          .photos();
        return { post, user, photos };
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
};
