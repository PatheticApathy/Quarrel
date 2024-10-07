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
  FR int NOT NULL AUTO_INCREMENT,
  Follows int,
  Influencer int,
  PRIMARY KEY(FR),
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

CREATE TABLE IF NOT EXISTS Replies_to_args(
  ARID int NOT NULL AUTO_INCREMENT,
  reply int,
  arg int,
  PRIMARY KEY(ARID),
  FOREIGN KEY(reply) REFERENCES Replies(RID),
  FOREIGN KEY(arg) REFERENCES Arguments(AID)
);

CREATE TABLE IF NOT EXISTS Replies_to_post(
  PRID int NOT NULL AUTO_INCREMENT,
  reply int,
  post int,
  PRIMARY KEY(PRID),
  FOREIGN KEY(reply) REFERENCES Replies(RID),
  FOREIGN KEY(post) REFERENCES Post(PID)
);

CREATE TABLE IF NOT EXISTS Categories (
  CTID int NOT NULL AUTO_INCREMENT,
  Category varchar(50),
  tag varchar(20),
  PRIMARY KEY(CTID)
);

CREATE TABLE IF NOT EXISTS Arg_tags (
  ATID int NOT NULL AUTO_INCREMENT,
  arg int,
  tag varchar(20),
  PRIMARY KEY(ATID),
  FOREIGN KEY(arg) REFERENCES Arguments(AID)
);

CREATE TABLE IF NOT EXISTS Post_tags (
  PTID int NOT NULL AUTO_INCREMENT,
  post int,
  tag varchar(20),
  PRIMARY KEY(PTID),
  FOREIGN KEY(post) REFERENCES Post(PID)
);

FLUSH PRIVILEGES;
CREATE USER 'qapi'@'localhost' IDENTIFIED BY 'ARGS';
GRANT ALL PRIVILEGES ON QuarrelDB.* TO 'qapi'@'localhost' IDENTIFIED BY 'ARGS';
FLUSH PRIVILEGES;
