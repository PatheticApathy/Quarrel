INSERT INTO User (Name,Username,Password,Follow_count) 
VALUES 
("Alice","Adog","1234",0),
("Bob","Beware",5678,0),
("Clancy","Coll guy6","9012",3),
("Dane","Dman","deez_nutz",1);


# Clancy(3) should have 2 followers. Dane(1) should have 1 follower 
INSERT INTO Follower (Follows,Influencer)
VALUES
(1,3),
(2,3),
(1,4);

INSERT INTO Arguments (Comment,Likes,Views,Hyperlink,Poster,T1_votes,T2_votes)
VALUES
("Dogs are better than cats",1,4,NULL,1,2,2),
("We should burn all buildings",4,0,"https://imgs.search.brave.com/1yTp7pArHlHtkfbRbm1bAD6p23Jwn0G1F_73GWrGNh8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTU3/Mzc1OTc0L3Bob3Rv/L2J1cm5pbmctaG91/c2UtdXBwZXItZmxv/b3ItYW5kLWFuZC1h/c2NlbmRpbmctYmxh/Y2stc21va2UuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPWUt/R0hrT29ua3pUeVdC/STJPeW1PN05mdTlL/UGNrVjVkWjZyOVJK/ckNUNmM9",4,0,0);


INSERT INTO Post (Comment,Likes,Views,Hyperlink,Poster)
VALUES
("Bob sucks",2,2,NULL,1),
("Eat dirt",0,0,NULL,1);

INSERT INTO Replies (Comment,Likes,Views,Poster,arg_reply,post_reply)
VALUES
("I like cheese",2,1,1,2,1),
("I dont like cheese",0,1,2,1,1);

INSERT INTO Arg_tags(arg,tag)
VALUES
(2,"anarchy"),
(2,"Burn baybe burn"),
(1,"Pets");
INSERT INTO Post_tags(post,tag)
VALUES
(1,"hate"),
(2,"dirt"),
(1,"bob");

INSERT INTO Categories(Category,tag)
VALUES
("Communism","anarchy"),
("Pyro","Burn bayby burn"),
("animals","pets"),
("Plants","dirt"),
("Celebrities","bob"),
("Communism","hate");

