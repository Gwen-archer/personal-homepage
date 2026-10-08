const chatForm=document.querySelector('#chatForm');
const chatInput=document.querySelector('#chatInput');
const chatMessages=document.querySelector('#chatMessages');
const clearChat=document.querySelector('#clearChat');

const answers=[
 {keywords:['who are you','introduce','identity','school','major'],reply:'I’m Elin, a first-year student at Tianjin University–The Hong Kong Polytechnic University Shenzhen Institute of Future Technology, exploring intelligent medical engineering and brain-computer interfaces.'},
 {keywords:['like','interest','movie','anime'],reply:'I enjoy movies and anime. They are a way to relax, but also a window into different stories and forms of imagination.'},
 {keywords:['hope','ideal','become','future','goal'],reply:'I hope to become someone who keeps learning and exploring, connecting medicine, engineering, and technology while continuing to grow in cybersecurity.'},
 {keywords:['recent','bandit','finish','working','project'],reply:'I’m currently working through Bandit, using hands-on practice to learn Linux commands and cybersecurity fundamentals.'},
 {keywords:['security','good at','focus','direction','network'],reply:'I’m especially interested in cybersecurity and building experience through practical challenges like Bandit. I’m still learning and growing as a first-year student.'},
 {keywords:['feature','rings','remember'],reply:'One small detail that makes Elin easy to remember: she often wears rings.'}
];

function appendMessage(text,type){
 const message=document.createElement('div');
 message.className=`message ${type}`;
 const name=document.createElement('div');
 name.className='message-name';
 name.textContent=type==='user'?'YOU':'ELIN AI';
 const content=document.createElement('p');
 content.textContent=text;
 message.append(name,content);
 chatMessages.appendChild(message);
 chatMessages.scrollTop=chatMessages.scrollHeight;
 return message;
}
function getAnswer(question){
 const normalized=question.toLowerCase().replace(/[？?！!。，,.]/g,'');
 const match=answers.find(item=>item.keywords.some(k=>normalized.includes(k.toLowerCase())));
 return match?match.reply:'这个问题我还在学习。Try asking “Who are you?”, “What do you like?”, “What are you working on?”, or “What do you hope to become?”';
}
function showTyping(){
 const wrap=document.createElement('div');
 wrap.className='message bot typing-message';
 wrap.innerHTML='<div class="message-name">ELIN AI</div><div class="typing"><i></i><i></i><i></i></div>';
 chatMessages.appendChild(wrap);
 chatMessages.scrollTop=chatMessages.scrollHeight;
 return wrap;
}
function askQuestion(question){
 const clean=question.trim();
 if(!clean)return;
 chatMessages.querySelector('.suggestions')?.remove();
 appendMessage(clean,'user');
 chatInput.value='';
 const typing=showTyping();
 window.setTimeout(()=>{typing.remove();appendMessage(getAnswer(clean),'bot')},420);
}
chatForm.addEventListener('submit',e=>{e.preventDefault();askQuestion(chatInput.value)});
document.querySelectorAll('[data-question]').forEach(button=>button.addEventListener('click',()=>askQuestion(button.dataset.question)));
clearChat.addEventListener('click',()=>{
 chatMessages.innerHTML='<div class="message bot"><div class="message-name">ELIN AI</div><p>Conversation reset. Hello, I am Elin’s digital twin. Where would you like to start?</p></div>';
 chatInput.focus();
});


