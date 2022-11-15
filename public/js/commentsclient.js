const addComment = document.querySelector('.AddComment');
addComment.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const { id } = event.target.dataset;
    const comment = event.target.comment.value;
    const { playlistid } = event.target.dataset;

    const response = await fetch(`/playlists/${playlistid}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({
        comment,
        userId: id,
      }),
    });

    const data = await response.json();
    if (!data.result) {
      addComment.insertAdjacentHTML('beforeend', `<p>${data.message}</p>`);
    } else {
      addComment.innerHTML = data.message;
    }
    addComment.reset();
  } catch (error) {
    console.log(error);
  }
});
