document.addEventListener("DOMContentLoaded", function () {
  const alertBar = document.getElementById("dismissable-alert");
  const closeButton = document.getElementById("alert-close");

  if (alertBar) {
    // Show with fade-in
    if (!localStorage.getItem("alertClosed")) {
      setTimeout(() => {
        alertBar.classList.add("show");
      }, 100); // a small delay to ensure transition
    }

    // Close with fade-out and save in localStorage
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        alertBar.classList.remove("show");
        localStorage.setItem("alertClosed", "true");
      });
    }
  }
});
