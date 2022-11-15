const delAll = document.querySelector('.delAll');
const resp = document.querySelector('.resp');
const trackList = document.querySelector('.track-list');
const playlistChange = document.querySelector('.playlistChange');
const oldTitle = document.querySelector('.oldTitle');

playlistChange.addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = event.target.title.value;
 
  const { playlistidform } = event.target.dataset;

  const response = await fetch(`/playlists/${playlistidform}/edit`, {
    method: 'PUT',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      title,
    }),
  });
  const data = await response.json();
  if (data.result) {
    oldTitle.remove();
  
    resp.insertAdjacentHTML('beforeend', `<h1>${data.newPlaylist.title}</h1><br/><p>${data.message}</p>`);

    
  } else {
    resp.innerHTML = data.message;
  }
});

trackList.addEventListener('click', async (event) => {
  if (event.target.classList.contains('delAll')) {
    const { playlist } = event.target.dataset;

    const response = await fetch(`/playlists/${playlist}`, {
      method: 'Delete',
    });
    const data = await response.json();

    if (data.result) {
      window.location.replace('/');
    } else {
      resp.innerHTML = data.message;
    }
  }
  if (event.target.classList.contains('delOne')) {
    const trackCard = event.target.closest('.trackCard');
    const { track } = event.target.dataset;
    const { playlist } = event.target.dataset;

    const response = await fetch(`/playlists/${playlist}/${track}`, {
      method: 'Delete',
    });
    const data = await response.json();
    if (data.result) {
      trackCard.remove();
      resp.innerHTML = data.message;
    } else {
      resp.innerHTML = data.message;
    }
  }
});
