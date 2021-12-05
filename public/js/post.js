
const imageForm = document.getElementById("imageForm")
const imageInput = document.querySelector("#imageInput")
const imageGo = document.getElementById("images");
var img_url;

imageForm.addEventListener("submit", async event => {
  event.preventDefault()
  const file = imageInput.files[0]

  // get secure url from our server
  const { url } = await fetch("/api/s3/URL").then(res => res.json())

  // post the image direclty to the s3 bucket
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: file
  })

  img_url = url.split('?')[0]

  // post requst to my server to store any extra data  
  
  const img = document.createElement("img")
  img.src = img_url
  imageGo.appendChild(img)
});

const newFormHandler = async (event) => {
    event.preventDefault();
  
    const description = document.querySelector('#project-desc').value.trim();
  
    if (img_url && description) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ img_url, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create project');
      }
    }  
};
document
  .querySelector('.new-project-form')
  .addEventListener('click', newFormHandler);