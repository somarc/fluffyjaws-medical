import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

const SEARCH_ITEMS = [
  ['FluffyJaw Therapy', '/services/fluffyjaw-therapy'],
  ['Stuffie Rehabilitation', '/services/stuffie-rehabilitation'],
  ['Emergency Fluff', '/services/emergency-fluff'],
  ['Family Care', '/services/family-care'],
  ['Matted Muzzle Syndrome', '/conditions/matted-muzzle-syndrome'],
  ['Hug Fatigue', '/conditions/hug-fatigue'],
  ['Cleaning Without Panic', '/resources/cleaning-without-panic'],
  ['Fluff Readiness Calculator', '/tools/fluff-readiness-calculator'],
  ['Fluff Fit Quiz', '/tools/fluff-fit-quiz'],
  ['Member Care Room', '/login'],
];

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    if (!navSections) return;
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    if (!navSections) return;
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem('fj-theme', theme);
  } catch (e) {
    // do nothing
  }
}

function decorateThemeToggle(container) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'nav-theme-toggle';
  button.setAttribute('aria-label', 'Use dark theme');
  button.textContent = 'Dark';

  let activeTheme = 'light';
  try {
    activeTheme = localStorage.getItem('fj-theme') || activeTheme;
  } catch (e) {
    // do nothing
  }
  applyTheme(activeTheme);

  const sync = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    button.textContent = dark ? 'Light' : 'Dark';
    button.setAttribute('aria-label', dark ? 'Use light theme' : 'Use dark theme');
  };
  sync();

  button.addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    sync();
  });
  container.append(button);
}

function decorateNavSearch(container) {
  const form = document.createElement('form');
  form.className = 'nav-search';
  form.setAttribute('role', 'search');
  form.innerHTML = `
    <label>
      <span>Search care topics</span>
      <input type="search" name="q" autocomplete="off" placeholder="Search">
    </label>
    <ul hidden></ul>
  `;
  const input = form.querySelector('input');
  const results = form.querySelector('ul');

  const render = () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      results.hidden = true;
      results.replaceChildren();
      return;
    }
    const matches = SEARCH_ITEMS
      .filter(([title]) => title.toLowerCase().includes(query))
      .slice(0, 5);
    results.replaceChildren(...matches.map(([title, href]) => {
      const item = document.createElement('li');
      item.innerHTML = `<a href="${href}">${title}</a>`;
      return item;
    }));
    results.hidden = matches.length === 0;
  };

  form.addEventListener('input', render);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const first = results.querySelector('a');
    if (first) window.location.href = first.href;
    else if (input.value.trim()) window.location.href = `/resources?q=${encodeURIComponent(input.value.trim())}`;
  });
  form.addEventListener('focusout', () => {
    window.setTimeout(() => { results.hidden = true; }, 150);
  });
  container.prepend(form);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  if (!sections) return;
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  if (navSections) {
    const navDrops = navSections.querySelectorAll('.nav-drop');
    if (isDesktop.matches) {
      navDrops.forEach((drop) => {
        if (!drop.hasAttribute('tabindex')) {
          drop.setAttribute('tabindex', 0);
          drop.addEventListener('focus', focusNavSection);
        }
      });
    } else {
      navDrops.forEach((drop) => {
        drop.removeAttribute('tabindex');
        drop.removeEventListener('focus', focusNavSection);
      });
    }
  }

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand?.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    const brandButtonWrapper = brandLink.closest('.button-container, .button-wrapper');
    if (brandButtonWrapper) brandButtonWrapper.className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });
  }

  const navTools = nav.querySelector('.nav-tools');
  if (navTools) {
    decorateNavSearch(navTools);
    decorateThemeToggle(navTools);
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
