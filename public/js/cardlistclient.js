const cardAdd = document.querySelector('.AddForm');
const addRes = document.querySelector('.addRes');

cardAdd.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const { id } = event.target.dataset;
    const title = event.target.title.value;
    const image = event.target.image.value;
    const response = await fetch('/tracks/add', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({
        title,
        image,
        userId: id,
      }),
    });
    const data = await response.json();
    if (!data.result) {
      addRes.innerHTML = data.message;
    } else {
      addRes.innerHTML = data.message;
    }
    cardAdd.reset();
  } catch (error) {
    console.log(error.message);
  }
});
