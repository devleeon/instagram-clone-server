-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatar" SET DEFAULT E'https://firebasestorage.googleapis.com/v0/b/instaclone-dd87a.appspot.com/o/Avatar%2Favatar.jpg?alt=media&token=2d8a88f0-c11e-415a-bad7-c05a7aa13f7e';

-- CreateTable
CREATE TABLE "_tagged" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_tagged_AB_unique" ON "_tagged"("A", "B");

-- CreateIndex
CREATE INDEX "_tagged_B_index" ON "_tagged"("B");

-- AddForeignKey
ALTER TABLE "_tagged" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tagged" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
