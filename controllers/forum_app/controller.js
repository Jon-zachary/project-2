const async = require('async');

const Post = require('../../models/post.js');
const Comments = require('../../models/comment.js');

let controller = {};

// Find all posts
controller.index = (req, res) => {
  Post
  .findAll()
  .then((data) => {
    res.render('forum_app/index.ejs', {
      posts: data
    });
  })
  .catch((err) => {
    res
    .status(400)
    .send(err);
  });
}

// Show post title, post content, comments and comment replies
controller.show = (req, res) => {
  let post_data;
  let comment_data;
  let comment_replies_data;

  const getPost = (cb) => {
    Post
    .findPostById(req.params.post_id)
    .then((data) => {
      post_data = (data);
      cb();
    });
  }

  const getComments = (cb) => {
    Comments
    .findAllByPostId(req.params.post_id)
    .then((data) => {
      comment_data = data;
      cb();
    });
  }

  async.parallel([getPost, getComments], () => {
    res.render('forum_app/show.ejs', {
      post: post_data[0],
      comments: comment_data,
    });
  });
}

// Create a new post
controller.create = (req, res) => {
  Post
  .createPost(req.body.posts)
  .then((data) => {
    res.redirect(`/all`);
  })
}

// Vote on a post by post id
controller.postVotes = (req, res) => {
  Post
  .votes(req.params.post_id)
  .then(() => {
    res.redirect(`/all`);
  })
}

// Create a new comment per specific post id
controller.createComment = (req, res) => {
  Comments
  .createComment(req.body.comments, req.params.post_id)
  .then(() => {
    res.redirect(`/all/${req.params.post_id}`);
  })
  Post
  .sumComments(req.params.post_id);
}

// Vote on comments per comment id
controller.commentVotes = (req, res) => {
  Comments
  .commentVotes(req.params.cmmnt_id)
  .then(() => {
    res.redirect(`/all/${req.params.post_id}`);
  })
}

// Create a reply per comment  id
controller.createReply = (req, res) => {
  Comments
  .addReply(req.body.replies, req.params.cmmnt_id)
  .then(() => {
    res.redirect(`/all/${req.params.post_id}`);
  });
}

// Vote on reply per reply_id id
controller.replyVotes = (req, res) => {
  Comments
  .replyVotes(req.params.reply_id)
  .then(() => {
    res.redirect(`/all/${req.params.post_id}`);
  })
}

module.exports = controller;
