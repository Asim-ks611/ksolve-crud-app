/*
  Warnings:

  - You are about to drop the column `authorId` on the `note` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `note` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `Note_authorId_fkey`;

-- AlterTable
ALTER TABLE `note` DROP COLUMN `authorId`,
    DROP COLUMN `published`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
