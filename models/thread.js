const database = require('../config/database.js');

let Thread = {};

Thread.findAll = () => {
  return database.query('SELECT * FROM threads ORDER BY votes DESC');
}

Thread.findThreadById = (id) => {
  return database.query('SELECT * FROM threads WHERE id = $1', [id]);
}

Thread.createThread = (data) => {
  return database.query(
    `INSERT INTO threads
    (title, content)
    VALUES
    ($1, $2)`,
    [data.title, data.content]
  );
}

module.exports = Thread;
