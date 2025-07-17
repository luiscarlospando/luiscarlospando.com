import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".load-more-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const year = this.dataset.year;
      let offset = parseInt(this.dataset.offset);
      const icon = this.querySelector("i");

      icon.classList.remove("d-none");
      this.disabled = true;

      console.log(`Clicked year ${year} with offset ${offset}`);

      fetch(ajaxurl.url, {
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
          console.log("Response:", data);

          if (data.success) {
            const container = document.querySelector(
              `.masonry-grid[data-year="${year}"]`,
            );
            const temp = document.createElement("div");
            temp.innerHTML = data.data.html;

            const newItems = temp.querySelectorAll(".grid-item");
            newItems.forEach((item) => container.appendChild(item));

            imagesLoaded(container, () => {
              const msnry = Masonry.data(container);
              if (msnry) {
                msnry.appended(newItems);
                msnry.layout();
              }
            });

            // Update offset
            offset += newItems.length;
            button.dataset.offset = offset;

            // Disable button if fewer than 6 were loaded
            if (newItems.length < 6) {
              button.disabled = true;
              button.innerHTML = "No hay más fotos";
            } else {
              icon.classList.add("d-none");
              button.disabled = false;
            }
          } else {
            button.disabled = true;
            button.innerHTML = "No hay más fotos";
            icon.classList.add("d-none");
          }
        });
    });
  });
});
