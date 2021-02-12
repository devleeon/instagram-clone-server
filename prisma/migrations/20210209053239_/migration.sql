/*
  Warnings:

  - You are about to drop the `_tagged` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_tagged" DROP CONSTRAINT "_tagged_A_fkey";

-- DropForeignKey
ALTER TABLE "_tagged" DROP CONSTRAINT "_tagged_B_fkey";

-- CreateTable
CREATE TABLE "Tagged" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "photoId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "_tagged";

-- AddForeignKey
ALTER TABLE "Tagged" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tagged" ADD FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
