console.log("hello world");

// mock db
const imageLink = "../src/91qfVY7.jpeg";

// DOM pieces
const mainDiv = document.getElementById("main");
const img = document.querySelector("img");

function loadImage(url) {
  img.src = url;
}

loadImage(imageLink);
console.log("loaded image.(?)");
