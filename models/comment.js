const database = require('../config/database.js');

let Comments = {};

Comments.findAllByPostId = (id) => {
  return database.query(
    `SELECT
    comments.id, comments.content, comments.votes, comments.username,
    json_agg(json_build_object(
      'reply_id', reply_id,
      'reply_content', reply_content,
      'reply_votes', reply_votes,
      'reply_username', reply_username
    ) ORDER BY reply_votes DESC) AS replies
    FROM comments
    LEFT OUTER JOIN posts
    ON comments.id = posts.id
    LEFT OUTER JOIN comment_replies
    ON comments.id = comment_replies.comment_id
    WHERE post_id = $1 GROUP BY comments.id
    ORDER BY comments.votes DESC;`,
    [id]
  );
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

Comments.commentVotes = (id) => {
  return database.query('UPDATE comments SET votes = votes + 1 WHERE id = $1', [id]);
}

Comments.addReply = (data, id) => {
  return database.query(
    `INSERT INTO comment_replies
    (reply_content, comment_id)
    VALUES
    ($1, $2)`,
    [data.reply_content, id]
  );
}

// Comments.commentReplies = (id) => {
//   return database.query('SELECT * FROM comment_replies WHERE comment_id = $1', [id]);
// }

Comments.replyVotes = (id) => {
  return database.query('UPDATE comment_replies SET reply_votes = reply_votes + 1 WHERE reply_id = $1', [id]);
}

module.exports = Comments;
