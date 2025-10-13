/* bigbrandcity.js
   Full-feature script: menu, lazy loading, features, testimonials, team, services,
   contact form storage, footer dates, etc.
*/

// --------- Helpers ---------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// --------- NAV TOGGLE & Hide Current Page ---------- 
function initNavToggleAndPrune() {
  const toggle = $('#navToggle');
  const navList = $('#navList');
  if (!navList) return;

  // Remove link to the current page
  navList.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && location.pathname.endsWith(href)) {
      a.parentElement.remove();
    }
  });

  // Toggle menu for mobile
  if (toggle) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('open');
    });
  }
}

// --------- Lazy Loading Images ----------
function initLazyLoading() {
  const lazyImgs = $$('img.lazy');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          if (src) img.src = src;
          img.classList.remove('lazy');
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '100px 0px' });
    lazyImgs.forEach(img => observer.observe(img));
  } else {
    // fallback
    lazyImgs.forEach(img => {
      const src = img.dataset.src;
      if (src) img.src = src;
      img.classList.remove('lazy');
    });
  }
}

// --------- Footer: Year & Last Modified ----------
function setFooterDates() {
  const yearEls = $$('#currentYear, #currentYearFooter, #currentYearServices, #currentYearContact, #currentYearSitePlan');
  yearEls.forEach(el => {
    if (el) el.textContent = new Date().getFullYear();
  });
  const lastEls = $$('#lastModified, #lastModifiedFooter, #lastModifiedServices, #lastModifiedContact, #lastModifiedSitePlan');
  lastEls.forEach(el => {
    if (el) el.textContent = `Last Modified: ${document.lastModified}`;
  });
}

// --------- Features (Home) ----------
function renderFeatures() {
  const features = [
    { id: 1, icon: '🔷', title: 'Brand Identity', desc: 'Logo, colors, and brand guidelines made to last.' },
    { id: 2, icon: '💻', title: 'Website Design', desc: 'Responsive, performant websites tailored to your business.' },
    { id: 3, icon: '📣', title: 'Marketing Materials', desc: 'Brochures, social graphics & ad creative that convert.' }
  ];
  const container = $('#features');
  if (!container) return;

  container.innerHTML = features.map(f => `
    <article class="features-card" data-id="${f.id}">
      <h3>${f.icon} ${f.title}</h3> <!-- Add the icon here -->
      <p>${f.desc}</p>
    </article>
  `).join('');
}

// --------- Testimonials (Home) ----------
function renderTestimonials() {
  const testimonials = [
    { client: 'Green Cafe', quote: 'Their rebrand tripled our foot traffic.' },
    { client: 'Apex Tutors', quote: 'Bookings increased by 50% after the site revamp.' },
    { client: 'Heron Clinic', quote: 'Patients commented on how modern and trustworthy the site feels.' }
  ];
  const container = $('#testimonials');
  if (!container) return;

  container.innerHTML = testimonials.map(t => `
    <div class="testimonial">
      <p>"${t.quote}"</p>
      <p><strong>- ${t.client}</strong></p>
    </div>
  `).join('');

  let idx = 0;
  const slides = Array.from(container.children);
  const show = (i) => {
    slides.forEach((s, j) => s.style.display = (j === i ? 'block' : 'none'));
  };
  if (slides.length) {
    show(idx);
    setInterval(() => {
      idx = (idx + 1) % slides.length;
      show(idx);
    }, 5000);
  }
}

// --------- Team Section (About) ----------
function renderTeam() {
  const team = [
    { name: 'Buchi Vitalis', role: 'Lead Designer', img: 'images/team-buchi.webp' },
    { name: 'Ada Okoro', role: 'Developer', img: 'images/team-ada.webp' },
    { name: 'Tunde Nwosu', role: 'Project Manager', img: 'images/team-tunde.webp' }
  ];
  const teamSection = document.getElementById('teamList') || document.getElementById('team-section');
  if (!teamSection) return;

  teamSection.innerHTML = team.map(m => `
    <div class="features-card team-member">
      <img class="lazy" data-src="${m.img}" alt="${m.name}" loading="lazy">
      <h3>${m.name}</h3>
      <p>${m.role}</p>
    </div>
  `).join('');

  // re-init lazy loading to observe new images
  if (typeof initLazyLoading === 'function') {
    initLazyLoading();
  } else {
    teamSection.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      img.classList.remove('lazy');
    });
  }
}

// Function to format number with commas
function formatPrice(price) {
  return price.toLocaleString(); // Formats the price with commas (e.g., 200000 -> 200,000)
}

