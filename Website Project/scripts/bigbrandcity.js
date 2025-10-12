/* scripts/bigbrandcity.js
   Central JS:
   - multiple functions
   - DOM selection & manipulation
   - conditional branching
   - objects, arrays, array methods
   - template literals exclusively for building strings
   - localStorage usage
*/

// short helpers
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

// NAV: remove current page from the nav, and enable toggle on mobile
function initNav() {
  const navList = $('#navList');
  const toggle = $('#navToggle');
  if (!navList) return;

  // remove current page's nav link (so current page is not shown)
  const links = Array.from(navList.querySelectorAll('a'));
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href && location.pathname.endsWith(href)) {
      a.parentElement.remove();
    }
  });

  if (toggle) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('open');
    });
  }
}

// Lazy load images using IntersectionObserver with fallback
function initLazyLoading() {
  const imgs = $$('img.lazy, img[data-src]');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          if (src) img.src = src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '100px 0px' });
    imgs.forEach(img => obs.observe(img));
  } else {
    imgs.forEach(img => {
      const src = img.dataset.src;
      if (src) img.src = src;
      img.classList.remove('lazy');
    });
  }
}

// Footer dates (current year and last modified)
function setFooterDates() {
  const yearEls = $$('#currentYear, #currentYearFooter, #currentYearServices, #currentYearContact, #currentYearSitePlan');
  yearEls.forEach(el => { if (el) el.textContent = new Date().getFullYear(); });

  const lastEls = $$('#lastModified, #lastModifiedFooter, #lastModifiedServices, #lastModifiedContact, #lastModifiedSitePlan');
  lastEls.forEach(el => { if (el) el.textContent = `Last Modified: ${document.lastModified}`; });
}

// Render features on home page using an array of objects
function renderFeatures() {
  const features = [
    { id: 1, icon: '🔷', title: 'Brand identity', desc: 'Logo, colour palette and usage guidelines.' },
    { id: 2, icon: '💻', title: 'Website design', desc: 'Fast, responsive sites tailored to your audience.' },
    { id: 3, icon: '📣', title: 'Marketing materials', desc: 'Brochures, socials and ad creatives that convert.' }
  ];

  const container = $('#features');
  if (!container) return;

  // map -> template literals for output
  container.innerHTML = features.map(f => {
    return `
      <article class="features-card" data-id="${f.id}">
        <h3>${f.icon} ${f.title}</h3>
        <p>${f.desc}</p>
      </article>
    `;
  }).join('');
}

// Testimonials (simple slider)
function renderTestimonials() {
  const testimonials = [
    { client: 'The Green Cafe', text: 'We saw a 40% lift in walk-ins after their rebrand.' },
    { client: 'Apex Tutors', text: 'Bookings are easier now and our site loads quickly.' },
    { client: 'Heron Clinic', text: 'Patients tell us the site feels trustworthy and clear.' }
  ];

  const container = $('#testimonials');
  if (!container) return;

  container.innerHTML = testimonials.map(t => {
    return `
      <div class="testimonial">
        <p>"${t.text}"</p>
        <p><strong>- ${t.client}</strong></p>
      </div>
    `;
  }).join('');

  // rotate testimonials
  let index = 0;
  const slides = Array.from(container.children);
  if (!slides.length) return;
  const show = (i) => slides.forEach((s, idx) => s.style.display = idx === i ? 'block' : 'none');
  show(index);
  setInterval(() => { index = (index + 1) % slides.length; show(index); }, 5000);
}

// Team render for about page
function renderTeam() {
  const team = [
    { name: 'Buchi Vitalis', role: 'Founder & Lead Designer', img: 'images/team-buchi.webp' },
    { name: 'Ada Okoro', role: 'Developer', img: 'images/team-ada.webp' },
    { name: 'Tunde Nwosu', role: 'Project Manager', img: 'images/team-tunde.webp' }
  ];

  const container = $('#teamList');
  if (!container) return;

  container.innerHTML = team.map(m => {
    return `
      <div class="features-card team-member">
        <img class="lazy" data-src="${m.img}" alt="${m.name}">
        <h4>${m.name}</h4>
        <p>${m.role}</p>
      </div>
    `;
  }).join('');
}

// Fun fact reveal on About page
function initFunFact() {
  const facts = [
    'We launched our first client site in just one week.',
    'We rewrite brand taglines an average of 6 times until they land.',
    'We run free brand clinics for local startups once per quarter.'
  ];
  const btn = $('#revealFact');
  const out = $('#funFactText');
  if (!btn || !out) return;
  btn.addEventListener('click', () => {
    const idx = Math.floor(Math.random() * facts.length);
    out.textContent = facts[idx];
  });
}

