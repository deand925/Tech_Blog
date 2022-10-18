async function loginFormHandler(event){
  event.preventDefault();

  const $userNameInput = document.getElementById('userNameInput').value.trim();
  const $passwordInput = document.getElementById('passwordInput').value.trim();

  if ($userNameInput && $passwordInput) {
      const response = await fetch('/api/user/login', {
          method: 'post',
          body: JSON.stringify({
              username,
              password
          }),
          headers: {'Content-Type': 'application/json'} 
      });

      if (response.ok) {
          document.location.replace('/dashboard');
      }
      else
      {
          alert('Unable to login with these credentials!');
          document.querySelector('#password-field').value = '';
      }
  }
}

document.querySelector('#logInBtn').addEventListener('submit', loginFormHandler);