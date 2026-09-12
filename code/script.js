/* ===========================================================
   Old Tree Cafe — everything the page does.

   Contents
     1.  CAFE      the cafe's details — edit these, not the HTML
     2.  MENU      the whole menu, as one editable list
     3.  REVIEWS   guest quotes for the carousel
     4.  clock     open/closed pill, time-of-day, today's row
     5.  canopy    the interactive leaves and light behind the hero
     6.  chrome    mobile nav, sticky header, scroll-spy
     7.  reveal    sections fading in, numbers counting up
     8.  menu      tabs, course filter, rendering
     9.  lightbox  the fullscreen gallery
     10. carousel  the reviews slider
     11. booking   the form that writes a WhatsApp message
     12. selftest  add ?selftest to the address to run the checks
     13. splash    the OTC letters over the splash photo
     14. events    one listener behind every data-ev hook

   No libraries. Everything here is built into the browser.
   =========================================================== */

document.documentElement.classList.add('js');

/* Pick one out of a row of buttons. .is-on carries the look;
   aria-pressed carries the same fact to a screen reader, which
   otherwise hears no difference between chosen and not. */
function selectOne(buttons, chosen) {
  buttons.forEach(b => {
    const on = b === chosen;
    b.classList.toggle('is-on', on);
    b.setAttribute('aria-pressed', String(on));
  });
}

/* ── 1. CAFE ─────────────────────────────────────────────── */

const CAFE = {
  phone: '918019409347',        // country code + number, digits only
  openMinute: 10 * 60,          // 10:00
  closeMinute: 23 * 60,         // 23:00
  timeZone: 'Asia/Kolkata',
  firstSlot: 11,                // earliest bookable hour
  lastSlot: 22                  // latest bookable hour
};

/* ── 2. MENU ─────────────────────────────────────────────────
   Shape:  Tab → Course → [ dish, price, 'v' or 'n', 'pick'? ]
     'v'     vegetarian        'n'  non-vegetarian
     'pick'  optional 4th item, shows the small outlined badge

   TODO (Aditya): only the five teas are real prices, taken from
   the cafe's live delivery listing. Photograph their menu card
   and retype the rest before showing this to the owner.        */