/* 2.5.7 Time Scramble — all characters animate, fixed slots, smoother rhythm */
document.addEventListener("DOMContentLoaded", async () => {
  const el = document.querySelector(".hero-scramble");
  if (!el) return;

  const target = el.dataset.scramble || "Hello, I am Elin.";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";
  const duration = 1200;
  const changeInterval = 105;
  const repeatInterval = 5000;

  if (document.fonts?.ready) await document.fonts.ready;

  const styles = getComputedStyle(el);
  const font = `${styles.fontStyle} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = font;

  // Keep each character in its original target width. Random glyphs are
  // visually scaled to fit that slot, so the sentence stays compact and stable.
  const letterSpacing = parseFloat(styles.letterSpacing) || 0;

  const runScramble = () => {
    el.textContent = "";
    const slots = [];
    [...target].forEach((char, index) => {
      const slot = document.createElement("span");
      slot.className = "scramble-char";
      if (index >= 13 && index <= 16) slot.classList.add("scramble-name");
      if (index === 17) slot.classList.add("scramble-period");
      const targetWidth = Math.max(ctx.measureText(char).width, 1);
      slot.style.width = `${targetWidth + letterSpacing}px`;
      if (char !== " ") {
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        slot.textContent = randomChar;
        const randomWidth = Math.max(ctx.measureText(randomChar).width, 1);
        slot.style.transform = `scaleX(${Math.min(targetWidth / randomWidth, 1.35)})`;
      } else {
        slot.textContent = " ";
      }
      el.appendChild(slot);
      slots.push(slot);
    });

    const start = performance.now();
    const deadlines = target.split("").map((char, i) => {
      if (char === " ") return start;
      // Characters resolve in a gentle left-to-right wave, while all of them
      // keep scrambling before their own deadline.
      return start + 620 + i * 34;
    });
    const lastChanged = target.split("").map(() => start);

    const render = (now) => {
      const progress = Math.min((now - start) / duration, 1);

      slots.forEach((slot, i) => {
        const finalChar = target[i];
        if (finalChar === " ") {
          slot.textContent = " ";
          return;
        }

        if (now >= deadlines[i] || progress >= 1) {
          slot.textContent = finalChar;
          slot.style.transform = "scaleX(1)";
          return;
        }

        if (now - lastChanged[i] >= changeInterval) {
          const randomChar = chars[Math.floor(Math.random() * chars.length)];
          slot.textContent = randomChar;
          const targetWidth = Math.max(ctx.measureText(finalChar).width, 1);
          const randomWidth = Math.max(ctx.measureText(randomChar).width, 1);
          slot.style.transform = `scaleX(${Math.min(targetWidth / randomWidth, 1.35)})`;
          lastChanged[i] = now;
        }
      });

      if (progress < 1) {
        requestAnimationFrame(render);
      } else {
        slots.forEach((slot, i) => {
          slot.textContent = target[i];
          slot.style.transform = "scaleX(1)";
        });
      }
    };

    requestAnimationFrame(render);
  };

  // Run once immediately, then repeat every 5 seconds.
  runScramble();
  window.setInterval(runScramble, repeatInterval);
});


/* 2.6 Liquid Glow Cursor — ambient bloom + long trail + outward light particles */
document.addEventListener("DOMContentLoaded", () => {
  if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.querySelector(".liquid-glow");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = window.innerWidth;
  let height = window.innerHeight;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize, { passive: true });

  const trailCount = 18;
  const trail = Array.from({ length: trailCount }, () => ({
    x: width / 2,
    y: height / 2,
    vx: 0,
    vy: 0
  }));

  const particles = [];
  let pointer = { x: width / 2, y: height / 2 };
  let lastPointer = { ...pointer };
  let speed = 0;
  let active = false;
  let trailEnabled = true;
  let lastFrame = performance.now();
  let emitAccumulator = 0;

  const random = (min, max) => min + Math.random() * (max - min);

  const emitParticle = (burst = false) => {
    const angle = Math.random() * Math.PI * 2;
    const radial = burst ? random(0.7, 1.7) : random(0.25, 0.9);
    const distance = random(3, 16);
    particles.push({
      x: pointer.x + Math.cos(angle) * distance,
      y: pointer.y + Math.sin(angle) * distance,
      vx: Math.cos(angle) * radial,
      vy: Math.sin(angle) * radial,
      life: 0,
      maxLife: random(620, 1250),
      size: random(0.45, 1.15),
      drift: random(-0.035, 0.035)
    });
  };

  const onMove = (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    active = true;
  };

  const onLeave = () => { active = false; };
  window.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("mouseleave", onLeave);

  window.addEventListener("mouse-trail-toggle", (event) => {
    trailEnabled = event.detail?.enabled !== false;
    if (!trailEnabled) {
      active = false;
      particles.length = 0;
      trail.forEach((point) => {
        point.x = pointer.x;
        point.y = pointer.y;
      });
      ctx.clearRect(0, 0, width, height);
    }
  });

  const drawBloom = (x, y, radius, alpha) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
    g.addColorStop(0, `rgba(255,255,255,${alpha * 0.30})`);
    g.addColorStop(0.18, `rgba(153,225,238,${alpha * 0.22})`);
    g.addColorStop(0.46, `rgba(114,201,226,${alpha * 0.16})`);
    g.addColorStop(0.72, `rgba(118,215,201,${alpha * 0.10})`);
    g.addColorStop(1, "rgba(118,215,201,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawParticle = (p, alpha) => {
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
    g.addColorStop(0, `rgba(255,255,255,${alpha * 0.85})`);
    g.addColorStop(0.35, `rgba(129,215,229,${alpha * 0.55})`);
    g.addColorStop(1, "rgba(118,215,201,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
    ctx.fill();
  };

  const render = (now) => {
    const dt = Math.min((now - lastFrame) / 16.67, 2);
    const ms = Math.min(now - lastFrame, 34);
    lastFrame = now;

    const dx = pointer.x - lastPointer.x;
    const dy = pointer.y - lastPointer.y;
    const instantSpeed = Math.hypot(dx, dy);
    speed += (instantSpeed - speed) * Math.min(0.16 * dt, 1);
    lastPointer.x = pointer.x;
    lastPointer.y = pointer.y;

    // Long, soft chain: the main glow is small and the tail stretches behind it.
    const follow = [0.36, 0.29, 0.245, 0.215, 0.19, 0.17, 0.155, 0.142, 0.13, 0.12, 0.112, 0.105, 0.098, 0.092, 0.086, 0.081, 0.076, 0.071];
    trail[0].x += (pointer.x - trail[0].x) * Math.min(follow[0] * dt, 1);
    trail[0].y += (pointer.y - trail[0].y) * Math.min(follow[0] * dt, 1);
    for (let i = 1; i < trail.length; i++) {
      trail[i].x += (trail[i - 1].x - trail[i].x) * Math.min(follow[i] * dt, 1);
      trail[i].y += (trail[i - 1].y - trail[i].y) * Math.min(follow[i] * dt, 1);
    }

    ctx.clearRect(0, 0, width, height);

    if (active && trailEnabled) {
      const movement = Math.min(speed / 18, 1.6);
      // Broad ambient bloom: this is intentionally smaller than the first 2.6 version.
      drawBloom(trail[0].x, trail[0].y, 68, 0.88);

      // Large, long trail that dissolves into the page instead of looking like balls.
      for (let i = 1; i < trail.length; i++) {
        const t = i / trail.length;
        const radius = 56 - t * 20;
        const alpha = Math.pow(1 - t, 1.15) * 0.48;
        drawBloom(trail[i].x, trail[i].y, radius, alpha);
      }

      // Small points are emitted from the pointer center and drift outward.
      emitAccumulator += ms * (0.012 + movement * 0.020);
      while (emitAccumulator >= 1) {
        emitParticle(movement > 0.8);
        emitAccumulator -= 1;
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life += ms;
      p.vx *= Math.pow(0.985, dt);
      p.vy *= Math.pow(0.985, dt);
      p.vy += p.drift * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      const progress = p.life / p.maxLife;
      if (progress >= 1) {
        particles.splice(i, 1);
        continue;
      }
      const fade = progress < 0.16 ? progress / 0.16 : 1 - (progress - 0.16) / 0.84;
      drawParticle(p, Math.max(0, fade) * 0.85);
    }

    // When the pointer stops, only the existing particles remain and fade away.
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
});


/* 2.6.2 — Mouse Trail toggle */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("mouse-trail-toggle");
  if (!toggle) return;

  const key = "elin-mouse-trail";
  const saved = localStorage.getItem(key);
  const enabled = saved === null ? true : saved === "on";

  const applyState = (on) => {
    document.documentElement.classList.toggle("mouse-trail-off", !on);
    toggle.setAttribute("aria-checked", String(on));
    localStorage.setItem(key, on ? "on" : "off");
    window.dispatchEvent(new CustomEvent("mouse-trail-toggle", {
      detail: { enabled: on }
    }));
  };

  applyState(enabled);

  toggle.addEventListener("click", () => {
    const on = toggle.getAttribute("aria-checked") !== "true";
    applyState(on);
  });
});


/* 2.6.2 fix — make the toggle actually stop the canvas renderer */
(() => {
  const canvas = document.querySelector(".liquid-glow");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const clearTrailCanvas = () => {
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  window.addEventListener("mouse-trail-toggle", (event) => {
    if (event.detail?.enabled === false) {
      clearTrailCanvas();
    }
  });

  // CSS hides the canvas immediately; this also clears any frame already drawn.
  const observer = new MutationObserver(() => {
    if (document.documentElement.classList.contains("mouse-trail-off")) {
      clearTrailCanvas();
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
})();

/* 3.0 — About Me Portal / Unknown Space cinematic */
document.addEventListener('DOMContentLoaded', () => {
  const openButton = document.getElementById('openPortal');
  const overlay = document.getElementById('portalOverlay');
  const space = overlay?.querySelector('.portal-space');
  const closeButton = document.getElementById('closePortal');
  const hint = document.getElementById('portalHint');
  const points = [...document.querySelectorAll('.access-point')];
  const about = document.getElementById('about-cinematic-space');
  const aboutLayer = document.getElementById('about-space-layer');

  if (!openButton || !overlay || !space || !hint || !about || !aboutLayer) return;

  let locked = false;
  let cinematicStep = 0;
  let cinematicClickLock = false;
  let returnTimer = null;

  const lockViewport = () => {
    document.documentElement.classList.add('unknown-space-open');
    document.body.classList.add('unknown-space-open');
    document.body.style.overflow = 'hidden';
  };

  const unlockViewport = () => {
    document.documentElement.classList.remove('unknown-space-open');
    document.body.classList.remove('unknown-space-open');
    document.body.style.overflow = '';
  };

  const resetAbout = () => {
    about.classList.remove(
      'cinematic-active',
      'cinematic-finished',
      'cinematic-step-1',
      'cinematic-step-2',
      'cinematic-step-3',
      'cinematic-step-4'
    );
    cinematicStep = 0;
    cinematicClickLock = false;
  };

  const returnHome = (withTransition = false) => {
    if (returnTimer) clearTimeout(returnTimer);
    returnTimer = null;

    if (withTransition) {
      // Keep the final card and Unknown Space visible while the overlay gently
      // fades away, revealing the Hero underneath instead of cutting directly.
      overlay.classList.add('returning-home');
      overlay.setAttribute('aria-hidden', 'true');
      space.classList.remove('signal-found', 'wrong-signal', 'entering');
      space.style.animation = 'none';
      locked = false;

      returnTimer = window.setTimeout(() => {
        resetAbout();
        overlay.classList.remove('about-in-space', 'is-open', 'returning-home');
        overlay.setAttribute('aria-hidden', 'true');
        hint.textContent = 'Locate a stable signal.';
        space.style.animation = '';
        unlockViewport();
        window.scrollTo(0, 0);
        returnTimer = null;
      }, 420);
      return;
    }

    resetAbout();
    overlay.classList.add('returning-home');
    space.classList.remove('signal-found', 'wrong-signal', 'entering');
    space.style.animation = 'none';
    overlay.classList.remove('about-in-space', 'is-open');
    overlay.setAttribute('aria-hidden', 'true');
    hint.textContent = 'Locate a stable signal.';
    locked = false;
    unlockViewport();

    window.requestAnimationFrame(() => {
      overlay.classList.remove('returning-home');
      space.style.animation = '';
    });

    document.getElementById('home')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const openPortal = () => {
    if (returnTimer) clearTimeout(returnTimer);
    returnTimer = null;

    locked = false;
    resetAbout();

    space.classList.remove('signal-found', 'wrong-signal', 'entering');
    hint.textContent = 'Locate a stable signal.';
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    lockViewport();
  };

  const closePortal = () => {
    returnHome();
  };

  document.getElementById('aboutHomeMark')?.addEventListener('click', (event) => {
    event.stopPropagation();
    returnHome();
  });

  const startCinematicAbout = () => {
    space.classList.remove('entering');
    overlay.classList.add('about-in-space');
    lockViewport();
    resetAbout();
    about.classList.add('cinematic-active', 'cinematic-step-1');
    cinematicStep = 1;
  };

  const advanceCinematicAbout = () => {
    if (cinematicClickLock || !overlay.classList.contains('about-in-space')) return;

    cinematicClickLock = true;

    if (cinematicStep < 4) {
      const current = cinematicStep;
      cinematicStep += 1;

      about.classList.remove(`cinematic-step-${current}`);
      about.classList.add(`cinematic-step-${cinematicStep}`);

      window.setTimeout(() => {
        cinematicClickLock = false;
      }, 960);

      return;
    }

    // Final card: keep the card visible and softly fade the whole Unknown Space
    // away so the Hero is revealed with the earlier smooth handoff.
    returnHome(true);
  };

  openButton.addEventListener('click', openPortal);
  closeButton?.addEventListener('click', closePortal);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay && !overlay.classList.contains('about-in-space')) {
      closePortal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
      closePortal();
    }
  });

  points.forEach(point => {
    point.addEventListener('click', () => {
      if (locked) return;

      const correct = point.dataset.correct === 'true';

      if (!correct) {
        space.classList.remove('wrong-signal');
        void space.offsetWidth;
        space.classList.add('wrong-signal');
        hint.textContent = 'Signal unstable. Keep searching.';
        window.setTimeout(() => space.classList.remove('wrong-signal'), 500);
        return;
      }

      locked = true;
      space.classList.add('signal-found');
      hint.textContent = 'SIGNAL LOCKED · ACCESS GRANTED';

      window.setTimeout(() => {
        space.classList.add('entering');
      }, 420);

      window.setTimeout(() => {
        startCinematicAbout();
      }, 980);
    });
  });

  aboutLayer.addEventListener('click', (event) => {
    const stage = about.querySelector('.about-depth-stage');
    if (!stage || !stage.contains(event.target)) return;
    advanceCinematicAbout();
  });
});

/* ============================================================
   3.0.9 — 双语反馈表单
   ------------------------------------------------------------
   把下面 url / key 两项填上，反馈就会存进你自己的 Supabase 数据库；
   留空则维持原型行为：只保存在访客自己的浏览器里。

     url : Project URL，形如 https://abcdefghij.supabase.co
     key : publishable / anon key（公开密钥）
           千万不要填 Secret key / service_role key

   注：window.ELIN_FEEDBACK_BACKEND 是给自动化测试用的注入点，
       正常使用不用管它。
   ============================================================ */
const FEEDBACK_BACKEND = window.ELIN_FEEDBACK_BACKEND || {
  url: 'https://lpidbwehoxvhvbqcvhid.supabase.co',
  key: 'sb_publishable_68PBiSm8YJw-ZZAphCZADg_Q9LDj3oZ'
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');
  const success = document.getElementById('feedbackSuccess');
  const errorBox = document.getElementById('feedbackError');
  const note = form?.querySelector('.feedback-note');
  const submitButton = form?.querySelector('button[type="submit"]');

  if (!form || !success) return;

  const backendReady = Boolean(FEEDBACK_BACKEND.url && FEEDBACK_BACKEND.key);

  // 接上数据库后，把「原型版本」提示换成正式文案
  if (backendReady && note) {
    note.textContent = '你的反馈会直接发送给我。 / Your feedback goes straight to me.';
  }

  // 记下每个提示的倒计时，避免新旧计时器互相干扰
  const hideTimers = new WeakMap();

  const hide = element => {
    if (!element) return;
    window.clearTimeout(hideTimers.get(element));
    hideTimers.delete(element);
    element.classList.remove('is-visible');
  };

  const flash = (element, duration) => {
    if (!element) return;
    hide(element);
    element.classList.add('is-visible');
    hideTimers.set(element, window.setTimeout(() => hide(element), duration));
  };

  // 原型模式：只存在访客这台设备上
  const saveLocally = payload => {
    const existing = JSON.parse(localStorage.getItem('elinFeedback') || '[]');
    existing.push(payload);
    localStorage.setItem('elinFeedback', JSON.stringify(existing));
  };

  // 正式模式：写进 Supabase
  const sendToBackend = async payload => {
    const endpoint = FEEDBACK_BACKEND.url.replace(/\/+$/, '') + '/rest/v1/feedback';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        apikey: FEEDBACK_BACKEND.key,
        Authorization: 'Bearer ' + FEEDBACK_BACKEND.key,
        'Content-Type': 'application/json',
        // 安全策略禁止匿名读取，所以要求接口不回传内容，只返回状态码
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('HTTP ' + response.status);
  };

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const payload = {
      nickname: document.getElementById('feedbackNickname')?.value.trim() || '',
      relationship: document.getElementById('feedbackRelationship')?.value || '',
      device: document.getElementById('feedbackDevice')?.value || '',
      message: document.getElementById('feedbackMessage')?.value.trim() || ''
    };

    if (submitButton) submitButton.disabled = true;

    // 开始新一次提交，先清掉上一次的提示，
    // 否则「上一次成功」的提示会和新产生的「失败」提示同时挂在页面上
    hide(success);
    hide(errorBox);

    try {
      if (backendReady) {
        await sendToBackend(payload);
      } else {
        saveLocally({ ...payload, submittedAt: new Date().toISOString() });
      }

      form.reset();
      flash(success, 4200);
    } catch (error) {
      if (errorBox) {
        errorBox.textContent = '提交失败，请稍后再试。 / Something went wrong. Please try again.';
      }
      flash(errorBox, 6000);
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
});


/* =========================================================
   4.0.0 — Digital Twin · interactive 3D brain background
   -----------------------------------------------------------------
   Model: “Bioelectric consciousness engine” by VoXelo (CodePen)
   https://codepen.io/VoXelo/pen/xbgpJre
   Adapted from the original fullscreen demo into a scoped background
   canvas: the HUD panels, custom cursor and loader were removed.
   OrbitControls is not used — instead the model auto-spins slowly,
   can be drag-rotated anywhere on the chat card (with momentum), and a
   plain click fires a neural pulse. Rendering pauses when the section
   is off-screen or the tab is hidden.
   Three.js is resolved through the import map declared in index.html.
   ========================================================= */
(function () {
  'use strict';

  var mount = document.getElementById('twinBrain');
  if (!mount || mount.dataset.brainReady === '1') return;

  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) { /* noop */ }

  var hasWebGL = false;
  try {
    var probe = document.createElement('canvas');
    hasWebGL = !!(window.WebGLRenderingContext &&
      (probe.getContext('webgl') || probe.getContext('experimental-webgl')));
  } catch (err) { hasWebGL = false; }

  if (!hasWebGL) return;

  function boot() {
    Promise.all([
      import('three'),
      import('three/addons/postprocessing/EffectComposer.js'),
      import('three/addons/postprocessing/RenderPass.js'),
      import('three/addons/postprocessing/UnrealBloomPass.js')
    ]).then(function (mods) {
      build(mods[0], mods[1].EffectComposer, mods[2].RenderPass, mods[3].UnrealBloomPass);
    }).catch(function (err) {
      console.warn('[twin-brain] background skipped:', err);
    });
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(boot, { timeout: 2500 });
  } else {
    window.setTimeout(boot, 200);
  }

  function build(THREE, EffectComposer, RenderPass, UnrealBloomPass) {
    if (mount.dataset.brainReady === '1') return;
    mount.dataset.brainReady = '1';

    var shaderNoise = `
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        float snoise(vec3 v) {
            const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i  = floor(v + dot(v, C.yyy) );
            vec3 x0 = v - i + dot(i, C.xxx) ;
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min( g.xyz, l.zxy );
            vec3 i2 = max( g.xyz, l.zxy );
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute( permute( permute(
                        i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
            float n_ = 0.142857142857;
            vec3  ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_ );
            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4( x.xy, y.xy );
            vec4 b1 = vec4( x.zw, y.zw );
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
        }
    `;

    var CONFIG = {
      somaRadius: 4.0,
      dendriteTrees: 14,
      axonTrees: 4,
      maxDistDendrite: 35.0,
      maxDistAxon: 50.0,
      colors: {
        cyan: new THREE.Color('#00e5ff'),
        blue: new THREE.Color('#0033aa'),
        gold: new THREE.Color('#ffaa00'),
        orange: new THREE.Color('#ff4400'),
        magenta: new THREE.Color('#ff0066'),
        violet: new THREE.Color('#6600ff')
      }
    };

    var STATE = {
      phase: 0,
      progress: 0,
      isAnimating: false,
      dragging: false,
      spinX: 0,
      spinY: 0
    };

    var uniforms = {
      uTime: { value: 0 },
      uPhase: { value: 0 },
      uProgress: { value: 0 },
      uColCyan: { value: CONFIG.colors.cyan },
      uColBlue: { value: CONFIG.colors.blue },
      uColGold: { value: CONFIG.colors.gold },
      uColOrange: { value: CONFIG.colors.orange },
      uColMagenta: { value: CONFIG.colors.magenta },
      uColViolet: { value: CONFIG.colors.violet },
      uSomaRadius: { value: CONFIG.somaRadius },
      uMaxDistDendrite: { value: CONFIG.maxDistDendrite },
      uMaxDistAxon: { value: CONFIG.maxDistAxon }
    };

    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030c12, 0.010);

    /* Pull the camera back instead of scaling the group: the pulse shader
       measures length(vWorldPos), so a scaled group would desync the wave. */
    /* >>> 调大小就改这一个数：越大 = 模型越小（1 = 原始大小） <<< */
    var BRAIN_ZOOM = 1.4;

    var desktopCamera = new THREE.Vector3(30, 20, 40).multiplyScalar(BRAIN_ZOOM);
    var mobileCamera = new THREE.Vector3(36, 24, 60).multiplyScalar(BRAIN_ZOOM);
    var baseCameraPos = desktopCamera.clone();

    var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
    camera.position.copy(baseCameraPos);

    var renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    renderer.setClearColor(0x030c12, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    mount.appendChild(renderer.domElement);

    var composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    var bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.8, 0.6, 0.1);
    composer.addPass(bloomPass);

    var somaMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      vertexShader: `
            ${shaderNoise}
            uniform float uTime;
            uniform int uPhase;
            uniform float uProgress;

            varying vec3 vNormal;
            varying vec3 vViewPosition;
            varying float vNoise;

            void main() {
                vec3 pos = position;
                float noise = snoise(pos * 0.5 + uTime * 0.3) * 0.5;
                float burst = 0.0;
                if(uPhase == 2) {
                    burst = sin(uProgress * 3.14159) * 0.4;
                }
                pos += normal * (noise + burst);
                vNoise = noise;
                vNormal = normalize(normalMatrix * normal);
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                vViewPosition = -mvPosition.xyz;
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
      fragmentShader: `
            uniform int uPhase;
            uniform float uProgress;
            uniform float uTime;

            uniform vec3 uColCyan;
            uniform vec3 uColBlue;
            uniform vec3 uColGold;
            uniform vec3 uColMagenta;

            varying vec3 vNormal;
            varying vec3 vViewPosition;
            varying float vNoise;

            void main() {
                vec3 normal = normalize(vNormal);
                vec3 viewDir = normalize(vViewPosition);
                float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.5);
                vec3 color = mix(uColBlue * 0.2, uColCyan, fresnel);
                color += uColCyan * (vNoise * 0.5 + 0.5) * 0.3;
                if(uPhase == 2) {
                    float intensity = sin(uProgress * 3.14159);
                    color = mix(color, uColGold * 2.0 + uColCyan, intensity * fresnel * 2.0);
                    color += uColGold * intensity * (1.0 - fresnel);
                } else if(uPhase == 4) {
                    float intensity = 1.0 - uProgress;
                    color = mix(color, uColMagenta, intensity * fresnel * 1.5);
                }
                gl_FragColor = vec4(color, 0.8 * fresnel + 0.2);
            }
        `
    });

    var branchMaterial = new THREE.ShaderMaterial({
      uniforms: Object.assign({}, uniforms, { uIsAxon: { value: 0 } }),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexShader: `
            ${shaderNoise}
            uniform float uTime;
            varying vec3 vWorldPos;
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            varying vec2 vUv;

            void main() {
                vUv = uv;
                vec3 pos = position;
                float wiggle = snoise(pos * 0.2 + uTime * 0.5) * 0.1;
                pos += normal * wiggle;
                vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
                vWorldPos = worldPosition.xyz;
                vNormal = normalize(normalMatrix * normal);
                vec4 mvPosition = viewMatrix * worldPosition;
                vViewPosition = -mvPosition.xyz;
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
      fragmentShader: `
            ${shaderNoise}
            uniform float uTime;
            uniform int uPhase;
            uniform float uProgress;
            uniform int uIsAxon;

            uniform vec3 uColCyan;
            uniform vec3 uColBlue;
            uniform vec3 uColGold;
            uniform vec3 uColOrange;
            uniform vec3 uColMagenta;
            uniform vec3 uColViolet;

            uniform float uSomaRadius;
            uniform float uMaxDistDendrite;
            uniform float uMaxDistAxon;

            varying vec3 vWorldPos;
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            varying vec2 vUv;

            void main() {
                vec3 normal = normalize(vNormal);
                vec3 viewDir = normalize(vViewPosition);
                float edge = pow(1.0 - abs(vUv.y - 0.5) * 2.0, 2.0);
                float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.0);
                float dist = length(vWorldPos);
                vec3 baseColor = mix(uColBlue * 0.1, uColCyan * 0.5, fresnel * edge);
                vec3 pulseColor = vec3(0.0);
                float flowNoise = snoise(vec3(vUv.x * 20.0 - uTime * 2.0, vUv.y * 10.0, uTime)) * 0.5 + 0.5;
                float axialFlow = 0.65 + 0.35 * sin(vUv.x * 34.0 - uTime * 8.0);
                if (uIsAxon == 0) {
                    if (uPhase == 1) {
                        float currentWaveDist = mix(uMaxDistDendrite, uSomaRadius, uProgress);
                        float head = 1.0 - smoothstep(0.0, 2.3, abs(dist - currentWaveDist));
                        float outerTrail = step(currentWaveDist, dist) * exp(-(dist - currentWaveDist) * 0.18);
                        float mergeGlow = (1.0 - smoothstep(uSomaRadius, uSomaRadius + 8.0, dist)) * smoothstep(0.65, 1.0, uProgress);
                        float pulse = max(head * 1.6, outerTrail * 0.65) + mergeGlow * 0.8;
                        pulseColor = uColGold * pulse * flowNoise * axialFlow * 3.2;
                    }
                } else {
                    if (uPhase == 3) {
                        float currentWaveDist = mix(uSomaRadius, uMaxDistAxon + 18.0, uProgress);
                        float head = 1.0 - smoothstep(0.0, 3.4, abs(dist - currentWaveDist));
                        float innerTrail = step(dist, currentWaveDist) * exp(-(currentWaveDist - dist) * 0.1);
                        float somaLaunch = (1.0 - smoothstep(uSomaRadius, uSomaRadius + 7.0, dist)) * (1.0 - smoothstep(0.0, 0.28, uProgress));
                        float pulse = max(head * 2.0, innerTrail * 0.9) + somaLaunch * 1.2;
                        pulseColor = (uColOrange + uColGold * 0.45) * pulse * flowNoise * axialFlow * 4.6;
                    }
                }
                if (uPhase == 4) {
                    float intensity = 1.0 - uProgress;
                    pulseColor += uColViolet * intensity * edge * 1.5;
                }
                gl_FragColor = vec4(baseColor + pulseColor, 1.0);
            }
        `
    });

    var axonMaterial = branchMaterial.clone();
    Object.keys(uniforms).forEach(function (key) {
      axonMaterial.uniforms[key] = uniforms[key];
    });
    axonMaterial.uniforms.uIsAxon = { value: 1 };

    var networkGroup = new THREE.Group();
    scene.add(networkGroup);

    var somaGeo = new THREE.IcosahedronGeometry(CONFIG.somaRadius, 32);
    var somaMesh = new THREE.Mesh(somaGeo, somaMaterial);
    networkGroup.add(somaMesh);

    var coreGeo = new THREE.IcosahedronGeometry(CONFIG.somaRadius * 0.8, 16);
    var coreMat = new THREE.MeshBasicMaterial({
      color: CONFIG.colors.cyan,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
      wireframe: true
    });
    networkGroup.add(new THREE.Mesh(coreGeo, coreMat));

    function buildBranch(startPt, dir, length, radius, level, maxLevels, isAxon) {
      var segments = 12;
      var points = [startPt.clone()];
      var cur = startPt.clone();
      var cDir = dir.clone();

      for (var i = 0; i < segments; i++) {
        var curl = new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).multiplyScalar(isAxon ? 0.3 : 0.8);
        cDir.add(curl).normalize();
        cur.add(cDir.clone().multiplyScalar(length / segments));
        points.push(cur.clone());
      }

      var curve = new THREE.CatmullRomCurve3(points);
      var tubeGeo = new THREE.TubeGeometry(curve, segments * 2, radius, 6, false);
      var mesh = new THREE.Mesh(tubeGeo, isAxon ? axonMaterial : branchMaterial);
      networkGroup.add(mesh);

      if (level < maxLevels) {
        var childCount = isAxon ? (Math.random() > 0.3 ? 1 : 2) : (Math.random() > 0.2 ? 2 : 3);
        for (var j = 0; j < childCount; j++) {
          var splitDir = cDir.clone().add(new THREE.Vector3(
            Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5
          ).multiplyScalar(0.8)).normalize();

          buildBranch(
            cur,
            splitDir,
            length * (0.6 + Math.random() * 0.3),
            radius * 0.65,
            level + 1,
            maxLevels,
            isAxon
          );
        }
      } else {
        addSynapse(cur);
      }
    }

    var synapsePositions = [];
    function addSynapse(pos) {
      synapsePositions.push(pos.x, pos.y, pos.z);
    }

    for (var d = 0; d < CONFIG.dendriteTrees; d++) {
      var dDir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      if (dDir.z > 0.3) dDir.z -= 0.8;
      dDir.normalize();
      var dStart = dDir.clone().multiplyScalar(CONFIG.somaRadius - 0.5);
      buildBranch(dStart, dDir, 12 + Math.random() * 5, 0.4, 0, 2, false);
    }

    for (var a = 0; a < CONFIG.axonTrees; a++) {
      var aDir = new THREE.Vector3((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, 1.0).normalize();
      var aStart = aDir.clone().multiplyScalar(CONFIG.somaRadius - 0.5);
      buildBranch(aStart, aDir, 25 + Math.random() * 10, 0.6, 0, 2, true);
    }

    var synGeo = new THREE.BufferGeometry();
    synGeo.setAttribute('position', new THREE.Float32BufferAttribute(synapsePositions, 3));

    var synSizes = new Float32Array(synapsePositions.length / 3);
    for (var s = 0; s < synSizes.length; s++) synSizes[s] = Math.random();
    synGeo.setAttribute('aSize', new THREE.BufferAttribute(synSizes, 1));

    var synMat = new THREE.ShaderMaterial({
      uniforms: uniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexShader: `
            attribute float aSize;
            uniform float uTime;
            varying float vSize;
            void main() {
                vSize = aSize;
                vec3 pos = position;
                pos.y += sin(uTime * 2.0 + pos.x) * 0.5;
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = (20.0 + aSize * 15.0) * (100.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
      fragmentShader: `
            uniform int uPhase;
            uniform float uProgress;
            uniform vec3 uColCyan;
            uniform vec3 uColGold;
            uniform vec3 uColMagenta;
            varying float vSize;

            void main() {
                vec2 coord = gl_PointCoord - vec2(0.5);
                float dist = length(coord);
                if (dist > 0.5) discard;
                float alpha = (0.5 - dist) * 2.0;
                vec3 color = uColCyan * 0.5;
                if (uPhase == 1 || uPhase == 3) {
                    float spark = step(0.8, fract(vSize * 10.0 + uProgress * 5.0));
                    color = mix(color, uColGold, spark * 2.0);
                } else if (uPhase == 4) {
                    color = mix(color, uColMagenta, (1.0 - uProgress));
                }
                gl_FragColor = vec4(color, alpha);
            }
        `
    });
    var synapses = new THREE.Points(synGeo, synMat);
    networkGroup.add(synapses);

    var dustGeo = new THREE.BufferGeometry();
    var dustCount = 800;
    var dustPos = new Float32Array(dustCount * 3);
    for (var k = 0; k < dustCount * 3; k++) {
      dustPos[k] = (Math.random() - 0.5) * 150;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    var dustMat = new THREE.PointsMaterial({
      color: CONFIG.colors.cyan,
      size: 0.2,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    var dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    networkGroup.rotation.y = -0.6;

    var clock = new THREE.Clock();
    var rafId = 0;
    var running = false;
    var visible = false;

    function applySize() {
      var w = Math.max(1, mount.clientWidth);
      var h = Math.max(1, mount.clientHeight);
      var compact = w < 620;

      baseCameraPos = (compact ? mobileCamera : desktopCamera).clone();

      camera.aspect = w / h;
      camera.fov = compact ? 52 : 45;
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compact ? 1.5 : 2));
      renderer.setSize(w, h, false);
      composer.setSize(w, h);

      if (!STATE.isAnimating) camera.position.copy(baseCameraPos);
      camera.lookAt(0, 0, 0);
    }

    function renderStill() {
      uniforms.uTime.value = 0;
      camera.lookAt(0, 0, 0);
      composer.render();
    }

    function frame() {
      if (!running) return;
      rafId = window.requestAnimationFrame(frame);

      var dt = Math.min(clock.getDelta(), 0.05);
      var time = clock.getElapsedTime();
      uniforms.uTime.value = time;

      if (STATE.dragging) {
        STATE.spinX = 0;
        STATE.spinY = 0;
      } else {
        /* auto-spin + leftover momentum from the last drag */
        networkGroup.rotation.y += dt * 0.12 + STATE.spinY;
        networkGroup.rotation.x = Math.max(-1.15, Math.min(1.15, networkGroup.rotation.x + STATE.spinX));
        STATE.spinY *= 0.94;
        STATE.spinX *= 0.90;
        /* gently settle the tilt back toward the horizon */
        networkGroup.rotation.x += (0 - networkGroup.rotation.x) * 0.012;
      }
      networkGroup.position.y = Math.sin(time * 0.5) * 0.6;
      dust.rotation.y = time * 0.02;
      dust.rotation.x = Math.sin(time * 0.01) * 0.05;

      if (STATE.isAnimating) {
        var speed = STATE.phase === 1 ? 0.8 : STATE.phase === 2 ? 2.5 : STATE.phase === 3 ? 0.95 : 0.5;
        STATE.progress += dt * speed;

        if (STATE.progress >= 1.0) {
          STATE.progress = 0;
          STATE.phase++;

          if (STATE.phase === 2) {
            camera.position.copy(baseCameraPos).multiplyScalar(0.85);
            bloomPass.strength = 2.5;
          }
          if (STATE.phase === 3) {
            camera.position.copy(baseCameraPos).multiplyScalar(1.2);
          }
          if (STATE.phase > 4) {
            STATE.phase = 0;
            STATE.isAnimating = false;
            camera.position.copy(baseCameraPos);
          }
        }
      } else {
        bloomPass.strength += (1.8 - bloomPass.strength) * 0.05;
      }

      camera.lookAt(0, 0, 0);
      uniforms.uPhase.value = STATE.phase;
      uniforms.uProgress.value = STATE.progress;

      composer.render();
    }

    function start() {
      if (running || reduceMotion) return;
      running = true;
      clock.getDelta();
      frame();
    }

    function stop() {
      if (!running) return;
      running = false;
      window.cancelAnimationFrame(rafId);
    }

    function triggerImpulse() {
      if (reduceMotion || STATE.isAnimating) return;
      STATE.isAnimating = true;
      STATE.phase = 1;
      STATE.progress = 0;
    }

    /* ---- Interaction: drag anywhere on the card to spin the model,
            a plain click still fires the neural pulse ---- */
    var card = mount.closest ? mount.closest('.chat-card') : null;
    var drag = { active: false, id: null, x: 0, y: 0, vx: 0, vy: 0, moved: false };

    function isControl(el) {
      return !!(el && el.closest && el.closest('a, button, input, textarea, select'));
    }

    /* never hijack a drag that starts on the message list scrollbar */
    function onScrollbarEdge(el, clientX) {
      if (!el || !el.closest) return false;
      var box = el.closest('.chat-messages');
      if (!box) return false;
      return clientX > box.getBoundingClientRect().right - 18;
    }

    function endDrag(pointerId) {
      if (!drag.active) return;
      if (pointerId != null && pointerId !== drag.id) return;
      drag.active = false;
      drag.id = null;
      STATE.dragging = false;
      if (card) card.classList.remove('is-dragging');
    }

    if (card) {
      card.addEventListener('pointerdown', function (e) {
        if (isControl(e.target)) return;
        /* on touch, let the message list keep its scroll gesture */
        var touchScroll = e.pointerType === 'touch' && e.target.closest && e.target.closest('.chat-messages');
        if (touchScroll || onScrollbarEdge(e.target, e.clientX)) return;

        drag.active = true;
        drag.id = e.pointerId;
        drag.x = e.clientX;
        drag.y = e.clientY;
        drag.vx = 0;
        drag.vy = 0;
        drag.moved = false;
        STATE.dragging = true;
        STATE.spinX = 0;
        STATE.spinY = 0;
        card.classList.add('is-dragging');
        if (card.setPointerCapture) {
          try { card.setPointerCapture(e.pointerId); } catch (err) {}
        }
        e.preventDefault();
      });

      card.addEventListener('pointermove', function (e) {
        if (!drag.active || e.pointerId !== drag.id) return;
        var dx = e.clientX - drag.x;
        var dy = e.clientY - drag.y;
        drag.x = e.clientX;
        drag.y = e.clientY;
        if (Math.abs(dx) + Math.abs(dy) > 1) drag.moved = true;

        drag.vy = dx * 0.006;
        drag.vx = dy * 0.004;
        networkGroup.rotation.y += drag.vy;
        networkGroup.rotation.x = Math.max(-1.15, Math.min(1.15, networkGroup.rotation.x + drag.vx));
        if (reduceMotion) renderStill();
      });

      card.addEventListener('pointerup', function (e) {
        if (!drag.active || e.pointerId !== drag.id) return;
        var wasDrag = drag.moved;
        var vx = drag.vx;
        var vy = drag.vy;
        endDrag(e.pointerId);
        if (!wasDrag) {
          triggerImpulse();
        } else {
          STATE.spinY = vy * 0.9;
          STATE.spinX = vx * 0.6;
        }
      });

      card.addEventListener('pointercancel', function (e) { endDrag(e.pointerId); });
      card.addEventListener('lostpointercapture', function () { endDrag(null); });
    }

    applySize();

    if (reduceMotion) {
      renderStill();
      return;
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          visible = entry.isIntersecting;
          if (visible) start(); else stop();
        });
      }, { threshold: 0.05 });
      io.observe(mount);
    } else {
      visible = true;
      start();
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
      else if (visible) start();
    });

    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(function () { applySize(); });
      ro.observe(mount);
    } else {
      window.addEventListener('resize', function () { applySize(); });
    }
  }
})();

