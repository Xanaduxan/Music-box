const React = require('react');
const Layout = require('./Layout');

function PlaylistTracks({
  tracks, user, playlist, playlisttracks, comments,
}) {
  return (
    <Layout user={user}>
      <div className="resp" />
      <div className="list-group">

        <caption>Список треков</caption>
        <div>
          {tracks.map((track) => (
            <div key={track.id} className="trackCard" data-trackid={track.id}>

              <div>
                Название трека:
                {' '}
                {track.title}
              </div>
              <div>
                Изображение:
                {' '}
                <img src={track.image} alt={`${track.title}`} />
              </div>

              <div className="buttons">
                {user.id === playlist.userId && (
                <div><button type="button" className="addTrackToPkaylisttBtn" data-trackid={track.id} data-playlistid={`${playlist.id}`} data-id={`${playlist.userId}`} name={`add${track.id}`}>Добавить</button></div>
                )}
              </div>
            </div>
          ))}

        </div>
        <a href={`/playlists/${playlist.id}/comments`}>Прокомментировать плейлист</a>
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="commentCard" data-userid={user.id}>

              <div>
                Комментарий:
                {' '}
                {comment.comment}
              </div>

              <div className="buttons">
                {user.id === comment.userId && (
                <div>
                  <button type="button" className="changeComment" data-trackid={user.id} data-playlistid={playlist.id} name={`edit${comment.id}`}>Редактировать</button>
                  <button type="button" className="delComment" data-trackid={user.id} data-playlistid={playlist.id} name={`del${comment.id}`}>Удалить</button>
                </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div>
          <a href={`/playlists/${playlist.id}/edit`}>Редактировать плейлист</a>
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

      </div>

      <script defer src="/js/playlisttrackclient.js" />
    </Layout>
  );
}

module.exports = PlaylistTracks;
