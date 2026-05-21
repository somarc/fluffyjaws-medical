const WEIGHTS = {
  therapy: ['matted', 'flat', 'texture', 'brush'],
  rehab: ['travel', 'repair', 'stitch', 'confidence'],
  emergency: ['tear', 'missing', 'sudden', 'bedtime'],
  family: ['shared', 'siblings', 'school', 'routine'],
};

const RECOMMENDATIONS = {
  therapy: ['FluffyJaw Therapy', '/services/fluffyjaw-therapy', 'Best starting point for softness, texture, and comfort confidence changes.'],
  rehab: ['Stuffie Rehabilitation', '/services/stuffie-rehabilitation', 'Best starting point after repair, travel, or disrupted handling routines.'],
  emergency: ['Emergency Fluff', '/services/emergency-fluff', 'Best starting point for sudden damage or same-day comfort disruption.'],
  family: ['Family Care', '/services/family-care', 'Best starting point when the family needs shared rules, routines, or preventive planning.'],
};

function scoreAnswer(text, scores) {
  const value = text.toLowerCase();
  Object.entries(WEIGHTS).forEach(([key, terms]) => {
    if (terms.some((term) => value.includes(term))) scores[key] += 1;
  });
}

function topRecommendation(scores) {
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

export default function decorate(block) {
  const rows = [...block.children].map((row) => (
    [...row.children].map((cell) => cell.textContent.trim())
  ));
  block.innerHTML = `
    <form>
      ${rows.map(([question, ...answers], index) => `
        <fieldset>
          <legend>${question}</legend>
          ${answers.filter(Boolean).map((answer) => `
            <label><input type="radio" name="q${index}" value="${answer}" required> ${answer}</label>
          `).join('')}
        </fieldset>
      `).join('')}
      <button type="submit" class="button primary">See care path</button>
    </form>
    <div class="quiz-result" aria-live="polite"></div>
  `;

  const form = block.querySelector('form');
  const result = block.querySelector('.quiz-result');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const scores = {
      therapy: 0,
      rehab: 0,
      emergency: 0,
      family: 0,
    };
    [...new FormData(form).values()].forEach((answer) => scoreAnswer(answer, scores));
    const [title, href, summary] = RECOMMENDATIONS[topRecommendation(scores)];
    result.innerHTML = `<h3>${title}</h3><p>${summary}</p>
      <p><a class="button secondary" href="${href}">Open care path</a></p>`;
  });
}
