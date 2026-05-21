const SESSION_KEY = 'fj-member-session';

function currentSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
  } catch (e) {
    return null;
  }
}

function saveSession(name) {
  const session = {
    name,
    started: new Date().toISOString(),
  };
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    // do nothing
  }
  return session;
}

function renderLoggedOut(block) {
  block.innerHTML = `
    <form class="login-panel">
      <h2>Sign In</h2>
      <p>This fictional login validates gated-page behavior without creating a real account or storing clinical data.</p>
      <label>Family name <input name="name" autocomplete="name" required placeholder="Button family"></label>
      <label>Care code <input name="code" autocomplete="one-time-code" required placeholder="FLUFFY"></label>
      <p class="login-status" aria-live="polite"></p>
      <button type="submit" class="button primary">Enter care room</button>
    </form>
  `;

  const form = block.querySelector('form');
  const status = block.querySelector('.login-status');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const code = data.get('code').toString().trim().toUpperCase();
    if (code !== 'FLUFFY') {
      status.textContent = 'Use care code FLUFFY for this demonstration.';
      return;
    }
    const session = saveSession(data.get('name').toString().trim() || 'Care family');
    // eslint-disable-next-line no-use-before-define
    renderMemberRoom(block, session);
  });
}

function renderMemberRoom(block, session) {
  block.innerHTML = `
    <div class="login-panel">
      <h2>Member Care Room</h2>
      <p>Welcome, ${session.name}. Your fictional care room keeps visit preparation, follow-up reminders, and favorite resources together on this device.</p>
      <ul>
        <li>Next suggested action: review the intake checklist before a visit.</li>
        <li>Saved tool: Fluff Readiness Calculator.</li>
        <li>Care reminder: rotate high-hug stuffies after intense travel days.</li>
      </ul>
      <p><a class="button primary" href="/contact">Book follow-up</a></p>
      <button type="button" class="button secondary">Sign out</button>
    </div>
  `;
  block.querySelector('button').addEventListener('click', () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch (e) {
      // do nothing
    }
    renderLoggedOut(block);
  });
}

export default function decorate(block) {
  const existing = currentSession();
  if (existing?.name) {
    renderMemberRoom(block, existing);
    return;
  }

  renderLoggedOut(block);
}
