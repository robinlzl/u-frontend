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
let defaultActiveSection = null
let isScrolling;
let sectionList = []
displayBlockOrNone = ['display-none', "display-block"]
SectionCollapseOrNot = ['collapse-section', 'expand-section']
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const getSectionList = function() {

    const sections = document.getElementsByTagName('section')
    for (let i = 0; i < sections.length; i++) {
        sectionList.push(sections[i])
    }

}

const _collapseHelper = function(element, collapse, expand) {

    if (!element.classList.contains(collapse) &&
        !element.classList.contains(expand)) {

        element.classList.add(collapse)
    }
    else if (element.classList.contains(collapse)) {
        element.classList.remove(collapse)
        element.classList.add(expand)
    } else {
        element.classList.remove(expand)
        element.classList.add(collapse)

    }
}

const makeSectionCollapsable = function() {

    for (let i = 0; i < sectionList.length; i++) {
            const button = sectionList[i].querySelector('.collapse-button')
            const sectionContent = sectionList[i].querySelectorAll('p')
            button.addEventListener("click", evt => {
                _collapseHelper(sectionList[i], SectionCollapseOrNot[0], SectionCollapseOrNot[1])
                for (let j = 0; j < sectionContent.length; j++) {
                    _collapseHelper(sectionContent[j], displayBlockOrNone[0], displayBlockOrNone[1])
                }

            })
    }

}

const buildNavMenu = function() {

    const ulElement = document.getElementById('navbar__list')
    if (sectionList.length > 0) {
        defaultActiveSection = sectionList[0]
    }
    for (let i = 0; i < sectionList.length; i++) {
        const liElement = document.createElement('li')
        liElement.innerHTML = sectionList[i].getAttribute('data-nav')
        ulElement.appendChild(liElement)
        liElement.addEventListener('click', evt => {
            const rect = sectionList[i].getBoundingClientRect()
            window.scrollTo(rect.left + window.scrollX, rect.top + window.scrollY)
            sectionList[i].classList.toggle("your-active-class")
            defaultActiveSection.classList.toggle("your-active-class")
            defaultActiveSection = sectionList[i]
        })
    }

}

const configReturnToTopButton = function() {

    const returnToTopButton = document.querySelector('#back-to-top-button')
    window.addEventListener('scroll', evt => {
        if (window.scrollY > 300) {
            returnToTopButton.style.display = 'block'
        } else {
            returnToTopButton.style.display = 'none'
        }
    })
    returnToTopButton.addEventListener("click", evt => {
        window.scrollTo(0,0)
    })
}

const hideNavWhenNotScroll = function() {
    window.addEventListener('scroll', evt => {

        window.clearTimeout(isScrolling)
        const navMenu = document.querySelector('nav')
        navMenu.style.display = 'block'
        isScrolling = setTimeout(() => {
            navMenu.style.display = 'none'
            console.log('scroll has stopped')
        }, 5000)
    })
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav



// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
getSectionList()
buildNavMenu()
configReturnToTopButton()
hideNavWhenNotScroll()
makeSectionCollapsable()


// Scroll to section on link click

// Set sections as active


