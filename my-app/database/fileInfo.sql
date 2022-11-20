 CREATE DATABASE IF NOT EXISTS employeesystem;
 
 USE employeesystem;
 
CREATE TABLE `fileInfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(500) NOT NULL,
  `path` varchar(500) NOT NULL,
  `filename` varchar(500) NOT NULL,
  `banning` boolean NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
