export default function decorate(block) {
  const rows = [...block.children];
  const tablist = document.createElement('div');
  tablist.className = 'tabs-list';
  tablist.setAttribute('role', 'tablist');

  const panels = document.createElement('div');
  panels.className = 'tabs-panels';

  rows.forEach((row, index) => {
    const [labelCell, contentCell] = [...row.children];
    const id = `tab-${index + 1}-${Math.random().toString(36).slice(2, 7)}`;
    const button = document.createElement('button');
    button.type = 'button';
    button.id = `${id}-button`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', `${id}-panel`);
    button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    button.textContent = labelCell?.textContent.trim() || `Tab ${index + 1}`;

    const panel = document.createElement('section');
    panel.id = `${id}-panel`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', button.id);
    if (index !== 0) panel.hidden = true;
    while (contentCell?.firstChild) panel.append(contentCell.firstChild);

    button.addEventListener('click', () => {
      tablist.querySelectorAll('[role="tab"]').forEach((tab) => tab.setAttribute('aria-selected', 'false'));
      panels.querySelectorAll('[role="tabpanel"]').forEach((item) => { item.hidden = true; });
      button.setAttribute('aria-selected', 'true');
      panel.hidden = false;
    });

    tablist.append(button);
    panels.append(panel);
  });

  block.replaceChildren(tablist, panels);
}
