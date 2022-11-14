const router = require('express').Router();
const { Track, Playlist } = require('../db/models');

const MainPage = require('../views/MainPage');

router.get('/', async (req, res) => {
  const { user } = res.locals;
  const tracks = await Track.findAll({
    order: [['createdAt', 'DESC']],
    logging: false,
  });
  const playlists = await Playlist.findAll({
    order: [['createdAt', 'DESC']],
    logging: false,
  });
  console.log(tracks);
  res.renderComponent(MainPage, { tracks, playlists, user });
});
module.exports = router;