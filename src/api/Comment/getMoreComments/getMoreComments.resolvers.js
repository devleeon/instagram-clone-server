import prisma from "../../../util/prisma";

export default {
  Query: {
    getMoreComments: async (_, { postId, limit = 5, cursor }, {}) => {
      const allComments = await prisma.comment.findMany({
        where: { postId },
        select: { id: true },
        orderBy: { createdAt: "desc" },
      });
      if (cursor) {
        const comments = await prisma.comment.findMany({
          cursor: { id: cursor },
          take: limit + 1,
          where: {
            postId,
          },
          orderBy: { createdAt: "desc" },
        });
        return {
          comments: comments.slice(0, limit),
          cursor: comments.length ? comments[comments.length - 1].id : null,
          // if the cursor at the end of the paginated results is the same as the
          // last item in _all_ results, then there are no more results after this
          hasMore: comments.length
            ? comments[
                limit > comments.length ? comments.length - 1 : limit - 1
              ].id !== allComments[allComments.length - 1].id
            : false,
        };
        //when cursor is undefined
      } else {
        const comments = await prisma.comment.findMany({
          // get 1 more comment
          take: limit + 1,
          where: {
            postId,
          },
          orderBy: { createdAt: "desc" },
        });

        return {
          comments: comments.slice(0, limit),
          cursor: comments.length ? comments[comments.length - 1].id : null,

          hasMore: comments.length
            ? comments[
                limit > comments.length ? comments.length - 1 : limit - 1
              ].id !== allComments[allComments.length - 1].id
            : false,
        };
      }
    },
  },
};
