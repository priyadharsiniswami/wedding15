/* ═══════════════════════════════════════════
   Wedding Invitation Script - Premium Edition
   R. Ashokkumar & S. Pradeepa · Nov 13, 2026
═══════════════════════════════════════════ */

const WEDDING_DATE = new Date('2026-11-13T09:30:00');
const PETAL_ICONS  = ['🌸','🌺','🌼','🪷','✨','❤️','🌹','🌷','💐','🏵️','🌻','💮'];

// ════════ CONFETTI BURST ════════
function launchConfetti() {
  const COLORS = [
    '#C8942A','#E8C060','#F5E6B8',  // golds
    '#7B0D1E','#A01530','#D4526A',  // maroons
    '#FF6B9D','#FF8C94','#FFB3C1',  // pinks
    '#FFFFFF','#FFF0C0','#FFD700',  // whites/yellows
    '#2D6A4F','#40916C',            // greens
  ];
  const SHAPES = ['circle', 'rect', 'triangle'];
  const container = document.getElementById('confetti-container');
  if (!container) return;

  const W = window.innerWidth;
  const NUM = 180;

  for (let i = 0; i < NUM; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size  = Math.random() * 10 + 6;
      const startX = W * 0.2 + Math.random() * W * 0.6;
      const angle  = Math.random() * 360;
      const vx     = (Math.random() - 0.5) * 800;
      const vy     = -(Math.random() * 600 + 300);
      const spin   = (Math.random() - 0.5) * 720;
      const dur    = Math.random() * 1.5 + 2;

      el.style.cssText = `
        position: fixed;
        left: ${startX}px;
        top: 50%;
        width: ${size}px;
        height: ${shape === 'rect' ? size * 0.5 : size}px;
        background: ${color};
        border-radius: ${shape === 'circle' ? '50%' : shape === 'rect' ? '2px' : '0'};
        clip-path: ${shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'};
        pointer-events: none;
        z-index: 99999;
        opacity: 1;
        transform-origin: center;
        box-shadow: 0 0 3px rgba(0,0,0,.15);
      `;
      container.appendChild(el);

      // Physics animation
      let startTime = null;
      const gravity = 600;

      function animate(ts) {
        if (!startTime) startTime = ts;
        const t = (ts - startTime) / 1000;
        const x = startX + vx * t;
        const y = window.innerHeight * 0.5 + vy * t + 0.5 * gravity * t * t;
        const rotation = angle + spin * t;
        const opacity  = Math.max(0, 1 - (t / dur) * 0.7);

        el.style.left      = x + 'px';
        el.style.top       = y + 'px';
        el.style.transform = `rotate(${rotation}deg)`;
        el.style.opacity   = opacity;

        if (t < dur && y < window.innerHeight + 60) {
          requestAnimationFrame(animate);
        } else {
          el.remove();
        }
      }
      requestAnimationFrame(animate);
    }, i * 12);
  }

  // Second wave of emoji confetti
  const emojiList = ['🌸','🌺','🌼','🪷','✨','❤️','💕','🎊','🎉','💫','🌹','💍','🎶'];
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
      const startX = Math.random() * W;
      const size   = Math.random() * 18 + 14;
      const vx     = (Math.random() - 0.5) * 400;
      const vy     = -(Math.random() * 500 + 200);
      const spin   = (Math.random() - 0.5) * 360;
      const dur    = Math.random() * 2 + 2;

      el.style.cssText = `
        position: fixed;
        left: ${startX}px;
        top: 50%;
        font-size: ${size}px;
        pointer-events: none;
        z-index: 99999;
        opacity: 1;
        transform-origin: center;
      `;
      container.appendChild(el);

      let startTime = null;
      const gravity = 400;

      function animate(ts) {
        if (!startTime) startTime = ts;
        const t = (ts - startTime) / 1000;
        const x = startX + vx * t;
        const y = window.innerHeight * 0.5 + vy * t + 0.5 * gravity * t * t;
        const rotation = spin * t;
        const opacity  = Math.max(0, 1 - (t / dur));

        el.style.left      = x + 'px';
        el.style.top       = y + 'px';
        el.style.transform = `rotate(${rotation}deg)`;
        el.style.opacity   = opacity;

        if (t < dur && y < window.innerHeight + 60) {
          requestAnimationFrame(animate);
        } else {
          el.remove();
        }
      }
      requestAnimationFrame(animate);
    }, i * 40 + 200);
  }
}

