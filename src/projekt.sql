-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 07 Cze 2021, 17:22
-- Wersja serwera: 10.1.36-MariaDB
-- Wersja PHP: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `projekt`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `movie`
--

CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(64) NOT NULL,
  `img` varchar(128) NOT NULL,
  `czasTrwania` varchar(11) NOT NULL,
  `ocena` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `movie`
--

INSERT INTO `movie` (`id`, `nazwa`, `img`, `czasTrwania`, `ocena`) VALUES
(1, 'Spider-man', 'https://image.api.playstation.com/vulcan/ap/rnd/202011/0402/C784xeOFo2wViCf4m5bxgoeH.png', '1:36:00', 8),
(2, 'Iron-man', 'https://fwcdn.pl/fpo/25/41/122541/7885686.3.jpg', '2:06:00', 9);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `rezerwacje`
--

CREATE TABLE `rezerwacje` (
  `id` int(11) NOT NULL,
  `id_seans` int(11) NOT NULL,
  `id_login` int(11) NOT NULL,
  `nr_miejsca` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `rezerwacje`
--

INSERT INTO `rezerwacje` (`id`, `id_seans`, `id_login`, `nr_miejsca`) VALUES
(1, 15, 1, 0),
(2, 15, 1, 1),
(3, 15, 1, 2),
(4, 15, 1, 3),
(5, 15, 1, 6),
(6, 15, 1, 7),
(7, 15, 1, 8),
(8, 15, 1, 0),
(9, 15, 1, 1),
(10, 15, 1, 2),
(11, 15, 1, 3),
(12, 15, 1, 58),
(13, 15, 1, 59),
(14, 15, 1, 0),
(15, 15, 1, 1),
(16, 15, 1, 2),
(17, 15, 1, 3),
(18, 15, 1, 48),
(19, 15, 1, 49),
(20, 15, 1, 50),
(21, 15, 1, 0),
(22, 15, 1, 1),
(23, 15, 1, 58),
(24, 15, 1, 59),
(25, 15, 1, 22),
(26, 15, 1, 23),
(27, 15, 1, 1),
(28, 15, 1, 57),
(29, 15, 1, 58),
(30, 15, 1, 59),
(31, 17, 1, 0),
(32, 17, 1, 2),
(33, 17, 1, 4),
(34, 17, 1, 0),
(35, 17, 1, 2),
(36, 17, 1, 4),
(37, 17, 1, 6),
(38, 17, 1, 8);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `room`
--

CREATE TABLE `room` (
  `id` int(11) NOT NULL,
  `miejsca` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `room`
--

INSERT INTO `room` (`id`, `miejsca`) VALUES
(1, 60);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `seans`
--

CREATE TABLE `seans` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `data` varchar(10) NOT NULL,
  `czas` varchar(32) NOT NULL,
  `roomId` int(11) NOT NULL,
  `zajeteMiejsca` varchar(180) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `seans`
--

INSERT INTO `seans` (`id`, `movieId`, `data`, `czas`, `roomId`, `zajeteMiejsca`) VALUES
(14, 1, '2021-06-06', '12:00', 1, '0,1,2,3,4,5,6,'),
(15, 1, '2021-06-07', '12:00', 1, '0,1,2,3,'),
(16, 1, '2021-06-07', '12:00', 1, ''),
(17, 2, '2021-06-08', '10:00', 1, '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(32) NOT NULL,
  `password` varchar(65) NOT NULL,
  `token` varchar(65) NOT NULL,
  `email` varchar(48) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `token`, `email`) VALUES
(1, 'test', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', '2749f8e52e005e6872d13ed02f1cc5191b254dbd87be10a0629dbcede48417fe', 'patrykbucholc@onet.pl'),
(2, 'test2', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', '', 'test2@test.pl'),
(3, 'test22', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', '', 'test22@test.pl'),
(4, 'test4', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', '', 'test21@test.pl'),
(5, 'patrykbucholc2@onet.pl', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', '', 'test112'),
(6, 'asd', '688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6', '', 'asd'),
(7, 'MojLogin', 'a03c8a194fa8d2735a3feb817978239e8d39844474cc47db4427b0a730e8302b', '0f339a1720c314f7df420404c837834dffb46f71bd9d49a1198ffe2557965878', 'MojEmail@wp.pl');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `rezerwacje`
--
ALTER TABLE `rezerwacje`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `seans`
--
ALTER TABLE `seans`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `rezerwacje`
--
ALTER TABLE `rezerwacje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT dla tabeli `room`
--
ALTER TABLE `room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `seans`
--
ALTER TABLE `seans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