const MENU = {
  Food: {
    'All-day breakfast': [
      ['Big Tree breakfast — eggs, sausage, hash, toast', 385, 'n', 'pick'],
      ['Shakshuka with sourdough', 340, 'v'],
      ['Banana pancake stack, maple butter', 295, 'v'],
      ['Avocado toast, chilli and lime', 320, 'v'],
      ['Masala omelette and buttered toast', 210, 'v'],
      ['Akuri on toast', 260, 'v'],
      ['Granola, curd and honey', 240, 'v']
    ],
    'From the garden': [
      ['Greek salad, feta and olives', 330, 'v'],
      ['Caesar salad', 320, 'v'],
      ['Caesar salad with grilled chicken', 390, 'n'],
      ['Roast pumpkin and quinoa bowl', 360, 'v', 'pick'],
      ['Garden soup of the day', 220, 'v']
    ],
    'Wood-fired pizza': [
      ['Margherita', 380, 'v'],
      ['Farmhouse — mushroom, olive, capsicum', 450, 'v'],
      ['Four cheese', 520, 'v', 'pick'],
      ['Peri peri chicken', 490, 'n'],
      ['Chicken tikka', 490, 'n'],
      ['Pepperoni', 540, 'n']
    ],
    'Burgers & sandwiches': [
      ['Old Tree veg burger', 320, 'v'],
      ['Crispy chicken burger', 390, 'n', 'pick'],
      ['Grilled club sandwich', 300, 'v'],
      ['Chicken club sandwich', 350, 'n'],
      ['Paneer tikka panini', 310, 'v']
    ],
    'Pasta & mains': [
      ['Penne arrabbiata', 380, 'v'],
      ['Alfredo, veg', 400, 'v'],
      ['Alfredo, chicken', 460, 'n'],
      ['Mushroom risotto', 440, 'v'],
      ['Grilled chicken, herb butter, greens', 520, 'n', 'pick'],
      ['Lasagne al forno', 480, 'v']
    ],
    'Small plates': [
      ['Peri peri fries', 200, 'v'],
      ['Garlic bread with cheese', 240, 'v'],
      ['Chilli paneer, dry', 320, 'v'],
      ['Chicken wings, six', 360, 'n', 'pick'],
      ['Nachos with salsa and cheese', 300, 'v'],
      ['Crispy corn', 280, 'v']
    ]
  },

  Drinks: {
    'Tea': [
      ['English breakfast black tea', 144, 'v'],
      ['Lemongrass ginger black tea', 150, 'v', 'pick'],
      ['Lemon and honey tea', 150, 'v'],
      ['Immunity booster herbal tea', 150, 'v'],
      ['Ginger mint lemon tea', 150, 'v'],
      ['Masala chai', 120, 'v']
    ],
    'Coffee': [
      ['Espresso', 140, 'v'],
      ['Cappuccino', 180, 'v'],
      ['Flat white', 190, 'v'],
      ['Cafe latte', 190, 'v'],
      ['Cold coffee', 220, 'v', 'pick'],
      ['Affogato', 260, 'v']
    ],
    'Coolers & shakes': [
      ['Fresh lime soda', 140, 'v'],
      ['Virgin mojito', 200, 'v'],
      ['Green apple cooler', 220, 'v'],
      ['Cold chocolate shake', 260, 'v'],
      ['Oreo shake', 270, 'v'],
      ['Seasonal fruit smoothie', 250, 'v']
    ]
  },

  Sweet: {
    'Desserts': [
      ['Molten chocolate cake', 280, 'v', 'pick'],
      ['Tiramisu', 300, 'v'],
      ['Cheesecake of the day', 290, 'v'],
      ['Brownie with vanilla ice cream', 270, 'v'],
      ['Banoffee pie', 290, 'v'],
      ['Ice cream, two scoops', 180, 'v']
    ]
  }
};

/* ── 3. REVIEWS ──────────────────────────────────────────────
   NOT quotations. Every line below is our own wording, written
   to match the themes that recur in the cafe's Google reviews —
   the garden, the evening lights, the desserts, the dogs.

   Nothing on the page claims otherwise, and it must stay that
   way. The heading reads "what people tend to say", the note
   under it says the wording is ours, and `who` names the theme,
   never a reviewer. The one hard number on the page — 4.6 from
   1,100+ ratings — is real and is linked to Google.

   To switch to real reviews: paste the verbatim text into
   `quote`, put the reviewer's display name in `who`, and change
   the heading and note in index.html to match.               */

const REVIEWS = [
  { stars: 5, quote: 'The plant-covered seating area is the point. You forget the highway is right there.', who: 'On the garden' },
  { stars: 5, quote: 'Come for a coffee, stay three hours. The garden in the evening, once the lights are on, is what brings people back.', who: 'On the evenings' },
  { stars: 4, quote: 'Desserts are the strong suit, and the staff are patient with a large group.', who: 'On the food' },
  { stars: 5, quote: 'One of the few places around Kompally where nobody minds you bringing the dog.', who: 'On bringing a dog' },
  { stars: 4, quote: 'Quiet on a weekday afternoon. Busy on a Friday night, when there is music.', who: 'On when to come' }
];

/* ── 4. clock ────────────────────────────────────────────────
   Everything here reads the time in Hyderabad, not on the
   visitor's device, so it stays right for someone browsing
   from another country.                                       */

function istParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: CAFE.timeZone,
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23', weekday: 'long'
  }).formatToParts(date);
  const find = type => parts.find(p => p.type === type).value;
  return {
    minutes: Number(find('hour')) * 60 + Number(find('minute')),
    weekday: find('weekday')
  };
}

function isOpenAt(minute) {
  return minute >= CAFE.openMinute && minute < CAFE.closeMinute;
}

/* which light the hero is painted in */
function phaseFor(minute) {
  if (minute < 6 * 60 || minute >= 20 * 60) return 'night';
  if (minute >= 18 * 60 + 30) return 'dusk';
  if (minute >= 15 * 60) return 'golden';
  return 'morning';
}

