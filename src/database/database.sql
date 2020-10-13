CREATE DATABASE js_playground;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    googleId VARCHAR(255),
    facebookId VARCHAR(255),
    twitterId VARCHAR(255)
)
