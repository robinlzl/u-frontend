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
let sectionListLength = 3
const MAIN_HEADER_TEXT = 'Landing Page'
const SECTION_TEXT_P1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.'
const SECTION_TEXT_P2 = 'Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.'
displayBlockOrNone = ['display-none', "display-block"]
SectionCollapseOrNot = ['collapse-section', 'expand-section']
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * calculate the coordinate of the el
 * */
const _offset = function(el) {

    const rect = el.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return scrollTop + rect.top
}

/**
 * set the default active section
 */
const _setDefaultActiveSection = function(section) {
    if (defaultActiveSection === section) {
        return
    }
    section.classList.add("your-active-class")
    defaultActiveSection.classList.remove("your-active-class")
    defaultActiveSection = section

}

/**
 * help to implement the section collapse feature
 *
 */
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
/**
 * create header
 */
const _createHeader = function() {

    const newHeader = document.createElement('header')
    const newH1 = document.createElement('h1')
    newH1.textContent = MAIN_HEADER_TEXT
    newHeader.classList.add('main__hero')
    newHeader.appendChild(newH1)
    return newHeader
}

/**
 * create section
 */
const _createSection  = function(idx) {

    const section = document.createElement('section')
    const div = document.createElement('div')
    const span = document.createElement('span')
    const i = document.createElement('i')
    const h2 = document.createElement('h2')
    const p1 = document.createElement('p')
    const p2 = document.createElement('p')
    section.id = 'section' + idx
    section.setAttribute('data-nav', 'Section ' + idx)
    span.classList.add('collapse-button')
    i.classList.add('fas')
    i.classList.add('fa-sort-down')
    h2.textContent = 'Section ' + idx
    div.classList.add('landing__container')
    p1.textContent = SECTION_TEXT_P1
    p2.textContent = SECTION_TEXT_P2
    span.appendChild(i)
    div.appendChild(span)
    div.appendChild(h2)
    div.appendChild(p1)
    div.appendChild(p2)
    section.appendChild(div)
    return section

}

/**
 *
 * generate the main page
 */
const _renderPage = function() {

    const main = document.querySelector('main')
    main.innerHTML = ''
    main.appendChild(_createHeader())
    console.log(`length ${sectionListLength}`)
    for (let i = 0; i < sectionListLength; i++) {

        main.appendChild(_createSection(i + 1))
    }

}
/**
 * get available sections and store in a list
 */
const getSectionList = function() {
    sectionList = []
    const sections = document.getElementsByTagName('section')
    for (let i = 0; i < sections.length; i++) {
        sectionList.push(sections[i])
    }

}

/**
 * make section collapse
 */
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

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


const buildNavMenu = function() {

    const ulElement = document.getElementById('navbar__list')
    if (sectionList.length > 0) {
        defaultActiveSection = sectionList[0]
    }
    ulElement.innerHTML = ''
    for (let i = 0; i < sectionList.length; i++) {
        const liElement = document.createElement('li')
        liElement.textContent = sectionList[i].getAttribute('data-nav')
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
    let firstLoad = false
    document.addEventListener('mousemove', e => {
        const navMenu = document.querySelector('nav')
        const header = document.querySelector('header')

        if (e.clientY <= header.clientHeight + 20) {
            navMenu.style.display = 'block'
            showNavMenu = true
            firstLoad = true
        } else {
            if (firstLoad && showNavMenu) {
                navMenu.style.display = 'None'
                showNavMenu = false
            }
        }
    })
}
/**
 * Add class 'active' to section when near top of viewport
 *
 * */


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

        }, 20)

    })
}

/**
 * add section
 */
const pageChanges = function() {

    _renderPage()
    getSectionList()
    buildNavMenu()
    makeSectionCollapsable()

}
const activatePlusButton = function() {

    const button = document.querySelector('#plus')
    button.addEventListener('click', evt => {
        if (sectionListLength < 12) {
            sectionListLength += 1
        } else {
            alert("reach the maximum section")
        }
        pageChanges()
    })
}
/**
 * remove section
 */
const activateMinusButton = function() {
    const button = document.querySelector('#minus')
    button.addEventListener('click',  evt => {
        if (sectionListLength > 1) {
            sectionListLength -= 1
        } else {
            alert("the page should have at least one section")
        }
        pageChanges()
    })
}


/**
 * End Main Functions
 * Begin Events
 *
*/
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

        }, 4000)


    })
}

/**
 * the entrance point of the script
 */
getSectionList()
buildNavMenu()
makeSectionCollapsable()
configReturnToTopButton()
hideNavWhenNotScroll()
addActiveToSection()
showNavWhenMoveToTop()
activatePlusButton()
activateMinusButton()



