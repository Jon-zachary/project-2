CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  votes INTEGER DEFAULT 0,
  title VARCHAR(255),
  content TEXT
);

CREATE TABLE comments (
  id BIGSERIAL PRIMARY KEY,
  votes INTEGER DEFAULT 0,
  username VARCHAR(255) DEFAULT 'anonymous',
  content TEXT,
  post_id INTEGER REFERENCES posts(id)
);
