document.addEventListener("DOMContentLoaded", () => {
    const paintbook = document.getElementById("paintbook");

    // Si no existe el componente, no hacemos nada
    if (!paintbook) return;

    const canvas = paintbook.querySelector("#paint-canvas");
    const context = canvas.getContext("2d");
    const boundings = canvas.getBoundingClientRect();

    let mouseX = 0;
    let mouseY = 0;
    let isDrawing = false;

    context.strokeStyle = "black";
    context.lineWidth = 1;

    function fillWhiteBackground() {
        context.save();
        context.globalCompositeOperation = "destination-over";
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();
    }

    fillWhiteBackground();

    // Colors
    const colors = paintbook.querySelector(".colors");
    colors.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            context.strokeStyle = event.target.value || "black";
        }
    });

    // Brushes
    const brushes = paintbook.querySelector(".brushes");
    brushes.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            context.lineWidth = event.target.value || 1;
        }
    });

    // Drawing
    canvas.addEventListener("mousedown", (event) => {
        setMouseCoordinates(event);
        isDrawing = true;
        context.beginPath();
        context.moveTo(mouseX, mouseY);
    });

    canvas.addEventListener("mousemove", (event) => {
        setMouseCoordinates(event);
        if (isDrawing) {
            context.lineTo(mouseX, mouseY);
            context.stroke();
        }
    });

    canvas.addEventListener("mouseup", () => {
        isDrawing = false;
    });

    function setMouseCoordinates(event) {
        mouseX = event.clientX - boundings.left;
        mouseY = event.clientY - boundings.top;
    }

    // Clear
    paintbook.querySelector("#clear").addEventListener("click", () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        fillWhiteBackground();
    });

    // Save
    paintbook.querySelector("#save").addEventListener("click", () => {
        fillWhiteBackground();
        const imageName = prompt("Please enter image name");
        const canvasDataURL = canvas.toDataURL("image/png");

        const a = document.createElement("a");
        a.href = canvasDataURL;
        a.download = (imageName || "drawing") + ".png";
        a.click();
    });
});