// ════════ DOOR OPEN ════════
function openInvitation() {
  const doorScreen     = document.getElementById('door-screen');
  const mainInvitation = document.getElementById('main-invitation');

  // 🎵 Start Background Music immediately on user click gesture
  playBGM();

  doorScreen.classList.add('door-open');

  setTimeout(() => {
    doorScreen.style.opacity    = '0';
    doorScreen.style.transition = 'opacity .5s ease';
    setTimeout(() => {
      doorScreen.style.display = 'none';
      mainInvitation.classList.remove('hidden');
      mainInvitation.style.opacity    = '0';
      mainInvitation.style.transition = 'opacity .8s ease';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          mainInvitation.style.opacity = '1';
          startCountdown();
          initScrollAnimations();
          initScratch();
          initCarousel();
        });
      });
    }, 500);
  }, 1450);
}

// ════════ SPARKLE DOOR ════════
(function initDoorSparkles() {
  const container = document.getElementById('door-sparkles');
  if (!container) return;
  function spawnStar() {
    const star    = document.createElement('div');
    star.textContent = ['✦','✧','✨','⋆'][Math.floor(Math.random() * 4)];
    star.style.cssText = `
      position:absolute;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      font-size:${Math.random()*14+8}px;
      color:rgba(200,148,42,${Math.random()*.7+.3});
      animation:sparkFade ${Math.random()*2+1.5}s ease-in-out forwards;
      pointer-events:none;
    `;
    container.appendChild(star);
    setTimeout(() => star.remove(), 3500);
  }
  const style = document.createElement('style');
  style.textContent = `
    @keyframes sparkFade{
      0%{opacity:0;transform:scale(.5) rotate(0deg)}
      50%{opacity:1;transform:scale(1.2) rotate(180deg)}
      100%{opacity:0;transform:scale(.3) rotate(360deg)}
    }
  `;
  document.head.appendChild(style);
  setInterval(spawnStar, 280);
})();

// ════════ PETALS ════════
function createPetal(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const petal = document.createElement('div');
  petal.className   = 'petal';
  petal.textContent = PETAL_ICONS[Math.floor(Math.random() * PETAL_ICONS.length)];
  const dur = Math.random() * 6 + 6;
  petal.style.cssText = `
    left:${Math.random()*100}vw;
    font-size:${Math.random()*14+10}px;
    animation-duration:${dur}s;
    animation-delay:${Math.random()*3}s;
    opacity:${Math.random()*.5+.3};
  `;
  container.appendChild(petal);
  setTimeout(() => petal.remove(), (dur + 3) * 1000);
}
function startPetals(id) {
  for (let i = 0; i < 12; i++) setTimeout(() => createPetal(id), i * 200);
  setInterval(() => createPetal(id), 900);
}
startPetals('door-petals');

// ════════ COUNTDOWN ════════
function startCountdown() {
  function pad(n) { return String(n).padStart(2, '0'); }
  function flash(id, val) {
    const el = document.getElementById(id);
    if (!el) return;
    const newVal = pad(val);
    if (el.textContent !== newVal) {
      el.style.transform  = 'scale(1.25)';
      el.style.color      = '#FFD700';
      el.textContent      = newVal;
      setTimeout(() => {
        el.style.transform = 'scale(1)';
        el.style.color     = '';
        el.style.transition = 'all .3s ease';
      }, 220);
    }
  }
  function tick() {
    const diff = WEDDING_DATE - new Date();
    if (diff <= 0) {
      ['days','hours','minutes','seconds'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      return;
    }
    flash('days',    Math.floor(diff / 86400000));
    flash('hours',   Math.floor((diff % 86400000) / 3600000));
    flash('minutes', Math.floor((diff % 3600000)  / 60000));
    flash('seconds', Math.floor((diff % 60000)    / 1000));
  }
  tick();
  setInterval(tick, 1000);
}

// ════════ SCROLL ANIMATIONS ════════
function initScrollAnimations() {
  document.querySelectorAll('.fade-in-up').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.12 + 's';
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.05 });
  document.querySelectorAll('.fade-in-up').forEach(el => {
    obs.observe(el);
    // If element is already in viewport, make it visible immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    }
  });
}

