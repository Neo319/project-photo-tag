console.log("hello world");

// mock db
const imgData = {
  url: "../src/91qfVY7.jpeg",
  locations: {
    Waldo: {
      x: 63.6,
      y: 50.3,
    },
  },
};

// DOM pieces
const mainDiv = document.getElementById("main");
const img = document.querySelector("img");

function loadImage(url) {
  img.src = url;
}
// reveal Waldo's location in the image with given pixel coordinates
function createTarget(locations) {
  const target = document.createElement("div");
  target.classList = "target";

  //temp: assume only 1 location
  const { x, y } = locations.Waldo;

  target.style.left = `${x}%`;
  target.style.top = `${y}%`;

  mainDiv.appendChild(target);
}

loadImage(imgData.url);
console.log("loaded image.");

createTarget(imgData.locations);
