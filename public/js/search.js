const searchFunction = (event) => {
  event.preventDefault();
  const query = document.getElementById("searchInput").value;
  window.location = `/search/${query}`;
};
