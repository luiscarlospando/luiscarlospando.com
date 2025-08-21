import { initStatusManager } from "./statuslog.js";

(function () {
  const ready = (callback) => {
    if (document.readyState !== "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
  };

  ready(() => {
    // Run Statuslog
    initStatusManager();

    // Burger button blur
    const btnBurger = document.getElementById("btn-burger");
    btnBurger?.addEventListener("click", () => btnBurger.blur());

    // Animate.css
    const header = document.querySelector("header");
    const heymijotvLiveHeader = document.getElementById("heymijotv-live-alert");
    const siteBody = document.querySelector(".site-body");
    const footer = document.querySelector("footer");

    setTimeout(() => header?.classList.add("animated", "fadeInDown"), 800);
    setTimeout(
      () => heymijotvLiveHeader?.classList.add("animated", "fadeIn"),
      1800,
    );
    siteBody?.classList.add("animated", "fadeIn");
    footer?.classList.add("animated", "fadeIn");

    // Wait until BackToTop component is mounted
    function waitForBackToTop() {
      const backToTopButton = document.querySelector(".cd-top");
      if (!backToTopButton) {
        requestAnimationFrame(waitForBackToTop);
        return;
      }

      // Smooth scroll
      backToTopButton.addEventListener("click", (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      // Initialize scroll handling - Don't disconnect the observer
      const observer = new MutationObserver(() => {
        const stuffILike = document.querySelector("#stuff-i-like");

        if (stuffILike && !stuffILike.hasScrollHandler) {
          // Mark it that it has the handler already to avoid duplicates
          stuffILike.hasScrollHandler = true;
          initScrollHandling(backToTopButton);
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    }

    function initScrollHandling(backToTopButton) {
      const handleScrollResize = () => {
        const scrollY = window.scrollY;
        const windowWidth = window.innerWidth;

        // Search elements on each execution because they're dynamic
        const nowPlaying = document.querySelector(".nowplaying");
        const stuffILike = document.querySelector("#stuff-i-like");

        if (scrollY > 300) {
          backToTopButton.classList.add("cd-is-visible");

          // Only add .nowplaying-scrolled if element exists and screen is >= 1400px
          if (nowPlaying && windowWidth >= 1400) {
            nowPlaying.classList.add("nowplaying-scrolled");
          }

          if (stuffILike) {
            stuffILike.classList.add("stuff-i-like-scrolled");
          }
        } else {
          backToTopButton.classList.remove("cd-is-visible");

          if (nowPlaying) {
            nowPlaying.classList.remove("nowplaying-scrolled");
          }

          if (stuffILike) {
            stuffILike.classList.remove("stuff-i-like-scrolled");
          }
        }
      };

      // Only add listeners once
      if (!window.hasScrollListeners) {
        window.addEventListener("scroll", handleScrollResize, {
          passive: true,
        });
        window.addEventListener("resize", handleScrollResize);
        window.hasScrollListeners = true;
      }

      // Run immediately after setting initial state
      handleScrollResize();
    }

    waitForBackToTop();

    // Last.fm now playing
    $("#lastfm").lastplayed({ username: "luiscarlospando", refresh: 30 });

    // Collapse intro button
    const collapseIntro = document.getElementById("collapseIntro");
    const btnReadMore = document.querySelector("#btn-read-more");
    if (collapseIntro && btnReadMore) {
      $(collapseIntro).on("show.bs.collapse hide.bs.collapse", (e) => {
        btnReadMore.innerHTML =
          e.type === "show"
            ? '<i class="fa-solid fa-caret-up"></i> Leer menos'
            : '<i class="fa-solid fa-caret-right"></i> Leer más';
      });

      btnReadMore.addEventListener("click", (e) => {
        if (e.target.tagName.toLowerCase() === "i") {
          e.preventDefault();
          e.stopPropagation();
          $(collapseIntro).collapse("toggle");
        }
      });
    }

    // Guestbook Code of Conduct button
    const collapseCodeOfConduct = document.getElementById(
      "collapseCodeOfConduct",
    );
    const btnCodeOfConduct = document.querySelector("#btn-code-of-conduct");
    if (collapseCodeOfConduct && btnCodeOfConduct) {
      $(collapseCodeOfConduct).on("show.bs.collapse hide.bs.collapse", (e) => {
        btnCodeOfConduct.innerHTML =
          e.type === "show"
            ? '<i class="fa-solid fa-caret-down"></i> Cerrar código de conducta'
            : '<i class="fa-solid fa-caret-right"></i> Ver código de conducta';
      });

      btnCodeOfConduct.addEventListener("click", (e) => {
        if (e.target.tagName.toLowerCase() === "i") {
          e.preventDefault();
          e.stopPropagation();
          $(collapseCodeOfConduct).collapse("toggle");
        }
      });
    }

    // Tooltips
    $('[data-toggle="tooltip"]').tooltip({
      title: function () {
        if (this.id === "greetingTooltip") return getGreeting();
        return $(this).attr("title") || $(this).attr("data-original-title");
      },
    });

    // Progress bar
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
      const updateProgress = () => {
        const totalHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        progressBar.value = (window.scrollY / totalHeight) * 100;
      };
      window.addEventListener("scroll", updateProgress, { passive: true });
    }

    // Responsive YouTube embeds
    const youtubePlayers = document.querySelectorAll(".youtube-player");
    youtubePlayers.forEach((player) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("embed-responsive", "embed-responsive-16by9");
      player.parentNode.insertBefore(wrapper, player);
      wrapper.appendChild(player);
    });

    // Lazy load images
    document
      .querySelectorAll("img")
      .forEach((img) => img.setAttribute("loading", "lazy"));

    // FontAwesome pseudo elements
    window.FontAwesomeConfig = { searchPseudoElements: true };

    // Clipboard
    new ClipboardJS(".btn");

    // Pagination buttons
    document
      .querySelectorAll(".page-numbers")
      .forEach((el) => el.classList.add("btn", "btn-primary"));

    // External links icon
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      const hasImage = link.querySelector("img");
      if (
        !link.closest("header") &&
        !link.closest("footer") &&
        !link.classList.contains("btn") &&
        !link.closest(".mastodon") &&
        !link.classList.contains("btn-app-icon") &&
        !hasImage
      ) {
        const icon = document.createElement("i");
        icon.className = "fa-solid fa-arrow-up-right-from-square";
        link.appendChild(icon);
      }
    });

    // Pronunciation audio
    const audio = document.getElementById("pronunciation");
    const pronunciationLink = document.querySelector("[data-pronunciation]");
    pronunciationLink?.addEventListener("click", (e) => {
      e.preventDefault();
      if (!audio)
        return alert("Lo siento, hubo un problema al reproducir el audio.");
      audio.currentTime = 0;
      audio
        .play()
        .catch(() =>
          alert("Lo siento, hubo un problema al reproducir el audio."),
        );
    });

    // Greeting function
    function getGreeting() {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay();
      const greetings = {
        /* ... tu objeto completo de saludos ... */
      };
      // Mantener toda tu lógica actual de saludos aquí
      return greetings.weekday?.morning[0]; // placeholder, reemplazar con tu lógica completa
    }

    // Manual tooltip init for #stuff-i-like
    $("#stuff-i-like").tooltip();
  });
})();
