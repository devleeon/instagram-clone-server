import prisma from "../../../util/prisma";

export default {
  Query: {
    getMoreComments: async (_, args, {}) => {
      const { postId, limit, offset } = args;
      if (limit && offset !== undefined) {
        const comments = await prisma.comment.findMany({
          take: limit,
          skip: offset,
          where: {
            postId,
          },
          orderBy: { createdAt: "asc" },
        });
        const hasMore =
          (await prisma.comment.count({ where: { postId } })) > comments.length;

        return {
          comments,
          hasMore,
        };
      } else {
        const comments = await prisma.comment.findMany({
          where: {
            postId,
          },
          orderBy: { createdAt: "asc" },
        });
        const hasMore = false;
        return {
          comments,
          hasMore,
        };
      }
    },
  },
};
