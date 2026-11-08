/* Progressive enhancements for native, bilingual article figures. */
(() => {
  'use strict';
  const article = document.querySelector('.royale-article');
  if (!article) return;

  // Keep figure links useful even when their technical context is folded away.
  const revealHash = () => {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = id && document.getElementById(id);
    if (!target || !article.contains(target)) return;
    let opened = false;
    for (let parent = target.parentElement; parent && parent !== article; parent = parent.parentElement) {
      if (parent.tagName === 'DETAILS' && !parent.open) {
        parent.open = true;
        opened = true;
      }
    }
    if (opened) requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  };
  revealHash();
  window.addEventListener('hashchange', revealHash);

  // Print the complete article, then restore the reader's disclosure choices.
  const printStates = new Map();
  window.addEventListener('beforeprint', () => {
    article.querySelectorAll('.royale-depth, .rn-data').forEach(details => {
      if (!printStates.has(details)) printStates.set(details, details.open);
      details.open = true;
    });
  });
  window.addEventListener('afterprint', () => {
    printStates.forEach((open, details) => { details.open = open; });
    printStates.clear();
  });

  article.querySelectorAll('[data-native="theme"]').forEach(figure => {
    const controls = figure.querySelector('.rn-controls');
    controls.hidden = false;
    controls.addEventListener('click', event => {
      const button = event.target.closest('button[data-tone]');
      if (!button) return;
      figure.dataset.tone = button.dataset.tone;
      controls.querySelectorAll('button').forEach(item => {
        item.setAttribute('aria-pressed', String(item === button));
      });
    });
  });

  article.querySelectorAll('[data-native="sharing"]').forEach(figure => {
    const controls = figure.querySelector('.rn-share-tabs');
    const panels = Array.from(figure.querySelectorAll('.rn-share-panel'));
    const select = name => {
      panels.forEach(panel => { panel.hidden = panel.dataset.share !== name; });
      controls.querySelectorAll('button').forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.share === name));
      });
    };
    const selectHash = () => {
      const panel = panels.find(item => '#' + item.id === location.hash);
      if (panel) select(panel.dataset.share);
    };
    controls.hidden = false;
    select('recap');
    selectHash();
    window.addEventListener('hashchange', selectHash);
    controls.addEventListener('click', event => {
      const button = event.target.closest('button[data-share]');
      if (button) select(button.dataset.share);
    });
  });

})();
