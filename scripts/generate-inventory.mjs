import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const TOTAL = 1000;

const categories = [
  { name: 'Comfort Devices', code: 'CFD', hue: '#4f8f7b', accent: '#d6f2e8', noun: 'comfort' },
  { name: 'Diagnostic Tools', code: 'DGT', hue: '#556aa6', accent: '#dfe6ff', noun: 'diagnostic' },
  { name: 'Recovery Kits', code: 'RCK', hue: '#a65f50', accent: '#ffe2da', noun: 'recovery' },
  { name: 'Home Care Supplies', code: 'HCS', hue: '#7f6a3f', accent: '#f4ead4', noun: 'home-care' },
  { name: 'Sleep Support', code: 'SLP', hue: '#635a95', accent: '#e8e2ff', noun: 'sleep' },
  { name: 'Grooming Recovery', code: 'GRM', hue: '#5f8fa6', accent: '#ddf3fb', noun: 'grooming' },
  { name: 'Clinic Bundles', code: 'CLB', hue: '#7b7f3f', accent: '#eef1cf', noun: 'clinic' },
  { name: 'Travel Care', code: 'TRV', hue: '#b0793f', accent: '#ffe8cc', noun: 'travel' },
  { name: 'Preventive Care', code: 'PVC', hue: '#5e8e52', accent: '#def5d8', noun: 'preventive' },
  { name: 'Member Exclusives', code: 'MBR', hue: '#9a5d8f', accent: '#f7ddf2', noun: 'member' },
];

const families = [
  'LoftGuard', 'ButtonBright', 'NapNest', 'SnuggleMeter', 'CuddleCalm',
  'PawPocket', 'MuzzleMint', 'HugHalo', 'FluffForge', 'TuckTonic',
  'CozyCircuit', 'VelvetVitals', 'PatchPilot', 'PlushPulse', 'QuiltQuest',
  'StitchScout', 'SootheSphere', 'LullabyLatch', 'FiberFirst', 'BuddyBeacon',
  'NuzzleNova', 'DrowseDock', 'CareCove', 'SoftSignal', 'RestRibbon',
];

const forms = [
  'Wrap', 'Comb', 'Chart', 'Nest', 'Station', 'Splint', 'Case', 'Kit',
  'Band', 'Insert', 'Spray', 'Roll', 'Scanner', 'Pad', 'Gauge', 'Bundle',
  'Patch', 'Pouch', 'Tray', 'Loop',
];

const variants = [
  'Atrium', 'Bungalow', 'Cascade', 'Daybreak', 'Ember', 'Fern',
  'Garden', 'Harbor', 'Indigo', 'Juniper', 'Keystone', 'Lagoon',
  'Meadow', 'Nimbus', 'Orchard', 'Pebble', 'Quilted', 'Riverside',
  'Solstice', 'Thimble', 'Umber', 'Velvet', 'Willow', 'Yarrow', 'Zephyr',
];

const editions = [
  'Arc', 'Bloom', 'Cairn', 'Drift', 'Emblem', 'Fable', 'Glade', 'Hearth',
  'Ion', 'Jubilee', 'Kindle', 'Lantern', 'Mosaic', 'Nook', 'Opal', 'Prairie',
  'Quartz', 'Ripple', 'Summit', 'Trellis', 'Unity', 'Vale', 'Wisp', 'Xenia',
  'Yield', 'Zenith', 'Aster', 'Beacon', 'Clover', 'Dune', 'Evergreen',
  'Fjord', 'Grove', 'Horizon', 'Ivy', 'Jasper', 'Kite', 'Loom', 'Marble',
  'Northstar',
];

const audiences = [
  'pediatric stuffies', 'high-hug households', 'clinic intake teams', 'travel kits',
  'bedtime recovery plans', 'member care rooms', 'quiet recovery corners',
  'grooming-sensitive companions', 'post-visit settling', 'preventive loft checks',
];

