const React = require('react');

const Layout = require('./Layout');

function AddPlaylist({ user, id }) {
  return (
    <Layout user={user}>
      <h2>Добавьте плейлист</h2>
      <form className="AddForm" method="post" data-id={user.id} action="/playlists/add">

        <div className="mb-3">
          <label htmlFor="title"> Название</label>
          <input type="text" id="title" name="title" className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary addBtn">Отправить</button>
        {' '}

      </form>
      <div className="addRes" />
      <script defer src="/js/playlistclient.js" />
    </Layout>
  );
}
module.exports = AddPlaylist;
