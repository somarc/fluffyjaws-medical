function getCellLink(row) {
  return row?.querySelector('a')?.href || row?.textContent.trim() || '';
}

function normalizeName(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function buildField(field) {
  const type = String(field.type || 'text').toLowerCase();
  if (type === 'submit' || type === 'reset' || type === 'confirmation') return null;

  const label = document.createElement('label');
  label.textContent = field.label || field.field || 'Field';

  let input;
  if (type === 'textarea') {
    input = document.createElement('textarea');
    input.rows = 5;
  } else if (type === 'select') {
    input = document.createElement('select');
    String(field.options || '')
      .split(',')
      .map((option) => option.trim())
      .filter(Boolean)
      .forEach((option) => {
        const el = document.createElement('option');
        el.value = option;
        el.textContent = option;
        input.append(el);
      });
  } else {
    input = document.createElement('input');
    input.type = type;
  }

  input.name = field.field || normalizeName(field.label || 'field');
  input.required = String(field.required || '').toUpperCase() === 'TRUE';
  if (field.placeholder) input.placeholder = field.placeholder;
  if (field.default && type !== 'select') input.value = field.default;

  label.append(input);
  if (field.help) {
    const help = document.createElement('small');
    help.textContent = field.help;
    label.append(help);
  }
  return label;
}

export default async function decorate(block) {
  const rows = [...block.children];
  const sheetUrl = getCellLink(rows[0]);
  const action = getCellLink(rows[1]);
  const form = document.createElement('form');
  form.className = 'form-fields';
  form.method = 'post';
  if (action) form.action = action;

  try {
    const res = await fetch(sheetUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const fields = (await res.json()).data || [];
    fields.map(buildField).filter(Boolean).forEach((field) => form.append(field));

    const actions = document.createElement('div');
    actions.className = 'form-actions';
    fields.filter((field) => ['submit', 'reset'].includes(String(field.type).toLowerCase())).forEach((field) => {
      const button = document.createElement('button');
      button.type = field.type;
      button.textContent = field.label;
      if (field.type === 'submit') button.className = 'button primary';
      actions.append(button);
    });
    form.append(actions);

    const status = document.createElement('p');
    status.setAttribute('role', 'status');
    form.append(status);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      status.textContent = 'Intake prepared locally. A production endpoint would receive this submission.';
    });
    block.replaceChildren(form);
  } catch (error) {
    block.textContent = `Form unavailable: ${error.message}`;
  }
}