const benefits = [
  'keeps button-eye checks organized',
  'adds a calm handoff between visit and home care',
  'separates brushing, loft, and rest signals',
  'helps caregivers compare next-step comfort options',
  'supports gentle routines without clinical clutter',
  'marks urgent fluff interventions from ordinary restocking',
  'turns repeated cuddle-cycle notes into visible care cues',
  'keeps small supplies findable during sleepy handovers',
  'pairs soft diagnostics with reassuring recovery language',
  'makes large-catalog filtering feel intentionally authored',
];

const materials = [
  'brushed cotton shell', 'soft-touch loop panel', 'washable satin tag',
  'low-snag microfiber pocket', 'quiet-clasp closure', 'loft-safe felt insert',
  'clinic-grade cuddle card', 'rounded comfort tab', 'warm-touch label',
  'color-coded care sleeve',
];

const settings = [
  'exam-room reset', 'bedside recovery', 'travel readiness', 'family care',
  'member restock', 'after-hours comfort', 'grooming recovery', 'preventive check',
  'nap planning', 'clinic checkout',
];

function pick(list, i, salt = 0) {
  return list[(i * 17 + salt * 31) % list.length];
}

function money(i, categoryIndex) {
  const cents = [0, 49, 75, 95, 99][(i + categoryIndex) % 5];
  const dollars = 18 + ((i * 37 + categoryIndex * 53) % 870);
  return `$${dollars}.${String(cents).padStart(2, '0')}`;
}

