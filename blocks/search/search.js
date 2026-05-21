const SEARCH_ITEMS = [
  ['FluffyJaw Therapy', '/services/fluffyjaw-therapy', 'Restore softness, loft, and comfort confidence.'],
  ['Stuffie Rehabilitation', '/services/stuffie-rehabilitation', 'Recover after repair, travel, or shelf fatigue.'],
  ['Emergency Fluff', '/services/emergency-fluff', 'Same-day support for sudden tears or bedtime crises.'],
  ['Matted Muzzle Syndrome', '/conditions/matted-muzzle-syndrome', 'Texture changes around the face and muzzle.'],
  ['Hug Fatigue', '/conditions/hug-fatigue', 'Support for overworked comfort companions.'],
  ['Cleaning Without Panic', '/resources/cleaning-without-panic', 'Gentle cleaning without damaging comfort texture.'],
  ['Fluff Readiness Calculator', '/tools/fluff-readiness-calculator', 'Estimate home care, routine care, or urgent support.'],
];

function renderResults(results, target) {
  target.replaceChildren(...results.map(([title, href, summary]) => {
    const item = document.createElement('li');
    item.innerHTML = `<a href="${href}">${title}</a><p>${summary}</p>`;
    return item;
  }));
}

export default function decorate(block) {
  const label = block.querySelector('div div')?.textContent.trim() || 'Search';
  const help = block.children[0]?.children[1]?.textContent.trim() || '';
  const form = document.createElement('form');
  form.className = 'search-box';
  form.innerHTML = `<label>${label}<input type="search" name="q" placeholder="Search care topics"></label><p>${help}</p>`;
  const results = document.createElement('ul');
  results.className = 'search-results';
  renderResults(SEARCH_ITEMS, results);

  form.addEventListener('input', () => {
    const query = new FormData(form).get('q').toString().toLowerCase();
    const matches = SEARCH_ITEMS.filter((item) => item.join(' ').toLowerCase().includes(query));
    renderResults(matches.length ? matches : [['No matching resource', '/resources', 'Try a broader care topic or browse all resources.']], results);
  });

  block.replaceChildren(form, results);
}
