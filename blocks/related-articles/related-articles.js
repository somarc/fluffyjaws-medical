export default function decorate(block) {
  const list = document.createElement('ul');
  [...block.children].forEach((row) => {
    const [title, summary] = [...row.children];
    const item = document.createElement('li');
    const heading = document.createElement('h3');
    heading.innerHTML = title?.innerHTML || '';
    const text = document.createElement('p');
    text.innerHTML = summary?.innerHTML || '';
    item.append(heading, text);
    list.append(item);
  });
  block.replaceChildren(list);
}
