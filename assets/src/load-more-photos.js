import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".load-more-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const year = this.dataset.year;
      let offset = parseInt(this.dataset.offset);
      const icon = this.querySelector("i");

      // Debug logs
      console.log("ajaxurl.url:", ajaxurl.url);
      console.log("year:", year);
      console.log("offset:", offset);

      // Start loading state
      icon.classList.add("fa-spin");
      this.disabled = true;

      fetch(ajaxurl.url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "load_more_photos",
          year,
          offset,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          console.log("Response:", data);

          if (data.success) {
            const container = document.querySelector(
              `.masonry-grid[data-year="${year}"]`,
            );
            const temp = document.createElement("div");
            temp.innerHTML = data.data;

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

            if (newItems.length < 6) {
              button.disabled = true;
              button.innerHTML = `No hay más fotos <i class="${icon.className}"></i>`;
            } else {
              this.disabled = false;
              icon.classList.remove("fa-spin");
            }
          } else {
            button.disabled = true;
            button.innerHTML = `No hay más fotos <i class="${icon.className}"></i>`;
            icon.classList.remove("fa-spin");
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          button.disabled = false;
          button.innerHTML = `Error al cargar más fotos <i class="${icon.className}"></i>`;
          icon.classList.remove("fa-spin");
        });
    });
  });
});
