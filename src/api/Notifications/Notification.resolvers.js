import prisma from "../../util/prisma";

export default {
  Notification: {
    newComment: ({ id }) => {
      return prisma.notification.findUnique({ where: { id } }).newComment();
    },
    newLike: ({ id }) => {
      return prisma.notification.findUnique({ where: { id } }).newLike();
    },
    newFollower: ({ id }) => {
      return prisma.notification.findUnique({ where: { id } }).newFollower();
    },
  },
};
