const React = require('react');

const Layout = require('./Layout');

function CommentPage({ user, comments, playlist }) {
  return (
    <Layout user={user}>
      <h2>Добавьте комментарий</h2>
      <form className="AddComment" method="post" data-playlistid={playlist.id} data-id={user.id} action={`/playlists/${playlist.id}/comments`}>

        <div className="mb-3">
          <label htmlFor="title"> Комментарий</label>
          <input type="text" id="title" name="comment" className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary addCommentBtn">Отправить</button>
        {' '}

      </form>
      <div className="addRes" />
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

      <script defer src="/js/commentsclient.js" />
    </Layout>
  );
}
module.exports = CommentPage;
