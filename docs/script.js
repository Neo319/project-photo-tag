console.log("hello world");

//tracking state
dropDownIsOpen = false;

// mock db
const imgData = {
  url: "../src/91qfVY7.jpeg",
  locations: {
    Waldo: {
      x: 72.8,
      y: 59.9,
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
  const target2 = document.createElement("div");
  target.classList = "target";

  target2.classList = "target2";

  //temp: assume only 1 location
  const { x, y } = locations.Waldo;

  target.style.left = `${x}%`;
  target.style.top = `${y}%`;

  mainDiv.appendChild(target);
  target.appendChild(target2);
}

async function imgClick(e) {
  console.log(e.offsetX, e.offsetY);

  // 1. dropdown menu
  const dropdown = document.createElement("select");
  const option1 = new Option("select one:", "", true, false); // Default option
  const option2 = new Option("Waldo");

  dropdown.add(option1);
  dropdown.add(option2);

  dropdown.classList = "dropdown";

  //temp: assume only 1 location
  const { offsetX: x, offsetY: y } = e;

  dropdown.style.left = `${x}px`;
  dropdown.style.top = `${y}px`;

  mainDiv.appendChild(dropdown);

  // clean up
}

loadImage(imgData.url);
console.log("loaded image.");

// createTarget(imgData.locations);

mainDiv.addEventListener("click", (e) => {
  imgClick(e);
});
