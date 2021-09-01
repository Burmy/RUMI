function setFlashMessageFadeOut(flashMessageElement) {
  setTimeout(() => {
    let currOpacity = 1.0;
    let timer = setInterval(() => {
      if (currOpacity < 0.05) {
        clearInterval(timer);
        flashMessageElement.remove();
      }
      currOpacity = currOpacity - 0.05;
      flashMessageElement.style.opacity = currOpacity;
    }, 50);
  }, 3000);
}

function addFlashFromFrontEnd(message) {
  let flashMessageDiv = document.createElement("div");
  let innerFlashDiv = document.createElement("div");
  let innerTextNode = document.createTextNode(message);
  innerFlashDiv.appendChild(innerTextNode);
  flashMessageDiv.appendChild(innerFlashDiv);
  flashMessageDiv.setAttribute("id", "flash-message");
  innerFlashDiv.setAttribute("class", "alert alert-success");
  document.getElementsByTagName("body")[0].appendChild(flashMessageDiv);
  setFlashMessageFadeOut(flashMessageDiv);
}

function createCard(postData) {
  return `<div id="post-${postData.id}" class="card">
  <a href="/post/${postData.id}">
      <img class="card-image" src="${postData.thumbnail}" alt="Missing Image">
  </a>
  <div class="card-body">
      <p class="card-title">${postData.title}</p>
      <p class="card-text">${postData.description}</p>
      <a href="/post/${postData.id}" class="anchor-buttons">More</a>
  </div>
</div>`;
}

function executeSearch() {
  let searchTerm = document.getElementById("search-text").value;
  if (!searchTerm) {
    location.replace("/");
    return;
  }
  let mainContent = document.getElementById("main-content");
  let searchURL = `/posts/search?search=${searchTerm}`;
  fetch(searchURL)
    .then((data) => {
      return data.json();
    })
    .then((data_json) => {
      let newMainContentHTML = "";
      data_json.results.forEach((row) => {
        newMainContentHTML += createCard(row);
      });
      mainContent.innerHTML = newMainContentHTML;
      if (data_json.message) {
        addFlashFromFrontEnd(data_json.message);
      }
    })
    .catch((err) => {
      console.log(err)
    });
}

let flashElement = document.getElementById("flash-message");
if (flashElement) {
  setFlashMessageFadeOut(flashElement);
}

let searchButton = document.getElementById("search-button");
if (searchButton) {
  searchButton.onclick = executeSearch;
}