// ════════ SCRATCH TO REVEAL ════════
function initScratch() {
  const canvas = document.getElementById('scratch-canvas');
  if (!canvas) return;
  const ctx  = canvas.getContext('2d');
  const hint = document.getElementById('scratch-hint');

  // Draw gold maroon surface
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0,   '#7B0D1E');
  grad.addColorStop(0.5, '#A01530');
  grad.addColorStop(1,   '#7B0D1E');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Border
  ctx.strokeStyle = 'rgba(200,148,42,.6)';
  ctx.lineWidth   = 4;
  ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

  // Inner border
  ctx.strokeStyle = 'rgba(200,148,42,.3)';
  ctx.lineWidth   = 1;
  ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

  // Text
  ctx.fillStyle = 'rgba(200,148,42,.7)';
  ctx.font      = 'bold 17px serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦  Scratch Here  ✦', canvas.width / 2, canvas.height / 2 - 12);
  ctx.font      = '13px serif';
  ctx.fillStyle = 'rgba(245,230,184,.65)';
  ctx.fillText('Reveal our message for you', canvas.width / 2, canvas.height / 2 + 16);

  let isDrawing = false;
  let revealed  = false;

  function scratchAt(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    if (!revealed) checkReveal();
  }

  function checkReveal() {
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] < 128) transparent++;
    if (transparent / (canvas.width * canvas.height) > 0.48) {
      revealed = true;
      setTimeout(() => {
        canvas.style.transition = 'opacity .8s';
        canvas.style.opacity    = '0';
        if (hint) hint.style.display = 'none';
        celebrate();
      }, 300);
    }
  }

  function getXY(e) {
    const r = canvas.getBoundingClientRect();
    const sx = canvas.width  / r.width;
    const sy = canvas.height / r.height;
    if (e.touches) return { x: (e.touches[0].clientX - r.left) * sx, y: (e.touches[0].clientY - r.top) * sy };
    return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy };
  }

  canvas.addEventListener('mousedown',  ()   => isDrawing = true);
  canvas.addEventListener('mouseup',    ()   => isDrawing = false);
  canvas.addEventListener('mouseleave', ()   => isDrawing = false);
  canvas.addEventListener('mousemove',  e    => { if (isDrawing) { const p = getXY(e); scratchAt(p.x, p.y); }});
  canvas.addEventListener('touchstart', e    => { e.preventDefault(); isDrawing = true; });
  canvas.addEventListener('touchend',   e    => { e.preventDefault(); isDrawing = false; });
  canvas.addEventListener('touchmove',  e    => { e.preventDefault(); if (isDrawing) { const p = getXY(e); scratchAt(p.x, p.y); }});
}

function celebrate() {
  const container = document.getElementById('main-petals');
  if (!container) return;
  const celebEmoji = ['🎊','🎉','✨','🌸','💫','🎶'];
  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className   = 'petal';
      p.textContent = celebEmoji[Math.floor(Math.random() * celebEmoji.length)];
      p.style.cssText = `left:${Math.random()*100}vw;font-size:${Math.random()*14+16}px;animation-duration:3s;`;
      container.appendChild(p);
      setTimeout(() => p.remove(), 3500);
    }, i * 90);
  }
}

// ════════ PLACES CAROUSEL ════════
let placeIndex   = 0;
let visibleCount = 1;
const TOTAL_PLACES = 10;

function getVisible() {
  if (window.innerWidth >= 900) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

function initCarousel() {
  visibleCount = getVisible();
  buildDots();
  updateCarousel();

  // Touch swipe
  const track = document.getElementById('places-track');
  if (!track) return;
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) shiftPlace(dx > 0 ? -1 : 1);
  }, { passive: true });

  window.addEventListener('resize', () => {
    visibleCount = getVisible();
    if (placeIndex > TOTAL_PLACES - visibleCount) placeIndex = TOTAL_PLACES - visibleCount;
    updateCarousel();
  });
}

function shiftPlace(dir) {
  visibleCount = getVisible();
  const maxIdx = Math.max(0, TOTAL_PLACES - visibleCount);
  placeIndex   = Math.max(0, Math.min(placeIndex + dir, maxIdx));
  updateCarousel();
}

