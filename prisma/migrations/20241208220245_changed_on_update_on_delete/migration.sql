-- DropForeignKey
ALTER TABLE `child` DROP FOREIGN KEY `Child_caregiverId_fkey`;

-- DropForeignKey
ALTER TABLE `contract` DROP FOREIGN KEY `Contract_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `contract` DROP FOREIGN KEY `Contract_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `contractservice` DROP FOREIGN KEY `ContractService_contractId_fkey`;

-- DropForeignKey
ALTER TABLE `contractservice` DROP FOREIGN KEY `ContractService_extraServiceId_fkey`;

-- DropForeignKey
ALTER TABLE `financialrecord` DROP FOREIGN KEY `FinancialRecord_expenseCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `financialrecord` DROP FOREIGN KEY `FinancialRecord_revenueCategoryId_fkey`;

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
ALTER TABLE `extraservice` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `financialrecord` MODIFY `expenseCategoryId` INTEGER NULL,
    MODIFY `revenueCategoryId` INTEGER NULL,
    MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `revenuecategory` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `user` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE `Child` ADD CONSTRAINT `Child_caregiverId_fkey` FOREIGN KEY (`caregiverId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContractService` ADD CONSTRAINT `ContractService_contractId_fkey` FOREIGN KEY (`contractId`) REFERENCES `Contract`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContractService` ADD CONSTRAINT `ContractService_extraServiceId_fkey` FOREIGN KEY (`extraServiceId`) REFERENCES `ExtraService`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinancialRecord` ADD CONSTRAINT `FinancialRecord_expenseCategoryId_fkey` FOREIGN KEY (`expenseCategoryId`) REFERENCES `ExpenseCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinancialRecord` ADD CONSTRAINT `FinancialRecord_revenueCategoryId_fkey` FOREIGN KEY (`revenueCategoryId`) REFERENCES `RevenueCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
