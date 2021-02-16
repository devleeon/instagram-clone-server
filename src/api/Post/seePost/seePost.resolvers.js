import prisma from "../../../util/prisma";

export default {
  Query: {
    seePost: async (_, args) => {
      const { postId } = args;
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      return post;
    },
  },
};
