const React = require('react');
const Layout = require('./Layout');

function PlaylistTracks({ user, playlisttracks, playlist }) {
  return (
    <Layout user={user}>
      <h1 className='oldTitle'>{`${playlist.title}`}</h1>
      <div className="resp" />
      <div className="track-list">
        <form className="playlistChange" method="put" data-playlistidform={playlist.id} action={`/playlists/${playlist.id}/edit`}>
          <div className="mb-3">
            <label htmlFor="title"> Название</label>
            <input type="text" id="title" name="title" className="form-control" />
          </div>

          <button type="submit" className="btn btn-primary editBtn">Отправить</button>
          {' '}

        </form>
        {playlisttracks.map((track) => (
          <div key={track['Tracks.id']} className="trackCard" data-trackid={track['Tracks.id']}>

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
            {user.id === playlist.userId && (
            <button type="button" className="delOne" data-playlist={playlist.id} data-track={track['Tracks.id']}>Удалить песню из плейлиста</button>)}
          </div>

        ))}

        {user.id === playlist.userId && (
        <button type="button" className="delAll" data-playlist={playlist.id}>Удалить весь плейлист</button>)}
      </div>
      <script defer src="/js/oneplaylistclient.js" />
    </Layout>
  );
}

module.exports = PlaylistTracks;
