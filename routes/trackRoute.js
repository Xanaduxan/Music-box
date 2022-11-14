const router = require('express').Router();
const { Track } = require('../db/models');
const AddTrack = require('../views/AddTrack');

router.get('/add', async (req, res) => {
  try {
    const { user } = res.locals;
    const { id } = user;
    res.renderComponent(AddTrack, { user, id });
  } catch (error) {
    console.log(error);
  }
});

router.post('/add', async (req, res) => {
  const { title, image } = req.body;

  const { user } = res.locals;
  const { id } = user;
  try {
    if (title.trim() === '') {
      res.json({ result: false, message: 'Поля не могут быть пустыми' });
    } else {
      const track = await Track.create({
        title,
        image,
        userId: id,
      });

      res.json({ result: true, message: 'Трек добавлен', track });
    }
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = router;
