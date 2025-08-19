// General modal
document.addEventListener("DOMContentLoaded", function () {
  const modalTriggers = document.querySelectorAll('[data-toggle="modal"]');

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      // Try to get the img element inside the clicked trigger
      const imgElement = this.querySelector("img");
      let imgSrc = "";

      if (imgElement) {
        // If there's an img inside, use its src
        imgSrc = imgElement.getAttribute("src");
      } else if (this.hasAttribute("data-img-src")) {
        // Else if there's a data-img-src attribute, use it
        imgSrc = this.getAttribute("data-img-src");
      }

      // If we got an imgSrc value, update the modal image
      if (imgSrc) {
        const modalImg = document.querySelector("#modal .modal-body img");
        modalImg.setAttribute("src", imgSrc);
      }
    });
  });
});

// #stuff-i-like modal
document.addEventListener("DOMContentLoaded", function () {
  // Button that opens up the modal
  const stuffILikeBtn = document.getElementById("stuff-i-like");

  stuffILikeBtn.addEventListener("click", function () {
    const modalBody = document.querySelector("#modal .modal-body");

    // Clear previous content
    modalBody.innerHTML = "";

    // Add description text
    const description = document.createElement("p");
    description.textContent =
      "Este widget muestra cosas que me gustan y que recomiendo. Pueden ser productos, marcas, servicios, cosas random en Internet, etc. Cierra este modal y vuélvelo a abrir para ver una recomendación diferente.";
    modalBody.appendChild(description);

    // Creating the Shoutouts widget
    const script = document.createElement("script");
    script.src = "https://shoutouts.page/embed/TiXVUqxaKaDqToHwFjQU.js";
    script.defer = true;

    // Insert the Shoutouts script tag
    modalBody.appendChild(script);
  });
});
