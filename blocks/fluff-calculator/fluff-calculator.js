const flatnessValues = {
  none: 0,
  mild: 15,
  moderate: 30,
  severe: 45,
};

function score(hugs, travel, flatness) {
  return Math.min(100, Math.round((hugs * 1.8) + (travel * 3) + flatnessValues[flatness]));
}

function recommendation(value) {
  if (value >= 70) return 'Urgent review recommended. Stabilize the stuffie and book Emergency Fluff.';
  if (value >= 40) return 'Clinic review recommended. FluffyJaw Therapy or Family Care should help.';
  return 'Home monitoring is reasonable. Keep a care rhythm and reassess after one week.';
}

export default function decorate(block) {
  const defaults = [...block.children].map((row) => row.children[1]?.textContent.trim());
  const hugs = Number.parseInt(defaults[0], 10) || 12;
  const travel = Number.parseInt(defaults[1], 10) || 4;
  const flatness = (defaults[2] || 'moderate').toLowerCase();

  block.innerHTML = `
    <form>
      <label>Hugs per day<input name="hugs" type="range" min="0" max="40" value="${hugs}"><output>${hugs}</output></label>
      <label>Travel days per month<input name="travel" type="range" min="0" max="20" value="${travel}"><output>${travel}</output></label>
      <label>Visible flatness<select name="flatness">
        <option value="none">None</option>
        <option value="mild">Mild</option>
        <option value="moderate">Moderate</option>
        <option value="severe">Severe</option>
      </select></label>
    </form>
    <div class="fluff-calculator-result" aria-live="polite"></div>
  `;
  block.querySelector('select').value = flatnessValues[flatness] === undefined ? 'moderate' : flatness;
  const form = block.querySelector('form');
  const result = block.querySelector('.fluff-calculator-result');
  const update = () => {
    form.querySelectorAll('input[type="range"]').forEach((input) => { input.nextElementSibling.textContent = input.value; });
    const data = new FormData(form);
    const value = score(Number(data.get('hugs')), Number(data.get('travel')), data.get('flatness'));
    result.innerHTML = `<strong>${value}/100 readiness risk</strong><p>${recommendation(value)}</p>`;
  };
  form.addEventListener('input', update);
  update();
}
