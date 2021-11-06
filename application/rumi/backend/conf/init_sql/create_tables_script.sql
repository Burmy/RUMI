-- MySQL Script generated by MySQL Workbench
-- Wed Oct  6 12:49:27 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema rumi-db2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema rumi-db2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `rumi-db2` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema rumi
-- -----------------------------------------------------
USE `rumi-db2` ;

-- -----------------------------------------------------
-- Table `rumi-db2`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rumi-db2`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` CHAR(36) NOT NULL,
  `password` CHAR(36) NOT NULL,
  `last_name` CHAR(255) NULL,
  `first_name` CHAR(255) NULL,
  `email` CHAR(255) NOT NULL,
  `phone` VARCHAR(45) NULL,
  `description` TEXT NULL,
  `gender` CHAR(1) NULL,
  `birthday` DATETIME NULL,
  `school` CHAR(255) NULL,
  `major` CHAR(255) NULL,
  `smoker` INT NULL,
  `pets` INT NULL,
  `language` VARCHAR(255) NULL,
  `interests` VARCHAR(255) NULL,
  `hobbies` VARCHAR(255) NULL,
  `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `deleted` INT NULL,
  `deleted_date` DATETIME NULL,
  `admin` INT NULL,
  `activated` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rumi-db2`.`list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rumi-db2`.`list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` CHAR(32) NOT NULL,
  `value` CHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rumi-db2`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rumi-db2`.`post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `caption` CHAR(255) NOT NULL,
  `description` TEXT(2048) NULL,
  `photo` VARCHAR(2048) NULL,
  `thumbnail` VARCHAR(2048) NULL,
  `location` INT NOT NULL,
  `price` INT NULL,
  `parking` INT,
  `pet` INT,
  `smoking` INT,
  `gender` CHAR(1), -- N:no preference/F:female/M:male
  `creator_id` INT NOT NULL,
  `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `deleted` INT NOT NULL,
  `deleted_date` DATETIME NULL,
  `latitude` INT NOT NULL
  `longitude` INT NOT NULL
  PRIMARY KEY (`id`),
  INDEX `userid_idx` (`creator_id` ASC) VISIBLE,
  INDEX `locationid_idx` (`location` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `userid`
    FOREIGN KEY (`creator_id`)
    REFERENCES `rumi-db2`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `locationid`
    FOREIGN KEY (`location`)
    REFERENCES `rumi-db2`.`list` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rumi-db2`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rumi-db2`.`comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` TEXT(2048) NOT NULL,
  `post_id` INT NOT NULL,
  `creator_id` INT NOT NULL,
  `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `deleted` BIT(1) NULL,
  `deleted_date` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `userid_idx` (`creator_id` ASC) VISIBLE,
  INDEX `postid_idx` (`post_id` ASC) VISIBLE,
  CONSTRAINT `commentuserid`
    FOREIGN KEY (`creator_id`)
    REFERENCES `rumi-db2`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `commentpostid`
    FOREIGN KEY (`post_id`)
    REFERENCES `rumi-db2`.`post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rumi-db2`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rumi-db2`.`message` (
  `id` INT NOT NULL,
  `text` VARCHAR(2048) NOT NULL,
  `from_id` INT NOT NULL,
  `to_id` INT NOT NULL,
  `creator_id` INT NOT NULL,
  `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `deleted` BIT(1) NULL,
  `deleted_date` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fromid_idx` (`from_id` ASC) VISIBLE,
  INDEX `toid_idx` (`to_id` ASC) VISIBLE,
  CONSTRAINT `fromid`
    FOREIGN KEY (`from_id`)
    REFERENCES `rumi-db2`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `toid`
    FOREIGN KEY (`to_id`)
    REFERENCES `rumi-db2`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rumi-db2`.`favorite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rumi-db2`.`favorite` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `post_id` INT NOT NULL,
  `like` BIT(1) NULL,
  `saved` BIT(1) NULL,
  `match` BIT(1) NULL,
  `creator_id` INT NOT NULL,
  `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `deleted` BIT(1) NULL,
  `deleted_date` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `postid_idx` (`post_id` ASC) VISIBLE,
  INDEX `userid_idx` (`creator_id` ASC) VISIBLE,
  CONSTRAINT `favoritepostid`
    FOREIGN KEY (`post_id`)
    REFERENCES `rumi-db2`.`post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `favoriteuserid`
    FOREIGN KEY (`creator_id`)
    REFERENCES `rumi-db2`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rumi-db2`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rumi-db2`.`review` (
  `id` INT NOT NULL,
  `text` VARCHAR(2048) NOT NULL,
  `star` INT NOT NULL,
  `post_id` INT NOT NULL,
  `creator_id` INT NOT NULL,
  `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `deleted` BIT(1) NULL,
  `deleted_date` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `postid_idx` (`post_id` ASC) VISIBLE,
  INDEX `userid_idx` (`creator_id` ASC) VISIBLE,
  CONSTRAINT `reviewpostid`
    FOREIGN KEY (`post_id`)
    REFERENCES `rumi-db2`.`post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `reviewuserid`
    FOREIGN KEY (`creator_id`)
    REFERENCES `rumi-db2`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rumi-db2`.`notification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rumi-db2`.`notification` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(2048) NOT NULL,
  `from` CHAR(255) NULL,
  `from_id` INT NULL,
  `to_id` INT NOT NULL,
  `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `deleted` BIT(1) NULL,
  `deleted_date` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fromid_idx` (`from_id` ASC) VISIBLE,
  INDEX `toid_idx` (`to_id` ASC) VISIBLE,
  CONSTRAINT `notifromid`
    FOREIGN KEY (`from_id`)
    REFERENCES `rumi-db2`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `notitoid`
    FOREIGN KEY (`to_id`)
    REFERENCES `rumi-db2`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rumi-db2`.`searchtext`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rumi-db2`.`searchtext` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` CHAR(255) NOT NULL,
  `frequency` INT NOT NULL,
  `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `deleted` BIT(1) NULL,
  `deleted_date` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
