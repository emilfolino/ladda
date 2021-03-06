CREATE TABLE IF NOT EXISTS posts (
    name VARCHAR(255) NOT NULL,
    identifier VARCHAR(32) UNIQUE NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS bookings (
    startDate VARCHAR(19) NOT NULL,
    hours INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    postId INTEGER NOT NULL,
    FOREIGN KEY(postId) REFERENCES posts(id),
    FOREIGN KEY(userId) REFERENCES users(id)
);
