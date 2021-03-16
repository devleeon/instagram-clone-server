/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[userId]` on the table `Notification`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Notification.userId_unique" ON "Notification"("userId");