function slug(n) {
  return `sku-${String(n).padStart(4, '0')}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function productFor(index) {
  const number = index + 1;
  const categoryIndex = index % categories.length;
  const category = categories[categoryIndex];
  const family = families[Math.floor(index / 40) % families.length];
  const form = forms[Math.floor(index / 2) % forms.length];
  const variant = variants[index % variants.length];
  const edition = editions[Math.floor(index / variants.length) % editions.length];
  const audience = pick(audiences, index, 6);
  const benefit = pick(benefits, index, 8);
  const material = pick(materials, index, 10);
  const setting = pick(settings, index, 12);
  const title = `${family} ${form} ${variant} ${edition}`;
  const sku = `FJM-${category.code}-${String(number).padStart(4, '0')}`;

  return {
    sku,
    url: `/products/inventory/${slug(number)}`,
    title,
    price: money(index, categoryIndex),
    image: `/media/inventory-${category.noun}.svg`,
    category: category.name,
    summary: `${title} is a fictional ${category.name.toLowerCase()} item for ${audience}; ${benefit} with a ${material} for ${setting}.`,
    family,
    material,
    setting,
  };
}

function categoryPageHtml() {
  return `<!doctype html>
<html>
<head>
  <title>Inventory Catalog | FluffyJaws Medical</title>
  <meta name="description" content="Large fictional FluffyJaws Medical product catalog for EDS commerce scale validation.">
  <meta name="nav" content="/nav">
  <meta name="footer" content="/footer">
</head>
<body>
<header></header>
<main>
  <div>
    <h1>Inventory Catalog</h1>
    <p>A fictional 1,000-SKU commerce surface for validating EDS catalog scale, search, filters, and preview confidence across distinct product families, care settings, materials, and category visuals.</p>
  </div>
  <div>
    <div class="product-grid">
      <div>
        <div><a href="index.json">index.json</a></div>
      </div>
    </div>
  </div>
</main>
<footer></footer>
</body>
</html>
`;
}

function productPageHtml(product) {
  return `<!doctype html>
<html>
<head>
  <title>${escapeHtml(product.title)} | FluffyJaws Medical</title>
  <meta name="description" content="${escapeHtml(product.summary)}">
  <meta name="nav" content="/nav">
  <meta name="footer" content="/footer">
</head>
<body>
<header></header>
<main>
  <div>
    <h1>${escapeHtml(product.title)}</h1>
    <p>${escapeHtml(product.summary)}</p>
    <p><strong><a href="/contact">Request a consult</a></strong> <em><a href="/products/inventory">Back to inventory</a></em></p>
  </div>
  <div>
    <h2>Product Facts</h2>
    <div class="comparison-table">
      <div><div>SKU</div><div>Category</div><div>Price</div><div>Material</div><div>Care Setting</div></div>
      <div><div>${escapeHtml(product.sku)}</div><div>${escapeHtml(product.category)}</div><div>${escapeHtml(product.price)}</div><div>${escapeHtml(product.material)}</div><div>${escapeHtml(product.setting)}</div></div>
    </div>
  </div>
  <div>
    <h2>Commerce Validation Notes</h2>
    <p>This fictional PDP validates large-catalog EDS preview coverage with richer search terms, category facets, and product-detail variation.</p>
  </div>
</main>
<footer></footer>
</body>
</html>
`;
}

function svgForCategory(category, index) {
  const shape = ['circle', 'rect', 'path', 'polygon', 'ellipse'][index % 5];
  const mark = {
    circle: `<circle cx="300" cy="170" r="74" fill="${category.hue}"/><circle cx="328" cy="144" r="18" fill="white" opacity=".75"/>`,
    rect: `<rect x="228" y="92" width="144" height="144" rx="28" fill="${category.hue}"/><rect x="260" y="124" width="80" height="80" rx="16" fill="white" opacity=".7"/>`,
    path: `<path d="M300 82 386 212H214L300 82Z" fill="${category.hue}"/><path d="M300 130 338 190H262L300 130Z" fill="white" opacity=".7"/>`,
    polygon: `<polygon points="300,76 394,144 358,252 242,252 206,144" fill="${category.hue}"/><circle cx="300" cy="166" r="34" fill="white" opacity=".72"/>`,
    ellipse: `<ellipse cx="300" cy="168" rx="112" ry="70" fill="${category.hue}"/><ellipse cx="300" cy="168" rx="56" ry="30" fill="white" opacity=".65"/>`,
  }[shape];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="675" viewBox="0 0 600 450" role="img" aria-label="${category.name}">
  <rect width="600" height="450" fill="${category.accent}"/>
  <path d="M0 354C92 316 150 388 244 344C332 303 410 266 600 318V450H0Z" fill="${category.hue}" opacity=".18"/>
  <path d="M0 92C120 126 174 44 292 86C390 121 462 138 600 86V0H0Z" fill="#fff" opacity=".5"/>
  ${mark}
  <text x="300" y="316" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#18211f">${category.name}</text>
  <text x="300" y="352" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#38433f">FluffyJaws Medical inventory</text>
</svg>
`;
}

async function writeJsonMirrors(products) {
  const body = `${JSON.stringify({
    total: products.length,
    offset: 0,
    limit: products.length,
    columns: ['sku', 'url', 'title', 'price', 'image', 'category', 'summary'],
    data: products.map(({ family, material, setting, ...product }) => product),
  }, null, 2)}\n`;
  await writeFile('content/products/inventory/index.json', body);
  await writeFile('products/inventory/index.json', body);
}

async function main() {
  const products = Array.from({ length: TOTAL }, (_, index) => productFor(index));

  await mkdir('content/products/inventory', { recursive: true });
  await mkdir('products/inventory', { recursive: true });
  await mkdir('media', { recursive: true });

  await writeJsonMirrors(products);
  await writeFile('content/products/inventory/index.html', categoryPageHtml());

  await Promise.all(products.map(async (product, index) => {
    await writeFile(`content/products/inventory/${slug(index + 1)}.html`, productPageHtml(product));
  }));

  await Promise.all(categories.map(async (category, index) => {
    await writeFile(path.join('media', `inventory-${category.noun}.svg`), svgForCategory(category, index));
  }));

  console.log(`Generated ${products.length} products across ${categories.length} categories.`);
}

await main();
