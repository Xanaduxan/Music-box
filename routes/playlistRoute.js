const router = require('express').Router();
const { Playlist, Track } = require('../db/models');
const PlaylistPage = require('../views/PlaylistPage');
const AddPlaylist = require('../views/AddPlaylist');

router.get('/add', async (req, res) => {
  try {
    const { user } = res.locals;
    const { id } = user;
    res.renderComponent(AddPlaylist, { user, id });
  } catch (error) {
    console.log(error);
  }
});

router.post('/add', async (req, res) => {
  const { title } = req.body;

  const { user } = res.locals;
  const { id } = user;
  try {
    if (title.trim() === '') {
      res.json({ result: false, message: 'Поля не могут быть пустыми' });
    } else {
      const playlist = await Playlist.create({
        title,
        userId: id,
      });

      res.json({ result: true, message: 'Плейлист создан', playlist });
    }
  } catch (error) {
    res.json(error.message);
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { user } = res.locals;

    const { userId } = req.params;

    const playlist = await Playlist.findOne({
      where: {
        userId,
      },
    });

    const tracks = await Track.findAll({});

    res.renderComponent(PlaylistPage, {
      tracks, user, playlist,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
