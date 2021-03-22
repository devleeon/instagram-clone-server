/*
  Warnings:

  - You are about to drop the column `notificationId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `notificationId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `notificationId` on the `User` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[notifId]` on the table `Comment`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[notifId]` on the table `Like`. If there are existing duplicate values, the migration will fail.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_notificationId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "notificationId",
ADD COLUMN     "notifId" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "notificationId",
ADD COLUMN     "notifId" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "notificationId";

-- CreateIndex
CREATE UNIQUE INDEX "Comment_notifId_unique" ON "Comment"("notifId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_notifId_unique" ON "Like"("notifId");

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("notifId") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD FOREIGN KEY ("notifId") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
