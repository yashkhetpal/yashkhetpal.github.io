/* ====================================================
   YASH KHETPAL — PORTFOLIO SCRIPT
   - Fade-in reveal on scroll
   - Animated progress bars on first view
   - Auto-update footer year
   ==================================================== */

// 1. Stamp the current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();

// 2. Tag all major content blocks for reveal animation.
//    Progressive enhancement: content is visible by default; we only hide it
//    when we know we can animate it back in (IO supported, no reduced-motion).
const revealTargets = document.querySelectorAll(
  '.about-card, .skill-card, .progress-block, .timeline-item, .project-card, .contact-card, .section-title, .section-lead, .leetcode-card-image, .leetcode-side'
);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion && 'IntersectionObserver' in window) {
  revealTargets.forEach((el) => el.classList.add('reveal'));

  // 3. Intersection observer: trigger fade-up when in view
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealTargets.forEach((el) => io.observe(el));

  // Safety net: nothing may stay invisible forever (search engine renderers,
  // link-preview bots and screenshot tools load the page but never scroll).
  setTimeout(() => {
    revealTargets.forEach((el) => el.classList.add('in'));
  }, 4000);
}

// 4. LeetCode stats card: the third-party card service is slow on cold
//    cache and a hung <img> request never retries on its own. Retry once
//    with a cache-buster; if it still fails, swap in hard-coded stats so
//    the section is never an empty box.
const leetImg = document.querySelector('.leetcode-card-image img');
if (leetImg) {
  const loaded = () => leetImg.complete && leetImg.naturalWidth > 0;

  const showFallback = () => {
    if (loaded()) return;
    const wrap = leetImg.closest('a') || leetImg.parentElement;
    wrap.innerHTML =
      '<div style="border:1px solid var(--border-soft,#22304a);border-radius:16px;' +
      'padding:32px 24px;text-align:center;">' +
      '<div style="font-size:2.2rem;font-weight:700;color:var(--accent,#2ee6a8);">290+</div>' +
      '<div style="color:inherit;opacity:0.75;margin:4px 0 14px;">problems solved on LeetCode</div>' +
      '<span style="color:var(--accent,#2ee6a8);font-weight:600;">View my profile →</span></div>';
  };

  setTimeout(() => {
    if (!loaded()) {
      leetImg.src = leetImg.src.split('&retry=')[0] + '&retry=' + Date.now();
      setTimeout(showFallback, 8000);
    }
  }, 6000);
}

// 5. Smooth scroll for any in-page anchor (some older browsers need this)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// 6. Prevent the location card link from jumping to top
const locCard = document.getElementById('locationCard');
if (locCard) {
  locCard.addEventListener('click', (e) => e.preventDefault());
}
