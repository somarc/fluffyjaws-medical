import { createOptimizedPicture } from '../../scripts/aem.js';

function isMediaLink(link) {
  const href = link.getAttribute('href') || '';
  return href.startsWith('/media/') && /\.(gif|jpe?g|png|svg|webp)$/i.test(href);
}

function decorateImageCell(div) {
  if (div.children.length === 1 && div.querySelector('picture')) {
    div.className = 'cards-card-image';
    return;
  }

  const link = div.querySelector('a');
  const isLinkOnlyCell = link && div.textContent.trim() === link.textContent.trim();
  if (isLinkOnlyCell && isMediaLink(link)) {
    const img = document.createElement('img');
    img.src = link.getAttribute('href');
    img.alt = link.textContent.trim();
    div.replaceChildren(img);
    div.className = 'cards-card-image';
    return;
  }

  if (div.children.length === 1 && div.querySelector(':scope > img')) {
    div.className = 'cards-card-image';
    return;
  }

  div.className = 'cards-card-body';
}

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach(decorateImageCell);
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    if (/\.svg$/i.test(new URL(img.src).pathname)) return;
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  });
  block.replaceChildren(ul);
}
