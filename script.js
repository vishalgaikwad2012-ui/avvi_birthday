const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const glow = $('.cursor-glow');
document.addEventListener('mousemove', (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

// background music that keeps playing across pages
const MUSIC_KEY = 'avii-music';
const song = new Audio('assets/song.mp3');
song.loop = true;

let musicBtn = $('#musicBtn');
if (!musicBtn) {
  musicBtn = document.createElement('button');
  musicBtn.className = 'music-btn';
  musicBtn.id = 'musicBtn';
  document.body.appendChild(musicBtn);
}

const setMusicUI = (on) => {
  musicBtn.classList.toggle('playing', on);
  musicBtn.textContent = on ? '♫' : '♪';
};
const readMusic = () => {
  try { return JSON.parse(sessionStorage.getItem(MUSIC_KEY)) || {}; } catch (e) { return {}; }
};
const saveMusic = (playing) => {
  try {
    sessionStorage.setItem(MUSIC_KEY, JSON.stringify({ playing, time: song.currentTime }));
  } catch (e) {}
};

setMusicUI(false);
const saved = readMusic();
if (saved.time) {
  song.addEventListener('loadedmetadata', () => { song.currentTime = saved.time; }, { once: true });
}
if (saved.playing) {
  song.play().then(() => setMusicUI(true)).catch(() => {
    // browser blocked autoplay: resume on the first tap anywhere
    const resume = () => {
      song.play().then(() => setMusicUI(true)).catch(() => {});
    };
    ['pointerdown', 'touchstart', 'click'].forEach((evt) =>
      document.addEventListener(evt, resume, { once: true })
    );
  });
}

musicBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  if (song.paused) {
    song.play().then(() => {
      setMusicUI(true);
      saveMusic(true);
    }).catch(() => alert('Song not found. Upload assets/song.mp3'));
  } else {
    song.pause();
    setMusicUI(false);
    saveMusic(false);
  }
});
song.addEventListener('timeupdate', () => { if (!song.paused) saveMusic(true); });
window.addEventListener('pagehide', () => saveMusic(!song.paused));

const birthdayDate = new Date('2026-10-29T00:00:00').getTime();
function updateCountdown() {
  const countdown = $('#countdown');
  if (!countdown) return;

  const difference = Math.max(birthdayDate - Date.now(), 0);
  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference % 86400000) / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);
  const seconds = Math.floor((difference % 60000) / 1000);

  $('#days').textContent = String(days).padStart(2, '0');
  $('#hours').textContent = String(hours).padStart(2, '0');
  $('#mins').textContent = String(minutes).padStart(2, '0');
  $('#secs').textContent = String(seconds).padStart(2, '0');
}
function birthdayMessage() {
  const label = $('.countdown-card .script-text');
  if (label && Date.now() >= birthdayDate) label.textContent = "It's your special day, Baccha! 🎉";
}
updateCountdown();
birthdayMessage();
setInterval(birthdayMessage, 1000);
setInterval(updateCountdown, 1000);

