async function newPostHandler(event){
    event.preventDefault();

    const $postTitle = document.querySelector('#postTitle').value.trim();
    const $textInput = document.querySelector('#textInput').value;
    text_content.replace(/\n\r?/g, '<br />');

    const response = await fetch('api/posts', {
        method: 'post',
        body: JSON.stringify({
            title,
            text_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok){
        document.location.replace('/dashboard');
    }
    else
    {
        alert(response.statusText);
    }
}

document.querySelector('#subBtn').addEventListener('submit', newPostHandler);