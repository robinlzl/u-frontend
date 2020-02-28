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
let showNav;
let showSection;
let sectionList = []
displayBlockOrNone = ['display-none', "display-block"]
SectionCollapseOrNot = ['collapse-section', 'expand-section']
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


const _offset = function(el) {

    const rect = el.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return scrollTop + rect.top
}

const _setDefaultActiveSection = function(section) {
    if (defaultActiveSection === section) {
        return
    }
    section.classList.add("your-active-class")
    defaultActiveSection.classList.remove("your-active-class")
    defaultActiveSection = section

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

const getSectionList = function() {

    const sections = document.getElementsByTagName('section')
    for (let i = 0; i < sections.length; i++) {
        sectionList.push(sections[i])
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
        if (sectionList.length > 0) {

            _setDefaultActiveSection(sectionList[0])
        }

    })
}

const hideNavWhenNotScroll = function() {

    window.addEventListener('scroll', evt => {

        window.clearTimeout(showNav)
        const navMenu = document.querySelector('nav')
        navMenu.style.display = 'block'
        showNav = setTimeout(() => {
            navMenu.style.display = 'none'
            console.log('scroll has stopped')

        }, 4000)


    })
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

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
            _setDefaultActiveSection(sectionList[i])
        })
    }

}

const showNavWhenMoveToTop = function() {
    let showNavMenu = true
    document.addEventListener('mousemove', e => {
        const navMenu = document.querySelector('nav')
        if (e.clientY <= 20) {
            navMenu.style.display = 'block'
            showNavMenu = true
        } else {
            if (showNavMenu) {
                navMenu.style.display = 'None'
                showNavMenu = false
            }
        }
    })
}
// Add class 'active' to section when near top of viewport

const addActiveToSection = function() {

    window.addEventListener('scroll', evt => {

        window.clearTimeout(showSection)

        showSection = setTimeout(() => {
            for (let i = sectionList.length - 1; i >= 0; i--) {

                if ((window.scrollY + window.scrollY + window.innerHeight) / 2 > _offset(sectionList[i])) {

                    _setDefaultActiveSection(sectionList[i])
                    break
                }
            }

            console.log('active section set')

        }, 50)

    })
}
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
addActiveToSection()
showNavWhenMoveToTop()



// Scroll to section on link click

// Set sections as active


