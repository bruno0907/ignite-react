-- AlterTable
ALTER TABLE `accounts` MODIFY `refresh_token` TEXT NULL,
    MODIFY `access_token` TEXT NULL,
    MODIFY `id_token` TEXT NULL;

-- AlterTable
ALTER TABLE `schedulings` MODIFY `observations` TEXT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `fullname` TEXT NOT NULL,
    MODIFY `bio` TEXT NULL;