/* =========================================================
   4.4.0 / 4.4.1 — What I Like · photo wall lightbox
   Click a tile to open the photo; close with the button,
   a click on the backdrop, or Esc.

   The grid only ships small thumbnails (images/thumbs/…) which
   CSS crops to the tile shape; the lightbox deliberately loads
   the matching full photo from data-full, so what opens is the
   complete, uncropped frame, only scaled down to fit the screen.
   ========================================================= */
(function () {
  var wall = document.getElementById('photoWall');
  var box = document.getElementById('lightbox');
  if (!wall || !box) return;

  var boxImg = box.querySelector('.lightbox-img');
  var closeBtn = box.querySelector('.lightbox-close');
  if (!boxImg || !closeBtn) return;

  var lastFocus = null;

  function open(tile) {
    if (tile.classList.contains('is-empty')) return;
    var thumb = tile.querySelector('img');
    if (!thumb) return;
    lastFocus = document.activeElement;
    boxImg.src = thumb.getAttribute('data-full') || thumb.currentSrc || thumb.src;
    boxImg.alt = thumb.alt || '';
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    boxImg.removeAttribute('src');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  wall.addEventListener('click', function (event) {
    var tile = event.target.closest('.photo-tile');
    if (tile && wall.contains(tile)) open(tile);
  });

  closeBtn.addEventListener('click', close);

  box.addEventListener('click', function (event) {
    if (event.target === box) close();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && box.classList.contains('is-open')) close();
  });
})();
