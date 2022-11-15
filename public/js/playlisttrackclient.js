const addTrackToPkaylisttBtn = document.querySelectorAll('.addTrackToPkaylisttBtn');
const resp = document.querySelector('.resp');

addTrackToPkaylisttBtn.forEach((button) => (button.addEventListener('click', async (event) => {

  const { playlistid } = event.target.dataset;

  const { trackid } = event.target.dataset;

  const response = await fetch(`/playlists/${playlistid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      playlistId: playlistid,
      trackId: trackid,
    }),
  });

  const element = event.target.closest('.trackCard');
  const data = await response.json();
  if (data.result) {
    element.remove();
    resp.innerHTML = data.message;
  } else {
    resp.innerHTML = 'Недостаточно прав';
  }
})));
