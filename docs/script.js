const DB_URL = "http://localhost:2000";

let imageData = null;

// DOM pieces
const mainDiv = document.getElementById("main");
const img = document.querySelector("img");

//

async function fetchImage() {
  // loads image and data from db when user presses start. activates game ...

  // randomly select image from id 1-3
  const randomId = Math.floor(Math.random() * 2) + 1; //
  console.log(randomId);

  try {
    // initial db fetch
    const fetchResult = await fetch(`${DB_URL}/images/${randomId}`, {
      mode: "cors",
    });
    if (fetchResult.ok) {
      // parsing db data
      const result = await fetchResult.json();
      return result;
    }
  } catch (err) {
    console.error("error fetching image", err.message);
    return err;
  }
}

// ---- INITIATING APP STATE ----

const begin = document.getElementById("load_img");
begin.addEventListener("click", async () => {
  try {
    const img = await fetchImage();
    launchApp(img);
  } catch (err) {
    console.error("error launching", err.message);
    return err;
  }
});

function launchApp(imgData) {
  let dropdownIsOpen = false;

  img.src = imgData.url;

  const targetBox = document.createElement("div"); // to be used later
  targetBox.id = "targetBox";
  // targetBox.hidden = true;

  const dropdown = document.createElement("select"); // to be used later
  dropdown.id = "dropdown";
  // dropdown.hidden = true;

  mainDiv.appendChild(targetBox);
  mainDiv.appendChild(dropdown);

  const createDropDownOptions = (() => {
    dropdown.add(
      new Option("Which character is here? Choose one:", false, true)
    );

    //create locations based on imgData from db
    imgData.locations.map((location) => {
      dropdown.add(new Option(location.name));
    });
  })();

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

  // main click handler
  document.addEventListener("click", (e) => {
    //opening dropdown
    if (!dropdownIsOpen && mainDiv.contains(e.target)) {
      console.log(e.offsetX, e.offsetY);

      createDropDown(e);
      createTarget(e);
      dropdownIsOpen = true;
    } else if (dropdownIsOpen) {
      // closing dropdown
      if (!dropdown.contains(e.target)) {
        dropdown.hidden = true;
        targetBox.hidden = true;
        dropdownIsOpen = false;
      }
    }

    // ---- VERIFYING CLICKS WITH DB ----
    async function verify(click) {
      //
      // const fetchResult = await fetch(`${DB_URL}/images/click`);
    }
  });

  // TODO: create function that can normalize click pixel position in various screen sizes.
  // TODO: implement timer that counts down?
  // TODO: implement db send to check clicks when option is selected...
}
