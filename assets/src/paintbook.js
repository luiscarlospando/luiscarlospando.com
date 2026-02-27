document.addEventListener("DOMContentLoaded", () => {
    /* ==================================================
       PAINTBOOK INIT
    ================================================== */

    const paintbook = document.getElementById("paintbook");

    if (paintbook) {
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

        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = "black";
        context.lineWidth = 1;

        /* =============================
           APPLY COLOR TO BUTTONS
        ============================= */

        colorsEl.querySelectorAll("button").forEach((btn) => {
            btn.style.backgroundColor = btn.value;
        });

        /* =============================
           HISTORIAL
        ============================= */

        const history = [];
        const maxHistory = 50;

        function fillWhiteBackground() {
            context.save();
            context.globalCompositeOperation = "destination-over";
            context.fillStyle = "#ffffff";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.restore();
        }

        function saveState() {
            if (history.length >= maxHistory) history.shift();
            history.push(
                context.getImageData(0, 0, canvas.width, canvas.height)
            );
        }

        function undo() {
            if (history.length <= 1) return;
            history.pop();
            context.putImageData(history[history.length - 1], 0, 0);
        }

        function hasDrawing() {
            return history.length > 1;
        }

        /* =============================
           RESPONSIVE CANVAS
        ============================= */

        function resizeCanvas() {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            context.setTransform(1, 0, 0, 1, 0, 0);
            context.scale(dpr, dpr);

            fillWhiteBackground();
            history.length = 0;
            saveState();
        }

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        /* =============================
           COLOR & BRUSHES
        ============================= */

        colorsEl.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                context.strokeStyle = e.target.value;

                colorsEl
                    .querySelectorAll("button")
                    .forEach((btn) => btn.classList.remove("active"));
                e.target.classList.add("active");
            }
        });

        brushesEl.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                context.lineWidth = e.target.value;

                brushesEl
                    .querySelectorAll("button")
                    .forEach((btn) => btn.classList.remove("active"));
                e.target.classList.add("active");
            }
        });

        /* =============================
           POINTER DRAWING
        ============================= */

        function updateCoordinates(event) {
            const rect = canvas.getBoundingClientRect();
            mouseX = event.clientX - rect.left;
            mouseY = event.clientY - rect.top;
        }

        canvas.addEventListener("pointerdown", (event) => {
            event.preventDefault();
            canvas.setPointerCapture(event.pointerId);

            updateCoordinates(event);
            isDrawing = true;
            context.beginPath();
            context.moveTo(mouseX, mouseY);
        });

        canvas.addEventListener("pointermove", (event) => {
            if (!isDrawing) return;
            updateCoordinates(event);
            context.lineTo(mouseX, mouseY);
            context.stroke();
        });

        canvas.addEventListener("pointerup", (event) => {
            if (!isDrawing) return;
            isDrawing = false;
            canvas.releasePointerCapture(event.pointerId);
            saveState();
        });

        canvas.addEventListener("pointercancel", () => {
            isDrawing = false;
        });

        /* =============================
           BUTTONS
        ============================= */

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

        document.addEventListener("keydown", (event) => {
            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "z"
            ) {
                event.preventDefault();
                undo();
            }
        });
    }

    /* ==================================================
       DATE FORMATTING — PAINTBOOK ONLY
    ================================================== */

    function formatMexDate(isoString) {
        const date = new Date(isoString);

        const parts = new Intl.DateTimeFormat("es-MX", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }).formatToParts(date);

        const map = {};
        parts.forEach((p) => {
            map[p.type] = p.value;
        });

        const dayPeriod = (map.dayPeriod || "").toUpperCase();

        return `${map.day} ${map.month} ${map.year}, ${map.hour}:${map.minute} ${dayPeriod}`;
    }

    const gallery = document.getElementById("paintbook-gallery");

    if (gallery) {
        const timeElements = gallery.querySelectorAll("time[datetime]");

        timeElements.forEach((timeEl) => {
            const iso = timeEl.getAttribute("datetime");
            if (!iso) return;

            const formatted = formatMexDate(iso);
            timeEl.innerHTML = `<em>${formatted}</em>`;
        });
    }
});
