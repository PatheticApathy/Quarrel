DELIMITER //
CREATE OR REPLACE FUNCTION increment_follow_count(uid int)
RETURNS int
BEGIN
  UPDATE User
  SET follow_count = follow_count + 1
  WHERE UID = uid;

  RETURN (SELECT follow_count FROM User WHERE UID = uid);
END; //


CREATE TRIGGER update_follow_count
AFTER INSERT ON Follower
FOR EACH ROW
BEGIN
  SET @new_count = increment_follow_count(NEW.influencer);
END; // 

DELIMITER ;