function initClock() {
  const { minutes, weekday } = istParts();

  document.documentElement.dataset.phase = phaseFor(minutes);

  const pill = document.getElementById('status');
  if (pill) {
    const open = isOpenAt(minutes);
    pill.hidden = false;
    pill.dataset.open = open ? 'yes' : 'no';
    pill.textContent = open ? 'Open now · closes 11:00 PM' : 'Closed · opens 10:00 AM';
  }

  document.querySelectorAll('.hours tbody tr').forEach(row => {
    if (row.querySelector('th').textContent.trim() === weekday) row.classList.add('is-today');
  });
}

/* ── 5. canopy ───────────────────────────────────────────────
   The hero background, on one canvas, in three layers:

     light   soft blobs drifting the way sun moves through leaves.
             Their colour comes from the --wash-* variables in
             styles.css, which change with the hour in Hyderabad.
     glow    a warm pool that follows the pointer, like a lamp
             carried under the tree.
     leaves  they fall slowly, and scatter away from the pointer.
             Move the mouse quickly and they get pushed along with
             it, then settle back into the drift.

   All of it stops for anyone who has "reduce motion" switched on,
   and the loop pauses whenever the hero is scrolled out of view.  */

function initCanopy() {
  const canvas = document.getElementById('dapple');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const blobs = [];
  const leaves = [];
  let width = 0, height = 0, frame = 0, running = true;

  // Pointer: where it is, how fast it is moving, and how present it
  // is. `near` fades the whole interaction in and out so that
  // nothing snaps when the cursor arrives or leaves.
  const pointer = { x: -999, y: -999, gx: -999, gy: -999, vx: 0, vy: 0, near: 0 };
  const REACH = 190;          // how far the push carries, in pixels

  function readColour(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return /^#[0-9a-f]{6}$/i.test(v) ? v : fallback;
  }

  function rgba(hex, alpha) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${n >> 16 & 255}, ${n >> 8 & 255}, ${n & 255}, ${alpha})`;
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seed() {
    const small = width < 700;

    blobs.length = 0;
    for (let i = 0; i < (small ? 7 : 12); i++) {
      blobs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 80 + Math.random() * 220,
        vx: (Math.random() - 0.5) * 0.16,   // about a pixel a second
        vy: (Math.random() - 0.5) * 0.10,
        warm: Math.random() > 0.45
      });
    }

    leaves.length = 0;
    for (let i = 0; i < (small ? 18 : 34); i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 9 + Math.random() * 16,
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.006,
        vx: 0,
        vy: 0,
        fall: 0.10 + Math.random() * 0.16,   // its own drift downwards
        sway: 0.4 + Math.random() * 0.7,     // how wide it swings
        phase: Math.random() * Math.PI * 2,
        pale: Math.random() > 0.6
      });
    }
  }

  /* One leaf, drawn at the origin — two curves and a midrib. */
  function leafPath(size) {
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.quadraticCurveTo(size * 0.72, -size * 0.12, 0, size);
    ctx.quadraticCurveTo(-size * 0.72, -size * 0.12, 0, -size);
    ctx.closePath();
  }

  function draw() {
    const warm = readColour('--wash-a', '#7FB05A');
    const cool = readColour('--wash-b', '#CFE0A8');
    const leafColour = readColour('--leaf', '#47732C');
    const strength = parseFloat(getComputedStyle(document.documentElement)
      .getPropertyValue('--wash-strength')) || 0.2;

    ctx.clearRect(0, 0, width, height);

    // light
    for (const blob of blobs) {
      const colour = blob.warm ? warm : cool;
      const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
      grad.addColorStop(0, rgba(colour, strength));
      grad.addColorStop(1, rgba(colour, 0));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // the pool of light under the pointer
    if (pointer.near > 0.01) {
      const r = REACH * 1.5;
      const grad = ctx.createRadialGradient(pointer.gx, pointer.gy, 0, pointer.gx, pointer.gy, r);
      grad.addColorStop(0, rgba(warm, strength * 0.9 * pointer.near));
      grad.addColorStop(1, rgba(warm, 0));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(pointer.gx, pointer.gy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // leaves
    for (const leaf of leaves) {
      const colour = leaf.pale ? cool : leafColour;
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rot);
      ctx.fillStyle = rgba(colour, leaf.pale ? 0.18 : 0.24);
      leafPath(leaf.size);
      ctx.fill();
      ctx.strokeStyle = rgba(colour, 0.28);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -leaf.size);
      ctx.lineTo(0, leaf.size);
      ctx.stroke();
      ctx.restore();
    }
  }

  function wrap(item, edge) {
    if (item.x < -edge) item.x = width + edge;
    if (item.x > width + edge) item.x = -edge;
    if (item.y < -edge) item.y = height + edge;
    if (item.y > height + edge) item.y = -edge;
  }

  function step() {
    frame++;

    for (const blob of blobs) {
      blob.x += blob.vx;
      blob.y += blob.vy;
      wrap(blob, blob.r);
    }

    // The pointer speed decays, so a flick pushes the leaves and then
    // stops pushing. The glow lags a few frames behind the cursor.
    pointer.vx *= 0.88;
    pointer.vy *= 0.88;
    pointer.gx += (pointer.x - pointer.gx) * 0.12;
    pointer.gy += (pointer.y - pointer.gy) * 0.12;

    for (const leaf of leaves) {
      const dx = leaf.x - pointer.x;
      const dy = leaf.y - pointer.y;
      const dist = Math.hypot(dx, dy);

      if (pointer.near > 0.01 && dist < REACH && dist > 0.5) {
        const force = (1 - dist / REACH) * pointer.near;
        leaf.vx += (dx / dist) * force * 0.55 + pointer.vx * force * 0.05;
        leaf.vy += (dy / dist) * force * 0.55 + pointer.vy * force * 0.05;
        leaf.spin += (dx > 0 ? 1 : -1) * force * 0.0016;
      }

      // settle back towards the resting drift
      leaf.vx *= 0.93;
      leaf.vy *= 0.93;
      leaf.spin *= 0.985;

      leaf.x += leaf.vx + Math.sin(frame * 0.006 + leaf.phase) * leaf.sway * 0.4;
      leaf.y += leaf.vy + leaf.fall;
      leaf.rot += leaf.spin + 0.0008;
      wrap(leaf, leaf.size * 2);
    }

    draw();
    if (running) requestAnimationFrame(step);
  }

  resize();
  seed();

  if (still) { draw(); return; }

  // The canvas is pinned to the viewport, so a pointer position in
  // page coordinates is already a position on the canvas — no need
  // to measure anything on every mouse move.
  document.addEventListener('pointermove', e => {
    const x = e.clientX;
    const y = e.clientY;
    if (pointer.near === 0) { pointer.gx = x; pointer.gy = y; }  // no swoop in
    pointer.vx += (x - pointer.x) * 0.5;
    pointer.vy += (y - pointer.y) * 0.5;
    pointer.x = x;
    pointer.y = y;
    pointer.near = 1;
  }, { passive: true });

  document.documentElement.addEventListener('pointerleave', () => {
    pointer.near = 0;
    pointer.x = pointer.y = -999;
  });

  // Stop the loop when the tab is in the background. An animation
  // nobody is looking at is what drains a phone battery.
  document.addEventListener('visibilitychange', () => {
    const visible = !document.hidden;
    if (visible && !running) { running = true; requestAnimationFrame(step); }
    running = visible;
  });

  requestAnimationFrame(step);

  // On a phone, scrolling collapses the address bar and fires resize.
  // Re-seeding there would re-scatter every leaf mid-scroll, so only
  // a real change of width starts the canopy over.
  let timer;
  let lastWidth = width;
  addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const changed = Math.abs(canvas.getBoundingClientRect().width - lastWidth) > 1;
      resize();
      if (changed) { seed(); lastWidth = width; }
    }, 200);
  });
}

/* ── 6. chrome ───────────────────────────────────────────────
   Mobile nav, the hairline that appears under the header once
   you scroll, and the nav link that marks where you are.      */

function initChrome() {
  const head = document.getElementById('head');
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  if (!head || !nav || !toggle) return;

  const links = [...nav.querySelectorAll('a')];
  const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  let queued = false;
  function onScroll() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      head.classList.toggle('is-stuck', scrollY > 8);

      // the section whose top has most recently passed the header
      const line = scrollY + head.offsetHeight + 24;
      let current = null;
      for (const section of sections) {
        if (section.offsetTop <= line) current = section;
      }
      links.forEach(a => {
        a.classList.toggle('is-here', current && a.getAttribute('href') === '#' + current.id);
      });
    });
  }

  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── 7. reveal ───────────────────────────────────────────────
   Sections lift into place as they come into view, and any
   number marked data-count runs up to its value once.         */

function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(t => t.classList.add('is-in'));
    document.querySelectorAll('[data-count]').forEach(countUp);
    return;
  }

  const observer = new IntersectionObserver((entries, self) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      entry.target.querySelectorAll('[data-count]').forEach(countUp);
      self.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -12% 0px' });

  targets.forEach(t => observer.observe(t));
  // The hero is above the fold, so its numbers run straight away.
  document.querySelectorAll('.hero [data-count]').forEach(countUp);
}

function countUp(el) {
  if (el.dataset.counted) return;
  el.dataset.counted = '1';

  const target = parseFloat(el.dataset.count);
  const dp = Number(el.dataset.dp || 0);
  const suffix = el.dataset.suffix || '';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const start = performance.now();
  const duration = 900;

  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = (target * eased).toFixed(dp) + (t === 1 ? suffix : '');
    if (t < 1) requestAnimationFrame(frame);
  }
  el.textContent = (0).toFixed(dp);
  requestAnimationFrame(frame);
}

/* ── 8. menu ─────────────────────────────────────────────── */

function initMenu() {
  const tabBar = document.getElementById('menu-tabs');
  const subBar = document.getElementById('menu-subtabs');
  const grid = document.getElementById('menu-grid');
  if (!tabBar) return;

  const tabs = Object.keys(MENU);
  let activeTab = tabs[0];
  let activeCourse = 'Everything';

  function dishRow([name, price, kind, badge]) {
    return `<li>
      <span class="mark mark-${kind}" aria-label="${kind === 'v' ? 'vegetarian' : 'non-vegetarian'}"></span>
      <span class="dish">${name}</span>
      ${badge ? '<span class="pick">Pick</span>' : ''}
      <span class="price">₹${price}</span>
    </li>`;
  }

  // Veg above, non-veg below. filter() keeps the order each dish is
  // written in, so the MENU list stays the one place you edit. The
  // heading only appears where a course actually holds both — on an
  // all-veg course it would be labelling the obvious.
  const group = (label, items) =>
    `<h4 class="course-group">${label}</h4><ul>${items.map(dishRow).join('')}</ul>`;

  function courseList(list) {
    const veg = list.filter(d => d[2] === 'v');
    const non = list.filter(d => d[2] === 'n');
    return veg.length && non.length
      ? group('Vegetarian', veg) + group('Non-vegetarian', non)
      : `<ul>${list.map(dishRow).join('')}</ul>`;
  }

  function paint() {
    const courses = MENU[activeTab];
    const showing = activeCourse === 'Everything'
      ? Object.keys(courses)
      : [activeCourse];

    grid.classList.add('is-swapping');
    setTimeout(() => {
      grid.innerHTML = showing.map(course => `
        <div class="course">
          <h3>${course}</h3>
          ${courseList(courses[course])}
        </div>`).join('');
      grid.classList.remove('is-swapping');
    }, 180);
  }

  function paintSubtabs() {
    const names = ['Everything', ...Object.keys(MENU[activeTab])];
    subBar.innerHTML = names
      .map(n => `<button type="button" aria-pressed="${n === activeCourse}"${n === activeCourse ? ' class="is-on"' : ''}>${n}</button>`)
      .join('');
  }

  tabBar.innerHTML = tabs
    .map(t => `<button type="button" role="tab" aria-selected="${t === activeTab}">${t}</button>`)
    .join('');

  tabBar.addEventListener('click', e => {
    const button = e.target.closest('button');
    if (!button || button.textContent === activeTab) return;
    activeTab = button.textContent;
    activeCourse = 'Everything';
    tabBar.querySelectorAll('button').forEach(b =>
      b.setAttribute('aria-selected', String(b === button)));
    paintSubtabs();
    paint();
  });

  subBar.addEventListener('click', e => {
    const button = e.target.closest('button');
    if (!button) return;
    activeCourse = button.textContent;
    selectOne(subBar.querySelectorAll('button'), button);
    paint();
  });

  paintSubtabs();
  paint();
}

/* ── 9. lightbox ─────────────────────────────────────────── */

function initLightbox() {
  const box = document.getElementById('lightbox');
  const stage = document.getElementById('lb-img');
  const caption = document.getElementById('lb-cap');
  const grid = document.getElementById('gallery-grid');
  if (!box || !grid) return;

  const shots = [...grid.querySelectorAll('.shot')];

  // The button's only content is the photo, so with no photo on disk
  // it has no name at all. The caption is the name either way.
  shots.forEach(s => s.setAttribute('aria-label', s.dataset.cap));

  let index = 0;
  let opener = null;

  function show(i) {
    index = (i + shots.length) % shots.length;
    const shot = shots[index];
    const img = shot.querySelector('img');
    // Works with the placeholders now, and with real photos later.
    stage.innerHTML = img ? `<img src="${img.src}" alt="${img.alt}">` : '';
    stage.style.animation = 'none';
    void stage.offsetWidth;          // restart the pop-in
    stage.style.animation = '';
    caption.textContent = shot.dataset.cap || '';
  }

  function open(i, from) {
    opener = from;
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    show(i);
    document.getElementById('lb-close').focus();
  }

  function close() {
    box.hidden = true;
    document.body.style.overflow = '';
    if (opener) opener.focus();
  }

  shots.forEach((shot, i) => shot.addEventListener('click', () => open(i, shot)));

  box.addEventListener('click', e => {
    const arrow = e.target.closest('[data-dir]');
    if (arrow) { show(index + Number(arrow.dataset.dir)); return; }
    if (e.target.closest('#lb-close') || e.target === box) close();
  });

  addEventListener('keydown', e => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  });
}

/* ── 10. carousel ────────────────────────────────────────── */

function initCarousel() {
  const wrap = document.getElementById('reviews-carousel');
  const track = document.getElementById('review-slides');
  const dots = document.getElementById('review-dots');
  if (!track) return;

  track.innerHTML = REVIEWS.map((r, i) => `
    <div class="slide${i === 0 ? ' is-on' : ''}">
      <blockquote>
        <p class="stars" aria-label="${r.stars} out of 5">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</p>
        <p class="quote">${r.quote}</p>
        <p class="who">${r.who}</p>
      </blockquote>
    </div>`).join('');

  dots.innerHTML = REVIEWS.map((_, i) =>
    `<button type="button"${i === 0 ? ' class="is-on"' : ''} aria-label="Review ${i + 1}"></button>`).join('');

  const slides = [...track.children];
  const bullets = [...dots.children];
  let at = 0;
  let timer;

  function go(i) {
    at = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('is-on', n === at));
    bullets.forEach((b, n) => b.classList.toggle('is-on', n === at));
  }

  function play() { timer = setInterval(() => go(at + 1), 6000); }
  function pause() { clearInterval(timer); }

  wrap.addEventListener('click', e => {
    const arrow = e.target.closest('.arrow');
    if (arrow) { pause(); go(at + Number(arrow.dataset.dir)); play(); return; }
    const dot = e.target.closest('.dots button');
    if (dot) { pause(); go(bullets.indexOf(dot)); play(); }
  });

  wrap.addEventListener('mouseenter', pause);
  wrap.addEventListener('mouseleave', play);
  wrap.addEventListener('focusin', pause);
  play();
}

/* ── 11. booking ─────────────────────────────────────────────
   No server and no database. The form builds a message and
   hands it to WhatsApp, where the cafe already is all day.    */

function formatTime(hour) {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}:00 ${suffix}`;
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(value) {
  // value is yyyy-mm-dd from the date input.
  // Spelled out by hand for two reasons: the date never shifts by a
  // day across time zones, and the message reads the same whatever
  // language the customer's phone is set to. toLocaleDateString
  // writes "12 Sept 2026" on some devices and "Sep 12" on others.
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return `${DAY_NAMES[date.getDay()]}, ${d} ${MONTH_NAMES[m - 1]} ${y}`;
}

