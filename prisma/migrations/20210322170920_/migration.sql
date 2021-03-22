/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[followerId]` on the table `Notification`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "followerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Notification_followerId_unique" ON "Notification"("followerId");

-- AddForeignKey
ALTER TABLE "Notification" ADD FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
