/* main.js - Portfolio interactivity (full) */

/* ── Resume map per role ─────────────────────────── */
const resumeMap = {
  all: '/PaarthKatole_Resume.pdf',
  ds:  '/PaarthKatole_Resume.pdf',
  da:  '/PaarthKatole_Resume DA.pdf',
  pa:  '/PaarthKatole_Resume Product.pdf',
  pm:  '/PaarthKatole_Resume Product.pdf',
};

/* ── Hero role label per selection ──────────────── */
const roleLabel = {
  all: 'Data Scientist & Product Analyst',
  ds:  'Data Scientist',
  da:  'Data Analyst',
  pa:  'Product Analyst',
  pm:  'Product Manager',
};

/* ── Role value blurb (hero sub-tagline) ─────────── */
const roleBlurb = {
  all: "I combine research-grade statistical thinking with an engineer's pragmatism - turning raw, messy data into decisions that ship.",
  ds:  "I build end-to-end ML pipelines and experimentation frameworks that turn raw, high-volume data into production-ready models and actionable intelligence.",
  da:  "I translate complex datasets into clear, executive-ready insights - through SQL, visualisation, and rigorous analysis that drives operational decisions.",
  pa:  "I bridge data and product - defining metrics, running experiments, and surfacing the behavioural signals that tell teams what to build next.",
  pm:  "I bring a data-first lens to product strategy - from discovery and metric definition to experiment design and stakeholder-ready storytelling.",
};

/* ── Top skills banner copy per role ─────────────── */
const topSkillsCopy = {
  all: null,
  ds:  '⭐ Top skills for Data Science: Python · scikit-learn · SQL · Statistical Modeling · A/B Testing · ETL Pipelines · LangGraph',
  da:  '⭐ Top skills for Data Analyst: SQL · Tableau · Power BI · Snowflake · Python · ETL / ELT Pipelines · Excel',
  pa:  '⭐ Top skills for Product Analyst: SQL · Tableau · A/B Testing · Causal Inference · Product Metrics · Data Storytelling',
  pm:  '⭐ Top skills for PM: Product Strategy · Stakeholder Management · A/B Testing · Roadmap Planning · Product Metrics · Data Storytelling',
};

/* ── Contact form placeholder per role ───────────── */
const contactHint = {
  all: 'Your message…',
  ds:  'Tell me about the Data Science role or project…',
  da:  'Tell me about the Data Analyst opportunity…',
  pa:  'Tell me about the Product Analyst role…',
  pm:  'Tell me about the PM position or what you\'re building…',
};

/* ── Radar chart data per role ───────────────────── */
const radarData = {
  labels: ['ML / AI', 'SQL & Data Eng', 'Visualisation', 'Experimentation', 'Product Thinking', 'Communication'],
  datasets: {
    all: [85, 80, 72, 78, 70, 80],
    ds:  [95, 80, 65, 82, 60, 72],
    da:  [65, 92, 88, 80, 65, 82],
    pa:  [60, 82, 90, 88, 85, 88],
    pm:  [50, 65, 78, 85, 95, 92],
  }
};

/* ── Loading screen ──────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1600);

  /* ── Visitor counter (CountAPI) ───────────────────── */
  const countEl = document.getElementById('visit-count');
  if (countEl) {
    fetch('https://api.countapi.xyz/hit/pkatole24.github.io/visits')
      .then(r => r.json())
      .then(data => { countEl.textContent = data.value.toLocaleString(); })
      .catch(() => { countEl.textContent = '--'; });
  }
});

