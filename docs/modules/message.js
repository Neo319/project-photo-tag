// script that animates messages for user.
export default function message(msgText) {
  const main = document.getElementById("main");
  const msgDiv = document.getElementById("message");

  main.style.filter = "blur(10px)";
  main.style.pointerEvents = "none";

  msgDiv.hidden = false;
  msgDiv.textContent = msgText;
  msgDiv.classList.add("showMessage");

  setTimeout(() => {
    //clean up
    main.style.filter = "none";
    main.style.pointerEvents = "auto";

    msgDiv.hidden = true;
    msgDiv.textContent = "";
    msgDiv.classList.remove("showMessage");
  }, 1400);
}
