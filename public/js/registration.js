const form = document.querySelector('.regForm');

const confirmation = document.querySelector('#confirm');
console.log(form, confirmation);
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = event.target.name.value;
  const password = event.target.password.value;
  const email = event.target.email.value;
 
  const passwordconf = event.target.passwordconf.value;

  try {
    const response = await fetch('/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({
        name,
        password,
        email,
        passwordconf,
      }),
    });
    const data = await response.json();

    if (!data.registration) {
      confirmation.innerHTML = data.message;
    } else {
      window.location.assign('/');
    }
  } catch (error) {
    console.log(error.message);
  }
});
