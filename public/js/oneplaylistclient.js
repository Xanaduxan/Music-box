const delAll = document.querySelector('.delAll');
const resp = document.querySelector('.resp');

delAll.addEventListener('click', async (event) => {
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
});