function buildBookingMessage({ name, date, time, guests, seating }) {
  return [
    'Hi Old Tree Cafe, I would like to book a table.',
    '',
    `Name: ${name}`,
    `Date: ${formatDate(date)}`,
    `Time: ${time}`,
    `Guests: ${guests}`,
    `Seating: ${seating}`
  ].join('\n');
}

function whatsappLink(message) {
  return `https://wa.me/${CAFE.phone}?text=${encodeURIComponent(message)}`;
}

function initBooking() {
  const form = document.getElementById('book-form');
  if (!form) return;

  const dateInput = document.getElementById('bk-date');
  const nameInput = document.getElementById('bk-name');
  const guestsOut = document.getElementById('bk-guests');
  const timeBar = document.getElementById('bk-times');
  const seatBar = document.getElementById('bk-seating');
  const error = document.getElementById('bk-error');

  let guests = 2;
  let time = '';
  let seating = 'Garden';

  // Do not let anyone book yesterday.
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: CAFE.timeZone }).format(new Date());
  dateInput.min = today;
  dateInput.value = today;

  timeBar.innerHTML = '';
  for (let h = CAFE.firstSlot; h <= CAFE.lastSlot; h++) {
    const label = formatTime(h);
    timeBar.insertAdjacentHTML('beforeend',
      `<button type="button" class="pill" aria-pressed="false" data-time="${label}">${label}</button>`);
  }

  form.querySelector('.stepper').addEventListener('click', e => {
    const button = e.target.closest('[data-step]');
    if (!button) return;
    guests = Math.min(20, Math.max(1, guests + Number(button.dataset.step)));
    guestsOut.textContent = String(guests);
  });

  timeBar.addEventListener('click', e => {
    const pill = e.target.closest('.pill');
    if (!pill) return;
    time = pill.dataset.time;
    selectOne(timeBar.querySelectorAll('.pill'), pill);
    error.hidden = true;
  });

  seatBar.addEventListener('click', e => {
    const pill = e.target.closest('.pill');
    if (!pill) return;
    seating = pill.dataset.seat;
    selectOne(seatBar.querySelectorAll('.pill'), pill);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = nameInput.value.trim();

    if (!name) return fail('Add a name so the cafe knows who the table is for.', nameInput);
    if (!dateInput.value) return fail('Pick a date.', dateInput);
    if (!time) return fail('Pick a time.', timeBar.querySelector('.pill'));

    error.hidden = true;
    const message = buildBookingMessage({
      name, date: dateInput.value, time, guests, seating
    });
    track('booking_submit');
    window.open(whatsappLink(message), '_blank', 'noopener');
  });

  function fail(text, focusOn) {
    error.textContent = text;
    error.hidden = false;
    if (focusOn) focusOn.focus();
  }
}

