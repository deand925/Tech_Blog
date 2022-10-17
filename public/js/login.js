const $userNameInput = document.getElementById('userNameInput');
const $passwordInput = document.getElementById('passwordInput');
const $signUpBtn = document.getElementById('signUpBtn');


$signUpBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  const userInput = $userNameInput.value;
  const passwordInput = $passwordInput.value;

  if (userInput.trim().length === 0) {
    alert('Username must be provided');
    return;
  }

  if (passwordInput.trim().length === 0) {
    alert('Password must be provided');
    return;
  }

  try {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: userInput,
        password: passwordInput,
      })
    });
    
    const user = await res.json();
    if (user) {
        console.log('We made it', user)
    }
  } catch (error) {
    console.log(error);
  }
});