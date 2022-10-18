console.log('File is working')
async function loginFormHandler(event){
  event.preventDefault();
  console.log('Still working')

  const $userNameInput = document.getElementById('userNameInput').value.trim();
  const $passwordInput = document.getElementById('passwordInput').value.trim();

  if ($userNameInput && $passwordInput) {
      const res = await fetch('/api/user/login', {
          method: 'post',
          body: JSON.stringify({
            username,
            password
          }),
          headers: {'Content-Type': 'application/json'} 
      });

      if (res.ok) {
          console.log('Its working');
        document.location.replace('/dashboard');
      }
      else
      {
          alert('Unable to login with these credentials!');
          document.querySelector('#password-field').value = '';
      }
  }
}

 document.querySelector('.loginForm').addEventListener('submit', loginFormHandler);