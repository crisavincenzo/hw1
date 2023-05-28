CREATE TABLE `USERS` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cognome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `genere` varchar(2) NOT NULL,
  `data_iscrizione` date NOT NULL DEFAULT current_timestamp(),
  `foto` varchar(255) DEFAULT NULL,
  `citazione` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
);

CREATE TABLE `CONTENTS` (
  `id` varchar(255) NOT NULL,
  `titolo` varchar(255) NOT NULL,
  `user` int(11) NOT NULL,
  `visto` tinyint(1) DEFAULT NULL,
  `poster` text NOT NULL,
  PRIMARY KEY (`id`,`user`),
  KEY `user` (`user`),
  FOREIGN KEY (`user`) REFERENCES `USERS` (`id`)
);