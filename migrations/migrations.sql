CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  votes INTEGER DEFAULT 0,
  title VARCHAR(255),
  content TEXT,
  post_author VARCHAR(255) DEFAULT 'anonymous',
  comments_num INTEGER DEFAULT 0
);

CREATE TABLE comments (
  id BIGSERIAL PRIMARY KEY,
  votes INTEGER DEFAULT 0,
  username VARCHAR(255) DEFAULT 'anonymous',
  content TEXT,
  post_id INTEGER REFERENCES posts(id)
);

CREATE TABLE comment_replies (
  reply_id BIGSERIAL PRIMARY KEY,
  reply_votes INTEGER DEFAULT 0,
  reply_username VARCHAR(255) DEFAULT 'anonymous',
  reply_content TEXT,
  comment_id INTEGER REFERENCES comments(id)
);
