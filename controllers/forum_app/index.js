const router = require('express').Router();
const controller = require('./controller.js');

router.get('/', controller.index);
router.get('/new', controller.new);
router.get('/:post_id/', controller.show);

router.post('/', controller.create);
router.post('/:post_id', controller.createComment);
router.post('/:post_id/:cmmnt_id/comment-reply', controller.createReply);

router.put('/:post_id/post-votes', controller.postVotes);
router.put('/:post_id/:cmmnt_id', controller.commentVotes);
router.put('/:post_id/:cmmnt_id/:reply_id', controller.replyVotes);

module.exports = router;
