console.log("hello world");

// mock db
const imgData = {
  url: "../src/t4FmRgW.jpeg",
  resolution: {
    x: 3505,
    y: 2226,
  },
  locations: [
    {
      name: "Waldo",
      x: 2557,
      y: 1340,
    },
  ],
};

let dropdownIsOpen = false;

// DOM pieces
const mainDiv = document.getElementById("main");
const img = document.querySelector("img");

const targetBox = document.createElement("div"); // to be used later
targetBox.id = "targetBox";
// targetBox.hidden = true;

const dropdown = document.createElement("select"); // to be used later
dropdown.id = "dropdown";
// dropdown.hidden = true;

mainDiv.appendChild(targetBox);
mainDiv.appendChild(dropdown);

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
}

function createDropDown(e) {
  // get click location in px
  const { offsetX: x, offsetY: y } = e;

  dropdown.style.top = `${y}px`;
  dropdown.style.left = `${x}px`;
  dropdown.hidden = false;
}

loadImage(imgData.url);

// main click handler
document.addEventListener("click", (e) => {
  //opening dropdown
  if (!dropdownIsOpen && mainDiv.contains(e.target)) {
    console.log(1);

    console.log(e.offsetX, e.offsetY);

    createDropDown(e);
    createTarget(e);
    dropdownIsOpen = true;
  } else if (dropdownIsOpen) {
    // closing dropdown
    if (!dropdown.contains(e.target)) {
      console.log(2);
      dropdown.hidden = true;
      targetBox.hidden = true;
      dropdownIsOpen = false;
    }
  }
});

// TODO: create function that can normalize click pixel position in various screen sizes.