// Services rendering and filtering
function renderServices() {
  const services = [
    { id: 'web-starter', title: 'Starter Website', category: 'web', price: 199, desc: '3 pages, responsive, basic SEO.' },
    { id: 'web-business', title: 'Business Website', category: 'web', price: 499, desc: 'Up to 10 pages, CMS and analytics.' },
    { id: 'brand-core', title: 'Brand Core', category: 'graphics', price: 299, desc: 'Logo, palette and usage guide.' },
    { id: 'brand-full', title: 'Full Brand', category: 'graphics', price: 599, desc: 'Full identity, stationery and assets.' },
    { id: 'strategy', title: 'Digital Strategy', category: 'strategy', price: 399, desc: 'Audience research and launch plan.' }
  ];

  const container = $('#servicesList');
  if (!container) return;

  const buildHtml = (list) => list.map(s => {
    const featuresList = ['Feature 1', 'Feature 2', 'Feature 3'].map(f => `<li>${f}</li>`).join('');
    return `
      <article class="features-card service-card" data-id="${s.id}" data-cat="${s.category}">
        <h3>${s.title}</h3>
        <p><strong>From NGN ${s.price}</strong></p>
        <p>${s.desc}</p>
        <ul>${featuresList}</ul>
        <button class="btn request-quote" data-id="${s.id}">Request quote</button>
      </article>
    `;
  }).join('');

  container.innerHTML = buildHtml(services);

  // Attach request quote listeners
  const attachQuoteListeners = () => {
    $$('.request-quote').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const found = services.find(s => s.id === id);
        if (found) {
          localStorage.setItem('lastRequestedService', JSON.stringify(found));
          alert(`Quote request saved locally for: ${found.title}`);
        }
      });
    });
  };

  attachQuoteListeners();

  // Filter behavior
  $$('.filter-btn').forEach(b => {
    b.addEventListener('click', () => {
      const filter = b.dataset.filter;
      const filtered = filter === 'all' ? services : services.filter(s => s.category === filter);
      container.innerHTML = buildHtml(filtered);
      attachQuoteListeners();
    });
  });
}

// Contact form: store submissions in localStorage and render
function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;

  const nameEl = $('#name');
  const emailEl = $('#email');
  const messageEl = $('#message');
  const statusEl = $('#formStatus');
  const clearBtn = $('#clearLocal');
  const submissionsList = $('#submissionsList');

  // helpers
  const load = () => JSON.parse(localStorage.getItem('submissions') || '[]');
  const save = (arr) => localStorage.setItem('submissions', JSON.stringify(arr));

  const render = () => {
    const subs = load();
    if (!submissionsList) return;
    if (!subs.length) {
      submissionsList.innerHTML = `<p>No saved submissions yet.</p>`;
      return;
    }
    submissionsList.innerHTML = subs.map(s => {
      return `
        <div class="features-card submission">
          <p><strong>${s.name}</strong> <span>(${new Date(s.submittedAt).toLocaleString()})</span></p>
          <p>${s.message}</p>
          <p><em>${s.email}</em></p>
        </div>
      `;
    }).join('');
  };

  // load draft if present
  const draftRaw = localStorage.getItem('contactDraft');
  if (draftRaw) {
    try {
      const d = JSON.parse(draftRaw);
      if (d.name) nameEl.value = d.name;
      if (d.email) emailEl.value = d.email;
      if (d.message) messageEl.value = d.message;
      statusEl.textContent = 'Loaded saved draft from your browser.';
    } catch (e) {
      console.warn('Draft parse error', e);
    }
  }

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = messageEl.value.trim();
    if (!name || !email || !message) {
      statusEl.textContent = 'Please fill all fields.';
      statusEl.style.color = 'crimson';
      return;
    }

    const subs = load();
    const entry = { id: Date.now(), name, email, message, submittedAt: new Date().toISOString() };
    subs.push(entry);
    save(subs);
    localStorage.removeItem('contactDraft');
    statusEl.style.color = '';
    statusEl.innerHTML = `<strong>Thanks, ${name}!</strong> Message saved locally.`;
    form.reset();
    render();
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      localStorage.removeItem('submissions');
      localStorage.removeItem('contactDraft');
      render();
      statusEl.textContent = 'Local submissions cleared.';
    });
  }

  // save drafts on input
  [nameEl, emailEl, messageEl].forEach(el => {
    el && el.addEventListener('input', () => {
      const draft = { name: nameEl.value.trim(), email: emailEl.value.trim(), message: messageEl.value.trim(), savedAt: new Date().toISOString() };
      localStorage.setItem('contactDraft', JSON.stringify(draft));
    });
  });

  render();
}

// highlight active link if it still exists
function highlightActiveLink() {
  const links = $$('.nav-link');
  links.forEach(link => {
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

// initialise app
function initApp() {
  initNav();
  initLazyLoading();
  setFooterDates();
  renderFeatures();
  renderTestimonials();
  renderTeam();
  initFunFact();
  renderServices();
  initContactForm();
  highlightActiveLink();
}

// run init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
