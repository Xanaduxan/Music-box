const form = document.querySelector('.form-authentification');

const invalidFeedback = document.querySelector('.invalid-feedback2');
const emailValue = document.querySelector('#loginInputEmail');
const passwordValue = document.querySelector('#loginPassword');

form.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const response = await fetch('/authentication', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();

    if (!data.name) {
      invalidFeedback.innerHTML = data.message;
      emailValue.value = '';
      passwordValue.value = '';
    } else {
      window.location.replace('/');
    }
  } catch (error) {
    console.log(error.message);
  }
});
