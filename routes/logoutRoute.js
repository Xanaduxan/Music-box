const router = require('express').Router();

router.route('/').get((req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('user_uid');
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
