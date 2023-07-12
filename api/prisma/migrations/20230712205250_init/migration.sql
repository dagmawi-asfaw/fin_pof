-- CreateTable
CREATE TABLE `bank_account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountNumber` INTEGER NOT NULL,
    `bankName` VARCHAR(191) NOT NULL,
    `accountType` ENUM('CHECKING', 'SAVING') NOT NULL,
    `country` VARCHAR(191) NOT NULL DEFAULT 'ET',
    `currency` VARCHAR(191) NOT NULL DEFAULT 'ETB',
    `startingBalance` DOUBLE NOT NULL DEFAULT 0,
    `currentBalance` DOUBLE NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
