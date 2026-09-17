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

  if (document.fonts?.ready) await document.fonts.ready;

  const styles = getComputedStyle(el);
  const font = `${styles.fontStyle} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = font;

  // Keep each character in its original target width. Random glyphs are
  // visually scaled to fit that slot, so the sentence stays compact and stable.
  const letterSpacing = parseFloat(styles.letterSpacing) || 0;

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
      slots.forEach((slot, i) => { slot.textContent = target[i]; slot.style.transform = "scaleX(1)"; });
    }
  };

  requestAnimationFrame(render);
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
