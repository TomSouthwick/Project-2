const newFormHandler = async (event) => {

  const comment = document.querySelector('#post-comment').value.trim();
  const post_id = document.URL.slice(document.URL.lastIndexOf("/")+1);
  

  if (comment) {
    const response = await fetch( `/api/comments/${post_id}`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });    

    if (response.ok) {
      location.reload();
    } else {
      alert('Failed to create project');
    }
  }
};

document
  .querySelector('#new-comment')
  .addEventListener('submit', newFormHandler);
  