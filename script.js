/* ====================================================
   YASH KHETPAL — PORTFOLIO SCRIPT
   - Fade-in reveal on scroll
   - Animated progress bars on first view
   - Auto-update footer year
   ==================================================== */

// 1. Stamp the current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();

// 2. Tag all major content blocks for reveal animation
const revealTargets = document.querySelectorAll(
  '.about-card, .skill-card, .progress-block, .timeline-item, .project-card, .contact-card, .section-title, .section-lead'
);
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

// 4. Animate progress bars only when the block is visible
const bars = document.querySelectorAll('.bar-fill');
const initialWidths = Array.from(bars).map((b) => b.style.width);
bars.forEach((b) => (b.style.width = '0%'));

const progressBlock = document.querySelector('.progress-block');
if (progressBlock) {
  const barObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          bars.forEach((b, i) => {
            setTimeout(() => (b.style.width = initialWidths[i]), i * 120);
          });
          barObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  barObs.observe(progressBlock);
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
