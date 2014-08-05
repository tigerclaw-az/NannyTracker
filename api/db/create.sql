-- Create Table: child
--------------------------------------------------------------------------------
CREATE TABLE child
(
	`id` INT NOT NULL AUTO_INCREMENT
	,PRIMARY KEY (id)
	,`name` VARCHAR(250) NOT NULL 
	,`birthday` DATETIME NOT NULL 
	,`notes` VARCHAR(2500)  NULL 
	,`isCare` BIT NOT NULL 
)
ENGINE=INNODB



-- Create Table: child_actions
--------------------------------------------------------------------------------
CREATE TABLE child_actions
(
	`id` INT  NULL AUTO_INCREMENT
	,PRIMARY KEY (id)
	,`childId` INT  NULL 
	,`actionId` INT  NULL 
)
ENGINE=INNODB



-- Create Table: nanny
--------------------------------------------------------------------------------
CREATE TABLE nanny
(
	`id` INT NOT NULL AUTO_INCREMENT
	,PRIMARY KEY (id)
	,`payRate` DECIMAL(0, 0)  NULL 
	,`hireDate` DATETIME  NULL 
	,`startDate` DATETIME  NULL 
	,`endDate` DATETIME  NULL 
	,`hasAccepted` BIT NOT NULL 
)
ENGINE=INNODB



-- Create Table: actions
--------------------------------------------------------------------------------
CREATE TABLE actions
(
	`id` INT NOT NULL AUTO_INCREMENT
	,PRIMARY KEY (id)
	,`name` VARCHAR(250) NOT NULL 
	,`childAgeLow` SMALLINT NOT NULL 
	,`childAgeHigh` SMALLINT NOT NULL 
	,`notes` VARCHAR(500)  NULL 
	,`createdById` BIT NOT NULL 
)
ENGINE=INNODB



-- Create Table: nanny_log
--------------------------------------------------------------------------------
CREATE TABLE nanny_log
(
	`id` INT NOT NULL 
	,PRIMARY KEY (id)
	,`actionId` INT  NULL AUTO_INCREMENT
	,`nannyId` INT NOT NULL AUTO_INCREMENT
	,`started` DATETIME NOT NULL 
	,`completed` DATETIME  NULL 
	,`childId` INT  NULL AUTO_INCREMENT
	,`notes` VARCHAR(2500)  NULL 
	,`lastModified` DATETIME  NULL 
)
ENGINE=INNODB



-- Create Table: child_to_parent
--------------------------------------------------------------------------------
CREATE TABLE child_to_parent
(
	`id` INT NOT NULL AUTO_INCREMENT
	,PRIMARY KEY (id)
	,`childId` INT NOT NULL AUTO_INCREMENT
	,`parentId` INT NOT NULL AUTO_INCREMENT
)
ENGINE=INNODB



-- Create Table: nanny_to_parent
--------------------------------------------------------------------------------
CREATE TABLE nanny_to_parent
(
	`id` INT NOT NULL 
	,PRIMARY KEY (id)
	,`nannyId` INT NOT NULL AUTO_INCREMENT
	,`parentId` INT NOT NULL AUTO_INCREMENT
)
ENGINE=INNODB



-- Create Table: user
--------------------------------------------------------------------------------
CREATE TABLE user
(
	`id` INT NOT NULL AUTO_INCREMENT
	,PRIMARY KEY (id)
	,`name` VARCHAR(250) NOT NULL 
	,`birthday` DATETIME NOT NULL 
	,`parentId` INT  NULL AUTO_INCREMENT
	,`nannyId` INT  NULL AUTO_INCREMENT
	,`gender` VARCHAR(2) NOT NULL 
	,`email` VARCHAR(250) NOT NULL 
	,`address` VARCHAR(250)  NULL 
	,`phone` VARCHAR(250)  NULL 
	,`username` VARCHAR(250)  NULL 
	,`password` VARCHAR(250)  NULL 
	,`lastLogin` DATETIME NOT NULL 
	,`sessionId` VARCHAR(250)  NULL 
	,`confirmedEmail` BIT NOT NULL 
)
ENGINE=INNODB



-- Create Table: parent
--------------------------------------------------------------------------------
CREATE TABLE parent
(
	`id` INT NOT NULL AUTO_INCREMENT
	,PRIMARY KEY (id)
)
ENGINE=INNODB



-- Create Table: alerts
--------------------------------------------------------------------------------
CREATE TABLE alerts
(
	`id` INT NOT NULL 
	,PRIMARY KEY (id)
	,`babysitterId` INT NOT NULL AUTO_INCREMENT
	,`message` VARCHAR(512) NOT NULL 
	,`submittedDate` DATETIME NOT NULL 
)
ENGINE=INNODB



-- Create Foreign Key: child_to_parent.childId -> child.id
ALTER TABLE child_to_parent ADD FOREIGN KEY (childId) REFERENCES child(id);


-- Create Foreign Key: child_to_parent.parentId -> parent.id
ALTER TABLE child_to_parent ADD FOREIGN KEY (parentId) REFERENCES parent(id);


-- Create Foreign Key: nanny_log.childId -> child.id
ALTER TABLE nanny_log ADD FOREIGN KEY (childId) REFERENCES child(id);


-- Create Foreign Key: actions.createdById -> user.id
ALTER TABLE actions ADD FOREIGN KEY (createdById) REFERENCES user(id);


-- Create Foreign Key: user.parentId -> parent.id
ALTER TABLE user ADD FOREIGN KEY (parentId) REFERENCES parent(id);


-- Create Foreign Key: user.nannyId -> nanny.id
ALTER TABLE user ADD FOREIGN KEY (nannyId) REFERENCES nanny(id);


-- Create Foreign Key: nanny_to_parent.nannyId -> nanny.id
ALTER TABLE nanny_to_parent ADD FOREIGN KEY (nannyId) REFERENCES nanny(id);


-- Create Foreign Key: nanny_to_parent.parentId -> parent.id
ALTER TABLE nanny_to_parent ADD FOREIGN KEY (parentId) REFERENCES parent(id);


-- Create Foreign Key: nanny_log.nannyId -> nanny.id
ALTER TABLE nanny_log ADD FOREIGN KEY (nannyId) REFERENCES nanny(id);


-- Create Foreign Key: child_actions.childId -> child.id
ALTER TABLE child_actions ADD FOREIGN KEY (childId) REFERENCES child(id);


-- Create Foreign Key: alerts.babysitterId -> nanny.id
ALTER TABLE alerts ADD FOREIGN KEY (babysitterId) REFERENCES nanny(id);


-- Create Foreign Key: nanny_log.actionId -> actions.id
ALTER TABLE nanny_log ADD FOREIGN KEY (actionId) REFERENCES actions(id);


-- Create Foreign Key: child_actions.actionId -> actions.id
ALTER TABLE child_actions ADD FOREIGN KEY (actionId) REFERENCES actions(id);



