/* Progressive enhancements for native, bilingual article figures. */
(() => {
  'use strict';
  const article = document.querySelector('.royale-article');
  if (!article) return;

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
