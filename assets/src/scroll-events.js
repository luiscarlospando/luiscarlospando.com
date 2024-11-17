// Seleccionar los elementos una sola vez fuera del evento scroll para mejor rendimiento
const navContainer = document.querySelector('.nav-container');
const backToTop = document.querySelector('.cd-top');
const nowPlaying = document.querySelector('.nowplaying');
const liveAlert = document.querySelector('#heymijotv-live-alert');

// Usar throttle para optimizar el rendimiento del scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Función principal que maneja los cambios en el scroll
function handleScroll() {
    const scrollY = window.scrollY;

    // Show/hide navbar
    navContainer?.classList.toggle('scrolled-position', scrollY >= 20);

    // Show/hide "back to top" link and "now playing" notification
    if (backToTop && nowPlaying) {
        const shouldShow = scrollY >= 300;
        backToTop.classList.toggle('cd-is-visible', shouldShow);
        nowPlaying.classList.toggle('positionate-nowplaying', shouldShow);
    }

    // Show/hide "live alerts"
    liveAlert?.classList.toggle('positionate-live-alert', scrollY >= 1);
}

// Aplicar throttle al evento scroll
window.addEventListener('scroll', throttle(handleScroll, 100));

// Ejecutar una vez al cargar para establecer el estado inicial
handleScroll();