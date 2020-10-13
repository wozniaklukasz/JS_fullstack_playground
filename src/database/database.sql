-- DROP DATABASE IF EXISTS js_playground;
--
-- CREATE DATABASE js_playground;

CREATE TYPE authProvider AS ENUM ('google', 'facebook', 'twitter');
CREATE TYPE userRole AS ENUM ('admin', 'user');

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    authProvider authProvider NOT NULL,
    authId VARCHAR(255) NOT NULL,
    userRole userRole NOT NULL
)
