import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".masonry-grid").forEach(function (grid) {
    // Wait for images to load before Masonry init
    imagesLoaded(grid, { background: true }, function () {
      const msnry = new Masonry(grid, {
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        percentPosition: true,
      });

      // Extra: Relayout after slight delay for better accuracy
      setTimeout(() => {
        msnry.layout();
      }, 500);
    });
  });
});
