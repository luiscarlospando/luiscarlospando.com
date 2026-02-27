document.addEventListener("DOMContentLoaded", () => {
    const paintbook = document.getElementById("paintbook");
    if (!paintbook) return;

    const canvas = paintbook.querySelector("#paint-canvas");
    const context = canvas.getContext("2d");

    let isDrawing = false;
    let mouseX = 0;
    let mouseY = 0;

    context.strokeStyle = "black";
    context.lineWidth = 1;

    // ========================
    // Fondo blanco real
    // ========================
    function fillWhiteBackground() {
        context.save();
        context.globalCompositeOperation = "destination-over";
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();
    }

    // ========================
    // Historial
    // ========================
    const history = [];
    const maxHistory = 50;

    function saveState() {
        if (history.length >= maxHistory) {
            history.shift();
        }
        history.push(context.getImageData(0, 0, canvas.width, canvas.height));
    }

    function undo() {
        if (history.length <= 1) return;

        history.pop(); // elimina estado actual
        const previousState = history[history.length - 1];
        context.putImageData(previousState, 0, 0);
    }

    fillWhiteBackground();
    saveState();

    // ========================
    // Colores
    // ========================
    paintbook.querySelector(".colors").addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            context.strokeStyle = event.target.value;
        }
    });

    // ========================
    // Brushes
    // ========================
    paintbook.querySelector(".brushes").addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            context.lineWidth = event.target.value;
        }
    });

    // ========================
    // Dibujo
    // ========================
    canvas.addEventListener("mousedown", (event) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;

        isDrawing = true;
        context.beginPath();
        context.moveTo(mouseX, mouseY);
    });

    canvas.addEventListener("mousemove", (event) => {
        if (!isDrawing) return;

        const rect = canvas.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;

        context.lineTo(mouseX, mouseY);
        context.stroke();
    });

    canvas.addEventListener("mouseup", () => {
        if (!isDrawing) return;
        isDrawing = false;
        saveState();
    });

    // ========================
    // Botones
    // ========================
    paintbook.querySelector("#undo").addEventListener("click", undo);

    paintbook.querySelector("#clear").addEventListener("click", () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        fillWhiteBackground();
        saveState();
    });

    paintbook.querySelector("#save").addEventListener("click", () => {
        fillWhiteBackground();
        const imageName = prompt("Please enter image name");
        const dataURL = canvas.toDataURL("image/png");

        const a = document.createElement("a");
        a.href = dataURL;
        a.download = (imageName || "drawing") + ".png";
        a.click();
    });

    // ========================
    // Ctrl/Cmd + Z
    // ========================
    document.addEventListener("keydown", (event) => {
        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "z"
        ) {
            event.preventDefault();
            undo();
        }
    });
});
