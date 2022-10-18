async function signupFormHandler(event){
  event.preventDefault();

  const username = document.querySelector('#usernameNameInput').value.trim();
  const password = document.querySelector('#passwordInput').value.trim();

  if (username && password) {
      console.log(username);
      const response = await fetch('/api/user', {
          method: 'post',
          body: JSON.stringify({
              username,
              password
          }),
          headers: {'Content-Type': 'application/json'}
      });

      if (response.ok) {
          console.log('it worked!')
          document.location.replace('/dashboard');
      }
      else
      {
          alert('An error has occured');
          document.querySelector('#userNameInput').value = '';
          document.querySelector('#passwordInput').value = '';
      }
  }
}

document.querySelector('#signUpBtn').addEventListener('submit', signupFormHandler);