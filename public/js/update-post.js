
const updateFormHandler = async (event) => {
  event.preventDefault();

  // get the post id from the url
  const path = window.location.pathname;
  const id = path.slice(path.lastIndexOf("/")+1);
      
  const description = document.querySelector('#project-desc').value.trim();

  if (description) {
        const response = await fetch( `/api/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ description }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          alert(`Post id: ${id} has now been updated.`);
          document.location.replace('/');

        } else {
          alert('Failed to update the post.');
        }
    }
};


document.getElementById('update').addEventListener('click', updateFormHandler);