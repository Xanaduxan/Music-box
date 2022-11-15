const router = require('express').Router();
const { Playlist, Track, PlaylistTrack } = require('../db/models');
const AddPlaylist = require('../views/AddPlaylist');
const PlaylistTracks = require('../views/PlaylistTracks');
const OnePlaylist = require('../views/OnePlaylist');

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

router.get('/:playlistId', async (req, res) => {
  try {
    const { user } = res.locals;

    const { playlistId } = req.params;
    const tracks = await Track.findAll({});

    const playlist = await Playlist.findOne({
      where: {
        id: playlistId,
      },
    });

    const playlisttracks = await Playlist.findAll({
      where: {
        id: playlistId,
      },
      include: {
        model: Track,
      },
      raw: true,
    });
    console.log(playlisttracks);
    res.renderComponent(PlaylistTracks, {
      tracks, user, playlist, playlisttracks,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/:playlistId', async (req, res) => {
  const { playlistId, trackId } = req.body;

  const { user } = res.locals;
  const { id } = user;
  try {
    const playlist = await Playlist.findOne({
      where: { id: playlistId },

    });

    if (playlist.userId === id) {
      const playlisttrack = await PlaylistTrack.create({
        playlistId,
        trackId,
      });
      res.json({ result: true, message: 'Песня добавлена', playlisttrack });
    } else {
      res.json({ result: false, message: 'Недостаточно прав' });
    }
  } catch (error) {
    res.json(error.message);
  }
});

router.get('/:playlistId/edit', async (req, res) => {
  try {
    const { user } = res.locals;

    const { playlistId } = req.params;

    const playlist = await Playlist.findOne({
      where: {
        id: playlistId,
      },
    });

    const playlisttracks = await Playlist.findAll({
      where: {
        id: playlistId,
      },
      include: {
        model: Track,
      },
      raw: true,
    });

    res.renderComponent(OnePlaylist, {
      user, playlist, playlisttracks,
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:playlistId', async (req, res) => {
  const { playlistId } = req.params;
  const { user } = res.locals;
  try {
    const playlist = await Playlist.findOne({ where: { id: playlistId } });

    if (user.id === playlist.userId) {
      
      
      const playlisttrack = await PlaylistTrack.findAll({ where: { playlistId } });
      console.log(playlisttrack)
      const data = await Playlist.destroy({ where: { id: playlistId } });
      if (data) {
        return res.status(202).json({ result: true });
      }
      return res.json({ result: false, message: 'Не удалось' });
    }
  } catch (e) {
    res.json({ message: false });
  }
});

module.exports = router;
