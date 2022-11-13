const router = require('express').Router();
const bcrypt = require('bcrypt');
const Registration = require('../views/Registration');
const { User } = require('../db/models');

router.get('/', (req, res) => {
  res.renderComponent(Registration);
});

router.post('/', async (req, res) => {
  const {
    name, password, email, passwordconf,
  } = req.body;

  const userEmail = await User.findOne({
    where: {
      email,
    },
    raw: true,
  });
  if (userEmail) {
    return res.json({ registration: false, message: 'Невозможно зарегистрировать по этому email' });
  }
  if (password !== passwordconf) {
    return res.json({ registration: false, message: 'Пароли не совпадают' });
  }
  if (password.length < 8) {
    return res.json({ registration: false, message: 'Пароль должен быть не менее 8 символов ' });
  }
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    newUser.save();

    req.session.userId = newUser.id;
    res.json({ registration: true });
  } catch ({ message }) {
    console.log(message);
  }
});
module.exports = router;
