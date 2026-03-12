/* ============================================================
   TURTLE GAMES – MAIN SCRIPT
   ============================================================ */

// ── THEME TOGGLE ────────────────────────────────────────────
(function initTheme() {
  const saved = localStorage.getItem('tg-theme') || 'dark';
  if (saved === 'light') document.body.classList.add('light-mode');
  updateThemeIcon(saved);
})();

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  icon.className = theme === 'light' ? 'bi bi-moon-stars-fill' : 'bi bi-brightness-high-fill';
}

document.getElementById('theme-btn').addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-mode');
  const theme = isLight ? 'light' : 'dark';
  localStorage.setItem('tg-theme', theme);
  updateThemeIcon(theme);
});


// ── MOBILE MENU ─────────────────────────────────────────────
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  mobileMenu.classList.toggle('open', open);
  mobileMenu.setAttribute('aria-hidden', !open);
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});


// ── SEARCH & FILTER ─────────────────────────────────────────
const searchInput   = document.getElementById('search-input');
const searchClear   = document.getElementById('search-clear');
const filterTabs    = document.querySelectorAll('.filter-tab');
const gameCards     = document.querySelectorAll('.game-card');
const noResults     = document.getElementById('no-results');
const btnReset      = document.getElementById('btn-reset');
const resultsCount  = document.getElementById('results-count');

let activeCategory = 'all';
let searchQuery    = '';

function applyFilters() {
  let visible = 0;
  const q = searchQuery.toLowerCase().trim();

  gameCards.forEach(card => {
    const cat  = card.dataset.cat;
    const name = (card.dataset.name || '').toLowerCase();

    const catMatch    = activeCategory === 'all' || cat === activeCategory;
    const searchMatch = !q || name.includes(q);

    if (catMatch && searchMatch) {
      card.classList.remove('hidden');
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  // Update count
  const total = gameCards.length;
  resultsCount.textContent = visible === total
    ? `${total} games`
    : `${visible} of ${total} games`;

  // No-results state
  if (visible === 0) {
    noResults.removeAttribute('hidden');
  } else {
    noResults.setAttribute('hidden', '');
  }
}

// Category tabs
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    activeCategory = tab.dataset.cat;
    applyFilters();
  });
});

// Search input
searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value;
  searchClear.hidden = searchQuery.length === 0;
  applyFilters();
});

// Clear button
searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchQuery = '';
  searchClear.hidden = true;
  searchInput.focus();
  applyFilters();
});

// Reset from no-results
btnReset && btnReset.addEventListener('click', () => {
  searchInput.value = '';
  searchQuery = '';
  searchClear.hidden = true;
  // Reset to All tab
  filterTabs.forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  filterTabs[0].classList.add('active');
  filterTabs[0].setAttribute('aria-selected', 'true');
  activeCategory = 'all';
  applyFilters();
});

// Footer category links
document.querySelectorAll('[data-filter-cat]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const cat = link.dataset.filterCat;

    // Activate the matching tab
    filterTabs.forEach(tab => {
      const isMatch = tab.dataset.cat === cat;
      tab.classList.toggle('active', isMatch);
      tab.setAttribute('aria-selected', isMatch);
    });
    activeCategory = cat;
    applyFilters();

    // Scroll to library
    document.getElementById('library').scrollIntoView({ behavior: 'smooth' });
  });
});

// Initialize count
applyFilters();


// ── PARTICLE CANVAS ─────────────────────────────────────────
(function initCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, pts;

  const COLORS = ['rgba(0,229,255,', 'rgba(167,139,250,', 'rgba(0,230,118,'];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;

    pts = Array.from({ length: 55 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r:  Math.random() * 1.5 + 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.strokeStyle = `rgba(0,229,255,${(1 - d / 130) * 0.12})`;
          ctx.lineWidth   = 0.8;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw dots
    pts.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.5)';
      ctx.fill();
    });

    requestAnimationFrame(frame);
  }

  resize();
  frame();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });
})();
