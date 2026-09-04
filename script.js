/* ===================================================
   HAPPY TEACHER'S DAY AMMA - INTERACTIVE JAVASCRIPT
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const surpriseModal = document.getElementById('surpriseModal');
  const exploreBtn = document.getElementById('exploreBtn');
  const petalsCanvas = document.getElementById('petalsCanvas');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicStatusText = document.getElementById('musicStatusText');
  const portraitFrame = document.getElementById('portraitFrame');
  const frameBtns = document.querySelectorAll('.frame-btn');
  // Audio & Music Elements
  const bgAudio = document.getElementById('bgAudio');
  const setMusicBtn = document.getElementById('setMusicBtn');
  const musicModal = document.getElementById('musicModal');
  const closeMusicModal = document.getElementById('closeMusicModal');
  const musicUrlInput = document.getElementById('musicUrlInput');
  const saveMusicUrlBtn = document.getElementById('saveMusicUrlBtn');

  // Assets Auto-Loader (guarantees images & audio load on GitHub Pages & offline)
  function initAssets() {
    if (window.APP_ASSETS) {
      const momPhoto = document.getElementById('momPhoto');
      const leftMomPhoto = document.getElementById('leftMomPhoto');
      const rightMomPhoto = document.getElementById('rightMomPhoto');
      const modalArtImg = document.getElementById('modalArtImg');
      const heroArtImage = document.getElementById('heroArtImage');
      const letterArtImg = document.getElementById('letterArtImg');
      const bgAudio = document.getElementById('bgAudio');

      if (momPhoto && window.APP_ASSETS.ammaPhoto) momPhoto.src = window.APP_ASSETS.ammaPhoto;
      if (leftMomPhoto && window.APP_ASSETS.ammaLeftPhoto) leftMomPhoto.src = window.APP_ASSETS.ammaLeftPhoto;
      if (rightMomPhoto && window.APP_ASSETS.ammaRightPhoto) rightMomPhoto.src = window.APP_ASSETS.ammaRightPhoto;
      if (modalArtImg && window.APP_ASSETS.teacherBooksArt) modalArtImg.src = window.APP_ASSETS.teacherBooksArt;
      if (heroArtImage && window.APP_ASSETS.teacherBooksArt) heroArtImage.src = window.APP_ASSETS.teacherBooksArt;
      if (letterArtImg && window.APP_ASSETS.teacherLanternArt) letterArtImg.src = window.APP_ASSETS.teacherLanternArt;
      if (bgAudio && window.APP_ASSETS.audioMp3 && (!bgAudio.src || bgAudio.src.includes('audio/amma.mp3'))) {
        bgAudio.src = window.APP_ASSETS.audioMp3;
      }
    }
  }
  initAssets();

  // Load saved custom music URL if present or default to audioMp3 / audio/amma.mp3
  let customMusicUrl = localStorage.getItem('amma_custom_music_url') || '';
  if (bgAudio) {
    if (customMusicUrl) {
      bgAudio.src = customMusicUrl;
      if (musicUrlInput) musicUrlInput.value = customMusicUrl;
    } else if (window.APP_ASSETS && window.APP_ASSETS.audioMp3) {
      bgAudio.src = window.APP_ASSETS.audioMp3;
    } else {
      bgAudio.src = 'audio/amma.mp3';
    }
  }

  // Music Modal Controls
  if (setMusicBtn && musicModal) {
    setMusicBtn.addEventListener('click', () => {
      musicModal.classList.add('active');
    });
  }

  if (closeMusicModal && musicModal) {
    closeMusicModal.addEventListener('click', () => {
      musicModal.classList.remove('active');
    });
  }

  if (saveMusicUrlBtn && musicUrlInput && bgAudio) {
    saveMusicUrlBtn.addEventListener('click', () => {
      const url = musicUrlInput.value.trim();
      if (url) {
        customMusicUrl = url;
        localStorage.setItem('amma_custom_music_url', url);
        bgAudio.src = url;
        musicModal.classList.remove('active');
        toggleMelody(true);
        fireConfettiBurst();
      }
    });
  }

  // Launch initial popup confetti burst when page loads
  setTimeout(() => {
    fireConfettiBurst();
  }, 400);

  // Unfold Surprise Button Click
  exploreBtn.addEventListener('click', () => {
    surpriseModal.classList.remove('active');
    
    // Grand celebration confetti blast
    fireGrandCelebration();
    
    // Start music
    toggleMelody(true);

    // Smooth scroll down slightly towards hero
    window.scrollTo({
      top: 100,
      behavior: 'smooth'
    });
  });

  // Scroll Down Indicator Click
  if (scrollDownIndicator) {
    scrollDownIndicator.addEventListener('click', () => {
      document.getElementById('photoSection').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===================================================
     CONFETTI ANIMATIONS
     =================================================== */
  function fireConfettiBurst() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#9E6B75', '#C6868D', '#DBAEB4', '#D4AF37', '#ffffff']
      });
    }
  }

  function fireGrandCelebration() {
    if (typeof confetti !== 'function') return;

    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#9E6B75', '#C6868D', '#DBAEB4', '#D4AF37', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#9E6B75', '#C6868D', '#DBAEB4', '#D4AF37', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  /* ===================================================
     SIDE PHOTO INTERACTIONS
     =================================================== */
  const leftPortraitFrame = document.getElementById('leftPortraitFrame');
  const rightPortraitFrame = document.getElementById('rightPortraitFrame');

  if (leftPortraitFrame) {
    leftPortraitFrame.addEventListener('click', () => {
      createFloatingEmojis(['🎂', '💖', '🌸', '✨', '🎈']);
      playChime(587.33); // D5
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { x: 0.3, y: 0.5 },
        colors: ['#DBAEB4', '#D4AF37', '#9E6B75']
      });
    });
  }

  if (rightPortraitFrame) {
    rightPortraitFrame.addEventListener('click', () => {
      createFloatingEmojis(['🥰', '👑', '🌺', '✨', '💖']);
      playChime(659.25); // E5
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { x: 0.7, y: 0.5 },
        colors: ['#DBAEB4', '#D4AF37', '#9E6B75']
      });
    });
  }

  /* ===================================================
     PHOTO FRAME SWITCHER
     =================================================== */
  frameBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      frameBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedFrame = btn.getAttribute('data-frame');
      portraitFrame.className = `portrait-container ${selectedFrame}`;

      // Trigger sparkle micro-burst
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#DBAEB4', '#9E6B75']
      });
    });
  });

  /* ===================================================
     INTERACTIVE PHOTO REACTIONS
     =================================================== */
  // 1. Shower Flowers
  showerFlowersBtn.addEventListener('click', () => {
    createFloatingEmojis(['🌸', '🌺', '🌷', '🌹', '💐', '✨']);
    playChime(523.25); // C5
  });

  // 2. Burst Hearts
  burstHeartsBtn.addEventListener('click', () => {
    createFloatingEmojis(['💖', '💕', '❤️', '🎈', '🥰', '✨']);
    playChime(659.25); // E5
  });

  // 3. Applause
  applauseBtn.addEventListener('click', () => {
    createFloatingEmojis(['👏', '🙌', '🌟', '👑', '🎉', '🏆']);
    fireConfettiBurst();
    playChimeChord([523.25, 659.25, 783.99, 1046.50]); // C Major Arpeggio
  });

  function createFloatingEmojis(emojis) {
    for (let i = 0; i < 24; i++) {
      const el = document.createElement('div');
      el.className = 'floating-reaction-emoji';
      el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.position = 'fixed';
      el.style.left = `${Math.random() * 90 + 5}vw`;
      el.style.bottom = '-50px';
      el.style.fontSize = `${Math.random() * 20 + 24}px`;
      el.style.zIndex = '99999';
      el.style.pointerEvents = 'none';
      el.style.transition = `all ${Math.random() * 2 + 2.5}s cubic-bezier(0.2, 0.8, 0.2, 1)`;
      el.style.opacity = '1';
      document.body.appendChild(el);

      setTimeout(() => {
        el.style.bottom = `${Math.random() * 40 + 70}vh`;
        el.style.transform = `translateX(${(Math.random() - 0.5) * 100}px) rotate(${Math.random() * 60 - 30}deg) scale(1.3)`;
        el.style.opacity = '0';
      }, 50);

      setTimeout(() => {
        el.remove();
      }, 4500);
    }
  }

  /* ===================================================
     AUDIO & MELODY ENGINE
     Supports both custom audio streams & synth melody
     =================================================== */
  let audioCtx = null;
  let isPlayingMelody = false;
  let melodyInterval = null;

  const notes = [
    261.63, 329.63, 392.00, 523.25,
    440.00, 349.23, 293.66, 392.00,
    329.63, 261.63, 293.66, 392.00,
    523.25, 493.88, 440.00, 392.00
  ];

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
  }

  function playTone(freq, duration = 1.2, type = 'sine', gainVal = 0.08) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(gainVal, audioCtx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  function playChime(freq) {
    initAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    playTone(freq, 1.5, 'sine', 0.15);
  }

  function playChimeChord(chord) {
    initAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    chord.forEach((note, idx) => {
      setTimeout(() => {
        playTone(note, 2.0, 'sine', 0.12);
      }, idx * 120);
    });
  }

  function toggleMelody(forceStart = null) {
    if (forceStart === true) {
      isPlayingMelody = true;
    } else if (forceStart === false) {
      isPlayingMelody = false;
    } else {
      isPlayingMelody = !isPlayingMelody;
    }

    // Check if custom audio URL is set
    if (bgAudio && bgAudio.src && bgAudio.src !== window.location.href) {
      if (isPlayingMelody) {
        bgAudio.play().then(() => {
          musicToggleBtn.classList.add('playing');
          musicStatusText.innerText = 'Song Playing 🎶';
        }).catch(err => {
          console.warn('Direct audio play failed, falling back to synth melody:', err);
          startSynthMelody();
        });
      } else {
        bgAudio.pause();
        musicToggleBtn.classList.remove('playing');
        musicStatusText.innerText = 'Play Song 🎵';
      }
      return;
    }

    // Otherwise use sweet synth melody
    if (isPlayingMelody) {
      startSynthMelody();
    } else {
      stopSynthMelody();
    }
  }

  function startSynthMelody() {
    initAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    musicToggleBtn.classList.add('playing');
    musicStatusText.innerText = 'Melody Playing 🎶';
    let noteIndex = 0;
    
    if (melodyInterval) clearInterval(melodyInterval);
    melodyInterval = setInterval(() => {
      const freq = notes[noteIndex % notes.length];
      playTone(freq, 1.4, 'sine', 0.06);
      playTone(freq * 1.5, 1.2, 'triangle', 0.02);
      noteIndex++;
    }, 1100);
  }

  function stopSynthMelody() {
    musicToggleBtn.classList.remove('playing');
    musicStatusText.innerText = 'Play Song 🎵';
    if (melodyInterval) {
      clearInterval(melodyInterval);
      melodyInterval = null;
    }
  }

  musicToggleBtn.addEventListener('click', () => {
    toggleMelody();
  });

  /* ===================================================
     FLOATING BLOSSOM PETALS CANVAS
     =================================================== */
  function initPetals() {
    const ctx = petalsCanvas.getContext('2d');
    let width = (petalsCanvas.width = window.innerWidth);
    let height = (petalsCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = petalsCanvas.width = window.innerWidth;
      height = petalsCanvas.height = window.innerHeight;
    });

    const petalColors = ['#DBAEB4', '#C6868D', '#F4E3E6', '#E8C5CA', '#D4AF37'];
    const petalCount = 30;
    const petals = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 5 + 3,
        d: Math.random() * petalCount,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleInc: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      petals.forEach(p => {
        p.tiltAngle += p.tiltAngleInc;
        p.y += (Math.cos(p.d) + 1 + p.r / 2) * 0.45;
        p.x += Math.sin(p.d) * 0.7;
        p.tilt = Math.sin(p.tiltAngle - p.d / 3) * 15;

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();

        // Respawn if off screen
        if (p.y > height) {
          p.x = Math.random() * width;
          p.y = -20;
        }
      });

      requestAnimationFrame(draw);
    }

    draw();
  }

  initPetals();

  /* ===================================================
     INTERACTIVE GRATITUDE WALL (Cloud Backend + LocalStorage)
     =================================================== */
  const defaultWishes = [
    {
      name: "Your Proud Child ❤️",
      message: "Happy Teacher's Day Amma! You are the sweetest mother and the most inspiring teacher in the world. Thank you for everything you do!"
    },
    {
      name: "All Your Loving Students 🎓",
      message: "Thank you for lighting up our world with your patience and knowledge. You make learning so joyful and unforgettable!"
    },
    {
      name: "Your Family With Love 🌸",
      message: "Amma, your devotion and beautiful smile inspire all of us every single day. Wishing you endless happiness and good health!"
    }
  ];

  // Cloud Backend Endpoint for Persistent Online Sharing
  const CLOUD_BACKEND_URL = 'https://api.jsonbin.io/v3/b/66d8a39bad19ca34f8a1923e'; // public fallback / resilient KV
  const KV_STORE_KEY = 'https://kvdb.io/4yKqZgB8TeqX5tVwA2jM4y/amma_teacher_wishes_v1';

  async function fetchCloudWishes() {
    try {
      const res = await fetch(KV_STORE_KEY, { cache: 'no-store' });
      if (res.ok) {
        const cloudData = await res.json();
        if (Array.isArray(cloudData) && cloudData.length > 0) {
          localStorage.setItem('amma_teacher_wishes', JSON.stringify(cloudData));
          renderWishes(cloudData);
        }
      }
    } catch (err) {
      console.log('Cloud backend sync offline or unavailable, using local store:', err);
    }
  }

  async function saveWishToCloud(allStoredWishes) {
    try {
      await fetch(KV_STORE_KEY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allStoredWishes)
      });
    } catch (err) {
      console.warn('Could not post to cloud backend, saved locally:', err);
    }
  }

  function renderWishes(storedList = null) {
    let stored = storedList;
    if (!stored) {
      try {
        stored = JSON.parse(localStorage.getItem('amma_teacher_wishes') || '[]');
      } catch (e) {
        stored = [];
      }
    }

    const allWishes = [...defaultWishes, ...stored];
    wishesWall.innerHTML = '';

    allWishes.forEach(wish => {
      const note = document.createElement('div');
      note.className = 'wish-sticky-note';
      note.innerHTML = `
        <p>"${escapeHtml(wish.message)}"</p>
        <span class="wish-author"><i class="fa-solid fa-heart"></i> ${escapeHtml(wish.name)}</span>
      `;
      wishesWall.appendChild(note);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  wishForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('senderName');
    const msgInput = document.getElementById('wishMessage');

    const newWish = {
      name: nameInput.value.trim(),
      message: msgInput.value.trim(),
      timestamp: new Date().toISOString()
    };

    if (newWish.name && newWish.message) {
      let stored = [];
      try {
        stored = JSON.parse(localStorage.getItem('amma_teacher_wishes') || '[]');
      } catch (err) {
        stored = [];
      }
      stored.push(newWish);
      localStorage.setItem('amma_teacher_wishes', JSON.stringify(stored));

      renderWishes(stored);

      // Async push to online cloud database so everyone sees it
      saveWishToCloud(stored);

      nameInput.value = '';
      msgInput.value = '';

      // Celebration burst for posting wish
      fireConfettiBurst();
      createFloatingEmojis(['💌', '💖', '✨', '🌸']);
    }
  });

  // Initial local render + background cloud fetch
  renderWishes();
  fetchCloudWishes();
});
