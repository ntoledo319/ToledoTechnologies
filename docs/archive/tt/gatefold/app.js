/* Toledo Technologies — Gatefold app logic
   Handles: unfold (button + drag), hash routing between inserts,
   page-flip transitions, refold, sessionStorage persistence,
   reduced-motion handling, sr-announcer.
*/
(function () {
  'use strict';

  const cover = document.getElementById('cover');
  const coverLeft = cover.querySelector('.cover-panel.left');
  const coverRight = cover.querySelector('.cover-panel.right');
  const unfoldBtn = document.getElementById('unfold-btn');
  const seam = document.getElementById('seam');
  const refoldBtns = document.querySelectorAll('[data-refold]');
  const announcer = document.getElementById('sr-announcer');
  const inserts = document.querySelectorAll('.insert');
  const trackLinks = document.querySelectorAll('[data-route]');

  const sessionKey = 'gatefold-open-v1';
  const root = document.documentElement;

  const announce = (msg) => {
    if (announcer) {
      announcer.textContent = '';
      setTimeout(() => (announcer.textContent = msg), 30);
    }
  };
  const isReduced = () =>
    root.dataset.motion === 'reduced' ||
    (root.dataset.motion !== 'full' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ============================================================
     UNFOLD
     ============================================================ */
  let isOpen = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragMaxAngle = 0;

  const openCover = () => {
    if (isOpen) return;
    isOpen = true;
    cover.classList.remove('dragging');
    // remove inline transforms set during drag
    coverLeft.style.transform = '';
    coverRight.style.transform = '';
    cover.classList.add('open');
    cover.setAttribute('aria-hidden', 'true');
    announce('Gatefold opened. Side A revealed.');
    try {
      sessionStorage.setItem(sessionKey, '1');
    } catch (e) {
      /* ignore */
    }
    const dur = isReduced() ? 600 : 1500;
    setTimeout(() => {
      cover.classList.add('gone');
      // focus into main content
      const main = document.getElementById('main');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus({ preventScroll: true });
      }
    }, dur);
  };

  const closeCover = () => {
    isOpen = false;
    try {
      sessionStorage.removeItem(sessionKey);
    } catch (e) {
      /* ignore */
    }
    cover.classList.remove('gone');
    requestAnimationFrame(() => cover.classList.remove('open'));
    cover.setAttribute('aria-hidden', 'false');
    window.scrollTo({ top: 0, behavior: 'instant' });
    announce('Sleeve folded. Cover restored.');
  };

  // restore session
  try {
    if (sessionStorage.getItem(sessionKey) === '1') {
      cover.classList.add('open', 'gone');
      cover.setAttribute('aria-hidden', 'true');
      isOpen = true;
    }
  } catch (e) {
    /* ignore */
  }

  unfoldBtn && unfoldBtn.addEventListener('click', openCover);
  unfoldBtn &&
    unfoldBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCover();
      }
    });
  refoldBtns.forEach((b) =>
    b.addEventListener('click', (e) => {
      e.preventDefault();
      closeCover();
    })
  );

  // global keys
  document.addEventListener('keydown', (e) => {
    if (
      !isOpen &&
      (e.key === 'Enter' || e.key === ' ') &&
      document.activeElement === document.body
    ) {
      e.preventDefault();
      openCover();
    }
    if (e.key === 'Escape' && isOpen) {
      // Esc only refolds when we're at the top
      if (window.scrollY < 4) closeCover();
    }
  });

  /* ---------- DRAG TO UNFOLD ---------- */
  if (seam) {
    const onDown = (clientX) => {
      if (isOpen || isReduced()) return;
      isDragging = true;
      dragStartX = clientX;
      dragMaxAngle = 0;
      cover.classList.add('dragging');
    };
    const onMove = (clientX) => {
      if (!isDragging) return;
      const w = window.innerWidth / 2;
      const dx = Math.max(0, Math.abs(clientX - dragStartX));
      const t = Math.min(1, dx / (w * 0.55));
      const angle = t * 115;
      dragMaxAngle = Math.max(dragMaxAngle, angle);
      coverLeft.style.transform = `rotateY(${-angle}deg)`;
      coverRight.style.transform = `rotateY(${angle}deg)`;
    };
    const onUp = () => {
      if (!isDragging) return;
      isDragging = false;
      cover.classList.remove('dragging');
      if (dragMaxAngle > 32) {
        openCover();
      } else {
        coverLeft.style.transform = '';
        coverRight.style.transform = '';
      }
    };

    seam.addEventListener('mousedown', (e) => {
      onDown(e.clientX);
      e.preventDefault();
    });
    window.addEventListener('mousemove', (e) => onMove(e.clientX));
    window.addEventListener('mouseup', onUp);

    seam.addEventListener('touchstart', (e) => onDown(e.touches[0].clientX), {
      passive: true
    });
    window.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX), {
      passive: true
    });
    window.addEventListener('touchend', onUp);
  }

  /* ============================================================
     ROUTING — hash-based insert flip
     ============================================================ */
  const defaultRoute = 'side-a';
  let currentRoute = null;

  const setRoute = (route, opts = {}) => {
    if (route === currentRoute) return;
    const target = document.getElementById(`insert-${route}`);
    if (!target) return;
    const prev = currentRoute
      ? document.getElementById(`insert-${currentRoute}`)
      : null;

    if (prev && !isReduced()) {
      prev.classList.add('exit-left');
      prev.classList.remove('active');
      // wait for transition to clear before removing exit
      setTimeout(() => {
        prev.classList.remove('exit-left');
      }, 700);
    } else if (prev) {
      prev.classList.remove('active');
    }

    // delay incoming to allow flip-out feel
    const inDelay = isReduced() ? 0 : 80;
    setTimeout(() => {
      inserts.forEach((s) => {
        if (s !== target) s.classList.remove('active');
      });
      target.classList.add('active');
      // update aria-current on track nav
      trackLinks.forEach((a) => {
        if (a.dataset.route === route) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });
      // scroll new insert into view
      if (!opts.skipScroll) window.scrollTo({ top: 0, behavior: 'instant' });
      announce(`Loaded: ${target.dataset.label || route}.`);
    }, inDelay);

    currentRoute = route;
  };

  const fromHash = () => {
    const h = (location.hash || '').replace(/^#\/?/, '').trim();
    return h || defaultRoute;
  };

  trackLinks.forEach((a) => {
    a.addEventListener('click', (e) => {
      const route = a.dataset.route;
      if (!route) return;
      e.preventDefault();
      history.pushState({ route }, '', `#/${route}`);
      setRoute(route);
    });
  });

  window.addEventListener('popstate', () =>
    setRoute(fromHash(), { skipScroll: true })
  );
  setRoute(fromHash(), { skipScroll: true });

  // Subtle parallax on cover hero (mouse) — disabled when reduced motion
  const heroes = document.querySelectorAll('.hero-art');
  if (heroes.length && !isReduced()) {
    cover.addEventListener('mousemove', (e) => {
      if (isOpen) return;
      const dx = (e.clientX / window.innerWidth - 0.5) * 14;
      const dy = (e.clientY / window.innerHeight - 0.5) * 10;
      heroes.forEach((h) => {
        h.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
      });
    });
    cover.addEventListener('mouseleave', () => {
      heroes.forEach((h) => {
        h.style.transform = '';
      });
    });
  }
})();
