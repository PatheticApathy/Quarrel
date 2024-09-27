CREATE IF NOT EXISTS QuarrelDB; 

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
  Follows varchar(30),
  Password varchar(30),
  FOREIGN KEY(Follows) REFERENCES USER(UID),
  FOREIGN KEY(Password) REFERENCES USER(UID)
);

# Like has functional requirment to update on liking post
CREATE TABLE IF NOT EXISTS Arguments (
  AID int NOT NULL AUTO_INCREMENT,
  Comment varchar(280),
  Likes int,
  Views int,
  Hyperlink varchar(500),
  Poster int,
  T1_votes int,
  T2_votes int,
  FOREIGN KEY(Poster) REFERENCES USER(UID)
);

CREATE TABLE IF NOT EXISTS Post (
  PID int NOT NULL AUTO_INCREMENT,
  Comment varchar(280),
  Likes int,
  Views int,
  Poster int,
  FOREIGN KEY(Poster) REFERENCES USER(UID)
);

CREATE TABLE IF NOT EXISTS Replies (
  PID int NOT NULL AUTO_INCREMENT,
  Comment varchar(280),
  Likes int,
  Views int,
  Poster int,
  Hyperlink varchar(500),
  FOREIGN KEY(Poster) REFERENCES USER(UID)
);

CREATE TABLE IF NOT EXISTS Arg_tags (
  arg int,
  tag varchar(20)
  FOREIGN KEY(arg) REFERENCES Arguments(AID)
  FOREIGN KEY(tag) REFERENCES Categories(TAG)
);

CREATE TABLE IF NOT EXISTS Post_tags (
  post int,
  tag varchar(20)
  FOREIGN KEY(post) REFERENCES Post(PID)
  FOREIGN KEY(tag) REFERENCES Categories(TAG)
);
