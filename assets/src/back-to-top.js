const backToTopButton = document.querySelector('#back-to-top');

backToTopButton?.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});