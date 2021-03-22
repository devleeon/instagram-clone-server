import prisma from "../../../util/prisma";

export default {
  Query: {
    notification: async (_, __, { token, isAuthenticated }) => {
      const NOTIFICATION_SIZE = 10;
      const userId = await isAuthenticated(token);
      const notifications = await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
      new Promise(() => {
        notifications.map(async (n) => {
          if (
            n.likeId === null &&
            n.commentId === null &&
            n.followerId === null
          ) {
            await prisma.$executeRaw`DELETE FROM "Notification" WHERE id = ${n.id};`;
          }
        });
      });
      if (notifications.length > NOTIFICATION_SIZE) {
        const deleteId = notifications[notifications.length - 1].id;
        await prisma.$executeRaw`DELETE FROM "Notification" WHERE id = ${deleteId};`;
      }
      return notifications;
    },
  },
};
