const database = require('../config/database.js');

let Post = {};

Post.findAll = () => {
  return database.query('SELECT * FROM posts ORDER BY votes DESC');
}

Post.findPostById = (id) => {
  return database.query('SELECT * FROM posts WHERE id = $1', [id]);
}

Post.createPost = (data) => {
  return database.query(
    `INSERT INTO posts
    (title, content)
    VALUES
    ($1, $2)`,
    [data.title, data.content]
  );
}

Post.sumComments = (id) => {
  return database.query('SELECT COUNT(content) FROM comments WHERE post_id = $1', [id]);
}

module.exports = Post;
