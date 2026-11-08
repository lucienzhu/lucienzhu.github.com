/* Progressive enhancements for native, bilingual article figures. */
(() => {
  'use strict';
  const assets = new URL('.', document.currentScript.src);
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

  article.querySelectorAll('[data-native="training"]').forEach(async figure => {
    try {
      const response = await fetch(new URL('training-history.json', assets));
      if (!response.ok) throw new Error('Training history unavailable');
      const history = await response.json();
      if (!Array.isArray(history) || history.length !== 40 || history.some((row, index) =>
        row.epoch !== index + 1 || !Number.isFinite(row.train?.loss) || !Number.isFinite(row.val?.loss)
      )) throw new Error('Invalid training history');
      const range = figure.querySelector('input[type="range"]');
      const plot = figure.querySelector('.rn-plot-inner svg');
      const line = figure.querySelector('.rn-epoch-line');
      const update = () => {
        const row = history[Number(range.value) - 1];
        figure.querySelector('#rn-epoch-value').textContent = row.epoch;
        for (const split of ['train', 'val']) {
          figure.querySelector(`[data-loss="${split}"]`).textContent = row[split].loss.toFixed(4);
        }
        const x = (row.epoch - 1) / (history.length - 1) * 800;
        line.setAttribute('x1', x);
        line.setAttribute('x2', x);
      };
      range.addEventListener('input', update);
      const inspect = event => {
        const bounds = plot.getBoundingClientRect();
        const position = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
        range.value = 1 + Math.round(position * (history.length - 1));
        update();
      };
      plot.addEventListener('pointerdown', event => {
        if (event.button !== 0) return;
        inspect(event);
        plot.setPointerCapture(event.pointerId);
      });
      plot.addEventListener('pointermove', event => {
        if (plot.hasPointerCapture(event.pointerId)) inspect(event);
      });
      figure.querySelector('.rn-controls').hidden = false;
      update();
    } catch (error) {
      // The server-rendered curve, selected checkpoint and full table remain readable.
      console.warn('Article training figure:', error.message);
    }
  });
})();
