import { addToCart } from '../../scripts/cart.js';

const PAGE_SIZE = 48;

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

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

  const cartButton = document.createElement('button');
  cartButton.type = 'button';
  cartButton.className = 'button accent product-grid-cart';
  cartButton.textContent = 'Add to cart';
  cartButton.addEventListener('click', () => addToCart(product));

  body.append(eyebrow, title, summary, meta, cartButton);
  card.append(link, body);
  return card;
}

function option(value) {
  const item = document.createElement('option');
  item.value = value;
  item.textContent = value;
  return item;
}

function renderSummary(count, total) {
  const summary = document.createElement('p');
  summary.className = 'product-grid-summary';
  summary.textContent = `${count.toLocaleString()} of ${total.toLocaleString()} products`;
  return summary;
}

function sortProducts(products, sortBy) {
  const sorted = [...products];
  sorted.sort((a, b) => {
    if (sortBy === 'price-asc' || sortBy === 'price-desc') {
      const priceA = Number(String(a.price || '').replace(/[^0-9.]/g, '')) || 0;
      const priceB = Number(String(b.price || '').replace(/[^0-9.]/g, '')) || 0;
      return sortBy === 'price-asc' ? priceA - priceB : priceB - priceA;
    }
    return String(a.title || '').localeCompare(String(b.title || ''));
  });
  return sorted;
}

function filterProducts(products, { query, category, sortBy }) {
  const needle = normalizeText(query);
  const filtered = products.filter((product) => {
    const categoryMatches = category === 'All categories' || product.category === category;
    if (!categoryMatches) return false;
    if (!needle) return true;
    return [
      product.sku,
      product.title,
      product.category,
      product.summary,
    ].some((field) => normalizeText(field).includes(needle));
  });
  return sortProducts(filtered, sortBy);
}

function buildControls(products, onChange) {
  const controls = document.createElement('div');
  controls.className = 'product-grid-controls';

  const searchLabel = document.createElement('label');
  searchLabel.textContent = 'Search inventory';
  const search = document.createElement('input');
  search.type = 'search';
  search.placeholder = 'SKU, category, product name';
  search.setAttribute('aria-label', 'Search product inventory');
  searchLabel.append(search);

  const categoryLabel = document.createElement('label');
  categoryLabel.textContent = 'Category';
  const category = document.createElement('select');
  category.setAttribute('aria-label', 'Filter by category');
  category.append(option('All categories'));
  [...new Set(products.map((product) => product.category).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b))
    .forEach((value) => category.append(option(value)));
  categoryLabel.append(category);

  const sortLabel = document.createElement('label');
  sortLabel.textContent = 'Sort';
  const sort = document.createElement('select');
  sort.setAttribute('aria-label', 'Sort products');
  [
    ['title', 'Name'],
    ['price-asc', 'Price: low to high'],
    ['price-desc', 'Price: high to low'],
  ].forEach(([value, label]) => {
    const item = option(label);
    item.value = value;
    sort.append(item);
  });
  sortLabel.append(sort);

  [search, category, sort].forEach((control) => {
    control.addEventListener('input', () => {
      onChange({
        query: search.value,
        category: category.value,
        sortBy: sort.value,
      });
    });
  });

  controls.append(searchLabel, categoryLabel, sortLabel);
  return controls;
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
    let visibleCount = Math.min(PAGE_SIZE, products.length);
    const summarySlot = document.createElement('div');
    const grid = document.createElement('div');
    grid.className = 'product-grid-list';
    const more = document.createElement('button');
    more.type = 'button';
    more.className = 'product-grid-more';
    more.textContent = 'Show more products';

    const render = (filters = { query: '', category: 'All categories', sortBy: 'title' }) => {
      const visibleProducts = filterProducts(products, filters);
      visibleCount = Math.min(visibleCount, visibleProducts.length);
      grid.textContent = '';
      visibleProducts
        .slice(0, visibleCount)
        .forEach((product) => grid.append(productCard(product)));
      summarySlot.textContent = '';
      summarySlot.append(renderSummary(visibleProducts.length, products.length));
      more.hidden = visibleCount >= visibleProducts.length;
    };

    const controls = products.length > PAGE_SIZE
      ? buildControls(products, (filters) => {
        visibleCount = PAGE_SIZE;
        render(filters);
      })
      : null;

    more.addEventListener('click', () => {
      visibleCount += PAGE_SIZE;
      const search = controls?.querySelector('input');
      const selects = controls ? [...controls.querySelectorAll('select')] : [];
      render({
        query: search?.value || '',
        category: selects[0]?.value || 'All categories',
        sortBy: selects[1]?.value || 'title',
      });
    });

    block.classList.remove('loading');
    if (products.length > PAGE_SIZE) block.classList.add('large');
    render();
    block.append(...[controls, summarySlot, grid, more].filter(Boolean));
  } catch (error) {
    block.classList.remove('loading');
    block.classList.add('error');
    block.textContent = `Product catalog unavailable: ${error.message}`;
  }
}
