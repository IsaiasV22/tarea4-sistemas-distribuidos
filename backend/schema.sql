-- Ejecutar en el SQL Editor de Neon.
-- El id lo genera el cliente (como en el Tutorial 9), por eso no es SERIAL.

DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS publishers;

CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT,
  edition TEXT,
  copyright INTEGER,
  language TEXT,
  pages INTEGER,
  author TEXT,
  author_id INTEGER,
  publisher TEXT,
  publisher_id INTEGER
);

CREATE TABLE authors (
  id INTEGER PRIMARY KEY,
  author TEXT,
  nationality TEXT,
  birth_year INTEGER,
  fields TEXT
);

CREATE TABLE publishers (
  id INTEGER PRIMARY KEY,
  publisher TEXT,
  country TEXT,
  founded INTEGER,
  genere TEXT
);

INSERT INTO books (id, title, edition, copyright, language, pages, author, author_id, publisher, publisher_id) VALUES
  (1, 'Operating System Concepts', '9th', 2012, 'ENGLISH', 976, 'Abraham Silberschatz', 1, 'John Wiley & Sons', 1),
  (2, 'Database System Concepts', '6th', 2010, 'ENGLISH', 1376, 'Abraham Silberschatz', 1, 'John Wiley & Sons', 1),
  (3, 'Computer Networks', '5th', 2010, 'ENGLISH', 960, 'Andrew S. Tanenbaum', 2, 'Pearson Education', 2),
  (4, 'Modern Operating Systems', '4th', 2014, 'ENGLISH', 1136, 'Andrew S. Tanenbaum', 2, 'Pearson Education', 2);

INSERT INTO authors (id, author, nationality, birth_year, fields) VALUES
  (1, 'Abraham Silberschatz', 'Israelis / American', 1952, 'Database Systems, Operating Systems'),
  (2, 'Andrew S. Tanenbaum', 'Dutch / American', 1944, 'Distributed computing, Operating Systems');

INSERT INTO publishers (id, publisher, country, founded, genere) VALUES
  (1, 'John Wiley & Sons', 'United States', 1807, 'Academic'),
  (2, 'Pearson Education', 'United Kingdom', 1844, 'Education');
