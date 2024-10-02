-- Insert Users
INSERT INTO User (Name, Username, Password, Follow_count) VALUES
('Alice Smith', 'alice123', 'password1', 10),
('Bob Johnson', 'bobthebuilder', 'password2', 5),
('Charlie Brown', 'charlie.b', 'password3', 15),
('Diana Prince', 'wonderwoman', 'password4', 20),
('Evan Harris', 'evan_h', 'password5', 8);

-- Insert Followers
INSERT INTO Follower (Follows, Influencer) VALUES
(1, 2),  -- Alice follows Bob
(1, 3),  -- Alice follows Charlie
(2, 1),  -- Bob follows Alice
(3, 1),  -- Charlie follows Alice
(4, 2),  -- Diana follows Bob
(5, 3);  -- Evan follows Charlie

-- Insert Arguments
INSERT INTO Arguments (Comment, Likes, Views, Hyperlink, Poster, T1_votes, T2_votes) VALUES
('Lua is the best programming language?', 5, 100, 'http://example.com', 1, 10, 5),
('Is pineapple on pizza a crime?', 10, 150, NULL, 2, 20, 2),
('Can AI surpass human intelligence?', 8, 200, 'http://example.com/ai', 3, 15, 10);

-- Insert Posts
INSERT INTO Post (Comment, Likes, Views, Poster, Hyperlink) VALUES
('I love programming!', 15, 250, 1, NULL),
('Pizza is life!', 20, 300, 2, NULL),
('AI is the future.', 25, 400, 3, 'http://example.com/ai-future');

-- Insert Replies
INSERT INTO Replies (Comment, Likes, Views, Poster) VALUES
('Absolutely agree!', 3, 30, 2),
('I think Python is the best.', 5, 50, 3),
('That’s a hot take!', 4, 40, 4);

-- Insert Replies to Arguments
INSERT INTO Replies_to_args (reply, arg) VALUES
(1, 1),
(2, 2),
(3, 1);

-- Insert Replies to Posts
INSERT INTO Replies_to_post (reply, post) VALUES
(1, 1),
(2, 2),
(3, 3);

-- Insert Categories
INSERT INTO Categories (Category, tag) VALUES
('Technology', 'tech'),
('Food', 'food'),
('Health', 'health');

-- Insert Arg_tags
INSERT INTO Arg_tags (arg, tag) VALUES
(1, 'programming'),
(2, 'food'),
(3, 'AI');

-- Insert Post_tags
INSERT INTO Post_tags (post, tag) VALUES
(1, 'programming'),
(2, 'food'),
(3, 'AI');

