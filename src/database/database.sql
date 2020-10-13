-- DROP DATABASE IF EXISTS js_playground;
--
-- CREATE DATABASE js_playground;

CREATE TYPE authProviderEnum AS ENUM ('google', 'facebook', 'twitter');

-- DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    authProvider authProviderEnum NOT NULL,
    authId VARCHAR(255) NOT NULL
)
