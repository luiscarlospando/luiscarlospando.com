import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

document.addEventListener("DOMContentLoaded", function () {
    var grid = document.querySelector(".masonry-grid");
    var msnry;

    imagesLoaded(grid, function () {
        msnry = new Masonry(grid, {
            itemSelector: ".grid-item",
            columnWidth: ".grid-sizer",
            percentPosition: true,
        });
    });
});
