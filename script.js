/**
 * ============================================================================
 * SOUTH INDIAN ROYAL WEDDING INVITATION INTERACTIVE SCRIPT
 * Vignesh Pandi & Jeevitha • 15th November 2026
 * ============================================================================
 */

(function () {
  'use strict';

  // --- WEDDING CONFIGURATION ---
  const WEDDING_CONFIG = {
    groom: {
      nameTa: "க. விக்னேஷ் பாண்டி",
      nameEn: "K. Vignesh Pandi",
      degree: "B.Sc.",
      company: "Tamilnadu Grama Bank",
      fatherTa: "திரு. ஆ. கணேசன்",
      fatherEn: "Mr. A. Ganesan",
      motherTa: "திருமதி. முத்துமீனாள்",
      motherEn: "Mrs. Muthumeenal",
      placeTa: "இராஜகம்பீரம்",
      placeEn: "Rajagambeeram",
      phone: "9500139345"
    },
    bride: {
      nameTa: "கா. ஜீவிதா",
      nameEn: "Ka. Jeevitha",
      degree: "M.Sc.",
      fatherTa: "திரு. ஆ. காளிதாசன்",
      fatherEn: "Mr. A. Kalidhasan",
      motherTa: "திருமதி. பொன்னுத்தாய்",
      motherEn: "Mrs. Ponnuthai",
      placeTa: "சோமநாதபுரம் / பூவிளத்தூர், பரமக்குடி",
      placeEn: "Somanathapuram / Poovilathur, Paramakudi",
      phone: "7397567933"
    },
    // Target Muhurtham Time: 15 Nov 2026, 6:05:00 AM IST (+05:30)
    muhurthamDate: new Date("2026-11-15T06:05:00+05:30"),
    venues: {
      muhurtham: {
        titleTa: "புனித சுப முகூர்த்தம் - விக்னேஷ் & ஜீவிதா திருமணம்",
        titleEn: "Vignesh & Jeevitha - Holy Wedding Ceremony",
        venueTa: "ஸ்ரீ மீனாட்சி திருமண அரங்கம், பரமக்குடி",
        venueEn: "Sri Meenakshi Wedding Hall, Paramakudi",
        start: "20261115T003500Z", // 06:05 IST = 00:35 UTC
        end: "20261115T015500Z"    // 07:25 IST = 01:55 UTC
      },
      reception: {
        titleTa: "வரவேற்பு & திருமண விருந்து - விக்னேஷ் & ஜீவிதா",
        titleEn: "Reception & Grand Feast - Vignesh & Jeevitha",
        venueTa: "MGM மஹால், காட்டுப்பரமக்குடி E.B. எதிரில், பரமக்குடி",
        venueEn: "MGM Mahal, Opp. E.B. Office, Kaattuparamakudi, Paramakudi",
        start: "20261115T040000Z", // 09:30 IST = 04:00 UTC
        end: "20261115T083000Z"    // 14:00 IST = 08:30 UTC
      }
    }
  };

  // --- AUSPICIOUS BRONZE BELL CHIME (ONE-TIME TOUCH EFFECT) ---
  function playGentleBell() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const freqs = [880, 1174.66, 1760];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2 / (idx + 1), now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 2.1);
      });
    } catch (e) {
      // Audio context not allowed or supported
    }
  }

  // --- BACKGROUND MUSIC (BGM) ENGINE ---
  let isBgmPlaying = false;

  function playBGM() {
    const audio = document.getElementById('bgm-audio');
    const btn = document.getElementById('music-btn');
    const icon = document.getElementById('music-icon');
    if (!audio) return;

    audio.volume = 0.85;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isBgmPlaying = true;
        if (btn) btn.classList.add('is-playing');
        if (icon) icon.textContent = 'music_note';
      }).catch((e) => {
        console.log('Autoplay policy requires first touch/click:', e);
        const resumeAudio = () => {
          audio.play().then(() => {
            isBgmPlaying = true;
            if (btn) btn.classList.add('is-playing');
            if (icon) icon.textContent = 'music_note';
          }).catch(() => {});
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
    const btn = document.getElementById('music-btn');
    const icon = document.getElementById('music-icon');
    if (!audio) return;
    audio.pause();
    isBgmPlaying = false;
    if (btn) btn.classList.remove('is-playing');
    if (icon) icon.textContent = 'music_off';
  }

  window.toggleBGM = function () {
    if (isBgmPlaying) {
      pauseBGM();
    } else {
      playBGM();
    }
  };

  // Pause music when tab is backgrounded, resume when active if was playing
  document.addEventListener('visibilitychange', () => {
    const audio = document.getElementById('bgm-audio');
    if (!audio) return;
    if (document.hidden) {
      if (isBgmPlaying) {
        audio.pause();
      }
    } else {
      if (isBgmPlaying) {
        audio.play().catch(() => {});
      }
    }
  });

  // --- FRONT ENTRANCE FULL-SIZE TEMPLE DOORS OPENING (TOUCH FOR MAGIC) ---
  const doorScreen = document.getElementById('door-screen') || document.getElementById('entranceGate');
  const openInviteBtn = document.getElementById('open-btn') || document.getElementById('openInviteBtn');

  window.openInvitation = function () {
    if (!doorScreen || doorScreen.classList.contains('door-open')) return;

    // 1. Play Background Music immediately on user click gesture
    playBGM();

    // 2. Play auspicious temple bell chime
    playGentleBell();

    // 3. Trigger 3D door swing open
    doorScreen.classList.add('door-open');
    doorScreen.classList.add('gate-opened');

    // 4. Confetti celebration bursts
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 130,
        spread: 120,
        origin: { y: 0.55 },
        colors: ['#D4AF37', '#FFD54F', '#FFF9C4', '#1E3A8A', '#FFFFFF', '#F59E0B']
      });
      setTimeout(() => {
        confetti({
          particleCount: 90,
          spread: 90,
          origin: { y: 0.65 },
          colors: ['#D4AF37', '#FFD54F', '#FFF9C4', '#2563EB', '#2D6A4F']
        });
      }, 260);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Allow doors to swing open before fading the screen away
    setTimeout(() => {
      doorScreen.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      doorScreen.style.opacity = '0';
      setTimeout(() => {
        doorScreen.style.display = 'none';
      }, 800);
    }, 1250);
  };

  if (openInviteBtn) {
    openInviteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.openInvitation();
    });
    openInviteBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.openInvitation();
      }
    });
  }

  if (doorScreen) {
    doorScreen.addEventListener('click', () => {
      window.openInvitation();
    });
  }

  // --- LIVE REAL-TIME COUNTDOWN TIMER (FRONT ENTRANCE DOOR) ---
  const doorDays = document.getElementById('doorDays');
  const doorHours = document.getElementById('doorHours');
  const doorMins = document.getElementById('doorMins');
  const doorSecs = document.getElementById('doorSecs');

  function updateCountdown() {
    const now = new Date().getTime();
    const target = WEDDING_CONFIG.muhurthamDate.getTime();
    const diff = target - now;

    if (diff <= 0) {
      if (doorDays) doorDays.textContent = '00';
      if (doorHours) doorHours.textContent = '00';
      if (doorMins) doorMins.textContent = '00';
      if (doorSecs) doorSecs.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    if (doorDays) doorDays.textContent = String(days).padStart(2, '0');
    if (doorHours) doorHours.textContent = String(hours).padStart(2, '0');
    if (doorMins) doorMins.textContent = String(mins).padStart(2, '0');
    if (doorSecs) doorSecs.textContent = String(secs).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // --- BILINGUAL LANGUAGE SWITCHER (TAMIL / ENGLISH) ---
  const langToggleBtn = document.getElementById('langToggleBtn');
  const langLabel = document.getElementById('langLabel');

  function setLanguage(lang) {
    if (lang === 'en') {
      document.body.classList.remove('lang-ta');
      document.body.classList.add('lang-en');
      if (langLabel) langLabel.textContent = 'தமிழ்';
      document.documentElement.lang = 'en';
      localStorage.setItem('wedding_lang', 'en');
    } else {
      document.body.classList.remove('lang-en');
      document.body.classList.add('lang-ta');
      if (langLabel) langLabel.textContent = 'English';
      document.documentElement.lang = 'ta';
      localStorage.setItem('wedding_lang', 'ta');
    }
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const isEn = document.body.classList.contains('lang-en');
      setLanguage(isEn ? 'ta' : 'en');
    });
  }

  const savedLang = localStorage.getItem('wedding_lang') || 'ta';
  setLanguage(savedLang);

  // --- INTERACTIVE "SCRATCH TO REVEAL" GOLD CARD ---
  const scratchCanvas = document.getElementById('scratchCanvas');
  const instantRevealBtn = document.getElementById('instantRevealBtn');
  let isScratching = false;
  let isRevealed = false;

  if (scratchCanvas) {
    const ctx = scratchCanvas.getContext('2d');
    let width = scratchCanvas.width;
    let height = scratchCanvas.height;

    function initScratchCover() {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#FFE082');
      grad.addColorStop(0.25, '#FFD54F');
      grad.addColorStop(0.5, '#D4AF37');
      grad.addColorStop(0.75, '#FFCA28');
      grad.addColorStop(1, '#B8860B');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Gold Sparkle Glitter dots
      for (let i = 0; i < 400; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const r = Math.random() * 2 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = Math.random() > 0.5 ? '#FFF9C4' : '#FFF';
        ctx.fill();
      }

      ctx.lineWidth = 4;
      ctx.strokeStyle = '#8B6914';
      ctx.strokeRect(10, 10, width - 20, height - 20);

      ctx.font = 'bold 20px "Mukta Malar", sans-serif';
      ctx.fillStyle = '#0a1b38';
      ctx.textAlign = 'center';
      ctx.fillText('✨ திருமண நாள் ✨', width / 2, height / 2 - 40);

      ctx.font = 'bold 16px "Poppins", sans-serif';
      ctx.fillText('WEDDING DATE', width / 2, height / 2 - 10);

      ctx.font = '14px "Mukta Malar", sans-serif';
      ctx.fillStyle = '#061224';
      ctx.fillText('தேதியை அறிய இங்கே கீறவும்', width / 2, height / 2 + 25);

      ctx.font = '28px sans-serif';
      ctx.fillText('👆', width / 2, height / 2 + 75);
    }

    initScratchCover();

    function getPointerPos(e) {
      const rect = scratchCanvas.getBoundingClientRect();
      const scaleX = scratchCanvas.width / rect.width;
      const scaleY = scratchCanvas.height / rect.height;
      let clientX = e.clientX;
      let clientY = e.clientY;

      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    }

    function scratch(e) {
      if (!isScratching || isRevealed) return;
      e.preventDefault();
      const pos = getPointerPos(e);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 28, 0, Math.PI * 2);
      ctx.fill();

      checkScratchPercentage();
    }

    function checkScratchPercentage() {
      if (isRevealed) return;

      const imgData = ctx.getImageData(0, 0, width, height);
      const pixels = imgData.data;
      let transparentPixels = 0;
      const totalPixels = pixels.length / 4;

      for (let i = 3; i < pixels.length; i += 64) {
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }

      const percent = Math.min(100, Math.round((transparentPixels / (totalPixels / 16)) * 100));

      if (percent >= 40) {
        revealCard();
      }
    }

    function revealCard() {
      if (isRevealed) return;
      isRevealed = true;

      scratchCanvas.style.opacity = '0';
      setTimeout(() => {
        scratchCanvas.style.display = 'none';
      }, 800);

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.65 },
          colors: ['#ffd54f', '#d4af37', '#1e3a8a', '#2563eb', '#60a5fa', '#fff']
        });
      }
    }

    scratchCanvas.addEventListener('mousedown', (e) => {
      isScratching = true;
      scratch(e);
    });
    window.addEventListener('mouseup', () => { isScratching = false; });
    scratchCanvas.addEventListener('mousemove', scratch);

    scratchCanvas.addEventListener('touchstart', (e) => {
      isScratching = true;
      scratch(e);
    }, { passive: false });
    window.addEventListener('touchend', () => { isScratching = false; });
    scratchCanvas.addEventListener('touchmove', scratch, { passive: false });

    if (instantRevealBtn) {
      instantRevealBtn.addEventListener('click', revealCard);
    }
  }

  // --- FLOATING PETALS CANVAS ENGINE ---
  const petalsCanvas = document.getElementById('petalsCanvas');
  const petalsToggleBtn = document.getElementById('petalsToggleBtn');
  let isPetalsEnabled = true;

  if (petalsCanvas) {
    const pCtx = petalsCanvas.getContext('2d');
    let pWidth = (petalsCanvas.width = window.innerWidth);
    let pHeight = (petalsCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      pWidth = petalsCanvas.width = window.innerWidth;
      pHeight = petalsCanvas.height = window.innerHeight;
    });

    const PETAL_COUNT = 32;
    const petals = [];

    const petalColors = [
      { r: 236, g: 72, b: 153, a: 0.8 },  // Soft Rose Pink
      { r: 190, g: 24, b: 93, a: 0.85 },  // Deep Rani Pink
      { r: 255, g: 255, b: 255, a: 0.9 }, // White Jasmine (மல்லிகை)
      { r: 255, g: 213, b: 79, a: 0.85 }  // Golden Marigold
    ];

    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push({
        x: Math.random() * pWidth,
        y: Math.random() * pHeight - pHeight,
        size: Math.random() * 8 + 8,
        speedY: Math.random() * 1.5 + 0.8,
        speedX: Math.random() * 1 - 0.5,
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 2 - 1,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        flip: Math.random(),
        flipSpeed: Math.random() * 0.03 + 0.01
      });
    }

    function renderPetals() {
      pCtx.clearRect(0, 0, pWidth, pHeight);

      if (isPetalsEnabled) {
        for (let i = 0; i < petals.length; i++) {
          const p = petals[i];

          p.y += p.speedY;
          p.x += Math.sin(p.y * 0.01) * 0.8 + p.speedX;
          p.rotation += p.rotSpeed;
          p.flip += p.flipSpeed;

          if (p.y > pHeight + 20) {
            p.y = -20;
            p.x = Math.random() * pWidth;
          }

          pCtx.save();
          pCtx.translate(p.x, p.y);
          pCtx.rotate((p.rotation * Math.PI) / 180);
          pCtx.scale(Math.sin(p.flip), 1);

          pCtx.beginPath();
          pCtx.moveTo(0, 0);
          pCtx.bezierCurveTo(-p.size, -p.size * 0.6, -p.size * 0.4, -p.size * 1.4, 0, -p.size * 1.6);
          pCtx.bezierCurveTo(p.size * 0.4, -p.size * 1.4, p.size, -p.size * 0.6, 0, 0);
          pCtx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.color.a})`;
          pCtx.fill();
          pCtx.restore();
        }
      }

      requestAnimationFrame(renderPetals);
    }

    renderPetals();

    if (petalsToggleBtn) {
      petalsToggleBtn.addEventListener('click', () => {
        isPetalsEnabled = !isPetalsEnabled;
        petalsToggleBtn.style.opacity = isPetalsEnabled ? '1' : '0.5';
      });
    }
  }

  // --- GOOGLE CALENDAR GENERATOR ---
  window.addToGoogleCalendar = function (eventType) {
    const event = WEDDING_CONFIG.venues[eventType] || WEDDING_CONFIG.venues.muhurtham;
    const isTa = document.body.classList.contains('lang-ta');
    const title = encodeURIComponent(isTa ? event.titleTa : event.titleEn);
    const venue = encodeURIComponent(isTa ? event.venueTa : event.venueEn);
    const details = encodeURIComponent(
      `Vignesh & Jeevitha Wedding Celebration | சுப முகூர்த்த வைபவம்.\n` +
      `Venue: ${isTa ? event.venueTa : event.venueEn}\n` +
      `Contacts: 9500139345 / 7397567933`
    );

    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${event.start}/${event.end}&details=${details}&location=${venue}&sf=true&output=xml`;
    window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
  };

  // --- MODAL LIGHTBOX FOR ORIGINAL PRINTED PATRIKAI ---
  const cardModal = document.getElementById('cardModal');
  const viewCardModalBtn = document.getElementById('viewCardModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalImageViewport = document.getElementById('modalImageViewport');
  const rotateImgBtn = document.getElementById('rotateImgBtn');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');

  let currentRotation = 0;
  let currentZoom = 1;

  function updateModalImageTransform() {
    if (modalImageViewport) {
      modalImageViewport.style.transform = `scale(${currentZoom}) rotate(${currentRotation}deg)`;
    }
  }

  function openModal() {
    if (!cardModal) return;
    cardModal.classList.add('modal-active');
    currentRotation = 0;
    currentZoom = 1;
    updateModalImageTransform();
  }

  function closeModal() {
    if (!cardModal) return;
    cardModal.classList.remove('modal-active');
  }

  if (viewCardModalBtn) viewCardModalBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  if (rotateImgBtn) {
    rotateImgBtn.addEventListener('click', () => {
      currentRotation = (currentRotation + 90) % 360;
      updateModalImageTransform();
    });
  }

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      if (currentZoom < 2.5) currentZoom += 0.25;
      updateModalImageTransform();
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      if (currentZoom > 0.6) currentZoom -= 0.25;
      updateModalImageTransform();
    });
  }

  // --- WHATSAPP SHARE & LINK COPY ---
  window.shareViaWhatsApp = function () {
    const isTa = document.body.classList.contains('lang-ta');
    const pageUrl = window.location.href;
    const shareText = isTa
      ? `💐 *திருமண அழைப்பிதழ்* 💐\n\n` +
        `பெரியோர்களின் நல்லாசிகளுடனும் உற்றார் உறவினர்களின் நல்வாழ்த்துகளுடனும் நிகழும் மங்களகரமான பராபவ வருடம் ஐப்பசி 29 (15.11.2026) ஞாயிற்றுக்கிழமை அன்று பரமக்குடியில் நடைபெறும் எங்கள் இல்லத் திருமண விழாவிற்கு தாங்கள் சுற்றம் சூழ வருகை தந்து மணமக்கள் *விக்னேஷ் பாண்டி & ஜீவிதா* அவர்களை ஆசீர்வதிக்குமாறு அன்புடன் அழைக்கின்றோம்.\n\n` +
        `👨‍👩‍👧 *மணமகன் பெற்றோர்:* திரு. ஆ. கணேசன் - திருமதி. முத்துமீனாள்\n` +
        `👨‍👩‍👧 *மணமகள் பெற்றோர்:* திரு. ஆ. காளிதாசன் - திருமதி. பொன்னுத்தாய்\n\n` +
        `🌐 *டிஜிட்டல் அழைப்பிதழைக் காண:* ${pageUrl}`
      : `💐 *Wedding Invitation* 💐\n\n` +
        `With the cherished blessings of our beloved elders, we cordially invite you and your family to grace the wedding celebration of *K. Vignesh Pandi & Ka. Jeevitha* on Sunday, 15th November 2026 at Paramakudi.\n\n` +
        `👨‍👩‍👧 *Groom Parents:* Mr. A. Ganesan & Mrs. Muthumeenal\n` +
        `👨‍👩‍👧 *Bride Parents:* Mr. A. Kalidhasan & Mrs. Ponnuthai\n\n` +
        `🌐 *View Digital Invitation:* ${pageUrl}`;

    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank');
  };

  window.copyInvitationLink = function () {
    const pageUrl = window.location.href;
    const copyLinkText = document.getElementById('copyLinkText');
    const isTa = document.body.classList.contains('lang-ta');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(pageUrl).then(() => {
        showCopySuccess();
      }).catch(() => {
        fallbackCopyText(pageUrl);
      });
    } else {
      fallbackCopyText(pageUrl);
    }

    function showCopySuccess() {
      if (copyLinkText) {
        copyLinkText.innerHTML = isTa ? "இணைப்பு நகலெடுக்கப்பட்டது! ✓" : "Link Copied! ✓";
        setTimeout(() => {
          copyLinkText.innerHTML = isTa 
            ? `<span class="ta-only">இணைப்பை நகலெடுக்க</span><span class="en-only">Copy Invite Link</span>`
            : `<span class="ta-only">இணைப்பை நகலெடுக்க</span><span class="en-only">Copy Invite Link</span>`;
        }, 2200);
      }
    }

    function fallbackCopyText(text) {
      const tempInput = document.createElement('input');
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      showCopySuccess();
    }
  };

  // --- ATTRACTIONS CAROUSEL ARROW NAVIGATION ---
  const attractionsCarousel = document.getElementById('attractionsCarousel');
  const placesPrevBtn = document.getElementById('placesPrevBtn');
  const placesNextBtn = document.getElementById('placesNextBtn');

  if (attractionsCarousel && placesPrevBtn && placesNextBtn) {
    placesPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      attractionsCarousel.scrollBy({ left: -310, behavior: 'smooth' });
    });
    placesNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      attractionsCarousel.scrollBy({ left: 310, behavior: 'smooth' });
    });
  }

  // --- FLOATING BACK TO TOP BUTTON ---
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
