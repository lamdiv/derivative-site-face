document.querySelector('#year').textContent = new Date().getFullYear();
const sceneTabs = [...document.querySelectorAll('[data-scene]')];
const captions = { search: 'Search the web, find a tab, or run a command.', appearance: 'Native controls. Five Space colors. A look that feels like you.' };
function selectScene(tab, focus = false) {
  for (const item of sceneTabs) {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  }
  document.querySelector('#scene-caption').textContent = captions[tab.dataset.scene];
  if (focus) tab.focus();
}
sceneTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectScene(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % sceneTabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + sceneTabs.length) % sceneTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = sceneTabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectScene(sceneTabs[next], true); }
  });
});
// These values come directly from the native browser's SpacePalette.
const palettes = {
  sky: ['#85a9cf', '#f0f3f8', '#d1dfef', '#315b83'],
  lilac: ['#aa8fcb', '#f4f1f8', '#ddd3ed', '#71528f'],
  mint: ['#79b49e', '#f0f4f1', '#d0e5dd', '#396d59'],
  peach: ['#ce9e82', '#f8f3ef', '#efd8c9', '#87573d'],
  rose: ['#c98fa9', '#f7f0f3', '#e9cedb', '#8c4f6b']
};
const swatches = [...document.querySelectorAll('[data-color]')];
swatches.forEach(button => button.addEventListener('click', () => {
  const preview = document.querySelector('.space-preview');
  ['--accent', '--tint', '--sidebar', '--action'].forEach((property, i) => preview.style.setProperty(property, palettes[button.dataset.color][i]));
  swatches.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('.color-name').textContent = button.getAttribute('aria-label');
  document.querySelector('#preview-color-name').textContent = button.getAttribute('aria-label');
}));
