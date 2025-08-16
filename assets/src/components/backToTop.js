import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function BackToTop({
  className = "btn-primary cd-top",
  title = "Volver arriba",
  href = "#0",
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href={href}
      className={`${className} ${isVisible ? "cd-is-visible" : ""}`}
      title={title}
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <i className="fa-solid fa-chevron-up"></i>
    </a>
  );
}

const container = document.querySelector("#back-to-top");
if (container) {
  const root = createRoot(container);
  root.render(<BackToTop />);
}
