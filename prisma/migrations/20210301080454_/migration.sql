/*
  Warnings:

  - You are about to drop the `_MessageToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MessageToUser" DROP CONSTRAINT "_MessageToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MessageToUser" DROP CONSTRAINT "_MessageToUser_B_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "_MessageToUser";

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
