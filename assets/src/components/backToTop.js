import React from "react";
import { createRoot } from "react-dom/client";

function BackToTop({
  className = "btn-primary cd-top",
  title = "Volver arriba",
  href = "#0",
  dataToggle = "tooltip",
  dataPlacement = "left",
}) {
  return (
    <a
      href={href}
      className={className}
      data-toggle={dataToggle}
      data-placement={dataPlacement}
      title={title}
    >
      <i className="fa-solid fa-chevron-up"></i>
    </a>
  );
}

// DOM mounting
const container = document.querySelector("#back-to-top");
const root = createRoot(container);
root.render(<BackToTop />);

// Exporting button reference so other modules can use it
export const backToTopButton = container.querySelector(".cd-top");
