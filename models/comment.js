const database = require('../config/database.js');

let Comments = {};

Comments.findAllByThreadId = (id) => {
  return database.query('SELECT * FROM comments WHERE thread_id = $1 ORDER BY votes DESC', [id]);
}

Comments.createComment = (data, id) => {
  return database.query(
    `INSERT INTO comments
    (comment, thread_id)
    VALUES
    ($1, $2)`,
    [data.comment, id]
  );
}

module.exports = Comments;
