/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
let defaultActiveSection = null
const buildMenu = function() {

    const sections = document.getElementsByTagName('section')
    console.log(`section ${sections.length}`)
    const ulElement = document.getElementById('navbar__list')
    if (sections.length > 0) {
        defaultActiveSection = sections[0]
    }
    for (let i = 0; i < sections.length; i++) {
        const liElement = document.createElement('li')
        liElement.innerHTML = sections[i].getAttribute('data-nav')
        ulElement.appendChild(liElement)
        liElement.addEventListener('click', evt => {
            const rect = sections[i].getBoundingClientRect()
            window.scrollTo(rect.left + window.scrollX, rect.top + window.scrollY)
            sections[i].classList.toggle("your-active-class")
            defaultActiveSection.classList.toggle("your-active-class")
            defaultActiveSection = sections[i]
        })
    }

}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildMenu()

// Scroll to section on link click

// Set sections as active


