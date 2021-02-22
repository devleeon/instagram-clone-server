import prisma from "../../../util/prisma";

export default {
  Query: {
    getMoreComments: async (_, args, {}) => {
      const { postId, limit, offset } = args;

      const comments = await prisma.comment.findMany({
        take: limit,
        skip: offset,
        where: {
          postId,
        },
        orderBy: { createdAt: "asc" },
      });
      const hasMore =
        (await prisma.comment.count({ where: { postId } })) > limit + offset;
      return {
        comments,
        hasMore,
      };
    },
  },
};
