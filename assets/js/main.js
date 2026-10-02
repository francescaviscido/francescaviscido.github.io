(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open);
    });

    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }));
  }

  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form && status) {
    form.addEventListener('submit', async (event) => {
      const key = form.querySelector('input[name="access_key"]')?.value;
      if (!key || key === 'YOUR_ACCESS_KEY_HERE') {
        event.preventDefault();
        status.textContent = 'Il modulo non è ancora attivo: inserisci la tua Access Key Web3Forms nel file _config.yml.';
        status.className = 'form-status is-error';
        return;
      }

      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const original = button.textContent;
      button.disabled = true;
      button.textContent = 'Invio in corso…';
      status.textContent = '';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.message || 'Invio non riuscito');

        form.reset();
        status.textContent = 'Grazie. Il messaggio è stato inviato correttamente.';
        status.className = 'form-status is-success';
      } catch (error) {
        status.textContent = 'Non è stato possibile inviare il messaggio. Riprova tra poco.';
        status.className = 'form-status is-error';
      } finally {
        button.disabled = false;
        button.textContent = original;
      }
    });
  }
})();


// Gestione consenso cookie / preferenze locali.
(() => {
  const storageKey = 'francesca_viscido_cookie_consent_v1';
  const banner = document.getElementById('cookie-banner');
  const modal = document.getElementById('consent-modal');
  const preferences = document.getElementById('consent-preferences');
  const analytics = document.getElementById('consent-analytics');
  const marketing = document.getElementById('consent-marketing');
  if (!banner || !modal) return;
  const readConsent = () => { try { return JSON.parse(localStorage.getItem(storageKey)); } catch (_) { return null; } };
  const applyState = (state) => {
    if (!state) return;
    if (preferences) preferences.checked = !!state.preferences;
    if (analytics) analytics.checked = !!state.analytics;
    if (marketing) marketing.checked = !!state.marketing;
  };
  const closeModal = () => {
    modal.hidden = true; modal.setAttribute('aria-hidden','true'); document.body.classList.remove('consent-open');
  };
  const openModal = () => {
    applyState(readConsent()); modal.hidden = false; modal.setAttribute('aria-hidden','false'); document.body.classList.add('consent-open'); modal.querySelector('.consent-close')?.focus();
  };
  const saveConsent = (state) => {
    localStorage.setItem(storageKey, JSON.stringify({ necessary:true, preferences:!!state.preferences, analytics:!!state.analytics, marketing:!!state.marketing, updated_at:new Date().toISOString() }));
    banner.hidden = true; closeModal();
  };
  const current = readConsent(); if (current) applyState(current); else banner.hidden = false;
  document.getElementById('cookie-accept')?.addEventListener('click', () => saveConsent({preferences:true,analytics:true,marketing:true}));
  document.getElementById('cookie-reject')?.addEventListener('click', () => saveConsent({preferences:false,analytics:false,marketing:false}));
  document.getElementById('cookie-manage')?.addEventListener('click', openModal);
  document.getElementById('footer-consent-button')?.addEventListener('click', openModal);
  document.getElementById('consent-save')?.addEventListener('click', () => saveConsent({preferences:preferences?.checked,analytics:analytics?.checked,marketing:marketing?.checked}));
  document.getElementById('consent-accept-all')?.addEventListener('click', () => saveConsent({preferences:true,analytics:true,marketing:true}));
  modal.querySelectorAll('[data-consent-close]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !modal.hidden) closeModal(); });
})();
