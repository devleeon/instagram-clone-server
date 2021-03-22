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
      if (notifications.length > NOTIFICATION_SIZE) {
        const deleteId = notifications[notifications.length - 1].id;
        await prisma.$executeRaw`DELETE FROM "Notification" WHERE id = ${deleteId};`;
      }
      return notifications;
    },
  },
};
