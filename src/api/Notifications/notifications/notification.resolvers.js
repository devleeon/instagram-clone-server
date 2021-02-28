import prisma from "../../../util/prisma";

export default {
  Query: {
    notification: async (_, args, { token, isAuthenticated }) => {
      const id = await isAuthenticated(token);
      return prisma.notification.findUnique({ where: { userId: id } });
    },
  },
};

// withFilter((_, __, { pubsub }) =>
//         pubsub.asyncIterator(NEW_LIKE, (payload, variables) => {
//           return payload.liked.postId === variables.postId;
//         })
//       ),
