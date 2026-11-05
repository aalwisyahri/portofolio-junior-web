CREATE DATABASE IF NOT EXISTS `ujian` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ujian`;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` (`id`, `first_name`, `last_name`) VALUES
(1, 'Sanhero', 'Spider'),
(2, 'Ketut', 'Sanjaya'),
(3, 'Made', 'Arsana');

