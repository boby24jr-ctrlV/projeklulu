// ===== Intro gift box logic =====
const introScreen = document.getElementById('introScreen');
const giftBox = document.getElementById('giftBox');
const giftGlowRing = document.querySelector('.gift-glow-ring');
const introSparkles = document.getElementById('introSparkles');
const petalBurst = document.getElementById('petalBurst');
const curtainLeft = document.getElementById('curtainLeft');
const curtainRight = document.getElementById('curtainRight');

// Generate sparkles on intro screen
for (let i = 0; i < 25; i++) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  const size = 2 + Math.random() * 4;
  sparkle.style.width = size + 'px';
  sparkle.style.height = size + 'px';
  sparkle.style.left = Math.random() * 100 + 'vw';
  sparkle.style.top = Math.random() * 100 + 'vh';
  sparkle.style.animationDuration = (1.5 + Math.random() * 2) + 's';
  sparkle.style.animationDelay = (Math.random() * 2) + 's';
  introSparkles.appendChild(sparkle);
}

// Lock scroll while intro is showing
document.body.style.overflow = 'hidden';

const burstEmojis = ['🌸', '🌹', '🌷', '🌺', '🌼', '💮', '🏵️', '💗'];

function createPetalBurst() {
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'burst-petal';
    p.textContent = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = 150 + Math.random() * 400;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const rot = (Math.random() * 720 - 360) + 'deg';

    p.style.setProperty('--tx', tx + 'px');
    p.style.setProperty('--ty', ty + 'px');
    p.style.setProperty('--rot', rot);
    p.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
    p.style.animationDelay = (Math.random() * 0.3) + 's';
    p.style.animationDuration = (1 + Math.random() * 0.8) + 's';

    petalBurst.appendChild(p);
  }
}

let introClicked = false;

introScreen.addEventListener('click', () => {
  if (introClicked) return;
  introClicked = true;

  // Step 0: shake with anticipation first
  giftBox.classList.add('shaking');

  setTimeout(() => {
    giftBox.classList.remove('shaking');
    giftBox.classList.add('opening');
    giftGlowRing.classList.add('opening');

    // Step 1: gift box opening animation finishes (~700ms), then hide intro
    setTimeout(() => {
      introScreen.classList.add('hide');

      // Step 2: trigger flower burst across the screen
      createPetalBurst();

      // Step 3: after burst plays a bit, open the curtains + reveal hero text
      setTimeout(() => {
        curtainLeft.classList.add('open');
        curtainRight.classList.add('open');
        document.body.style.overflow = 'auto';

        // Trigger hero text reveal animation
        document.querySelector('.hero').classList.add('reveal-active');
      }, 700);

      // Step 4: clean up burst petals after animation ends
      setTimeout(() => {
        petalBurst.innerHTML = '';
      }, 2200);

    }, 700);
  }, 500);
});

// ===== Generate glow orbs =====
const orbContainer = document.getElementById('orbs');

for (let i = 0; i < 18; i++) {
  const orb = document.createElement('div');
  orb.className = 'orb';
  const size = 30 + Math.random() * 100;
  orb.style.width = size + 'px';
  orb.style.height = size + 'px';
  orb.style.left = Math.random() * 100 + 'vw';
  orb.style.top = Math.random() * 100 + 'vh';
  orb.style.animationDuration = (6 + Math.random() * 8) + 's';
  orb.style.animationDelay = (Math.random() * 5) + 's';
  orbContainer.appendChild(orb);
}

// ===== Generate floating petals =====
const petalContainer = document.getElementById('petals');
const petalEmojis = ['🌸', '🌹', '🌷', '🌺', '🌼', '💮', '🏵️'];

for (let i = 0; i < 60; i++) {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.animationDuration = (8 + Math.random() * 10) + 's, ' + (2 + Math.random() * 3) + 's';
  petal.style.animationDelay = (Math.random() * 10) + 's, ' + (Math.random() * 3) + 's';
  petal.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
  petal.style.opacity = (0.3 + Math.random() * 0.5);
  petalContainer.appendChild(petal);
}

// ===== Fade-in sections on scroll =====
const sections = document.querySelectorAll('.section');

sections.forEach(sec => {
  sec.style.opacity = '0';
  sec.style.transform = 'translateY(30px)';
  sec.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.2 });

sections.forEach(sec => observer.observe(sec));

// ===== Section 2: Staggered letter animation =====
const msgAnims = document.querySelectorAll('.msg-anim');

const letterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseFloat(el.getAttribute('data-delay') || 0) * 160;
      setTimeout(() => {
        el.classList.add('visible');
      }, delay);
      letterObserver.unobserve(el);
    }
  });
}, { threshold: 0.15 });

msgAnims.forEach(el => letterObserver.observe(el));

// ===== Gallery lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const caption = item.getAttribute('data-caption') || '';
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

// ===== Closing section: confetti hearts on scroll into view =====
const closingSection = document.querySelector('.closing');

function spawnClosingBurst() {
  const burstEmojis2 = ['💗', '💕', '🌸', '✨', '💖'];
  for (let i = 0; i < 24; i++) {
    const el = document.createElement('span');
    el.textContent = burstEmojis2[Math.floor(Math.random() * burstEmojis2.length)];
    el.style.position = 'absolute';
    el.style.left = '50%';
    el.style.top = '40%';
    el.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
    el.style.pointerEvents = 'none';
    el.style.zIndex = '50';

    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 220;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    el.style.transition = 'transform 1.8s ease-out, opacity 1.8s ease-out';
    el.style.opacity = '1';
    el.style.transform = 'translate(-50%, -50%) scale(0.5)';

    closingSection.appendChild(el);

    requestAnimationFrame(() => {
      el.style.transform = `translate(${tx - 50}%, ${ty - 50}%) scale(1.2) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = '0';
    });

    setTimeout(() => el.remove(), 2000);
  }
}

const closingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      spawnClosingBurst();
      closingObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

if (closingSection) {
  closingObserver.observe(closingSection);
}