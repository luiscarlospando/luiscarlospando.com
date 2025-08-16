import React from "react";
import { createRoot } from "react-dom/client";

function BackToTop() {
  return (
    <a
      href="#0"
      className="btn-primary cd-top"
      title="Volver arriba"
      data-toggle="tooltip"
      data-placement="left"
    >
      <i className="fa-solid fa-chevron-up"></i>
    </a>
  );
}

console.log("Buscando contenedor #back-to-top...");
const container = document.querySelector("#back-to-top");
console.log("Contenedor encontrado:", container);

if (container) {
  const root = createRoot(container);
  root.render(<BackToTop />);
} else {
  console.warn("No se encontró el contenedor #back-to-top");
}
