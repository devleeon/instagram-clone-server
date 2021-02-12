import prisma from "../../../util/prisma";

export default {
  Mutation: {
    createPost: async (_, args, { token, isAuthenticated }) => {
      const id = await isAuthenticated(token);
      const { location, caption, urls } = args;
      try {
        const post = await prisma.post.create({
          data: {
            location,
            caption,
            user: { connect: { id } },
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