/* ── 13. splash ──────────────────────────────────────────────
   The pointer nudges the splash photo behind the glass.
   Two custom properties running -1 to 1, and the CSS does all
   the moving. Nothing to clean up, nothing to throttle — the
   transition smooths it — and a touch screen never fires
   pointermove, so phones get a still frame for free.         */

const axis = (v, min, size) => (v - min) / size * 2 - 1;

function initSplash() {
  const splash = document.getElementById('splash');
  if (!splash || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  splash.addEventListener('pointermove', e => {
    const r = splash.getBoundingClientRect();
    splash.style.setProperty('--px', axis(e.clientX, r.left, r.width).toFixed(3));
    splash.style.setProperty('--py', axis(e.clientY, r.top, r.height).toFixed(3));
  });

  splash.addEventListener('pointerleave', () => {
    splash.style.setProperty('--px', 0);
    splash.style.setProperty('--py', 0);
  });
}

/* ── 14. events ──────────────────────────────────────────────
   No analytics vendor is wired up yet, on purpose. Every control
   worth counting carries data-ev in index.html, and this one
   listener catches all of them — clicks bubble, so it does not
   care when a button was added or whether script.js built it.

   To switch analytics on, uncomment one line in track(). That is
   the entire integration; nothing else on the page changes.

   Not trackable from here: directions. The map is a Google iframe
   and a cross-origin frame will not report its own clicks. Use
   the Google Business Profile dashboard for that number.       */

function track(name) {
  // Plausible / Umami:  window.plausible?.(name);
  // Google Analytics 4: window.gtag?.('event', name);
  void name;
}

addEventListener('click', e => {
  const hit = e.target.closest('[data-ev]');
  if (hit) track(hit.dataset.ev);
});

/* ── run everything ──────────────────────────────────────── */

initClock();
initCanopy();
initChrome();
initReveal();
initMenu();
initLightbox();
initCarousel();
initBooking();
initSplash();

const visitLink = document.getElementById('wa-visit');
if (visitLink) {
  visitLink.href = whatsappLink('Hi Old Tree Cafe, I have a question.');
  visitLink.target = '_blank';
  visitLink.rel = 'noopener';
}

/* ── 12. selftest ────────────────────────────────────────────
   Open the page with ?selftest on the end of the address, then
   press F12 → Console. Anything wrong prints as a failure.    */

if (location.search.includes('selftest')) {
  const checks = [];
  const ok = (label, actual, expected) => checks.push([label, actual === expected, actual, expected]);

  // opening hours, at the edges where bugs hide
  ok('09:59 is closed', isOpenAt(9 * 60 + 59), false);
  ok('10:00 is open', isOpenAt(10 * 60), true);
  ok('22:59 is open', isOpenAt(22 * 60 + 59), true);
  ok('23:00 is closed', isOpenAt(23 * 60), false);
  ok('02:00 is closed', isOpenAt(2 * 60), false);

  // which light the hero is painted in
  ok('11:00 is morning', phaseFor(11 * 60), 'morning');
  ok('16:00 is golden', phaseFor(16 * 60), 'golden');
  ok('19:00 is dusk', phaseFor(19 * 60), 'dusk');
  ok('21:00 is night', phaseFor(21 * 60), 'night');
  ok('03:00 is night', phaseFor(3 * 60), 'night');

  // times and dates come out readable
  ok('11 reads as 11:00 AM', formatTime(11), '11:00 AM');
  ok('12 reads as 12:00 PM', formatTime(12), '12:00 PM');
  ok('22 reads as 10:00 PM', formatTime(22), '10:00 PM');
  ok('date does not shift a day', formatDate('2026-09-12').includes('12 Sep 2026'), true);
  ok('date names the weekday', formatDate('2026-09-12').startsWith('Sat'), true);

  // the booking message carries every field
  const sample = buildBookingMessage({
    name: 'Aditya', date: '2026-09-12', time: '7:00 PM', guests: 4, seating: 'Garden'
  });
  ok('message has the name', sample.includes('Name: Aditya'), true);
  ok('message has the date', sample.includes('12 Sep 2026'), true);
  ok('message has the guests', sample.includes('Guests: 4'), true);
  ok('link is encoded', whatsappLink('a b').endsWith('a%20b'), true);

  // the splash pointer mapping — centre is 0, edges are -1 and 1
  ok('splash axis centres at 0', axis(50, 0, 100), 0);
  ok('splash axis is -1 at the left edge', axis(0, 0, 100), -1);
  ok('splash axis is 1 at the right edge', axis(100, 0, 100), 1);
  ok('splash axis ignores where the section sits', axis(700, 600, 100), 1);

  const failed = checks.filter(c => !c[1]);
  failed.forEach(([label, , actual, expected]) =>
    console.error(`FAILED — ${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`));
  console.log(`selftest: ${checks.length} checks, ${failed.length} failed`);
}
