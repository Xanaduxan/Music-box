const router = require('express').Router();

const bcrypt = require('bcrypt');

const Authentication = require('../views/Authentication');

const { User } = require('../db/models');

router.get('/', (req, res) => {
  res.renderComponent(Authentication, {});
});

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const errMessage = 'Неправильные email или пароль';
    if (!user) {
      res.json({ login: false, message: errMessage });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare && user.email === email) {
      res.json({ login: false, message: errMessage });
    }

    if (user) {
      req.session.userId = user.id;
    }

    res.json({ login: true });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
