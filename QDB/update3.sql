-- Delete from tables after deleting reply or post/arg
-- For replies to args
ALTER TABLE Replies_to_args
DROP FOREIGN KEY reply;

ALTER TABLE Replies_to_args
DROP FOREIGN KEY arg;

ALTER TABLE Replies_to_args
ADD CONSTRAINT reply 
FOREIGN KEY(reply) REFERENCES Replies(RID)
ON DELETE CASCADE;

ALTER TABLE Replies_to_args
ADD CONSTRAINT arg 
FOREIGN KEY(arg) REFERENCES Arguments(AID)
ON DELETE CASCADE;

-- For replies to post
ALTER TABLE Replies_to_post
DROP FOREIGN KEY reply;

ALTER TABLE Replies_to_post
DROP FOREIGN KEY post;

ALTER TABLE Replies_to_post
ADD CONSTRAINT post 
FOREIGN KEY(post) REFERENCES Post(PID)
ON DELETE CASCADE;

ALTER TABLE Replies_to_post
ADD CONSTRAINT reply 
FOREIGN KEY(reply) REFERENCES Replies(RID)
ON DELETE CASCADE;
