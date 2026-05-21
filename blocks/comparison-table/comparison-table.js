export default function decorate(block) {
  const table = document.createElement('table');
  [...block.children].forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    [...row.children].forEach((cell) => {
      const el = document.createElement(rowIndex === 0 ? 'th' : 'td');
      el.innerHTML = cell.innerHTML;
      tr.append(el);
    });
    table.append(tr);
  });
  const wrapper = document.createElement('div');
  wrapper.className = 'comparison-table-scroll';
  wrapper.append(table);
  block.replaceChildren(wrapper);
}
