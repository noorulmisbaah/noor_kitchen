function toggleSections(index) {
    sections.forEach(section => section.style.display = 'none');
    sections[index].style.display = 'block';
}

const leftPart = document.querySelector('.left-part');
const sections = document.querySelectorAll('.section');
const sideItems = document.querySelectorAll('.item');
const menuIcon = document.querySelector('.menu-icon');
const closeMenuIcon = document.querySelector('.close-side-icon');

sideItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        toggleSections(index);
        
        if (window.innerWidth < 700) {
            leftPart.style.left = '-50rem';
            closeMenuIcon.style.display = 'none';
            menuIcon.style.display = 'inline-block';
        }
    });
});

menuIcon.addEventListener('click', () => {
    leftPart.style.left = 0;
    menuIcon.style.display = 'none';
    closeMenuIcon.style.display = 'inline-block';
});

closeMenuIcon.addEventListener('click', () => {
    leftPart.style.left = '-50rem';
    closeMenuIcon.style.display = 'none';
    menuIcon.style.display = 'inline-block';
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 700) {
        leftPart.style.left = 0
        menuIcon.style.display = closeMenuIcon.style.display = 'none';
    } else {
        leftPart.style.left = '-50rem';
        menuIcon.style.display = 'inline-block';
        closeMenuIcon.style.display = 'none';
    }
});