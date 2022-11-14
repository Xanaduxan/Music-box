const React = require('react');
const Layout = require('./Layout');

function MainPage({ tracks, playlists, user }) {
  return (
    <Layout user={user}>

      <div className="container">
        <p>Tracks:</p>
        <ul className="trackList">
          {tracks.map((track) => (
            <li key={track.id}>
              <a href={`/tracks/${track.id}`}>
                Tracks
                {' '}
                { }
                {track.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="container">
        <p>Playlists:</p>
        <ul className="trackList">
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <a href={`/playlists/${playlist.id}`}>
                Tracks
                {' '}
                { }
                {playlists.title}
              </a>
            </li>
          ))}
        </ul>
      </div>


    </Layout>
  );
}
module.exports = MainPage;