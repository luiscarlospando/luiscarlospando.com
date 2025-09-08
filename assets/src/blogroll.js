const button = document.getElementById("btn-random-link");

if (button) {
  button.addEventListener("click", () => {
    // Select all links within all tables except those with .rss-link
    const links = document.querySelectorAll("table a:not(.rss-link)");

    if (links.length === 0) {
      alert("No hay enlaces disponibles.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * links.length);
    const randomLink = links[randomIndex].href;

    // Will open in a new tab
    window.open(randomLink, "_blank");
  });
}
