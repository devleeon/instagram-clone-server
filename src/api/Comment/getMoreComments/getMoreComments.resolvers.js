import prisma from "../../../util/prisma";

export default {
  Query: {
    getMoreComments: async (_, args, {}) => {
      const { postId, limit, offset } = args;
      const moreComments = await prisma.post
        .findUnique({ where: { id: postId } })
        .comments({ take: limit, skip: offset });
    },
  },
};
