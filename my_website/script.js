/* ==========================================================================
   Milk Frog Field Guide
   Navigation, small page behaviours, and the milk test.
   No storage, no network requests, no tracking.
   ========================================================================== */

(() => {
  'use strict';

  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const navLabel = document.querySelector('[data-nav-label]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------- mobile nav */

  const closeNav = (returnFocus = false) => {
    if (!header || !header.classList.contains('is-open')) return;
    header.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    if (navLabel) navLabel.textContent = 'Menu';
    if (returnFocus) navToggle.focus();
  };

  if (header && navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      if (navLabel) navLabel.textContent = isOpen ? 'Close' : 'Menu';
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeNav(true);
    });

    document.addEventListener('click', (event) => {
      if (!header.classList.contains('is-open')) return;
      if (header.contains(event.target)) return;
      closeNav();
    });

    const desktop = window.matchMedia('(min-width: 861px)');
    const onBreakpoint = (event) => {
      if (event.matches) closeNav();
    };
    if (typeof desktop.addEventListener === 'function') {
      desktop.addEventListener('change', onBreakpoint);
    }
  }

  /* ------------------------------------------------------------- header state */

  if (header) {
    const setScrolled = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 6);
    };
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
  }

  /* ------------------------------------------------------------- footer year */

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  /* ------------------------------------------------------------- reveal on scroll */

  const revealItems = Array.from(document.querySelectorAll('[data-reveal]'));

  if (revealItems.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-in'));
    } else {
      revealItems.forEach((item, index) => {
        item.classList.add('will-reveal');
        item.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

      revealItems.forEach((item) => observer.observe(item));
    }
  }

  /* ------------------------------------------------------------- milk test */

  const quiz = document.querySelector('[data-quiz]');
  if (!quiz) return;

  const form = quiz.querySelector('[data-quiz-form]');
  const questions = Array.from(form.querySelectorAll('.question'));
  const progressText = quiz.querySelector('[data-progress-text]');
  const progressBar = quiz.querySelector('[data-progress-bar]');
  const errorMessage = quiz.querySelector('[data-quiz-error]');
  const resultPanel = quiz.querySelector('[data-result]');
  const resultName = quiz.querySelector('[data-result-name]');
  const resultTagline = quiz.querySelector('[data-result-tagline]');
  const resultCopy = quiz.querySelector('[data-result-copy]');
  const resultTraits = quiz.querySelector('[data-result-traits]');
  const resultPair = quiz.querySelector('[data-result-pair]');
  const restart = quiz.querySelector('[data-restart]');

  const species = {
    house: {
      name: 'House Milk Frog',
      tagline: 'Warm · low battery · extremely reliable',
      copy: 'You are the frog in the house. Not anti-social, just pro-chair. Your ideal evening has a blanket, a warm drink, and no new information after nine. People read your calm as agreement; mostly it is comfort. You are the one everyone texts when they want to hear that it is fine.',
      traits: ['Warm', 'Slow mornings', 'Reliable'],
      pair: 'Pairs well with the Field Curator, who brings you things to look at.'
    },
    curator: {
      name: 'Field Curator',
      tagline: 'Observant · dry · well-archived',
      copy: 'You collect. Screenshots, links, images, small observations, the exact frame from a video nobody else noticed. You are the person who says “I saw something” and then produces precisely the right thing. Your humour arrives late, like a good parcel.',
      traits: ['Observant', 'Dry', 'Well-archived'],
      pair: 'Pairs well with the Milk Oracle, who will overthink it with you.'
    },
    oracle: {
      name: 'Milk Oracle',
      tagline: 'Thoughtful · overclocked · slightly late',
      copy: 'You have been thinking about the same sentence since Tuesday. Not indecisive — thorough, in a way that occasionally costs you a meal. The frog’s expression is not doubt. It is processing. You will answer the question eventually, and the answer will be better than it needed to be.',
      traits: ['Thoughtful', 'Overclocked', 'Slightly late'],
      pair: 'Pairs well with the House Milk Frog, who will save you a seat.'
    }
  };

  const answered = () => questions.filter((question) => question.querySelector('input:checked')).length;

  const updateProgress = () => {
    const count = answered();
    if (progressText) progressText.textContent = `${count} of ${questions.length} answered`;
    if (progressBar) progressBar.style.width = `${(count / questions.length) * 100}%`;
  };

  form.addEventListener('change', updateProgress);
  updateProgress();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (answered() < questions.length) {
      if (errorMessage) errorMessage.hidden = false;
      const missing = questions.find((question) => !question.querySelector('input:checked'));
      const input = missing && missing.querySelector('input');
      if (input) input.focus();
      return;
    }

    if (errorMessage) errorMessage.hidden = true;

    const totals = { house: 0, curator: 0, oracle: 0 };
    let lastPick = null;

    questions.forEach((question) => {
      const chosen = question.querySelector('input:checked');
      if (!chosen) return;
      lastPick = chosen.value;
      chosen.dataset.scores.split(',').forEach((entry) => {
        const [key, value] = entry.split(':');
        if (Object.prototype.hasOwnProperty.call(totals, key)) {
          totals[key] += Number(value) || 0;
        }
      });
    });

    const best = Object.keys(totals).reduce((a, b) => (totals[b] > totals[a] ? b : a), 'house');
    const top = totals[best];
    const tied = Object.keys(totals).filter((key) => totals[key] === top);

    // A tie is broken by the type behind the last answer.
    const winner = tied.length > 1 && tied.includes(lastPick) ? lastPick : best;
    const data = species[winner] || species.house;

    resultName.textContent = data.name;
    resultTagline.textContent = data.tagline;
    resultCopy.textContent = data.copy;
    resultTraits.innerHTML = data.traits.map((trait) => `<li>${trait}</li>`).join('');
    resultPair.textContent = data.pair;

    form.hidden = true;
    resultPanel.hidden = false;
    resultName.focus({ preventScroll: true });
    resultPanel.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
  });

  if (restart) {
    restart.addEventListener('click', () => {
      form.reset();
      updateProgress();
      resultPanel.hidden = true;
      form.hidden = false;
      if (errorMessage) errorMessage.hidden = true;
      quiz.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      const firstInput = form.querySelector('input');
      if (firstInput) firstInput.focus({ preventScroll: true });
    });
  }
})();
