 CREATE DATABASE IF NOT EXISTS employeesystem;
 
 USE employeesystem;
 
CREATE TABLE `gigsbooking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(500) NOT NULL,
  `gigName` varchar(500) NOT NULL,
  `bookingTime` varchar(500) NOT NULL,
  `paymentStatus` varchar(500) NOT NULL,
  `currentStatus` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `gigName_UNIQUE` (`email`,`gigName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
