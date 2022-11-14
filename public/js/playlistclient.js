const AddForm = document.querySelector('.AddForm');
const addRes = document.querySelector('.addRes');

AddForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const { id } = event.target.dataset;
    const title = event.target.title.value;
    const response = await fetch('/playlists/add', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({
        title,
        userId: id,
      }),
    });
    const data = await response.json();
    if (!data.result) {
      addRes.innerHTML = data.message;
    } else {
      addRes.insertAdjacentHTML('beforeend', `<p>${data.message}</p><br><a href='/playlists/${data.playlist.id}'>Добавить песни в плейлист ${data.playlist.title}</a>`);
    }
    AddForm.reset();
  } catch (error) {
    console.log(error.message);
  }
});
