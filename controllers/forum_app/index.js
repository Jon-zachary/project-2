const router = require('express').Router();
const controller = require('./controller.js');

router.get('/', controller.index);
router.get('/new', controller.new);
router.get('/:post_id', controller.show);
// router.get('/:id/comment/:id', controller.editComment);


router.post('/', controller.create);
router.post('/:post_id', controller.createComment);

router.put('/:post_id/post-votes', controller.postVotes);
router.put('/:post_id/:cmmnt_id', controller.commentVotes);


module.exports = router;