/* ── DOM ready ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* Year in footer */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── Scroll progress bar ──────────────────────── */
  const scrollBar = document.getElementById('scroll-bar');
  window.addEventListener('scroll', () => {
    if (!scrollBar) return;
    const doc  = document.documentElement;
    const pct  = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
    scrollBar.style.width = pct + '%';
  }, { passive: true });

  /* ── Dark / Light toggle ──────────────────────── */
  const themeBtn = document.getElementById('theme-toggle');
  let isLight = false;
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      isLight = !isLight;
      document.body.classList.toggle('light', isLight);
      themeBtn.textContent = isLight ? '🌙' : '☀️';
      if (radarChart) {
        radarChart.data.datasets[0].borderColor     = isLight ? '#7c6fff' : '#a594ff';
        radarChart.data.datasets[0].backgroundColor = isLight ? 'rgba(124,111,255,.15)' : 'rgba(165,148,255,.12)';
        radarChart.update();
      }
    });
  }

  /* ── Tableau Lightbox ─────────────────────────── */
  const lightbox  = document.getElementById('lightbox');
  const lbFrame   = document.getElementById('lb-frame');
  const lbClose   = document.getElementById('lb-close');
  document.querySelectorAll('[data-lightbox]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (lbFrame) lbFrame.src = btn.dataset.lightbox;
      if (lightbox) lightbox.classList.add('open');
    });
  });
  if (lbClose)  lbClose.addEventListener('click', () => { lightbox.classList.remove('open'); if (lbFrame) lbFrame.src = ''; });
  if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) { lightbox.classList.remove('open'); if (lbFrame) lbFrame.src = ''; } });

  /* ── Radar Chart ──────────────────────────────── */
  let radarChart = null;
  const radarCanvas = document.getElementById('skillRadar');
  if (radarCanvas && typeof Chart !== 'undefined') {
    radarChart = new Chart(radarCanvas, {
      type: 'radar',
      data: {
        labels: radarData.labels,
        datasets: [{
          label: 'Skills',
          data: radarData.datasets.all,
          fill: true,
          backgroundColor: 'rgba(124,111,255,.12)',
          borderColor: '#7c6fff',
          pointBackgroundColor: '#7c6fff',
          pointRadius: 4,
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        animation: { duration: 600, easing: 'easeInOutQuart' },
        scales: {
          r: {
            min: 0, max: 100,
            ticks: { display: false, stepSize: 20 },
            grid:  { color: 'rgba(255,255,255,.08)' },
            pointLabels: {
              color: '#888', font: { size: 11, family: 'Inter' }
            }
          }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  /* ── Role switching ───────────────────────────── */
  let currentRole = 'all';
  const pills      = document.querySelectorAll('.role-pill');
  const projects   = document.querySelectorAll('.project-card');
  const skillPills = document.querySelectorAll('.skill-pill');
  const banner     = document.getElementById('role-skills-banner');
  const bannerText = document.getElementById('role-skills-text');
  const heroRole   = document.getElementById('hero-role');
  const roleBlurbEl= document.getElementById('role-blurb');
  const resumeBtn  = document.getElementById('resume-btn');
  const resumeCta  = document.getElementById('resume-cta');
  const noResults  = document.getElementById('no-results');
  const msgTA      = document.getElementById('contact-message');

  function applyRole(role) {
    currentRole = role;

    /* pills */
    pills.forEach(p => p.classList.toggle('active', p.dataset.role === role));

    /* filter projects */
    let visible = 0;
    projects.forEach(card => {
      const roles = card.dataset.roles.split(' ');
      const show  = role === 'all' || roles.includes(role);
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    if (noResults) noResults.classList.toggle('visible', visible === 0);

    /* highlight skills */
    skillPills.forEach(pill => {
      const pr = pill.dataset.roles.split(' ');
      pill.classList.toggle('highlighted', role !== 'all' && pr.includes(role));
    });

    /* banner */
    const copy = topSkillsCopy[role];
    if (banner && bannerText) {
      banner.style.display = copy ? 'block' : 'none';
      bannerText.textContent = copy || '';
    }

    /* hero text */
    if (heroRole)    heroRole.textContent    = roleLabel[role] || roleLabel.all;
    if (roleBlurbEl) roleBlurbEl.textContent = roleBlurb[role] || roleBlurb.all;

    /* resume links */
    const href = resumeMap[role] || resumeMap.all;
    if (resumeBtn) resumeBtn.href = href;
    if (resumeCta) resumeCta.href = href;

    /* contact form hint */
    if (msgTA) msgTA.placeholder = contactHint[role] || contactHint.all;

    /* radar chart */
    if (radarChart) {
      radarChart.data.datasets[0].data = radarData.datasets[role] || radarData.datasets.all;
      radarChart.update();
    }
  }

  /* Attach pill listeners */
  pills.forEach(pill => pill.addEventListener('click', () => applyRole(pill.dataset.role)));

  /* Initialise */
  applyRole('all');

  /* ── Smooth scroll ────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ── Scroll entrance animations ───────────────── */
  if ('IntersectionObserver' in window) {
    const els = document.querySelectorAll('.project-card, .exp-card, .edu-card, .skill-group, .lead-card, .building-banner');
    const io  = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      io.observe(el);
    });
  }

});
