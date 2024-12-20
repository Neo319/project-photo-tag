const DB_URL = "https://project-photo-tag-production.up.railway.app";

import success from "./modules/success.js";
import message from "./modules/message.js";

let imgId = null;
let clickTarget = {};
let locationName = null;

// DOM pieces
const mainDiv = document.getElementById("main");
const img = document.querySelector("img");
img.hidden = true;

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
      //store img id for later use
      imgId = randomId;
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
  img.hidden = false;
  begin.disabled = true;

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

  //src modified for deployment debug
  const modifiedSrc = imgData.url.substring(1);
  img.src = modifiedSrc;

  let names = "";
  imgData.locations.map((location) => {
    names = names + `${location.name}, &`;
  });
  names = names.substring(0, names.length - 3);

  message(`Find ${names}!`);

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
      const option = new Option(location.name);

      dropdown.add(option);
    });
  })();

  // creates a target box for user's click
  function createTarget(e) {
    // get click location in px
    const { offsetX: x, offsetY: y } = e;

    // store click location for later use
    clickTarget = { offsetX: x, offsetY: y };

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
  });

  // ---- VERIFYING CLICKS WITH DB ----

  // getting selection
  dropdown.addEventListener("change", (e) => {
    // get click data and send db query

    if (!dropdown.value) {
      console.log("not a valid selection");
      return false;
    }

    // retrieve location name & reset
    locationName = dropdown.value;
    dropdown.selectedIndex = 0; // reset selection

    const click = {
      click: {
        x: clickTarget.offsetX,
        y: clickTarget.offsetY,
      },
      resolution: {
        x: parseInt(img.width),
        y: parseInt(img.height),
      },
      imgId,
      locationName,
    };

    verify(click);
  });

  async function verify(click) {
    const clickJSON = JSON.stringify(click);

    const fetchResult = await fetch(`${DB_URL}/images/click`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: clickJSON,
    });

    const result = await fetchResult.json();
    console.log(result);

    if (result.success === true) {
      success(click);
      message(`You found ${locationName}!`);
    } else {
      message("incorrect!");
      console.log("nope");
    }
  }

  // TODO: create function that can normalize click pixel position in various screen sizes.
  // TODO: implement timer that counts down?
  // TODO: implement db send to check clicks when option is selected...
}
