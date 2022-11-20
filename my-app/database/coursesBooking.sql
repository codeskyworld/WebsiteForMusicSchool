 CREATE DATABASE IF NOT EXISTS employeesystem;
 
 USE employeesystem;
 
CREATE TABLE `coursesbooking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(500) NOT NULL,
  `courseName` varchar(500) NOT NULL,
  `bookingTime` varchar(500) NOT NULL,
  `paymentStatus` varchar(500) NOT NULL,
  `currentStatus` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `courseName_UNIQUE` (`email`,`courseName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
