/* ============================================================
   TURTLE GAMES – SCROLL OBSERVERS
   ============================================================ */

// ── NAV SCROLL EFFECT ────────────────────────────────────────
(function initScrollObserver() {
  const header  = document.getElementById('site-header');
  const hero    = document.getElementById('hero');
  if (!header || !hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle('scrolled', !entry.isIntersecting);
    },
    { rootMargin: '-80px 0px 0px 0px' }
  );

  observer.observe(hero);
})();
