loadAllPhotos();

// https://jsonplaceholder.typicode.com/albums/2/photos
function loadAllPhotos() {
  var url = "https://jsonplaceholder.typicode.com/albums/2/photos";
  var options = { method: "GET" };
  console.log("start to fetch.");
  fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      var grid = document.getElementById("home-photo-grid");
      data.forEach((d) => {
        eleDiv = createImageDiv(d.url, d.title);
        grid.innerHTML = eleDiv + grid.innerHTML;
      });

      var photoCount = document.getElementById("photo-counter");
      photoCount.innerHTML = parseInt(photoCount.innerHTML) - 0 + data.length;
    })
    .catch((error) => {
      console.log(error);
    });
}

function createImageDiv(src, title) {
  return `<div class="inner-photo-div" onclick="fadeOutPhoto(this)"> <img src="${src}" width="90%" height="85%">${title}</div>`;
}

function fadeOutPhoto(element) {
    console.log("click me oops");
    console.log(element);

    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.05){
            clearInterval(timer);
            document.getElementById("home-photo-grid").removeChild(element);
            var counter = document.getElementById("photo-counter");
            counter.innerHTML = counter.innerHTML - 1;
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.05;
    }, 1);


}