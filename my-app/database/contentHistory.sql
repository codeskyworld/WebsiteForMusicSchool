 CREATE DATABASE IF NOT EXISTS employeesystem;
 
 USE employeesystem;
 
CREATE TABLE `contentHistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titleA` varchar(500),
  `titleB` varchar(500),
  `titleC` varchar(500),
  `titleD` varchar(500),
  `description` varchar(500),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
