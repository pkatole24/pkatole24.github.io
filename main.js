/* main.js — Portfolio interactivity */

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

/* ── Top skills highlight copy per role ─────────── */
const topSkillsCopy = {
  all: null,
  ds:  '⭐ Top skills for Data Science: Python · scikit-learn · SQL · Statistical Modeling · A/B Testing · ETL Pipelines',
  da:  '⭐ Top skills for Data Analyst: SQL · Tableau · Power BI · Snowflake · Python · ETL / ELT Pipelines · Excel',
  pa:  '⭐ Top skills for Product Analyst: SQL · Tableau · A/B Testing · Causal Inference · Product Metrics · Data Storytelling',
  pm:  '⭐ Top skills for PM: Product Strategy · Stakeholder Management · A/B Testing · Roadmap Planning · Product Metrics · Data Storytelling',
};

/* ── Loading screen ──────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1600);
});

/* ── DOM ready ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* Year in footer */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── Role switching ─────────────────────────────── */
  let currentRole = 'all';

  const pills      = document.querySelectorAll('.role-pill');
  const projects   = document.querySelectorAll('.project-card');
  const skillPills = document.querySelectorAll('.skill-pill');
  const banner     = document.getElementById('role-skills-banner');
  const bannerText = document.getElementById('role-skills-text');
  const heroRole   = document.getElementById('hero-role');
  const resumeBtn  = document.getElementById('resume-btn');
  const resumeCta  = document.getElementById('resume-cta');
  const noResults  = document.getElementById('no-results');

  function applyRole(role) {
    currentRole = role;

    /* --- pills active state --- */
    pills.forEach(p => p.classList.toggle('active', p.dataset.role === role));

    /* --- filter project cards --- */
    let visible = 0;
    projects.forEach(card => {
      const roles = card.dataset.roles.split(' ');
      const show  = role === 'all' || roles.includes(role);
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    if (noResults) noResults.classList.toggle('visible', visible === 0);

    /* --- highlight skills --- */
    skillPills.forEach(pill => {
      const pr = pill.dataset.roles.split(' ');
      pill.classList.toggle('highlighted', role !== 'all' && pr.includes(role));
    });

    /* --- banner --- */
    const copy = topSkillsCopy[role];
    if (banner && bannerText) {
      banner.style.display = copy ? 'block' : 'none';
      bannerText.textContent = copy || '';
    }

    /* --- hero role label --- */
    if (heroRole) heroRole.textContent = roleLabel[role] || roleLabel.all;

    /* --- resume links --- */
    const href = resumeMap[role] || resumeMap.all;
    if (resumeBtn) resumeBtn.href = href;
    if (resumeCta) resumeCta.href = href;
  }

  /* Attach pill listeners */
  pills.forEach(pill => {
    pill.addEventListener('click', () => applyRole(pill.dataset.role));
  });

  /* Initialise */
  applyRole('all');

  /* ── Smooth scroll for nav links ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Subtle card entrance animation on scroll ─── */
  if ('IntersectionObserver' in window) {
    const cards = document.querySelectorAll('.project-card, .exp-card, .edu-card, .skill-group');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      card.style.transition = 'opacity .5s ease, transform .5s ease';
      io.observe(card);
    });
  }

});
