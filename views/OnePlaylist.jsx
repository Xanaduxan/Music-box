const React = require('react');
const Layout = require('./Layout');

function PlaylistTracks({
  user, playlisttracks, playlist,
}) {
  return (
    <Layout user={user}>
      <div className="resp" />
      <div>
        {playlisttracks.map((track) => (
          <div key={track.id} className="trackCard" data-trackid={track.id}>

            <div>
              Название трека:
              {' '}
              {track['Tracks.title']}
            </div>
            <div>
              Изображение:
              {' '}
              <img src={track['Tracks.image']} alt={`${track['Tracks.title']}`} />
            </div>

          </div>

        ))}
      </div>
      {user.id === playlist.userId && (
      <button type="button" className="delAll" data-playlist={playlist.id}>Удалить весь плейлист</button>)}

      <script defer src="/js/oneplaylistclient.js" />
    </Layout>
  );
}

module.exports = PlaylistTracks;
