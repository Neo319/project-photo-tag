console.log("hello world");

// mock db
const imgData = {
  url: "../src/91qfVY7.jpeg",
  locations: {
    Waldo: {
      // TBD
    },
  },
};

// DOM pieces
const mainDiv = document.getElementById("main");
const img = document.querySelector("img");

const targetBox = document.createElement("div"); // to be used later
targetBox.id = "targetBox";
targetBox.hidden = true;

function loadImage(url) {
  img.src = url;
}
// creates a target box for user's click
function createTarget(e) {
  // get click location in px
  const { offsetX: x, offsetY: y } = e;

  targetBox.style.top = `${y}px`;
  targetBox.style.left = `${x}px`;
  targetBox.hidden = false;

  mainDiv.appendChild(targetBox);
}

loadImage(imgData.url);

// add a target box, and add a dropdown menu
mainDiv.addEventListener("click", (e) => {
  createTarget(e);
});
