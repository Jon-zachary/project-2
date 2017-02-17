const router = require('express').Router();

router.use('/all', require('./controllers/forum_app/index.js'));
// router.use('/all/:id', require('./controllers/comments/index.js'));

module.exports = router;
