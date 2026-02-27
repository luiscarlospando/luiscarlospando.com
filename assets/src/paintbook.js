document.addEventListener("DOMContentLoaded", () => {
    const paintbook = document.getElementById("paintbook");
    if (!paintbook) return;

    const canvas = paintbook.querySelector("#paint-canvas");
    const context = canvas.getContext("2d");

    const colorsEl = paintbook.querySelector(".colors");
    const brushesEl = paintbook.querySelector(".brushes");
    const undoBtn = paintbook.querySelector("#undo");
    const clearBtn = paintbook.querySelector("#clear");
    const sendBtn = paintbook.querySelector("#send");

    let isDrawing = false;
    let mouseX = 0;
    let mouseY = 0;

    context.strokeStyle = "black";
    context.lineWidth = 1;

    // ========================
    // Real white background
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

        history.pop();
        const previousState = history[history.length - 1];
        context.putImageData(previousState, 0, 0);
    }

    function hasDrawing() {
        return history.length > 1;
    }

    fillWhiteBackground();
    saveState();

    // ========================
    // Colors
    // ========================
    colorsEl.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            context.strokeStyle = event.target.value;
        }
    });

    // ========================
    // Brushes
    // ========================
    brushesEl.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            context.lineWidth = event.target.value;
        }
    });

    // ========================
    // Drawing
    // ========================
    function updateCoordinates(event) {
        const rect = canvas.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
    }

    canvas.addEventListener("mousedown", (event) => {
        updateCoordinates(event);
        isDrawing = true;
        context.beginPath();
        context.moveTo(mouseX, mouseY);
    });

    canvas.addEventListener("mousemove", (event) => {
        if (!isDrawing) return;

        updateCoordinates(event);
        context.lineTo(mouseX, mouseY);
        context.stroke();
    });

    canvas.addEventListener("mouseup", () => {
        if (!isDrawing) return;
        isDrawing = false;
        saveState();
    });

    canvas.addEventListener("mouseleave", () => {
        isDrawing = false;
    });

    // ========================
    // Buttons
    // ========================
    undoBtn.addEventListener("click", undo);

    clearBtn.addEventListener("click", () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        fillWhiteBackground();
        history.length = 0;
        saveState();
    });

    sendBtn.addEventListener("click", async () => {
        if (!hasDrawing()) {
            alert("Primero dibuja algo 😉");
            return;
        }

        if (sendBtn.disabled) return;

        sendBtn.disabled = true;
        sendBtn.textContent = "Enviando...";

        try {
            fillWhiteBackground();

            const dataURL = canvas.toDataURL("image/png");

            const response = await fetch("/api/send-drawing", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    image: dataURL,
                    date: new Date().toISOString(),
                }),
            });

            if (!response.ok) throw new Error();

            alert("¡Dibujo enviado correctamente!");

            // clean canvas after sending the drawing
            context.clearRect(0, 0, canvas.width, canvas.height);
            fillWhiteBackground();
            history.length = 0;
            saveState();
        } catch (err) {
            alert("Hubo un error al enviar el dibujo.");
        } finally {
            sendBtn.disabled = false;
            sendBtn.textContent = "Enviar";
        }
    });

    // ========================
    // Ctrl / Cmd + Z
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
