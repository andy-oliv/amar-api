/*
  Warnings:

  - You are about to drop the column `contractId` on the `extraservice` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `ExtraService` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `extraservice` DROP FOREIGN KEY `ExtraService_contractId_fkey`;

-- AlterTable
ALTER TABLE `child` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `client` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `contract` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `event` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `expensecategory` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `extraservice` DROP COLUMN `contractId`,
    ADD COLUMN `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN `updatedAt` TIMESTAMP(0) NOT NULL;

-- AlterTable
ALTER TABLE `financialrecord` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `revenuecategory` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `user` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE `ContractService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contractId` VARCHAR(191) NOT NULL,
    `extraServiceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ContractService` ADD CONSTRAINT `ContractService_contractId_fkey` FOREIGN KEY (`contractId`) REFERENCES `Contract`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContractService` ADD CONSTRAINT `ContractService_extraServiceId_fkey` FOREIGN KEY (`extraServiceId`) REFERENCES `ExtraService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
