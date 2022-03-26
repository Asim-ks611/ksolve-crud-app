-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `Note_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
