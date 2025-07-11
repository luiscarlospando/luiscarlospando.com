import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".masonry-grid").forEach(function (grid) {
    imagesLoaded(grid, function () {
      new Masonry(grid, {
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        percentPosition: true,
      });
    });
  });
});
