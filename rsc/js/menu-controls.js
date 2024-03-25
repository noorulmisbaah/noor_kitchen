function toggleMenu(arg) {
    if (arg === 'open') {
        fullMenu.style.display = 'flex';
        fullMenu.style.opacity = fullMenu.style.zIndex = 1;
        isOpen = true;
    }
    else if (arg === 'close') {
        fullMenu.style.opacity = 0;
        fullMenu.style.zIndex = -1;
        isOpen = false
    }
    return;
}

const fullMenu = document.querySelector('.full-menu');
const menuIcon = document.querySelector('.menu-icon');
const fullMenuLinks = document.querySelectorAll('.full-menu a');
const closeMenuIcon = document.querySelector('.close-menu-icon');
var isOpen = true;

window.addEventListener('resize', () => {
    if (window.innerWidth >= 905)
        fullMenu.style.display = 'none';
    else if (window.innerWidth < 905 && isOpen)
        toggleMenu('close');
    else
        fullMenu.style.display = 'flex';
});

menuIcon.addEventListener('click', () => {
    toggleMenu('open');
});

closeMenuIcon.addEventListener('click', () => {
    toggleMenu('close');
});

fullMenuLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu('close'));
});
