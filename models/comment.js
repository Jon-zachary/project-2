const database = require('../config/database.js');

let Comments = {};

Comments.findAllByPostId = (id) => {
  return database.query('SELECT * FROM comments WHERE post_id = $1 ORDER BY votes DESC', [id]);
}

Comments.createComment = (data, id) => {
  return database.query(
    `INSERT INTO comments
    (content, post_id)
    VALUES
    ($1, $2)`,
    [data.content, id]
  );
}

Comments.votes = (id) => {
  return database.query('UPDATE comments SET votes = votes + 1 WHERE id = $1', [id]);
}

module.exports = Comments;