const reasons = [
  "You are my Baccha, and that name alone makes me smile.",
  "Your smile is my favorite sunrise, sulu.",
  "You are my panda 🐼, soft, cute, and impossible to replace.",
  "You turned a college friendship into my favorite chapter.",
  "You make ordinary days feel special, poopoo.",
  "Your laugh fixes my worst mood in seconds.",
  "You are my cutie pie, always and forever.",
  "You make me feel at home, babu.",
  "You care so deeply, even when you don't say it.",
  "You are my favorite person to annoy.",
  "Talking to you is the best part of my day.",
  "You make every plan more fun.",
  "You are my comfort place, Baccha.",
  "You look beautiful even on your lazy days.",
  "Your hugs feel like peace.",
  "You make silence comfortable.",
  "You are my panda who steals my heart daily 🐼.",
  "You make me want to be a better person.",
  "You are cute even when you're angry, sulu.",
  "You understand me without many words.",
  "You make small moments feel unforgettable.",
  "You are my safe place, babu.",
  "Your voice calms me instantly.",
  "You make my worries feel smaller.",
  "You are my favorite notification.",
  "You make every photo of us look like a memory worth keeping.",
  "You are gentle, strong, and brave, Baccha.",
  "You make me laugh at the silliest things.",
  "You are my poopoo, and I wouldn't change a thing.",
  "You make food taste better when we share it.",
  "You are my favorite kind of chaos.",
  "You make my heart feel full, cutie pie.",
  "You are effortlessly beautiful, inside and out.",
  "You have the sweetest little habits, panda 🐼.",
  "You always know how to make me feel special.",
  "You are the reason I smile at my phone.",
  "You make me believe in forever, babu.",
  "You support my dreams like they are yours.",
  "You make every day feel like a celebration.",
  "You are my favorite memory from college.",
  "You are my sulu, my sunshine on cloudy days.",
  "You make love feel simple.",
  "You are honest in the sweetest way.",
  "You make the world feel less heavy, Baccha.",
  "You make me proud, every single day.",
  "You are my favorite hello and my hardest goodbye.",
  "You make waiting feel worth it.",
  "You are my cutest distraction, poopoo.",
  "You bring colors into my ordinary life.",
  "You are my person, my panda, my everything 🐼.",
  "You deserve flowers every single day.",
  "You make me feel loved without even trying.",
  "You are soft, rare, and precious, cutie pie.",
  "You make even boring plans exciting.",
  "You listen like you truly care, babu.",
  "You are my favorite part of every story.",
  "You make my heart race and relax at the same time.",
  "You are the most thoughtful person I know, Baccha.",
  "You make me feel lucky every day.",
  "You are my little universe, sulu.",
  "You make my bad days easier.",
  "You light up every room you walk into.",
  "You are my favorite \"good morning\" and \"good night\".",
  "You make memories golden, panda 🐼.",
  "You are my sweetest habit, poopoo.",
  "You are the cutest drama queen I know.",
  "You make me feel understood, cutie pie.",
  "You are strong even when you feel tired, babu.",
  "You make love feel like home.",
  "You are my favorite adventure, Baccha.",
  "You make every goodbye feel too short.",
  "You are the reason I believe in good things.",
  "You are my forever friend and my love, sulu.",
  "You make my life feel like a beautiful movie.",
  "You have a heart made of pure gold.",
  "You are my peace in a noisy world, panda 🐼.",
  "You make me feel special, poopoo.",
  "You are my favorite habit I never want to break.",
  "You make everyone around you happier, cutie pie.",
  "You are beautifully you, babu, and I love that.",
  "You make me smile when I'm alone.",
  "You are my sunshine with a little attitude, Baccha.",
  "You make little things feel big.",
  "You are the best surprise life gave me, sulu.",
  "You make me excited for tomorrow.",
  "You are my dream I got to keep.",
  "You make my heart feel safe, panda 🐼.",
  "You are my cutest memory, poopoo.",
  "You deserve all the happiness in the world, cutie pie.",
  "You make loving you the easiest thing ever, babu.",
  "You are my favorite chapter, Baccha.",
  "You are my today, my tomorrow, and my always.",
  "You are unforgettable in every way, sulu.",
  "You make me thankful for every little moment.",
  "You are my favorite birthday girl, panda 🐼.",
  "You are my favorite reason to be on my phone, poopoo.",
  "You make my heart skip a beat, even now, sulu.",
  "You are the best part of every year, cutie pie.",
  "You are the Baccha I want to celebrate every single birthday with.",
  "You are loved far more than 100 reasons can say, my Avii 💜."
];

