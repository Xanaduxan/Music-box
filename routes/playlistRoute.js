const router = require('express').Router();
const {
  Playlist, Track, PlaylistTrack, Comment,
} = require('../db/models');
const AddPlaylist = require('../views/AddPlaylist');
const PlaylistTracks = require('../views/PlaylistTracks');
const OnePlaylist = require('../views/OnePlaylist');
const CommentPage = require('../views/CommentPage');

// GET /playlists/add
router.get('/add', async (req, res) => {
  try {
    const { user } = res.locals;
    const { id } = user;
    res.renderComponent(AddPlaylist, { user, id });
  } catch (error) {
    console.log(error);
  }
});

// POST /playlists/add
// -> POST /playlists
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

// GET /playlists/:playlistId
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
    const comments = await Comment.findAll({});
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
      tracks, user, playlist, playlisttracks, comments,
    });
  } catch (error) {
    console.log(error);
  }
});

// POST /playlists/:playlistId
// -> POST /playlists/:playlistId/tracks
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

// GET /playlists/:playlistId/edit
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

// PUT /playlists/:playlistId/edit
// -> PUT /playlists/:playlistId
router.put('/:playlistId/edit', async (req, res) => {
  try {
    const { user } = res.locals;

    const { playlistId } = req.params;
    const { title } = req.body;

    const playlist = await Playlist.findOne({
      where: {
        id: playlistId,
      },
    });

    if (user.id === playlist.userId) {
      const data = await Playlist.update({ title }, { where: { id: playlistId } });
      const newPlaylist = await Playlist.findOne({
        where: {
          id: playlistId,
        },
      });
      res.json({ result: true, message: 'Плейлист изменен', newPlaylist });
    }
  } catch (e) {
    console.error(e);
    res.json({ result: false, message: e.message });
  }
});

// DELETE /playlists/:playlistId
router.delete('/:playlistId', async (req, res) => {
  const { playlistId } = req.params;
  const { user } = res.locals;
  try {
    const playlist = await Playlist.findOne({ where: { id: playlistId } });

    if (user.id === playlist.userId) {
      const playlisttrack = await PlaylistTrack.findAll({ where: { playlistId } });
      console.log(playlisttrack);
      const data = await Playlist.destroy({ where: { id: playlistId } });
      if (data) {
        return res.status(202).json({ result: true });
      }
      return res.json({ result: false, message: 'Не удалось' });
    }
  } catch (e) {
    res.json({ message: e.message });
  }
});

// DELETE /playlists/:playlistId/:trackId
// -> DELETE /playlists/:playlistId/tracks/:trackId
router.delete('/:playlistId/:trackId', async (req, res) => {
  const { playlistId } = req.params;
  const { trackId } = req.params;
  const { user } = res.locals;

  try {
    const playlist = await Playlist.findOne({ where: { id: playlistId } });

    if (user.id === playlist.userId) {
      const data = await PlaylistTrack.destroy({ where: { playlistId, trackId } });

      if (data) {
        return res.status(202).json({ result: true, message: 'Песня удалена из плейлиста' });
      }
      return res.json({ result: false, message: 'Не удалось' });
    }
  } catch (e) {
    console.error(e);
    res.json({ result: false });
  }
});

// GET /playlists/:playlistId/comments
router.get('/:playlistId/comments', async (req, res) => {
  try {
    const { user } = res.locals;

    const { playlistId } = req.params;

    const playlist = await Playlist.findOne({
      where: {
        id: playlistId,
      },
    });

    const comments = await Comment.findAll({ where: { playlistId } });

    res.renderComponent(CommentPage, {
      user, comments, playlist,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/:playlistId/comments', async (req, res) => {
  const { user } = res.locals;

  try {
    const { playlistId } = req.params;
    const { comment } = req.body;

    if (comment.trim() === '') {
      res.json({ result: false, message: 'Поля не могут быть пустыми' });
    } else {
      const newComment = await Comment.create({
        comment,
        userId: user.id,
        playlistId,
      });

      res.json({ result: true, message: 'Комментарий добавлен', newComment });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
