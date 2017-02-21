const database = require('../config/database.js');
const marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

let Post = {};

Post.findAll = () => {
  return database.query('SELECT * FROM posts ORDER BY comments_num DESC, votes DESC');
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
    [data.title, marked(data.content)]
  );
}

Post.sumComments = (id) => {
  return database.query('UPDATE posts SET comments_num = comments_num + 1 WHERE id = $1', [id]);
}

Post.votes = (id) => {
  return database.query('UPDATE posts SET votes = votes + 1 WHERE id = $1', [id]);
}

module.exports = Post;


//ORDER BY comments DESC, likes DESC
