// script runs when user successfully locates a character.
export default function success(clickObj) {
  const main = document.getElementById("main");

  const circle = document.createElement("div");
  circle.classList = "circle";

  circle.style.left = clickObj.click.x;
  circle.style.top = clickObj.click.y;

  main.appendChild(circle);
}
