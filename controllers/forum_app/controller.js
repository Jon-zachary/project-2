const async = require('async');

const Post = require('../../models/post.js');
const Comments = require('../../models/comment.js');

let controller = {};

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

controller.new = (req, res) => {
  res.render('forum_app/new.ejs');
}

controller.show = (req, res) => {
  // Thread
  // .findThreadById(req.params.id)
  // .then((threads) => {
  //   Comments
  //   .findAllByThreadId(req.params.id)
  //   .then((comments) => {
  //     res.render('forum_app/show.ejs', {
  //       thread: threads[0],
  //       comments: comments
  //     });
  //   })
  // })
  // .catch((err) => {
  //   res
  //   .status(400)
  //   .send(err);
  // });

  let post_data;
  let comment_data;
  let comment_replies_data;

  const getPost = (cb) => {
    Post
    .findPostById(req.params.post_id)
    .then((data) => {
      post_data = data;
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

controller.create = (req, res) => {
  Post
  .createPost(req.body.posts)
  .then((data) => {
    res.redirect(`/all`);
  })
}

controller.postVotes = (req, res) => {
  Post
  .votes(req.params.post_id)
  .then(() => {
    res.redirect(`/all`);
  })
}

controller.createComment = (req, res) => {
  Comments
  .createComment(req.body.comments, req.params.post_id)
  .then(() => {
    res.redirect(`/all/${req.params.post_id}`);
  })
  Post
  .sumComments(req.params.post_id);
}

controller.commentVotes = (req, res) => {
  Comments
  .votes(req.params.cmmnt_id)
  .then(() => {
    res.redirect(`/all/${req.params.post_id}`);
  })
}

controller.replyVotes = (req, res) => {
  Comments
  .replyVotes(req.params.reply_id)
  .then(() => {
    res.redirect(`/all/${req.params.post_id}`);
  })
}

module.exports = controller;