function updateCarousel() {
  const track = document.getElementById('places-track');
  if (!track) return;
  const slide  = track.querySelector('.place-slide');
  if (!slide) return;
  const outer  = track.parentElement;
  const sw     = outer.clientWidth;
  const gap    = 16;
  visibleCount = getVisible();
  const w      = (sw - gap * (visibleCount - 1)) / visibleCount;

  track.querySelectorAll('.place-slide').forEach(s => {
    s.style.flex    = `0 0 ${w}px`;
    s.style.width   = `${w}px`;
    s.style.minWidth= `${w}px`;
  });
  track.style.gap       = `${gap}px`;
  track.style.transform = `translateX(-${placeIndex * (w + gap)}px)`;

  // Update dots
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === placeIndex);
  });

  // Arrow states
  const prev = document.getElementById('places-prev');
  const next = document.getElementById('places-next');
  if (prev) prev.style.opacity = placeIndex === 0 ? '.4' : '1';
  if (next) next.style.opacity = placeIndex >= TOTAL_PLACES - visibleCount ? '.4' : '1';
}

function buildDots() {
  const dotsEl = document.getElementById('carousel-dots');
  if (!dotsEl) return;
  dotsEl.innerHTML = '';
  visibleCount = getVisible();
  const numDots = Math.max(1, TOTAL_PLACES - visibleCount + 1);
  for (let i = 0; i < numDots; i++) {
    const d = document.createElement('button');
    d.className = 'dot' + (i === placeIndex ? ' active' : '');
    d.setAttribute('aria-label', `Slide ${i + 1}`);
    d.onclick = () => { placeIndex = i; updateCarousel(); };
    dotsEl.appendChild(d);
  }
}

// ════════ WHATSAPP SHARE ════════
function shareOnWhatsApp() {
  const text = encodeURIComponent(
    '🌸 *Wedding Invitation* 🌸\n\n' +
    'You are cordially invited to celebrate the wedding of\n' +
    '💍 *R. Ashokkumar & S. Pradeepa* 💍\n\n' +
    '📅 *Muhurtham:* Nov 13, 2026 · 09:30 AM\n' +
    '📍 *GS Mahal, Ramanathapuram*\n\n' +
    '📅 *Reception:* Nov 15, 2026 · 10:45 AM\n' +
    '📍 *Ambros Mahal, Manamadurai*\n\n' +
    'We joyfully look forward to your presence and blessings! ✨\n' +
    window.location.href
  );
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

// ════════ SMOOTH SCROLL ════════
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
});

// ════════ BACKGROUND MUSIC (BGM) ════════
let isBgmPlaying = false;

function playBGM() {
  const audio = document.getElementById('bgm-audio');
  const btn   = document.getElementById('music-btn');
  const icon  = document.getElementById('music-icon');
  if (!audio) return;

  audio.volume = 0.85;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isBgmPlaying = true;
      if (btn) btn.classList.add('is-playing');
      if (icon) icon.textContent = 'music_note';
    }).catch(err => {
      console.log('Autoplay waiting for touch gesture:', err);
      // Fallback for strict browser policies: start on first touch/click anywhere
      const resumeAudio = () => {
        audio.play().then(() => {
          isBgmPlaying = true;
          if (btn) btn.classList.add('is-playing');
          if (icon) icon.textContent = 'music_note';
        }).catch(()=>{});
        document.removeEventListener('click', resumeAudio);
        document.removeEventListener('touchstart', resumeAudio);
      };
      document.addEventListener('click', resumeAudio, { once: true });
      document.addEventListener('touchstart', resumeAudio, { once: true });
    });
  }
}

function pauseBGM() {
  const audio = document.getElementById('bgm-audio');
  const btn   = document.getElementById('music-btn');
  const icon  = document.getElementById('music-icon');
  if (!audio) return;
  audio.pause();
  isBgmPlaying = false;
  if (btn) btn.classList.remove('is-playing');
  if (icon) icon.textContent = 'music_off';
}

function toggleBGM() {
  if (isBgmPlaying) {
    pauseBGM();
  } else {
    playBGM();
  }
}

// Pause music when tab is backgrounded, resume when active (if was playing)
let wasPlayingBeforeHidden = false;
document.addEventListener('visibilitychange', () => {
  const audio = document.getElementById('bgm-audio');
  if (!audio) return;
  if (document.hidden) {
    if (isBgmPlaying) {
      wasPlayingBeforeHidden = true;
      pauseBGM();
    }
  } else {
    if (wasPlayingBeforeHidden) {
      wasPlayingBeforeHidden = false;
      playBGM();
    }
  }
});
