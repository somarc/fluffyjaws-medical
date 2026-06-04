function productCard(product) {
  const card = document.createElement('article');
  card.className = 'product-grid-card';

  const link = document.createElement('a');
  link.href = product.url;
  link.className = 'product-grid-image-link';
  link.setAttribute('aria-label', product.title);

  const image = document.createElement('img');
  image.src = product.image;
  image.alt = product.title;
  image.loading = 'lazy';
  link.append(image);

  const body = document.createElement('div');
  body.className = 'product-grid-card-body';

  const eyebrow = document.createElement('p');
  eyebrow.className = 'product-grid-category';
  eyebrow.textContent = product.category || product.sku;

  const title = document.createElement('h3');
  const titleLink = document.createElement('a');
  titleLink.href = product.url;
  titleLink.textContent = product.title;
  title.append(titleLink);

  const summary = document.createElement('p');
  summary.textContent = product.summary || '';

  const meta = document.createElement('p');
  meta.className = 'product-grid-meta';
  meta.textContent = [product.sku, product.price].filter(Boolean).join(' | ');

  body.append(eyebrow, title, summary, meta);
  card.append(link, body);
  return card;
}

export default async function decorate(block) {
  const link = block.querySelector('a[href$=".json"]');
  if (!link) return;

  block.textContent = '';
  block.classList.add('loading');

  try {
    const res = await fetch(link.href);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const products = Array.isArray(json.data) ? json.data : [];
    const grid = document.createElement('div');
    grid.className = 'product-grid-list';
    products.forEach((product) => grid.append(productCard(product)));
    block.classList.remove('loading');
    block.append(grid);
  } catch (error) {
    block.classList.remove('loading');
    block.classList.add('error');
    block.textContent = `Product catalog unavailable: ${error.message}`;
  }
}
