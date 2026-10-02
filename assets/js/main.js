(function () {
  const body = document.body;
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  const reveals = document.querySelectorAll('.reveal');
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      siteNav.classList.toggle('is-open');
      body.classList.toggle('menu-open');
    });
  }

  document.querySelectorAll('.site-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (siteNav && siteNav.classList.contains('is-open')) {
        siteNav.classList.remove('is-open');
        menuToggle?.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
      }
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    reveals.forEach(item => observer.observe(item));
  } else {
    reveals.forEach(item => item.classList.add('is-visible'));
  }

  if (form) {
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Invio in corso...';
      if (formStatus) formStatus.textContent = 'Invio del messaggio in corso...';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        const data = await response.json();
        if (response.ok && data.success) {
          form.reset();
          if (formStatus) formStatus.textContent = 'Messaggio inviato correttamente. Ti risponderò appena possibile.';
        } else {
          throw new Error(data.message || 'Errore durante l\'invio.');
        }
      } catch (error) {
        if (formStatus) formStatus.textContent = 'Non è stato possibile inviare il messaggio. Verifica la Web3Forms Access Key e riprova.';
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });
  }

  const STORAGE_KEY = 'fv_cookie_consent_v1';
  const banner = document.getElementById('cookie-banner');
  const modal = document.getElementById('consent-modal');
  const manageButton = document.getElementById('cookie-manage');
  const acceptAllButton = document.getElementById('cookie-accept-all');
  const rejectAllButton = document.getElementById('cookie-reject-all');
  const openPreferencesButton = document.getElementById('open-consent-preferences');
  const saveSelectedButton = document.getElementById('consent-save-selected');
  const acceptSelectedButton = document.getElementById('consent-accept-selected');
  const preferencesInput = document.getElementById('consent-preferences');
  const analyticsInput = document.getElementById('consent-analytics');
  const marketingInput = document.getElementById('consent-marketing');

  function getStoredConsent() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      return null;
    }
  }

  function setStoredConsent(value) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...value,
      necessary: true,
      timestamp: new Date().toISOString()
    }));
  }

  function applyConsentToForm(consent) {
    if (!consent) return;
    preferencesInput.checked = !!consent.preferences;
    analyticsInput.checked = !!consent.analytics;
    marketingInput.checked = !!consent.marketing;
  }

  function openConsentModal() {
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
  }

  function closeConsentModal() {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
  }

  function hideBanner() {
    if (banner) banner.hidden = true;
  }

  function showBannerIfNeeded() {
    const consent = getStoredConsent();
    if (!consent && banner) banner.hidden = false;
    if (consent) applyConsentToForm(consent);
  }

  function saveConsent(consent) {
    setStoredConsent(consent);
    applyConsentToForm(consent);
    hideBanner();
    closeConsentModal();
  }

  showBannerIfNeeded();

  manageButton?.addEventListener('click', openConsentModal);
  openPreferencesButton?.addEventListener('click', openConsentModal);
  acceptAllButton?.addEventListener('click', () => saveConsent({ preferences: true, analytics: true, marketing: true }));
  rejectAllButton?.addEventListener('click', () => saveConsent({ preferences: false, analytics: false, marketing: false }));
  saveSelectedButton?.addEventListener('click', () => saveConsent({ preferences: preferencesInput.checked, analytics: analyticsInput.checked, marketing: marketingInput.checked }));
  acceptSelectedButton?.addEventListener('click', () => saveConsent({ preferences: true, analytics: analyticsInput.checked, marketing: marketingInput.checked }));

  modal?.querySelectorAll('[data-close-consent]').forEach(button => {
    button.addEventListener('click', closeConsentModal);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal && !modal.hidden) closeConsentModal();
  });
})();
