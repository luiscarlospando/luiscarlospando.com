const clickSound = new Audio("/assets/audio/click-sound.mp3");

document.addEventListener("click", function (event) {
  const target = event.target.closest("a, button");

  // Verify target exists, is not disabled and is not an empty <a href="#">
  if (
    target &&
    !target.disabled &&
    !(target.tagName === "A" && target.getAttribute("href") === "#")
  ) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
});
