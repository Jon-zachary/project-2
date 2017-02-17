const async = require('async');

const Thread = require('../../models/thread.js');
const Comments = require('../../models/comment.js');

let controller = {};

controller.index = (req, res) => {
  Thread
  .findAll()
  .then((data) => {
    res.render('forum_app/index.ejs', {
      threads: data
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

  let thread_data;
  let comment_data;

  const getThreads = (cb) => {
    Thread
    .findThreadById(req.params.id)
    .then((threads) => {
      thread_data = threads;
      cb();
    });
  }

  const getComments = (cb) => {
    Comments
    .findAllByThreadId(req.params.id)
    .then((comments) => {
      comment_data = comments;
      cb();
    });
  }

  async.parallel([getThreads, getComments], () => {
    res.render('forum_app/show.ejs', {
      thread: thread_data[0],
      comments: comment_data
    });
  });
}

controller.create = (req, res) => {
  console.log(req.body)
  Thread
  .createThread(req.body.threads)
  .then((data) => {
    res.redirect(`/all`);
  })
}

controller.createComment = (req, res) => {
  Comments
  .createComment(req.body.comments, req.params.id)
  .then(() => {
    res.redirect(`/all/${req.params.id}`);
  })
}

module.exports = controller;