const reasonGrid = $('#reasonGrid');
if (reasonGrid) {
  const imageFolder = reasonGrid.dataset.imageFolder || 'assets';
  const countPhotos = async () => {
    let n = 0;
    for (let i = 1; i <= 200; i += 1) {
      const ok = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = `${imageFolder}/${i}.jpg`;
      });
      if (!ok) break;
      n = i;
    }
    return Math.max(n, 1);
  };

  countPhotos().then((photoCount) => {
  reasonGrid.innerHTML = reasons
    .map((reason, index) => {
      const image = `${imageFolder}/${(index % photoCount) + 1}.jpg`;
      return `
      <article class="reason-card reveal" tabindex="0" style="height:460px;">
        <div class="reason-inner">
          <div class="reason-front">
            <h3>${index + 1}</h3>
            <p>tap love note</p>
          </div>
          <div class="reason-back" style="background-image: linear-gradient(to bottom, rgba(62,50,50,.08), rgba(62,50,50,.18) 45%, rgba(62,50,50,.78)), url('${image}'); --img: url('${image}'); background-color: #2b2230;">
            <p>${reason}</p>
          </div>
        </div>
      </article>`;
    })
    .join('');
  });
}

$('#randomReasonBtn')?.addEventListener('click', () => {
  $('#randomReason').textContent = reasons[Math.floor(Math.random() * reasons.length)];
});

const envelope = $('#envelope');
const letterText = `Happy Birthday, my Baccha 💜
We met in college, and I still can't believe how a normal day turned into the best chapter of my life. Since then, you have become my comfort, my happiness, and my favorite person to talk to.
You are my panda 🐼, soft, cute, a little dramatic, and completely irreplaceable. My poopoo, my sulu, my cutie pie, my babu, every name I call you is just another way of saying I love you. Every time you smile, my whole day gets better.
On your special day, I wish you endless smiles, peaceful days, and all your dreams coming true. And I promise to stand beside you through all of it.
I love you more than this little website can ever say.
Forever yours ✦`;
let hasTypedLetter = false;

envelope?.addEventListener('click', () => {
  envelope.classList.add('open');
  if (hasTypedLetter) return;

  hasTypedLetter = true;
  let index = 0;
  const typedLetter = $('#typedLetter');
  const typing = setInterval(() => {
    typedLetter.textContent += letterText[index] || '';
    index += 1;
    if (index > letterText.length) clearInterval(typing);
  }, 35);
});

const cake = $('#birthdayCake') || $('.cake');
const cutCakeBtn = $('.cut-cake-btn');
const cakeStageText = $('#cakeStageText');
let cakeAnimationStarted = false;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

cutCakeBtn?.addEventListener('click', async () => {
  if (!cake || cakeAnimationStarted) return;

  cakeAnimationStarted = true;
  cutCakeBtn.disabled = true;

  cakeStageText.textContent = 'blowing the candles... 🌬️';
  cutCakeBtn.textContent = 'Blowing Candles...';
  cake.classList.add('blow');
  await wait(1500);

  cakeStageText.textContent = ' cake is cutting 🔪';
  cutCakeBtn.textContent = '';
  cake.classList.add('knife-in');
  await wait(1200);

  cakeStageText.textContent = ' into a slice... 🍰';
  cutCakeBtn.textContent = 'Cutting Slice...';
  cake.classList.add('sliced');
  await wait(900);

  cakeStageText.textContent = 'first slice for my Babuuu 🎉';
  cutCakeBtn.textContent = 'Cake Cut 🎉';

  if (typeof confetti === 'function') {
    confetti({ particleCount: 280, spread: 115, origin: { y: 0.62 } });
  }
});


// floating hearts
(function () {
  const layer = document.createElement('div');
  layer.className = 'heart-layer';
  document.body.appendChild(layer);
  const icons = ['💜', '🤍', '🐼', '✨', '💗'];
  setInterval(() => {
    const h = document.createElement('span');
    h.className = 'float-heart';
    h.textContent = icons[Math.floor(Math.random() * icons.length)];
    h.style.left = Math.random() * 100 + 'vw';
    h.style.fontSize = 14 + Math.random() * 18 + 'px';
    h.style.animationDuration = 7 + Math.random() * 6 + 's';
    layer.appendChild(h);
    setTimeout(() => h.remove(), 13000);
  }, 900);
})();
