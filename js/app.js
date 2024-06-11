/**
 * Define Global Variables
 */

const sections = document.querySelectorAll('section');
const navList = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 */

/**
 * @description Creates a navigation link item
 * @param {string} sectionID - The ID of the section
 * @param {string} navText - The navigation text for the link
 * @returns {HTMLElement} The list item element containing the link
 */
function createNavItem(sectionID, navText) {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.className = 'menu__link';
    link.href = `#${sectionID}`;
    link.textContent = navText;
    listItem.appendChild(link);
    return listItem;
}

/**
 * @description Add or remove 'active' class to sections and corresponding nav items
 */
function makeActive() {
    sections.forEach(section => {
        const box = section.getBoundingClientRect();
        const correspondingNavItem = document.querySelector(`a[href="#${section.id}"]`);

        if (box.top <= 150 && box.bottom >= 150) {
            // Apply active state on current section and corresponding Nav link
            section.classList.add('active');
            correspondingNavItem.classList.add('active');
        } else {
            // Remove active state from other section and corresponding Nav link
            section.classList.remove('active');
            correspondingNavItem.classList.remove('active');
        }
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 */

/**
 * @description Build the navigation menu
 */
function buildNav() {
    const fragment = document.createDocumentFragment();
    sections.forEach(section => {
        const sectionID = section.id;
        const navText = section.dataset.nav;
        const navItem = createNavItem(sectionID, navText);
        fragment.appendChild(navItem);
    });
    navList.appendChild(fragment);
}

/**
 * @description Scroll to anchor ID using scrollTO event
 */
function scrollToSection(event) {
    event.preventDefault();
    const targetID = event.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetID);
    window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
    });
}

/**
 * End Main Functions
 * Begin Events
 */

// Build menu 
document.addEventListener('DOMContentLoaded', buildNav);

// Scroll to section on link click
navList.addEventListener('click', function (event) {
    if (event.target.nodeName === 'A') {
        scrollToSection(event);
    }
});

// Set sections and nav items as active
document.addEventListener('scroll', makeActive);
