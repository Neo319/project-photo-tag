console.log("hello world");

// mock db
const imageLink = "../src/91qfVY7.jpeg";

// DOM pieces
const mainDiv = document.getElementById("main");
const img = document.querySelector("img");

function loadImage(url) {
  img.src = url;
}
// reveal Waldo's location in the image with given pixel coordinates
function createTarget(x, y) {
  const target = document.createElement("div");
  target.classList = "target";

  target.style.left = "10%";
  target.style.top = "10%";

  mainDiv.appendChild(target);
}

loadImage(imageLink);
console.log("loaded image.");

createTarget(10, 10);
