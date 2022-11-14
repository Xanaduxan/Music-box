const React = require('react');

const Layout = require('./Layout');

function AddTrack({ user}) {
  return (
    <Layout user={user}>

      <form className="AddForm" method="post" data-id={user.id} action="/tracks/add">

        <div className="mb-3">
          <label htmlFor="title"> Название</label>
          <input type="text" id="title" name="title" className="form-control" />
        </div>

        <div className="mb-3">
          <label htmlFor="photoEdit"> Изображение</label>
          <input type="url" id="photoEdit" name="image" className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary addBtn">Отправить</button>
        {' '}
        <div className="addRes" />

      </form>
      <script defer src="/js/cardlistclient.js" />
    </Layout>
  );
}
module.exports = AddTrack;