CREATE DATABASE IF NOT EXISTS QuarrelDB; 
USE QuarrelDB;

# Follow_count has functional requirment to update when some gets a new follower
CREATE TABLE IF NOT EXISTS User (
    UID int NOT NULL AUTO_INCREMENT, 
    Name varchar(255),
    Username varchar(30),
    Password varchar(30),
    Follow_count INT,
    PRIMARY KEY(UID)
);

CREATE TABLE IF NOT EXISTS Follower (
  Follows int,
  Influencer int,
  FOREIGN KEY(Follows) REFERENCES User(UID),
  FOREIGN KEY(Influencer) REFERENCES User(UID)
);

CREATE TABLE IF NOT EXISTS Arguments (
  AID int NOT NULL AUTO_INCREMENT,
  Comment varchar(280),
  Likes int,
  Views int,
  Hyperlink varchar(500) NULL,
  Poster int,
  T1_votes int,
  T2_votes int,
  PRIMARY KEY(AID),
  FOREIGN KEY(Poster) REFERENCES User(UID)
);

CREATE TABLE IF NOT EXISTS Post (
  PID int NOT NULL AUTO_INCREMENT,
  Comment varchar(280),
  Likes int,
  Views int,
  Poster int,
  PRIMARY KEY(PID),
  Hyperlink varchar(500) NULL,
  FOREIGN KEY(Poster) REFERENCES User(UID)
);

CREATE TABLE IF NOT EXISTS Replies (
  RID int NOT NULL AUTO_INCREMENT,
  Comment varchar(280),
  Likes int,
  Views int,
  Poster int,
  PRIMARY KEY(RID),
  FOREIGN KEY(Poster) REFERENCES User(UID)
);

CREATE TABLE IF NOT EXISTS Categories (
  Category varchar(50),
  tag varchar(20)
);

CREATE TABLE IF NOT EXISTS Arg_tags (
  arg int,
  tag varchar(20),
  FOREIGN KEY(arg) REFERENCES Arguments(AID)
);

CREATE TABLE IF NOT EXISTS Post_tags (
  post int,
  tag varchar(20),
  FOREIGN KEY(post) REFERENCES Post(PID)
);

ALTER TABLE Replies
ADD column arg_reply int,
ADD CONSTRAINT arg_reply
FOREIGN KEY(arg_reply) REFERENCES Arguments(AID);

ALTER TABLE Replies
ADD column post_reply int,
ADD CONSTRAINT post_reply
FOREIGN KEY(post_reply) REFERENCES Post(PID);


FLUSH PRIVILEGES;
CREATE USER 'qapi'@'localhost' IDENTIFIED BY 'ARGS';
GRANT ALL PRIVILEGES ON QuarrelDB.* TO 'qapi'@'localhost' IDENTIFIED BY 'ARGS';
FLUSH PRIVILEGES;
