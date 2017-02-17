const router = require('express').Router();
const controller = require('./controller.js');

router.get('/', controller.index);
router.get('/new', controller.new);
router.get('/:id', controller.show);


router.post('/', controller.create);
router.post('/:id', controller.createComment);

module.exports = router;
