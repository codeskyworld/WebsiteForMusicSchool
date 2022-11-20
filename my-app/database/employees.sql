 CREATE DATABASE IF NOT EXISTS employeesystem;
 
 USE employeesystem;


CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `age` int NOT NULL,
  `country` text NOT NULL,
  `position` text NOT NULL,
  `wage` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci