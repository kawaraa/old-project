
CREATE DATABASE IF NOT EXISTS `user`;
USE `user`;

CREATE TABLE `account` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `hashedPsw` VARCHAR(250) NOT NULL,
  `active` TINYINT NOT NULL,
  `firstName` VARCHAR(20) NOT NULL,
  `lastName` VARCHAR(20) NOT NULL,
  `about` TEXT,
  `avatarUrl` VARCHAR(250),
  `status` ENUM('online', 'offline') NOT NULL,
  `accountStatus` TINYINT NOT NULL,
  PRIMARY KEY(id)
);

CREATE DATABASE IF NOT EXISTS `html`;
USE `html`;

CREATE TABLE `page` (
  `url` VARCHAR(250),
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `title` VARCHAR(60) NOT NULL,
  PRIMARY KEY(url)
);

CREATE TABLE `meta` (
  `id` VARCHAR(250),
  `name` VARCHAR(50) NOT NULL,
  `content` VARCHAR(250) NOT NULL,
  PRIMARY KEY(id)
);
CREATE TABLE `link` (
  `id` VARCHAR(250),
  `rel` VARCHAR(50) NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `sizes` VARCHAR(50),
  `href` VARCHAR(250) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE `element` (
  `id` VARCHAR(250),
  `type` ENUM('nav', 'main', 'article', 'header', 'aside', 'section', 'footer', 'ol', 'ul', 'table', 'form', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'button', 'li', 'label', 'strong', 'i', 'select', 'input', 'time', 'audio', 'video', 'img', 'svg', 'canvas') NOT NULL,
  `text` TEXT,
  `order` SMALLINT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE `codeTag` (
  `id` VARCHAR(250),
  `type` ENUM('script', 'style', 'div') NOT NULL,
  `content` TEXT NOT NULL,
  `place` ENUM('top', 'bottom') NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE `attribute` (
  `id` VARCHAR(250),
  `key` VARCHAR(50) NOT NULL,
  `value` VARCHAR(250) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE `style` (
  `id` VARCHAR(250),
  `selector` VARCHAR(100) NOT NULL,
  `key` VARCHAR(30) NOT NULL,
  `value` VARCHAR(30) NOT NULL
  PRIMARY KEY(id)
);

CREATE TABLE `section` (
  `id` VARCHAR(250) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY(id, name)
);

CREATE TABLE `item` (
  `parent` VARCHAR(250) NOT NULL,
  `child` VARCHAR(250) NOT NULL,
  PRIMARY KEY(parent, child)
);

ALTER TABLE `element` MODIFY COLUMN `text` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL;

CREATE DATABASE IF NOT EXISTS `archive`;
USE `archive`;

CREATE TABLE `deleted` (
  `id` VARCHAR(150),
  `content` TEXT NOT NULL,
  PRIMARY KEY(id)
);

-- code.id is a name given by the user
-- 'nav', 'main', 'header', 'article', 'aside',         'section', 'footer', 'ol',           'ul',             'div'
-- 'navication', 'main', 'header', 'article', 'aside section', 'section', 'bottom', 'ordered list', 'unordered list', 'other'

-- code: 'script',     'style', 'div'
-- value: 'JavaScript', 'CSS',  'HTML'
