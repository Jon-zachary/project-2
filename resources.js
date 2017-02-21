const router = require('express').Router();


router.use('/all', require('./controllers/forum_app/index.js'));

router.use('/', (req, res) => {
  res.redirect('/all')
});

module.exports = router;
