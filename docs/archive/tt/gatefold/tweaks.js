/* Tweaks panel — toolbar-driven, persists via __edit_mode_set_keys */
(function () {
  'use strict';
  const root = document.documentElement;
  const launcher = document.getElementById('tweaks-launcher');
  const panel = document.getElementById('tweaks-panel');
  const closeBtn = document.getElementById('tweaks-close');

  // defaults are sourced from the inline EDITMODE block
  const block = document.getElementById('editmode-defaults');
  let defaults = {
    grain: 7,
    hingeMs: 1400,
    heroWarmth: 1.0,
    typeset: 'lyric',
    motion: 'auto'
  };
  try {
    defaults = Object.assign(defaults, JSON.parse(block.textContent));
  } catch (e) {
    /* ignore */
  }

  const state = Object.assign({}, defaults);

  const apply = () => {
    root.style.setProperty('--grain', (state.grain / 100).toString());
    root.style.setProperty('--hinge-duration', `${state.hingeMs}ms`);
    root.style.setProperty('--hero-warmth', state.heroWarmth.toString());
    root.dataset.typeset = state.typeset;
    root.dataset.motion = state.motion;
    // update labels
    document.querySelectorAll('[data-tweak-out]').forEach((el) => {
      const k = el.dataset.tweakOut;
      if (k in state) {
        let v = state[k];
        if (k === 'hingeMs') v = `${v}ms`;
        if (k === 'grain') v = `${v}%`;
        if (k === 'heroWarmth') v = (+v).toFixed(2);
        el.textContent = v;
      }
    });
  };

  const persist = (edits) => {
    try {
      window.parent &&
        window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    } catch (e) {
      /* ignore */
    }
  };

  const setKey = (k, v) => {
    state[k] = v;
    apply();
    persist({ [k]: v });
  };

  // Hook ranges
  document
    .querySelectorAll('input[type=range][data-tweak]')
    .forEach((input) => {
      const k = input.dataset.tweak;
      input.value = state[k];
      input.addEventListener('input', () => setKey(k, +input.value));
    });

  // Hook segmented buttons
  document.querySelectorAll('[data-tweak-seg]').forEach((seg) => {
    const k = seg.dataset.tweakSeg;
    const buttons = seg.querySelectorAll('button[data-value]');
    const sync = () =>
      buttons.forEach((b) =>
        b.setAttribute('aria-pressed', String(b.dataset.value === state[k]))
      );
    buttons.forEach((b) =>
      b.addEventListener('click', () => {
        setKey(k, b.dataset.value);
        sync();
      })
    );
    sync();
  });

  // edit-mode protocol
  window.addEventListener('message', (e) => {
    const data = e.data || {};
    if (data.type === '__activate_edit_mode') {
      launcher.classList.add('visible');
      panel.classList.add('open');
    } else if (data.type === '__deactivate_edit_mode') {
      launcher.classList.remove('visible');
      panel.classList.remove('open');
    }
  });

  try {
    window.parent &&
      window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  } catch (e) {
    /* ignore */
  }

  launcher &&
    launcher.addEventListener('click', () => panel.classList.toggle('open'));
  closeBtn &&
    closeBtn.addEventListener('click', () => {
      panel.classList.remove('open');
      launcher.classList.remove('visible');
      try {
        window.parent &&
          window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
      } catch (e) {
        /* ignore */
      }
    });

  apply();
})();
