/* website-v2/script.js */

(function () {
  'use strict';

  /* --- Nav active-section highlighting --- */
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function setActive(id) {
    navLinks.forEach(function (a) {
      a.classList.toggle('nav-active', a.getAttribute('href') === '#' + id);
    });
  }

  const sections = Array.from(
    document.querySelectorAll('section[id], div[id]')
  ).filter(function (el) {
    return Array.from(navLinks).some(function (a) {
      return a.getAttribute('href') === '#' + el.id;
    });
  });

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* --- Pattern card expand / collapse --- */
  var patternGrid = document.getElementById('pattern-grid');

  if (patternGrid) {
    patternGrid.addEventListener('click', function (e) {
      var card = e.target.closest('.pat-card');
      if (!card) return;

      var isOpen = card.classList.contains('pat-card--open');

      /* Close all cards */
      patternGrid.querySelectorAll('.pat-card').forEach(function (c) {
        c.classList.remove('pat-card--open');
      });

      /* Toggle clicked card */
      if (!isOpen) {
        card.classList.add('pat-card--open');
      }
    });
  }

})();
