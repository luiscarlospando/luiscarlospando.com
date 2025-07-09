// Modals
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
