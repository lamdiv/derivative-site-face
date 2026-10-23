const browser = document.querySelector('.browser-demo');
const heading = document.querySelector('#preview-heading');
const previewCopy = document.querySelector('#preview-copy');
const dialog = document.querySelector('#search-dialog');
const input = document.querySelector('#preview-search');
const results = document.querySelector('#search-results');
const spaces = {
  personal: { name: 'Personal space', icon: '✿', heading: 'Where to?', copy: 'Search the web or pick up where you left off.' },
  work: { name: 'Work space', icon: '▧', heading: 'Back to work.', copy: 'Your projects, people, and work sign-ins.' },
  play: { name: 'Play space', icon: '☼', heading: 'Off the clock.', copy: 'A separate space for everything else.' }
};
const pages = {
  'New tab': ['Where to?', 'Search the web or pick up where you left off.'],
  'Design references': ['Design references', 'A collection of things to come back to.'],
  'Weekend in Copenhagen': ['Copenhagen, saved.', 'Places to see. Things to do.'],
  'Reading list': ['Reading list', 'Pick up where you left off.'],
  Mail: ['Your inbox.', 'Your favorite places, always close by.'],
  Calendar: ['Your schedule.', 'For the things that matter to you.'],
  'Are.na': ['Connected ideas.', 'Follow one idea to the next.'],
  Notes: ['Notes & thoughts.', 'A place to start your next project.']
};
function showPage(name) {
  const page = pages[name];
  if (!page) return;
  heading.innerHTML = page[0];
  previewCopy.textContent = page[1];
  document.querySelector('#demo-url').textContent = name.toLowerCase();
  document.querySelectorAll('.tab[data-site]').forEach(tab => tab.classList.toggle('active', tab.dataset.site === name));
}
document.querySelectorAll('button[data-space]').forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.space;
  const space = spaces[key];
  browser.dataset.space = key;
  document.querySelector('#space-name').textContent = space.name;
  document.querySelector('#space-icon').textContent = space.icon;
  document.querySelector('.tiny-label').textContent = `${space.name.toUpperCase()} / ${key === 'personal' ? '01' : key === 'work' ? '02' : '03'}`;
  heading.innerHTML = space.heading;
  previewCopy.textContent = space.copy;
  document.querySelector('#demo-url').textContent = space.name.toLowerCase();
  document.querySelectorAll('button[data-space]').forEach(item => {
    const selected = item === button;
    item.classList.toggle('selected', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
}));
document.querySelectorAll('[data-site]').forEach(button => button.addEventListener('click', () => showPage(button.dataset.site)));
function renderResults() {
  const names = Object.keys(pages).filter(name => name.toLowerCase().includes(input.value.toLowerCase()));
  results.replaceChildren();
  if (!names.length) {
    const empty = document.createElement('p');
    empty.textContent = 'No matching preview tabs. Try “weekend” or “design”.';
    results.append(empty);
  }
  names.forEach(name => {
    const button = document.createElement('button');
    button.textContent = name;
    const arrow = document.createElement('span');
    arrow.textContent = '↗';
    button.append(arrow);
    button.addEventListener('click', () => { showPage(name); dialog.close(); browser.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
    results.append(button);
  });
}
document.querySelectorAll('[data-search]').forEach(button => button.addEventListener('click', () => { input.value = ''; renderResults(); dialog.showModal(); input.focus(); }));
input.addEventListener('input', renderResults);
input.addEventListener('keydown', event => {
  if (event.key === 'Enter') { event.preventDefault(); results.querySelector('button')?.click(); }
  if (event.key === 'ArrowDown') { event.preventDefault(); results.querySelector('button')?.focus(); }
});
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });

document.querySelector('#year').textContent = new Date().getFullYear();

const featureData = {
  spaces: ['Spaces', 'Work and the rest of life don’t share a session.', 'Each Space keeps its own tabs, favorites, and website sign-ins. Switch at the bottom of the sidebar.', 'Try the three Space buttons in the preview.'],
  sidebar: ['Sidebar', 'The page can have the whole window.', 'Pin the sidebar, show it on hover, or hide it. The webpage keeps its layout either way.', 'This preview tucks the sidebar away.'],
  split: ['Split view', 'Two pages, still in their tabs.', 'Drop a tab onto another to read them together. Split view is temporary; the tabs stay where you left them.', 'The right pane is a stand-in for a second page.'],
  search: ['Search', '⌘T for a tab, a page, or an address.', 'Search open tabs and type a URL from one field. The preview is illustrative — it only knows these sample pages.', 'Click search in the sidebar to try it.']
};
const featureButtons = [...document.querySelectorAll('[data-feature][role="tab"]')];
function selectFeature(button) {
  const key = button.dataset.feature;
  const data = featureData[key];
  document.querySelector('#feature-panel').dataset.feature = key;
  document.querySelector('#feature-panel').setAttribute('aria-labelledby', button.id);
  document.querySelector('#feature-label').textContent = data[0];
  document.querySelector('#feature-heading').innerHTML = data[1];
  document.querySelector('#feature-copy').textContent = data[2];
  document.querySelector('#feature-tip').textContent = data[3];
  document.querySelector('.feature-progress .current').textContent = '0' + (featureButtons.indexOf(button) + 1);
  featureButtons.forEach(item => { item.setAttribute('aria-selected', String(item === button)); item.tabIndex = item === button ? 0 : -1; });
}
featureButtons.forEach((button, index) => {
  button.addEventListener('click', () => selectFeature(button));
  button.addEventListener('keydown', event => {
    let next;
    if(event.key === 'ArrowRight') next = (index + 1) % featureButtons.length;
    if(event.key === 'ArrowLeft') next = (index - 1 + featureButtons.length) % featureButtons.length;
    if(event.key === 'Home') next = 0;
    if(event.key === 'End') next = featureButtons.length - 1;
    if(next !== undefined) { event.preventDefault(); selectFeature(featureButtons[next]); featureButtons[next].focus(); }
  });
});
