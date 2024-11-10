console.log("hello world");

// mock db
const imgData = {
  url: "../src/91qfVY7.jpeg",
  locations: [
    {
      name: "Waldo",
      // TBD
    },
  ],
};

// DOM pieces
const mainDiv = document.getElementById("main");
const img = document.querySelector("img");

const targetBox = document.createElement("div"); // to be used later
targetBox.id = "targetBox";
targetBox.hidden = true;

const dropdown = document.createElement("select"); // to be used later
dropdown.id = "dropdown";
dropdown.hidden = true;

const createDropDownOptions = (() => {
  dropdown.add(new Option("Which character is here? Choose one:", false, true));

  //create locations based on imgData from db
  imgData.locations.map((location) => {
    dropdown.add(new Option(location.name));
  });
})();

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

function createDropDown(e) {
  // get click location in px
  const { offsetX: x, offsetY: y } = e;

  dropdown.style.top = `${y}px`;
  dropdown.style.left = `${x}px`;
  dropdown.hidden = false;

  mainDiv.appendChild(dropdown);
}

loadImage(imgData.url);

// add a target box, and add a dropdown menu
mainDiv.addEventListener("click", (e) => {
  createTarget(e);
  createDropDown(e);
});
