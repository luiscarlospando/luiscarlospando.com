document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".load-more-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const year = this.dataset.year;
      let offset = parseInt(this.dataset.offset);
      const icon = this.querySelector("i");

      icon.classList.remove("d-none"); // Start spinning
      this.disabled = true;

      fetch(ajaxurl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "load_more_photos",
          year,
          offset,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const container = document.querySelector(
              `.masonry-grid[data-year="${year}"]`,
            );

            const temp = document.createElement("div");
            temp.innerHTML = data.data.html;

            // Append new items
            temp.querySelectorAll(".grid-item").forEach((item) => {
              container.appendChild(item);
            });

            // Trigger Masonry layout
            imagesLoaded(container, () => {
              new Masonry(container, {
                itemSelector: ".grid-item",
                columnWidth: ".grid-sizer",
                percentPosition: true,
              });
            });

            // Update offset
            offset += 6;
            button.dataset.offset = offset;

            // Check if more posts exist — you could return total count in the AJAX response if needed
            if (temp.children.length < 6) {
              button.disabled = true;
              button.innerHTML = "No hay más fotos";
            } else {
              icon.classList.add("d-none"); // Stop spinning
              button.disabled = false;
            }
          } else {
            icon.classList.add("d-none");
            button.disabled = true;
            button.innerHTML = "No hay más fotos";
          }
        });
    });
  });
});
