-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Värd: localhost
-- Tid vid skapande: 18 jan 2024 kl 13:51
-- Serverversion: 11.1.2-MariaDB
-- PHP-version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `fed23_books`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `Author`
--

DROP TABLE IF EXISTS `Author`;
CREATE TABLE `Author` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `Author`
--

INSERT INTO `Author` (`id`, `name`) VALUES
(1, 'Sir Arthur C. Clarke'),
(2, 'Isaac Asimov'),
(3, 'Jason Anspach'),
(4, 'Nick Cole'),
(5, 'J.R.R. Tolkien'),
(6, 'Jane Austen'),
(7, 'Douglas Adams');

-- --------------------------------------------------------

--
-- Tabellstruktur `Book`
--

DROP TABLE IF EXISTS `Book`;
CREATE TABLE `Book` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) NOT NULL,
  `pages` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `Book`
--

INSERT INTO `Book` (`id`, `title`, `pages`) VALUES
(1, '2001: A Space Odessey', 224),
(2, '2010: Odessey Two', 291),
(3, 'Foundation', 542),
(4, 'Galaxy\'s Edge: Book 1-2', 674),
(5, 'Pride and Prejudice', 279),
(6, 'The Hitchhiker\'s Guide to the Galaxy', 216),
(7, 'The Restaurant at the End of the Universe', 250),
(8, 'Life, the Universe and Everything', 224),
(9, 'So Long, and Thanks for All the Fish', 225),
(10, 'Mostly Harmless', 288);

-- --------------------------------------------------------

--
-- Tabellstruktur `_AuthorToBook`
--

DROP TABLE IF EXISTS `_AuthorToBook`;
CREATE TABLE `_AuthorToBook` (
  `A` int(10) UNSIGNED NOT NULL,
  `B` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `_AuthorToBook`
--

INSERT INTO `_AuthorToBook` (`A`, `B`) VALUES
(1, 1),
(1, 2),
(2, 3),
(5, 3),
(3, 4),
(4, 4),
(5, 4),
(6, 5),
(7, 6),
(7, 7),
(7, 8),
(7, 9),
(7, 10);

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `Author`
--
ALTER TABLE `Author`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `Book`
--
ALTER TABLE `Book`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `_AuthorToBook`
--
ALTER TABLE `_AuthorToBook`
  ADD UNIQUE KEY `_AuthorToBook_AB_unique` (`A`,`B`),
  ADD KEY `_AuthorToBook_B_index` (`B`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `Author`
--
ALTER TABLE `Author`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT för tabell `Book`
--
ALTER TABLE `Book`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `_AuthorToBook`
--
ALTER TABLE `_AuthorToBook`
  ADD CONSTRAINT `_AuthorToBook_A_fkey` FOREIGN KEY (`A`) REFERENCES `Author` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_AuthorToBook_B_fkey` FOREIGN KEY (`B`) REFERENCES `Book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
