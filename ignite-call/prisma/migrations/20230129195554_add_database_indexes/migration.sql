-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `schedulings` DROP FOREIGN KEY `schedulings_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_userId_fkey`;

-- DropForeignKey
ALTER TABLE `user_time_intervals` DROP FOREIGN KEY `user_time_intervals_user_id_fkey`;

-- RenameIndex
ALTER TABLE `accounts` RENAME INDEX `accounts_user_id_fkey` TO `accounts_user_id_idx`;

-- RenameIndex
ALTER TABLE `schedulings` RENAME INDEX `schedulings_user_id_fkey` TO `schedulings_user_id_idx`;

-- RenameIndex
ALTER TABLE `sessions` RENAME INDEX `sessions_userId_fkey` TO `sessions_userId_idx`;
