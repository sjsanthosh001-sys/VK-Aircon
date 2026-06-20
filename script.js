/* ═══════════════════════════════════════
   VK AIR CONDITIONER — PREMIUM WARM THEME
   Ember Canvas · Cursor · All Interactions
═══════════════════════════════════════ */

/* ── EMBER CANVAS ── */
const cvs = document.getElementById('ember-canvas');
const ctx = cvs.getContext('2d');
let W, H;

function resizeCanvas() {
  W = cvs.width = window.innerWidth;
  H = cvs.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const COLORS = [
  'rgba(201,162,39,', 'rgba(232,200,74,',
  'rgba(155,50,30,',  'rgba(240,180,60,',
  'rgba(255,220,100,','rgba(180,100,30,'
];
const EMBERS = Array.from({ length: 130 }, () => ({
  x: Math.random() * 9999,
  y: Math.random() * 9999,
  r: Math.random() * 1.8 + 0.3,
  vy: -(Math.random() * 0.38 + 0.08),
  vx: (Math.random() - 0.5) * 0.14,
  a: Math.random(),
  da: (Math.random() - 0.5) * 0.006,
  c: COLORS[Math.floor(Math.random() * COLORS.length)]
}));

function drawEmbers() {
  ctx.clearRect(0, 0, W, H);
  EMBERS.forEach(e => {
    e.y += e.vy; e.x += e.vx; e.a += e.da;
    if (e.a <= 0 || e.a >= 1) e.da *= -1;
    const px = ((e.x % W) + W) % W;
    const py = ((e.y % H) + H) % H;
    ctx.beginPath();
    ctx.arc(px, py, e.r, 0, Math.PI * 2);
    ctx.fillStyle = e.c + Math.max(0, Math.min(1, e.a)) + ')';
    ctx.fill();
    if (e.r > 1.1) {
      ctx.beginPath();
      ctx.arc(px, py, e.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = e.c + (e.a * 0.07) + ')';
      ctx.fill();
    }
  });
  requestAnimationFrame(drawEmbers);
}
drawEmbers();

/* ── CUSTOM CURSOR ── */
const ring = document.getElementById('cur-ring');
const dot  = document.getElementById('cur-dot');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animateCursor() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  dot.style.left  = mx + 'px'; dot.style.top  = my + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

const hoverTargets = 'a, button, .svc-row, .why-card, .price-card, .rev-card, .an-box, .ci, .chip-area, .process-step';
document.querySelectorAll(hoverTargets).forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(2)';
    ring.style.borderColor = 'rgba(201,162,39,0.75)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.borderColor = 'rgba(201,162,39,0.55)';
  });
});

/* ── NAVBAR SHRINK ON SCROLL ── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(10,2,2,0.97)';
    nav.style.padding    = '0.5rem 5%';
  } else {
    nav.style.background = 'rgba(14,4,4,0.82)';
    nav.style.padding    = '0.8rem 5%';
  }
});

/* ── MOBILE NAV ── */
function openNav() {
  document.getElementById('mNav').classList.add('open');
  document.getElementById('mOverlay').classList.add('open');
}
function closeNav() {
  document.getElementById('mNav').classList.remove('open');
  document.getElementById('mOverlay').classList.remove('open');
}

/* ── SCROLL REVEAL (IntersectionObserver) ── */
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el  = en.target;
    const cls = el.classList[0];
    const sib = Array.from(el.parentElement.children).filter(c => c.classList.contains(cls));
    const idx = sib.indexOf(el);
    setTimeout(() => el.classList.add('vis'), idx * 100);
    revealIO.unobserve(el);
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.why-card, .process-step, .price-card, .rev-card, .svc-row, .an-box'
).forEach(el => revealIO.observe(el));

/* ── HERO STAT COUNTERS ── */
const counterIO = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.querySelectorAll('[data-count]').forEach(el => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.sfx || '';
      let current  = 0;
      const step   = target / 55;
      const timer  = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current) + suffix;
      }, 22);
    });
    counterIO.unobserve(en.target);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(el => counterIO.observe(el));

/* ── FAQ ACCORDION ── */
function toggleFaq(btn) {
  const item   = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ── BOOKING MODAL ── */
function openModal() {
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}
function closeModalOut(e) {
  if (e.target === document.getElementById('modal')) closeModal();
}

function confirmBook() {
  const name  = document.getElementById('m-name')?.value?.trim();
  const phone = document.getElementById('m-phone')?.value?.trim();
  const svc   = document.getElementById('m-svc')?.value;
  if (!name || !phone || !svc) {
    showToast('Please fill Name, Phone and Service', true);
    return;
  }
  closeModal();
  showToast('Booking confirmed for ' + name + '! We will call you shortly.');
}

/* ── CONTACT FORM ── */
function submitContact() {
  const name  = document.getElementById('cf-name')?.value?.trim();
  const phone = document.getElementById('cf-phone')?.value?.trim();
  if (!name || !phone) {
    showToast('Please fill Name and Phone number', true);
    return;
  }
  showToast('Message sent! We will contact ' + name + ' soon.');
  ['cf-name','cf-phone','cf-email','cf-service','cf-message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

/* ── TOAST NOTIFICATION ── */
function showToast(msg, isError) {
  const t  = document.getElementById('toast');
  const tx = document.getElementById('toastTxt');
  if (!t || !tx) return;
  tx.textContent = msg;
  t.style.borderColor = isError
    ? 'rgba(239,68,68,0.4)'
    : 'rgba(201,162,39,0.35)';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4200);
}

/* ── KEYBOARD ESC CLOSES MODAL ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
