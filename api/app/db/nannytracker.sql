SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "-07:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


CREATE TABLE IF NOT EXISTS `actions` (
`id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `childAgeLow` smallint(6) NOT NULL,
  `childAgeHigh` smallint(6) NOT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `createdById` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `alerts` (
`id` int(11) NOT NULL,
  `nannyId` int(11) NOT NULL,
  `message` varchar(512) NOT NULL,
  `submittedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `child` (
`id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `birthday` datetime NOT NULL,
  `notes` varchar(2500) DEFAULT NULL,
  `isCare` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `child_actions` (
`id` int(11) NOT NULL,
  `childId` int(11) NOT NULL,
  `actionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `child_to_parent` (
`id` int(11) NOT NULL,
  `childId` int(11) NOT NULL,
  `parentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `nanny` (
`id` int(11) NOT NULL,
  `payRate` decimal(10,0) DEFAULT NULL,
  `hireDate` datetime NOT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `hasAccepted` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `nanny_log` (
`id` int(11) NOT NULL,
  `actionId` int(11) NOT NULL,
  `nannyId` int(11) NOT NULL,
  `actionStartedDate` datetime DEFAULT NULL,
  `actionCompletedDate` datetime NOT NULL,
  `childId` int(11) NOT NULL,
  `notes` varchar(2500) DEFAULT NULL,
  `lastModifiedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `nanny_to_parent` (
`id` int(11) NOT NULL,
  `nannyId` int(11) NOT NULL,
  `parentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `parent` (
`id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `user` (
`id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `birthday` datetime NOT NULL,
  `parentId` int(11) DEFAULT NULL,
  `nannyId` int(11) DEFAULT NULL,
  `gender` varchar(2) NOT NULL,
  `email` varchar(250) NOT NULL,
  `address` varchar(250) DEFAULT NULL,
  `phone` varchar(250) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `lastLogin` datetime NOT NULL,
  `sessionId` varchar(250) DEFAULT NULL,
  `active` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


ALTER TABLE `actions`
 ADD PRIMARY KEY (`id`), ADD KEY `createdById` (`createdById`);

ALTER TABLE `alerts`
 ADD PRIMARY KEY (`id`), ADD KEY `nannyId` (`nannyId`);

ALTER TABLE `child`
 ADD PRIMARY KEY (`id`);

ALTER TABLE `child_actions`
 ADD PRIMARY KEY (`id`), ADD KEY `actionId` (`actionId`), ADD KEY `childId` (`childId`);

ALTER TABLE `child_to_parent`
 ADD PRIMARY KEY (`id`), ADD KEY `parentId` (`parentId`), ADD KEY `childId` (`childId`);

ALTER TABLE `nanny`
 ADD PRIMARY KEY (`id`);

ALTER TABLE `nanny_log`
 ADD PRIMARY KEY (`id`), ADD KEY `nannyId` (`nannyId`), ADD KEY `actionId` (`actionId`), ADD KEY `childId` (`childId`);

ALTER TABLE `nanny_to_parent`
 ADD PRIMARY KEY (`id`), ADD KEY `nannyId` (`nannyId`), ADD KEY `parentId` (`parentId`);

ALTER TABLE `parent`
 ADD PRIMARY KEY (`id`);

ALTER TABLE `user`
 ADD PRIMARY KEY (`id`), ADD KEY `parentId` (`parentId`), ADD KEY `nannyId` (`nannyId`);


ALTER TABLE `actions`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `alerts`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `child`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `child_actions`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `child_to_parent`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `nanny`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `nanny_log`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `nanny_to_parent`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `parent`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `user`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `actions`
ADD CONSTRAINT `actions_ibfk_1` FOREIGN KEY (`createdById`) REFERENCES `user` (`id`);

ALTER TABLE `alerts`
ADD CONSTRAINT `alerts_ibfk_1` FOREIGN KEY (`nannyId`) REFERENCES `nanny` (`id`);

ALTER TABLE `child_actions`
ADD CONSTRAINT `child_actions_ibfk_1` FOREIGN KEY (`actionId`) REFERENCES `actions` (`id`),
ADD CONSTRAINT `child_actions_ibfk_2` FOREIGN KEY (`childId`) REFERENCES `child` (`id`);

ALTER TABLE `child_to_parent`
ADD CONSTRAINT `child_to_parent_ibfk_1` FOREIGN KEY (`parentId`) REFERENCES `parent` (`id`),
ADD CONSTRAINT `child_to_parent_ibfk_2` FOREIGN KEY (`childId`) REFERENCES `child` (`id`);

ALTER TABLE `nanny_log`
ADD CONSTRAINT `nanny_log_ibfk_1` FOREIGN KEY (`nannyId`) REFERENCES `nanny` (`id`),
ADD CONSTRAINT `nanny_log_ibfk_2` FOREIGN KEY (`actionId`) REFERENCES `actions` (`id`),
ADD CONSTRAINT `nanny_log_ibfk_3` FOREIGN KEY (`childId`) REFERENCES `child` (`id`);

ALTER TABLE `nanny_to_parent`
ADD CONSTRAINT `nanny_to_parent_ibfk_1` FOREIGN KEY (`nannyId`) REFERENCES `nanny` (`id`),
ADD CONSTRAINT `nanny_to_parent_ibfk_2` FOREIGN KEY (`parentId`) REFERENCES `parent` (`id`);

ALTER TABLE `user`
ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`parentId`) REFERENCES `parent` (`id`),
ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`nannyId`) REFERENCES `nanny` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
