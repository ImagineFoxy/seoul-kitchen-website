document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  // Sticky nav background on scroll
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Reveal-on-scroll
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Dish detail modal (Speisekarte page)
  const dishCards = document.querySelectorAll('.dish-card');
  const modal = document.getElementById('dish-modal');
  if (dishCards.length && modal) {
    const modalCard = modal.querySelector('.dish-modal-card');
    const modalImg = modal.querySelector('.dish-modal-img');
    const modalPlaceholder = modal.querySelector('.dish-modal-placeholder');
    const modalBadge = modal.querySelector('.dish-modal-badge');
    const modalName = modal.querySelector('.dish-modal-name');
    const modalNum = modal.querySelector('.dish-modal-num');
    const modalDesc = modal.querySelector('.dish-modal-desc');
    const modalPrice = modal.querySelector('.dish-modal-price');
    const closeBtn = modal.querySelector('.dish-modal-close');
    let lastFocused = null;

    const openModal = (card) => {
      const photo = card.querySelector('.dish-photo');
      const badge = card.querySelector('.dish-badge');
      const numEl = card.querySelector('.dish-num');
      const nameFull = card.querySelector('.dish-name').textContent.trim();
      const num = numEl ? numEl.textContent.trim() : '';
      const name = num ? nameFull.replace(num, '').trim() : nameFull;
      const desc = card.querySelector('.dish-desc')?.textContent.trim() || '';
      const price = card.querySelector('.dish-price')?.textContent.trim() || '';

      if (photo) {
        modalImg.src = photo.dataset.full || photo.src;
        modalImg.alt = photo.alt;
        modalImg.style.display = '';
        modalPlaceholder.style.display = 'none';
      } else {
        modalImg.style.display = 'none';
        modalPlaceholder.style.display = '';
      }
      if (badge) {
        modalBadge.textContent = badge.textContent.trim();
        modalBadge.style.display = '';
      } else {
        modalBadge.style.display = 'none';
      }
      modalName.textContent = name;
      modalNum.textContent = num;
      modalDesc.textContent = desc;
      modalPrice.textContent = price;

      lastFocused = document.activeElement;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };

    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    };

    dishCards.forEach(card => {
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.addEventListener('click', () => openModal(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(card);
        }
      });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  }
});
