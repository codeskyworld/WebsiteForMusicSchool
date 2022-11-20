 CREATE DATABASE IF NOT EXISTS employeesystem;
 
 USE employeesystem;
 
CREATE TABLE `musers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(500) NOT NULL,
  `surname` varchar(500) NOT NULL,
  `firstName` varchar(500) NOT NULL,
  `telephone` varchar(500) NOT NULL,
  `whetherBlacklist` boolean NOT NULL,
  `password` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
