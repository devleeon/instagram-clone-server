/*
  Warnings:

  - You are about to drop the column `notifId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `notifId` on the `Like` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[commentId]` on the table `Notification`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[likeId]` on the table `Notification`. If there are existing duplicate values, the migration will fail.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_notifId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_notifId_fkey";

-- DropIndex
DROP INDEX "Like_notifId_unique";

-- DropIndex
DROP INDEX "Comment_notifId_unique";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "notifId";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "notifId";

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "commentId" TEXT,
ADD COLUMN     "likeId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Notification_commentId_unique" ON "Notification"("commentId");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_likeId_unique" ON "Notification"("likeId");

-- AddForeignKey
ALTER TABLE "Notification" ADD FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD FOREIGN KEY ("likeId") REFERENCES "Like"("id") ON DELETE SET NULL ON UPDATE CASCADE;
