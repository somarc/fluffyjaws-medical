const CART_KEY = 'fluffyjaws-cart';

function parsePrice(value) {
  return Number(String(value || '').replace(/[^0-9.]/g, '')) || 0;
}

function readCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('fluffyjaws:cart-change', { detail: { items } }));
}

function formatMoney(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function cartCount(items = readCart()) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

function cartTotal(items = readCart()) {
  return items.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0);
}

export function addToCart(product) {
  if (!product?.sku) return;
  const items = readCart();
  const existing = items.find((item) => item.sku === product.sku);
  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({
      sku: product.sku,
      title: product.title,
      price: product.price,
      image: product.image,
      url: product.url || window.location.pathname,
      quantity: 1,
    });
  }
  writeCart(items);
}

function updateQuantity(sku, quantity) {
  const next = readCart()
    .map((item) => (item.sku === sku ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);
  writeCart(next);
}

function productFromFacts(main) {
  if (!main) return null;
  const heading = main.querySelector('h1');
  const table = [...main.querySelectorAll('.comparison-table')].find((block) => {
    const firstRow = block.querySelector('tr') || block.querySelector(':scope > div');
    return firstRow && firstRow.textContent.includes('SKU') && firstRow.textContent.includes('Price');
  });
  if (!heading || !table) return null;

  const rowSelector = table.querySelector('tr') ? 'tr' : ':scope > div';
  const [headersRow, valuesRow] = table.querySelectorAll(rowSelector);
  if (!headersRow || !valuesRow) return null;

  const headers = [...headersRow.children].map((cell) => cell.textContent.trim().toLowerCase());
  const values = [...valuesRow.children].map((cell) => cell.textContent.trim());
  const valueFor = (name) => values[headers.indexOf(name)] || '';
  const sku = valueFor('sku');
  if (!sku) return null;

  return {
    sku,
    title: heading.textContent.trim(),
    price: valueFor('price'),
    category: valueFor('category'),
    url: window.location.pathname,
  };
}

function decoratePdpCart(main) {
  const product = productFromFacts(main);
  if (!product || main.querySelector('.cart-add-pdp')) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'button accent cart-add-pdp';
  button.textContent = 'Add to cart';
  button.addEventListener('click', () => addToCart(product));

  const wrapper = document.createElement('p');
  wrapper.className = 'button-wrapper';
  wrapper.append(button);

  const intro = main.querySelector('.section .default-content-wrapper');
  (intro || main.firstElementChild)?.append(wrapper);
}

function renderCart(drawer, items = readCart()) {
  const list = drawer.querySelector('.cart-drawer-items');
  const summary = drawer.querySelector('.cart-drawer-summary');
  list.textContent = '';

  if (!items.length) {
    const empty = document.createElement('p');
    empty.className = 'cart-drawer-empty';
    empty.textContent = 'Your cart is empty.';
    list.append(empty);
  } else {
    items.forEach((item) => {
      const row = document.createElement('article');
      row.className = 'cart-drawer-item';

      const title = document.createElement('a');
      title.href = item.url;
      title.textContent = item.title;

      const meta = document.createElement('p');
      meta.className = 'cart-drawer-item-meta';
      meta.textContent = [item.sku, item.price].filter(Boolean).join(' | ');

      const quantity = document.createElement('input');
      quantity.type = 'number';
      quantity.min = '0';
      quantity.value = String(item.quantity);
      quantity.setAttribute('aria-label', `Quantity for ${item.title}`);
      quantity.addEventListener('change', () => updateQuantity(item.sku, Number(quantity.value) || 0));

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => updateQuantity(item.sku, 0));

      const controls = document.createElement('div');
      controls.className = 'cart-drawer-item-controls';
      controls.append(quantity, remove);

      row.append(title, meta, controls);
      list.append(row);
    });
  }

  summary.textContent = `${cartCount(items)} item${cartCount(items) === 1 ? '' : 's'} | ${formatMoney(cartTotal(items))}`;
}

function createDrawer() {
  const drawer = document.createElement('aside');
  drawer.className = 'cart-drawer';
  drawer.setAttribute('aria-hidden', 'true');
  drawer.innerHTML = `
    <div class="cart-drawer-panel" role="dialog" aria-modal="false" aria-label="Shopping cart">
      <div class="cart-drawer-header">
        <h2>Cart</h2>
        <button type="button" class="cart-drawer-close" aria-label="Close cart">Close</button>
      </div>
      <div class="cart-drawer-items"></div>
      <div class="cart-drawer-footer">
        <p class="cart-drawer-summary"></p>
        <button type="button" class="button primary" disabled>Checkout coming soon</button>
      </div>
    </div>
  `;

  drawer.addEventListener('click', (event) => {
    if (event.target === drawer) drawer.classList.remove('open');
  });
  drawer.querySelector('.cart-drawer-close').addEventListener('click', () => drawer.classList.remove('open'));
  document.body.append(drawer);
  return drawer;
}

function createLauncher(drawer) {
  const launcher = document.createElement('button');
  launcher.type = 'button';
  launcher.className = 'cart-launcher';
  launcher.setAttribute('aria-label', 'Open cart');
  launcher.addEventListener('click', () => {
    renderCart(drawer);
    drawer.classList.add('open');
  });
  document.body.append(launcher);
  return launcher;
}

function updateLauncher(launcher, items = readCart()) {
  const count = cartCount(items);
  launcher.textContent = `Cart (${count})`;
}

export function initCart(doc = document) {
  if (doc.body.dataset.cartReady) return;
  doc.body.dataset.cartReady = 'true';

  decoratePdpCart(doc.querySelector('main'));
  const drawer = createDrawer();
  const launcher = createLauncher(drawer);
  renderCart(drawer);
  updateLauncher(launcher);

  window.addEventListener('fluffyjaws:cart-change', (event) => {
    const items = event.detail?.items || readCart();
    renderCart(drawer, items);
    updateLauncher(launcher, items);
  });
}
