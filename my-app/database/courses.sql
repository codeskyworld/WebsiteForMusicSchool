 CREATE DATABASE IF NOT EXISTS employeesystem;
 
 USE employeesystem;
 
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `courseName` varchar(500) NOT NULL,
  `style` varchar(500) NOT NULL,
  `price` varchar(500) NOT NULL,
  `description` varchar(500) NOT NULL,
  `place` varchar(500) NOT NULL,
  `startTime` varchar(500) NOT NULL,
  `endTime` varchar(500) NOT NULL,
  `dateList` varchar(500) NOT NULL,
  `oneForOne` varchar(500) NOT NULL,
  `picturePath` varchar(500),
  PRIMARY KEY (`id`),
  UNIQUE KEY `courseName_UNIQUE` (`courseName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
