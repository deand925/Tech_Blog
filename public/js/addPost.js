const $postTitle = document.getElementById('postTitle');
const $textInput = document.getElementById('textInput');
const $subBtn = document.getElementById('subBtn');

$subBtn.addEventListener('submit', async (event) => {
    event.preventDefault();

    const postTitle = $postTitle.value;
    const textInput = $textInput.value;

    if (postTitle.trim().length === 0) {
        alert('Post must have a title!');
        return;
    }

    if (textInput.trim().length === 0) {
        alert('Post must have a body!');
        return;
    }

    try {
        const res = await fetch('api/posts', {
            method: 'post',
            body: JSON.stringify({
                title,
                text_content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const post = await res.json();
        if (post) {
            console.log(post, 'Post worked')
        }

    } catch (error) {
        console.log(error);
    }
});