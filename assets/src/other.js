import { initStatusManager } from "./statuslog.js";

(function () {
  let ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
  };

  ready(() => {
    /* Do things after DOM has fully loaded */

    // Run Statuslog main function
    initStatusManager();

    // Remove the focus on burger button
    const btnBurger = document.getElementById("btn-burger");

    btnBurger.addEventListener("click", () => {
      btnBurger.blur(); // Removes the focus
    });

    // Add Animate.css
    const header = document.querySelector("header");
    const heymijotvLiveHeader = document.getElementById("heymijotv-live-alert");
    const siteBody = document.querySelector(".site-body");
    const footer = document.querySelector("footer");

    setTimeout(() => {
      header.classList.add("animated", "fadeInDown");
    }, 800);

    setTimeout(() => {
      heymijotvLiveHeader.classList.add("animated", "fadeIn");
    }, 1800);

    siteBody.classList.add("animated", "fadeIn");
    footer.classList.add("animated", "fadeIn");

    // Back to top button
    const backToTopButton = document.querySelector(".cd-top");

    // Function to initialize scroll handling once .nowplaying exists
    function initScrollHandling(nowPlaying) {
      window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
          backToTopButton.classList.add("cd-is-visible");

          if (window.innerWidth >= 1400) {
            nowPlaying.classList.add("nowplaying-scrolled");
          }
        } else {
          backToTopButton.classList.remove("cd-is-visible");
          nowPlaying.classList.remove("nowplaying-scrolled");
        }
      });

      // Check window resizing
      window.addEventListener("resize", function () {
        if (window.scrollY > 300) {
          if (window.innerWidth >= 1400) {
            nowPlaying.classList.add("nowplaying-scrolled");
          } else {
            nowPlaying.classList.remove("nowplaying-scrolled");
          }
        }
      });
    }

    // Watch for .nowplaying to be added to the DOM
    const observer = new MutationObserver((mutations) => {
      const nowPlaying = document.querySelector(".nowplaying");
      if (nowPlaying) {
        initScrollHandling(nowPlaying);
        observer.disconnect(); // Stop observing once we find the element
      }
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Enable Last.fm now playing song
    $("#lastfm").lastplayed({
      username: "luiscarlospando",
      refresh: 30,
    });

    // Read more button
    const collapseIntro = document.getElementById("collapseIntro");
    const btnReadMore = document.querySelector("#btn-read-more");

    if (collapseIntro && btnReadMore) {
      // Handle the change of the state of the collapse event
      $(collapseIntro).on("show.bs.collapse hide.bs.collapse", function (e) {
        const isExpanding = e.type === "show";
        btnReadMore.innerHTML = isExpanding
          ? '<i class="fa-solid fa-caret-up"></i> Leer menos'
          : '<i class="fa-solid fa-caret-right"></i> Leer más';
      });

      // Handle the click on the Font Awesome icon
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
      // Handle the change of the state of the collapse event
      $(collapseCodeOfConduct).on(
        "show.bs.collapse hide.bs.collapse",
        function (e) {
          const isExpanding = e.type === "show";
          btnCodeOfConduct.innerHTML = isExpanding
            ? '<i class="fa-solid fa-caret-down"></i> Cerrar código de conducta'
            : '<i class="fa-solid fa-caret-right"></i> Ver código de conducta';
        },
      );

      // Handle the click on the Font Awesome icon
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
        // Check if this is the greeting tooltip
        if (this.id === "greetingTooltip") {
          return getGreeting();
        }
        // For other tooltips, use their default title
        return $(this).attr("title") || $(this).attr("data-original-title");
      },
    });

    // Progress bar
    function updateProgressBar() {
      const progressBar = document.getElementById("progress-bar");
      if (!progressBar) return;

      window.addEventListener(
        "scroll",
        () => {
          // Total page height minus total window height
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          // Current scroll position
          const scrollPosition = window.scrollY;
          // Percentage calculation
          const scrollPercent = (scrollPosition / totalHeight) * 100;

          // Updates the progress bar value
          progressBar.value = scrollPercent;
        },
        { passive: true },
      ); // Passive: true improves scroll performance
    }

    // Run progress bar function
    updateProgressBar();

    // Responsive YouTube embeds
    const youtubePlayers = document.querySelectorAll(".youtube-player");

    if (youtubePlayers) {
      const embedResponsiveWrapper = document.createElement("div");
      embedResponsiveWrapper.classList.add(
        "embed-responsive",
        "embed-responsive-16by9",
      );

      for (let i = 0; i < youtubePlayers.length; i++) {
        const embedResponsiveWrapper = document.createElement("div");
        embedResponsiveWrapper.classList.add(
          "embed-responsive",
          "embed-responsive-16by9",
        );

        youtubePlayers[i].parentNode.insertBefore(
          embedResponsiveWrapper,
          youtubePlayers[i],
        );
        embedResponsiveWrapper.appendChild(youtubePlayers[i]);
      }
    }

    // Add lazy loading to all images
    let images = document.querySelectorAll("img");

    images.forEach((img) => {
      img.setAttribute("loading", "lazy");
    });

    // Enabling Font Awesome Pseudo Elements
    window.FontAwesomeConfig = {
      searchPseudoElements: true,
    };

    // Copy to clipboard instantiation
    new ClipboardJS(".btn");

    // Add button classes to elements in pagination
    const pageNumbers = document.querySelectorAll(".page-numbers");
    pageNumbers.forEach((element) => {
      element.classList.add("btn", "btn-primary");
    });

    // Add Font Awesome external links icon to external links
    // This code:
    // 1. Links containing target="_blank"
    // 2. It doesn't select links inside the header and footer
    // 3. It doesn't select links with the class of .btn
    // 4. It doesn't select links inside elements with the class of .mastodon
    // 5. It doesn't select links with the class of .btn-app-icon
    const links = document.querySelectorAll('a[target="_blank"]');

    links.forEach((link, index) => {
      // Add check for img tag inside the link
      const hasImage = link.querySelector("img");

      // Verify that the link is NOT in any of the exclusion conditions
      if (
        !link.closest("header") &&
        !link.closest("footer") &&
        !link.classList.contains("btn") &&
        !link.closest(".mastodon") &&
        !link.classList.contains("btn-app-icon") &&
        !hasImage
      ) {
        console.log(`Link ${index}:`, {
          href: link.href,
          target: link.target,
          hasBtn: link.classList.contains("btn"),
          inHeader: link.closest("header"),
          inFooter: link.closest("footer"),
          inMastodon: link.closest(".mastodon"),
          hasBtnAppIcon: link.classList.contains("btn-app-icon"),
          hasImage: hasImage,
        });

        const icon = document.createElement("i");
        icon.className = "fa-solid fa-arrow-up-right-from-square";
        link.appendChild(icon);

        console.log(`Ícono añadido al link ${index}`);
      }
    });

    // /ˈmiːhoʊ/ pronunciation audio
    const audio = document.getElementById("pronunciation");

    function playAudio(event) {
      if (event) {
        event.preventDefault();
      }

      if (!audio) {
        console.error("Archivo de audio no encontrado.");
        return;
      }

      // Restart audio if already playing
      audio.currentTime = 0;

      audio
        .play()
        .then(() => {
          // Optional: visual feedback
          console.log("El audio se reprodujo correctamente.");
        })
        .catch((error) => {
          console.error("Error reproduciendo audio:", error);
          // Friendlier error handling
          alert("Lo siento, hubo un problema al reproducir el audio.");
        });
    }

    // Add event listener to link
    const pronunciationLink = document.querySelector("[data-pronunciation]");
    if (pronunciationLink) {
      pronunciationLink.addEventListener("click", playAudio);
    }

    // Greeting
    function getGreeting() {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay(); // 0 = domingo, 6 = sábado

      const greetings = {
        weekday: {
          morning: [
            "☕ Buenos días, hora de prender la compu y ver qué se arma hoy.",
            "🌞 Échale ganas... o sino échale café.",
            "📣 Nuevo día, mismo caos. A darle pues.",
          ],
          afternoon: [
            "🍽️ Ya se vale botanear algo, no todo es trabajo.",
            "😎 A esta hora ya nomás déjate llevar con el vuelito.",
            "🖥️ ¡Que no decaiga ese playlist!",
          ],
          evening: [
            "🌅 Ya es el último jalón, ya casi la libramos.",
            "🍵 Pídete algo de cenar, te lo ganaste.",
            "🎧 Si no has puesto buenas rolas, ¿qué andas haciendo?",
          ],
          night: [
            "🌙 Apaga la compu. Mañana le seguimos.",
            "🛌 Ya vámonos a dormir...",
            "✨ Buenas noches, my friend.",
          ],
        },
        weekend: {
          morning: [
            "☀️ A despertar con calma que es fin de semana.",
            "🍳 Hora desayunar agusto, sin prisa.",
            "🎮 ¿Y si hoy sí jugamos todo el día?",
          ],
          afternoon: [
            "🍻 Se vale abrir una cheve a esta hora.",
            "🎶 Dale play a ese playlist de rolas viejitas pero bonitas.",
            "🍕 ¿Y si hoy pides algo rico de botanear?",
          ],
          evening: [
            "🌇 La tarde es joven, pero ¿qué plan traes?",
            "🍿 Una peli, una serie o un juego... lo que sea, pero algo relax.",
            "🕹️ Noche jugona se antoja.",
          ],
          night: [
            "🌌 Que no se te haga tarde viendo videos random.",
            "🛌 Dormir tarde sí, pero no tan tarde.",
            "✨ Buenas noches, disfruta el fin.",
          ],
        },
      };

      const easterEggs = [
        "🎮 ¿Ya jugaste algo hoy o nel?",
        "💾 Recuerda guardar tus cambios, no seas confiad@.",
        "🛑 Si estás viendo esto es que ya duraste mucho aquí.",
      ];

      // Probability of appearing: 3%
      if (Math.random() < 0.03) {
        return easterEggs[Math.floor(Math.random() * easterEggs.length)];
      }

      const type = day === 0 || day === 6 ? "weekend" : "weekday";
      let moment;

      if (hour >= 5 && hour < 12) {
        moment = "morning";
      } else if (hour >= 12 && hour < 17) {
        moment = "afternoon";
      } else if (hour >= 17 && hour < 21) {
        moment = "evening";
      } else {
        moment = "night";
      }

      const options = greetings[type][moment];
      return options[Math.floor(Math.random() * options.length)];
    }
  });
})();