// --------- Services Page (filtering & quotes) ----------
function renderServices() {
  const services = [
    { id: 'web-basic', title: 'Starter Website', category: 'web', price: 200000, desc: '3 pages, responsive, basic SEO.' },
    { id: 'web-plus', title: 'Business Website', category: 'web', price: 500000, desc: 'Up to 10 pages, CMS, analytics.' },
    { id: 'brand-core', title: 'Brand Core', category: 'graphics', price: 300000, desc: 'Logo, palette and usage guide.' },
    { id: 'brand-full', title: 'Full Brand', category: 'graphics', price: 600000, desc: 'Complete identity, assets, stationery.' },
    { id: 'strategy', title: 'Digital Strategy', category: 'strategy', price: 400000, desc: 'Audience research, launch plan.' }
  ];
  const container = $('#servicesList');
  if (!container) return;

  const build = (arr) => arr.map(s => `
    <article class="features-card service-card" data-cat="${s.category}">
      <h3>${s.title}</h3>
      <p><strong>From NGN ${formatPrice(s.price)}</strong></p> <!-- Format price here -->
      <p>${s.desc}</p>
      <button class="btn request-quote" data-id="${s.id}">Request quote</button>
    </article>
  `).join('');

  container.innerHTML = build(services);

  const attachQuote = () => {
    $$('.request-quote').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.currentTarget.dataset.id;
        const found = services.find(s => s.id === id);
        if (found) {
          localStorage.setItem('lastRequestedService', JSON.stringify(found));
          alert(`Quote request saved locally for: ${found.title}`);
        }
      });
    });
  };
  attachQuote();

  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      const filtered = filter === 'all' ? services : services.filter(s => s.category === filter);
      container.innerHTML = build(filtered);
      attachQuote();
    });
  });
}

// --------- Contact Form Handling with localStorage ----------
function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;

  const nameEl = form.querySelector('input[name="name"]');
  const emailEl = form.querySelector('input[name="email"]');
  const messageEl = form.querySelector('textarea[name="message"]');
  const statusEl = $('#formStatus');
  const clearBtn = $('#clearLocal');
  const submissionsList = $('#submissionsList');

  const loadSubmissions = () => {
    return JSON.parse(localStorage.getItem('submissions') || '[]');
  };

  const saveSubmissions = (arr) => {
    localStorage.setItem('submissions', JSON.stringify(arr));
  };

  const renderSubmissions = () => {
    const subs = loadSubmissions();
    if (!submissionsList) return;
    if (subs.length === 0) {
      submissionsList.innerHTML = `<p>No submissions saved yet.</p>`;
    } else {
      submissionsList.innerHTML = subs.map(s => `
        <div class="features-card submission">
          <p><strong>${s.name}</strong> <span>${new Date(s.submittedAt).toLocaleString()}</span></p>
          <p>${s.message}</p>
          <p><em>${s.email}</em></p>
        </div>
      `).join('');
    }
  };

  const draftJSON = localStorage.getItem('contactDraft');
  if (draftJSON) {
    try {
      const d = JSON.parse(draftJSON);
      if (d.name) nameEl.value = d.name;
      if (d.email) emailEl.value = d.email;
      if (d.message) messageEl.value = d.message;
      if (statusEl) statusEl.textContent = 'Loaded saved draft from your browser.';
    } catch (err) {
      console.warn('Draft parse error:', err);
    }
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = messageEl.value.trim();
    if (!name || !email || !message) {
      if (statusEl) {
        statusEl.textContent = 'Please complete all fields before submitting.';
        statusEl.style.color = 'crimson';
      }
      return;
    }
    const subs = loadSubmissions();
    const entry = { id: Date.now(), name, email, message, submittedAt: new Date().toISOString() };
    subs.push(entry);
    saveSubmissions(subs);
    localStorage.removeItem('contactDraft');
    if (statusEl) {
      statusEl.style.color = '';
      statusEl.innerHTML = `<strong>Thanks, ${name}!</strong> Message saved locally.`;
    }
    form.reset();
    renderSubmissions();
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      localStorage.removeItem('submissions');
      localStorage.removeItem('contactDraft');
      renderSubmissions();
      if (statusEl) statusEl.textContent = 'Local submissions cleared.';
    });
  }

  [nameEl, emailEl, messageEl].forEach(el => {
    if (el) {
      el.addEventListener('input', () => {
        const draft = {
          name: nameEl.value.trim(),
          email: emailEl.value.trim(),
          message: messageEl.value.trim(),
          savedAt: new Date().toISOString()
        };
        localStorage.setItem('contactDraft', JSON.stringify(draft));
      });
    }
  });

  renderSubmissions();
}

// --------- Reveal Fact (Restored Feature) ----------
function initRevealFact() {
  // match either ID set: revealFactBtn/factOutput or revealFact/funFactText
  const btn = document.getElementById('revealFactBtn') || document.getElementById('revealFact');
  const output = document.getElementById('factOutput') || document.getElementById('funFactText');
  if (!btn || !output) return;

  const facts = [
    'We’ve completed over 120 branding projects since 2019.',
    'Our average client rating is 4.9 stars.',
    'BigBrandCity started as a one-person design studio.',
    'We serve clients in 5 different countries.'
  ];

  btn.addEventListener('click', () => {
    const idx = Math.floor(Math.random() * facts.length);
    output.textContent = facts[idx];
    localStorage.setItem('lastFact', facts[idx]);
  });

  const last = localStorage.getItem('lastFact');
  if (last) output.textContent = last;
}

// --------- Highlight the active nav link ----------
function highlightActiveLink() {
  $$('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && location.pathname.endsWith(href)) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

// --------- Initialization (DOMContentLoaded) ----------
function initSite() {
  initNavToggleAndPrune();
  initLazyLoading();
  setFooterDates();
  renderFeatures();
  renderTestimonials();
  renderTeam();
  renderServices();
  initContactForm();
  highlightActiveLink();
  initRevealFact(); // restored call
}

// Run initSite when ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSite);
} else {
  initSite();
}
