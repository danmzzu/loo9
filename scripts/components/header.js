const headerArrow = document.querySelector('header .arrow i');

window.addEventListener('scroll', () => {
    if (window.scrollY > 1) {
        headerArrow.style.opacity = '0';
        headerArrow.style.transition = 'opacity 0.5s ease-in-out';
    } else {
        headerArrow.style.opacity = '1';
        headerArrow.style.transition = 'opacity 0.5s ease-in-out';
    }
});