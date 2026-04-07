/* ─────────────────────────────────────────
   ARIAN SALEH — site.js
───────────────────────────────────────── */

// ── Nav scroll state ──────────────────────
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── Active nav link ───────────────────────
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href').split('/').pop();
  if (href === currentPath) link.classList.add('active');
});

// ── Scroll reveal ─────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Hero image loaded ─────────────────────
const heroBg = document.querySelector('.hero-image');
if (heroBg) {
  const img = new Image();
  const src = heroBg.dataset.src;
  if (src) {
    img.onload = () => {
      heroBg.style.backgroundImage = `url('${src}')`;
      heroBg.classList.add('loaded');
    };
    img.src = src;
  } else {
    heroBg.classList.add('loaded');
  }
}

// ── Audio player ──────────────────────────
let currentAudio = null;
let currentBtn   = null;
let currentRow   = null;
let rafId        = null;

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function stopCurrent() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if (currentBtn) {
    currentBtn.classList.remove('playing');
  }
  if (currentRow) {
    currentRow.classList.remove('active');
    const fill = currentRow.querySelector('.progress-bar-fill');
    if (fill) fill.style.width = '0%';
  }
  cancelAnimationFrame(rafId);
  currentBtn = null;
  currentRow = null;
}

function tickProgress(audio, fill) {
  if (!audio.paused && audio.duration) {
    fill.style.width = (audio.currentTime / audio.duration * 100) + '%';
  }
  if (!audio.paused) {
    rafId = requestAnimationFrame(() => tickProgress(audio, fill));
  }
}

document.querySelectorAll('.play-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const row   = btn.closest('.play-row');
    const src   = btn.dataset.src;
    if (!src) return;

    // Same track — toggle
    if (currentAudio && currentBtn === btn) {
      if (currentAudio.paused) {
        currentAudio.play();
        btn.classList.add('playing');
        const fill = row.querySelector('.progress-bar-fill');
        tickProgress(currentAudio, fill);
      } else {
        currentAudio.pause();
        btn.classList.remove('playing');
        cancelAnimationFrame(rafId);
      }
      return;
    }

    // New track
    stopCurrent();

    const audio = new Audio(src);
    currentAudio = audio;
    currentBtn   = btn;
    currentRow   = row;

    row.classList.add('active');
    btn.classList.add('playing');

    const fill = row.querySelector('.progress-bar-fill');

    audio.addEventListener('canplay', () => {
      audio.play();
      tickProgress(audio, fill);
    });

    audio.addEventListener('ended', () => {
      btn.classList.remove('playing');
      row.classList.remove('active');
      if (fill) fill.style.width = '0%';
      currentAudio = null;
      currentBtn   = null;
      currentRow   = null;
    });

    audio.addEventListener('error', () => {
      console.warn('Audio load error:', src);
      stopCurrent();
    });
  });
});

// ── Work item background images ───────────
document.querySelectorAll('.work-item').forEach(item => {
  const style = item.getAttribute('style') || '';
  const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
  if (match) {
    const bg = document.createElement('div');
    bg.className = 'work-item-bg';
    bg.style.backgroundImage = `url('${match[1]}')`;
    const overlay = document.createElement('div');
    overlay.className = 'work-item-overlay';
    item.prepend(overlay);
    item.prepend(bg);
  }
});

// ── Work grid filter ──────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.work-item').forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ── Project page: track list ──────────────
document.querySelectorAll('.track-row').forEach(row => {
  const btn = row.querySelector('.play-btn');
  if (!btn) return;

  row.addEventListener('click', (e) => {
    if (!e.target.closest('.play-btn')) btn.click();
  });
});
