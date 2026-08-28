document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.st-header');
  let lastScroll = 0;

  if (window.lucide) window.lucide.createIcons();

  let lenis = null;
  if (!reduceMotion && window.Lenis) {
    lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: .9, touchMultiplier: 1.35 });
    lenis.on('scroll', window.ScrollTrigger ? ScrollTrigger.update : () => {});
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -40 });
      else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  const updateScrollUi = () => {
    const y = window.scrollY;
    if (header) {
      header.classList.toggle('scrolled', y > 32);
      header.classList.toggle('is-hidden', y > lastScroll && y > 260);
    }
    lastScroll = Math.max(0, y);
  };
  window.addEventListener('scroll', updateScrollUi, { passive: true });
  updateScrollUi();

  document.querySelectorAll('.st-faq-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.st-faq-item');
      const willOpen = !item.classList.contains('is-open');
      document.querySelectorAll('.st-faq-item.is-open').forEach((openItem) => {
        openItem.classList.remove('is-open');
        openItem.querySelector('.st-faq-trigger').setAttribute('aria-expanded', 'false');
      });
      item.classList.toggle('is-open', willOpen);
      trigger.setAttribute('aria-expanded', String(willOpen));
      if (window.ScrollTrigger) setTimeout(() => ScrollTrigger.refresh(), 580);
    });
  });

  document.querySelectorAll('.st-spotlight, .st-action').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });

  if (!reduceMotion) {
    document.querySelectorAll('.st-magnetic').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        element.style.transform = `translate(${x * .1}px, ${y * .14}px)`;
      });
      element.addEventListener('pointerleave', () => { element.style.transform = ''; });
    });
  }

  if (window.gsap && window.ScrollTrigger && !reduceMotion) {
    document.documentElement.classList.add('motion-ready');
    gsap.registerPlugin(ScrollTrigger);
    const intro = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
    document.body.classList.add('is-loading', 'hero-entering');
    intro
      .to('.st-loader__line span', { width: '100%', duration: .85 })
      .to('.st-loader__mark', { y: -18, opacity: 0, duration: .45 }, '-=.12')
      .to('.st-loader', { yPercent: -100, duration: .9, ease: 'power4.inOut' })
      .set('.st-loader', { display: 'none' })
      .call(() => document.body.classList.remove('is-loading'))
      .from('.st-header', { y: -90, duration: .8 }, '-=.5')
      .from('.st-hero__logo', { y: 16, opacity: 0, duration: .65 }, '-=.5')
      .from('.st-hero__badge', { y: 16, opacity: 0, duration: .65 }, '-=.42')
      .from('.st-title-line > span', { yPercent: 115, rotate: 2, duration: 1.05, stagger: .11, ease: 'power4.out' }, '-=.42')
      .from('.st-hero__subheadline', { y: 18, opacity: 0, duration: .7 }, '-=.55')
      .from('.st-hero__description', { y: 18, opacity: 0, duration: .7 }, '-=.5')
      .from('.st-hero .st-action', { y: 18, opacity: 0, duration: .75, clearProps: 'transform,opacity' }, '-=.48')
      .from('.st-hero__credibility', { y: 12, opacity: 0, duration: .65 }, '-=.5')
      .fromTo('.st-hero__backdrop', { scale: 1.006, opacity: .45 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }, '-=1.15')
      .call(() => document.body.classList.remove('hero-entering'));

    document.querySelectorAll('[data-reveal]').forEach((element) => {
      const direction = element.dataset.reveal;
      const from = { opacity: 0, duration: 1, ease: 'power3.out', clearProps: 'transform,opacity' };
      if (direction === 'left') from.x = -48;
      else if (direction === 'right') from.x = 48;
      else if (direction === 'fade') from.scale = .97;
      else from.y = 46;
      gsap.from(element, { ...from, scrollTrigger: { trigger: element, start: 'top 86%', once: true } });
    });

    gsap.to('.st-hero__aura', { xPercent: -6, yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.st-hero', start: 'top top', end: 'bottom top', scrub: 1.2 } });
    gsap.to('.st-adam__word', { xPercent: 12, ease: 'none', scrollTrigger: { trigger: '.st-adam', start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
    gsap.to('.st-method__progress span', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.st-method__steps', start: 'top 72%', end: 'bottom 45%', scrub: .55, invalidateOnRefresh: true } });
    const offerCard = document.querySelector('[data-offer-card]');
    if (offerCard) {
      const offerTimeline = gsap.timeline({ scrollTrigger: { trigger: offerCard, start: 'top 84%', once: true } });
      offerTimeline
        .from(offerCard, { y: 72, scale: .955, opacity: 0, duration: 1.15, ease: 'power4.out' })
        .from('.st-offer-card__intro > *', { y: 28, opacity: 0, duration: .72, stagger: .09, ease: 'power3.out' }, '-=.72')
        .from('.st-offer-card__label', { x: 24, opacity: 0, duration: .6, ease: 'power3.out' }, '-=.8')
        .from('.st-offer-card__details li', { x: 24, opacity: 0, duration: .5, stagger: .055, ease: 'power3.out' }, '-=.48')
        .from('.st-price, .st-price__anchor, .st-action--offer, .st-secure', { y: 20, opacity: 0, duration: .6, stagger: .1, ease: 'power3.out' }, '-=.28');
      gsap.to('.st-offer__orbit', { rotation: 22, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.st-offer', start: 'top bottom', end: 'bottom top', scrub: 1.3 } });
      gsap.to('.st-offer__glow--right', { yPercent: -22, xPercent: -10, ease: 'none', scrollTrigger: { trigger: '.st-offer', start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
      gsap.to('.st-offer__texture', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.st-offer', start: 'top bottom', end: 'bottom top', scrub: 1.8 } });
    }
    const methodSteps = Array.from(document.querySelectorAll('[data-step]'));
    const activateMethodStep = (activeStep) => {
      methodSteps.forEach((step) => step.classList.toggle('is-active', step === activeStep));
    };
    methodSteps.forEach((step) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 56%',
        end: 'bottom 44%',
        onEnter: () => activateMethodStep(step),
        onEnterBack: () => activateMethodStep(step)
      });
    });
  } else {
    const loader = document.querySelector('.st-loader');
    if (loader) loader.remove();
  }
});

window.addEventListener('load', () => {
  if (!window.gsap) {
    document.body.classList.remove('is-loading');
    const loader = document.querySelector('.st-loader');
    if (loader) loader.remove();
  }
});
