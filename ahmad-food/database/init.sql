
CREATE DATABASE IF NOT EXISTS `user`;
USE `user`;

CREATE TABLE `employee` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `hashedPsw` VARCHAR(250) NOT NULL,
  `type` ENUM('admin', 'worker') NOT NULL,
  `firstName` VARCHAR(20) NOT NULL,
  `lastName` VARCHAR(20) NOT NULL,
  `gender` ENUM('male', 'female') NOT NULL,
  `phoneNumber` VARCHAR(16) NOT NULL,
  `email` VARCHAR(100) NULL,
  `city` VARCHAR(30) NULL,
  `postcode` VARCHAR(6) NULL,
  `street` VARCHAR(50) NULL,
  `about` VARCHAR(250) NULL,
  PRIMARY KEY(id)
);

CREATE TABLE `client` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `hashedPsw` VARCHAR(250) NOT NULL,
  `accountStatus` TINYINT NOT NULL,
  `firstName` VARCHAR(20) NOT NULL,
  `lastName` VARCHAR(20) NOT NULL,
  `gender` ENUM('male', 'female', 'other') NOT NULL,
  `vatNumber` VARCHAR(250) NOT NULL,
  `phoneNumber` VARCHAR(16) NOT NULL,
  `city` VARCHAR(30) NOT NULL,
  `postcode` VARCHAR(6) NOT NULL,
  `street` VARCHAR(50) NOT NULL,
  `about` VARCHAR(250) NULL,
  PRIMARY KEY(id)
);

CREATE DATABASE IF NOT EXISTS `store`;
USE `store`;

CREATE TABLE `product` (
  `number` VARCHAR(30) NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  `type` VARCHAR(20) NOT NULL,
  `amount` DECIMAL(6, 3) NOT NULL,
  `unit` ENUM('kg', 'pcs') NOT NULL,
  `costPrice` DECIMAL(5, 2) NOT NULL,
  `retailPrice` DECIMAL(5, 2) NOT NULL,
  `wholesalePrice` DECIMAL(5, 2) NOT NULL,
  `inStock` INT NOT NULL,
  `description` VARCHAR(250),
  PRIMARY KEY(number)
);

CREATE TABLE `invoice` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `clientId` INT NOT NULL,
  `userId` INT NOT NULL,
  `total` DECIMAL(6, 2) NOT NULL,
  `tax` DECIMAL(6, 2) NOT NULL,
  `receivable` DECIMAL(6, 2) NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `note` VARCHAR(250),
  PRIMARY KEY(id)
);

CREATE TABLE `soldItem` (
  `productNumber` VARCHAR(30) NOT NULL,
  `invoiceId` INT NOT NULL,
  `boxSize` TINYINT NOT NULL,
  `box` SMALLINT NOT NULL
);

CREATE TABLE `companyBill` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(50),
  `date` TIMESTAMP NOT NULL,
  `amount` DECIMAL(8, 3) NOT NULL,
  `unit` ENUM('kg', 'pcs') NOT NULL,
  `total` DECIMAL(6, 2) NOT NULL,
  `Payable` DECIMAL(6, 2) NOT NULL,
  `note` VARCHAR(250),
  PRIMARY KEY(id)
);

ALTER TABLE `companyBill` MODIFY column `note` VARCHAR(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL;
ALTER TABLE `invoice` MODIFY column `note` VARCHAR(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL;

-- INSERT INTO `employee` (`id`, `username`, `hashedPsw`, `type`, `firstName`, `lastName`, `gender`, `city`, `postcode`, `street`, `phoneNumber`, `email`, `about`) VALUES (0, 'admin', 'admin-psw', 'admin', 'Admin', 'Tester', 'male', '0624535446', 'test@kawaraa.com', 'Amsterdam', '1072EE', 'Govert 22','Blah blah blah');
INSERT INTO `employee` VALUES (0, 'admin', 'admin-psw', 'admin', 'Admin', 'Tester', 'male', '0624535446', 'test@kawaraa.com', 'Amsterdam', '1072EE', 'Govert 22','Blah blah blah');
