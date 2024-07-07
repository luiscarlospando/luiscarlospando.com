// Modals
document.addEventListener("DOMContentLoaded", function () {
    // Select all the modal trigger buttons
    const modalTriggers = document.querySelectorAll('[data-toggle="modal"]');

    // Add click event listener to each trigger button
    modalTriggers.forEach((trigger) => {
        trigger.addEventListener("click", function () {
            // Get the img element inside the clicked button
            const imgSrc = this.querySelector("img").getAttribute("src");

            // Get the modal image element
            const modalImg = document.querySelector("#modal .modal-body img");

            // Update the src attribute of the modal image
            modalImg.setAttribute("src", imgSrc);
        });
    });
});
