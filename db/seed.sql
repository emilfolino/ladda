INSERT INTO posts (name, identifier) VALUES ("Laddstolpe 1 vänster", "1L");
INSERT INTO posts (name, identifier) VALUES ("Laddstolpe 1 höger", "1R");
INSERT INTO posts (name, identifier) VALUES ("Laddstolpe 2 vänster", "2L");
INSERT INTO posts (name, identifier) VALUES ("Laddstolpe 2 höger", "2R");
INSERT INTO posts (name, identifier) VALUES ("Laddstolpe 3 vänster", "3L");
INSERT INTO posts (name, identifier) VALUES ("Laddstolpe 3 höger", "3R");
INSERT INTO posts (name, identifier) VALUES ("Laddstolpe 4 vänster", "4L");
INSERT INTO posts (name, identifier) VALUES ("Laddstolpe 4 höger", "4R");

INSERT INTO bookings (username, startDate, postId, hours) VALUES ("efo", "2022-04-06 10:00:00", 1, 2);
INSERT INTO bookings (username, startDate, postId, hours) VALUES ("aar", "2022-04-07 13:00:00", 1, 2);
INSERT INTO bookings (username, startDate, postId, hours) VALUES ("aar", "2022-04-06 10:00:00", 3, 2);
INSERT INTO bookings (username, startDate, postId, hours) VALUES ("efo", "2022-04-06 13:00:00", 3, 2);
