const router = require('express').Router();

router.use('/all', require('./controllers/forum_app/index.js'));

module.exports = router;
