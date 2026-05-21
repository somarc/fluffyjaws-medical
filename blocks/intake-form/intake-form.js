export default function decorate(block) {
  const form = document.createElement('form');
  form.className = 'intake-form-fields';
  [...block.children].forEach((row) => {
    const [labelCell, typeCell] = [...row.children];
    const labelText = labelCell?.textContent.trim() || 'Field';
    const typeText = typeCell?.textContent.trim() || 'text';
    const label = document.createElement('label');
    label.textContent = labelText;
    const name = labelText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    let field;
    if (typeText === 'textarea') {
      field = document.createElement('textarea');
      field.rows = 5;
    } else if (typeText.includes(',')) {
      field = document.createElement('select');
      typeText.split(',').map((item) => item.trim()).forEach((item) => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        field.append(option);
      });
    } else {
      field = document.createElement('input');
      field.type = typeText;
    }
    field.name = name;
    field.required = true;
    label.append(field);
    form.append(label);
  });
  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'button primary';
  button.textContent = 'Prepare intake';
  const status = document.createElement('p');
  status.setAttribute('role', 'status');
  form.append(button, status);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = 'Intake prepared locally. A care coordinator would review this in the production workflow.';
  });
  block.replaceChildren(form);
}
