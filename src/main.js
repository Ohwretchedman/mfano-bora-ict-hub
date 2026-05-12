import './style.css'
import localFaviconUrl from './assets/favicon.ico'

const header = document.querySelector('.site-header')
const menuToggle = document.querySelector('.menu-toggle')
const navLinks = Array.from(document.querySelectorAll('.nav-link'))
const yearNode = document.querySelector('#current-year')
const localFaviconNode = document.querySelector('[data-local-favicon]')

if (yearNode) {
  yearNode.textContent = new Date().getFullYear().toString()
}

if (localFaviconNode) {
  localFaviconNode.src = localFaviconUrl
}


if (menuToggle && header) {
  menuToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open')
    menuToggle.setAttribute('aria-expanded', String(isOpen))
  })
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (!header || !menuToggle) {
      return
    }

    header.classList.remove('nav-open')
    menuToggle.setAttribute('aria-expanded', 'false')
  })
})

const updateHeaderState = () => {
  if (!header) {
    return
  }

  header.classList.toggle('is-scrolled', window.scrollY > 12)
}

updateHeaderState()
window.addEventListener('scroll', updateHeaderState, { passive: true })

const sectionIds = ['home', 'services', 'innovation-hub', 'events', 'contact']
const observedSections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean)

if (observedSections.length > 0 && 'IntersectionObserver' in window) {
  const linkByHash = new Map(navLinks.map((link) => [link.getAttribute('href'), link]))

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return
        }

        navLinks.forEach((link) => link.classList.remove('is-active'))
        const activeLink = linkByHash.get(`#${entry.target.id}`)
        if (activeLink) {
          activeLink.classList.add('is-active')
        }
      })
    },
    {
      root: null,
      threshold: 0.5,
      rootMargin: '-15% 0px -50% 0px',
    },
  )

  observedSections.forEach((section) => observer.observe(section))
}

window.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !header || !menuToggle) {
    return
  }

  header.classList.remove('nav-open')
  menuToggle.setAttribute('aria-expanded', 'false')
  menuToggle.focus()
})


window.addEventListener('resize', () => {
  if (!header || !menuToggle) {
    return
  }

  if (window.innerWidth > 980) {
    header.classList.remove('nav-open')
    menuToggle.setAttribute('aria-expanded', 'false')
  }
})
