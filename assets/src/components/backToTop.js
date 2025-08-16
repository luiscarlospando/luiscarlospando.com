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

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#back-to-top");
  if (container) {
    const root = createRoot(container);
    root.render(<BackToTop />);
  }
});
