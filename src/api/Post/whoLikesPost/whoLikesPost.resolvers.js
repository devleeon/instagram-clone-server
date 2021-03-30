import prisma from "../../../util/prisma";

export default {
  Query: {
    whoLikesPost: async (_, args) => {
      const { postId, limit, offset } = args;
      let likes;
      if (offset) {
        likes = await prisma.post
          .findUnique({
            where: {
              id: postId,
            },
          })
          .likes({ take: limit, skip: offset });
      } else {
        likes = await prisma.post
          .findUnique({
            where: {
              id: postId,
            },
          })
          .likes({ take: limit });
      }
      return likes;
    },
  },
};
