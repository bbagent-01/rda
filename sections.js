// SINGLE SOURCE for the cross-page nav and the scrolling content sections.
// app.js (v1-6) imports SECTIONS_HTML/navHTML; the concept pages (v7+) use
// mountSections()/mountNav(), which also wire v5-style triggered reveals.

export const NAV_ITEMS = [
  ['1','Feathered'], ['2','Liquid Glass'], ['3','Clear Glass'], ['4','Flat Glass'],
  ['5','Trigger'], ['6','Scrub'], ['7','Ribbons'], ['8','Podium'], ['9','Shards']
];
const PRIMARY = ['5', '9'];   // everything else lives in the Archive dropdown

export function navHTML(active){
  const links = items => items.map(([n, l]) =>
    `<a class="navlink${active === n ? ' active' : ''}" href="v${n}.html" data-v="${n}">${n} · ${l}</a>`).join('');
  const prim = NAV_ITEMS.filter(([n]) => PRIMARY.includes(n));
  const arch = NAV_ITEMS.filter(([n]) => !PRIMARY.includes(n));
  const archActive = arch.some(([n]) => n === active);
  return links(prim) +
    `<div class="nav-drop"><button class="drop-btn${archActive ? ' active' : ''}" type="button">Archive ▾</button>` +
    `<div class="drop-list">${links(arch)}</div></div>`;
}
export function wireNav(){
  const btn = document.querySelector('#variant-menu .drop-btn');
  if (btn) btn.addEventListener('click', e => { e.stopPropagation(); btn.parentElement.classList.toggle('open'); });
  document.addEventListener('click', () => { const d = document.querySelector('#variant-menu .nav-drop'); if (d) d.classList.remove('open'); });
}
export function mountNav(active){
  let el = document.getElementById('variant-menu');
  if (!el){ el = document.createElement('div'); el.id = 'variant-menu'; document.body.appendChild(el); }
  el.innerHTML = navHTML(active);
  wireNav();
}

export const SECTIONS_HTML = `
  <section class="scrub-sec sentence-sec">
    <div class="pin"><div class="sec-inner">
      <p class="sentence" data-sentence="RDA is an AI-first company — always in motion, always evolving to serve our clients."></p>
    </div></div>
  </section>

  <section class="scrub-sec logos-sec">
    <div class="pin"><div class="sec-inner">
      <div class="sec-eyebrow reveal">Partners who trust us</div>
      <div class="logo-wall">
        <div class="grid-lines">
          <span class="hline" style="top:0%"></span><span class="hline" style="top:50%"></span><span class="hline" style="top:100%"></span>
          <span class="vline" style="left:0%"></span><span class="vline" style="left:20%"></span><span class="vline" style="left:40%"></span>
          <span class="vline" style="left:60%"></span><span class="vline" style="left:80%"></span><span class="vline" style="left:100%"></span>
        </div>
        <div class="logo-grid">
          <div class="logo-cell reveal"><img src="media/logos/anthropic.svg" alt="Anthropic"></div>
          <div class="logo-cell reveal"><img src="media/logos/figma.svg" alt="Figma"></div>
          <div class="logo-cell reveal"><img src="media/logos/microsoft.svg" alt="Microsoft"></div>
          <div class="logo-cell reveal"><img src="media/logos/salesforce.svg" alt="Salesforce"></div>
          <div class="logo-cell reveal"><img src="media/logos/amazonwebservices.svg" alt="AWS"></div>
          <div class="logo-cell reveal"><img src="media/logos/storyblok.svg" alt="Storyblok"></div>
          <div class="logo-cell reveal"><img src="media/logos/sitecore.svg" alt="Sitecore"></div>
          <div class="logo-cell reveal"><img src="media/logos/shopify.svg" alt="Shopify"></div>
          <div class="logo-cell reveal"><img src="media/logos/algolia.svg" alt="Algolia"></div>
          <div class="logo-cell reveal"><img src="media/logos/vercel.svg" alt="Vercel"></div>
        </div>
      </div>
    </div></div>
  </section>

  <section class="scrub-sec services-sec">
    <div class="pin"><div class="sec-inner">
      <h2 class="services-head reveal">What we do</h2>
      <p class="services-sub reveal">AI, strategy, and execution — from day one.</p>
      <div class="service-wall">
        <div class="grid-lines">
          <span class="hline" style="top:0%"></span><span class="hline" style="top:50%"></span><span class="hline" style="top:100%"></span>
          <span class="vline" style="left:0%"></span><span class="vline" style="left:33.3333%"></span>
          <span class="vline" style="left:66.6667%"></span><span class="vline" style="left:100%"></span>
        </div>
        <div class="service-grid">
          <div class="service-cell reveal"><div class="num">01</div><h3>Strategic Vision &amp; Roadmapping</h3></div>
          <div class="service-cell reveal"><div class="num">02</div><h3>Experience Design &amp; Personalization</h3></div>
          <div class="service-cell reveal"><div class="num">03</div><h3>Platform Selection &amp; Implementation</h3></div>
          <div class="service-cell reveal"><div class="num">04</div><h3>Custom App Development &amp; Modernization</h3></div>
          <div class="service-cell reveal"><div class="num">05</div><h3>Data &amp; AI Optimization</h3></div>
          <div class="service-cell reveal"><div class="num">06</div><h3>Continuous Evolution Programs</h3></div>
        </div>
      </div>
    </div></div>
  </section>

  <section class="scrub-sec t-rotator">
    <div class="pin center"><div class="sec-inner t-stage">
      <div class="t-quote">
        <p class="sentence quote" data-sentence="“RDA rebuilt our platform — and our growth followed.”"></p>
        <div class="attrib reveal">VP, Digital · Global Retail</div>
      </div>
      <div class="t-quote">
        <p class="sentence quote" data-sentence="“They move faster than any partner we've worked with.”"></p>
        <div class="attrib reveal">CTO · Fintech</div>
      </div>
      <div class="t-quote">
        <p class="sentence quote" data-sentence="“Strategy, design, and engineering — finally one team.”"></p>
        <div class="attrib reveal">CMO · Enterprise SaaS</div>
      </div>
    </div></div>
  </section>

  <section class="scrub-sec schedule-sec">
    <div class="pin center"><div class="schedule-inner">
      <h2 class="schedule-head reveal">Schedule a time to talk</h2>
      <p class="schedule-sub reveal">Pick a slot — we'll confirm by email.</p>
      <div class="cal-card reveal">
        <div>
          <div class="cal-badge"><span class="d"></span> Live scheduler · HubSpot (placeholder)</div>
          <div class="cal-month"><span>June 2026</span><span style="color:rgba(255,255,255,.4)">&lsaquo;&nbsp;&nbsp;&rsaquo;</span></div>
          <div class="cal-grid">
            <div class="dow">M</div><div class="dow">T</div><div class="dow">W</div><div class="dow">T</div><div class="dow">F</div><div class="dow">S</div><div class="dow">S</div>
            <div class="day muted">26</div><div class="day muted">27</div><div class="day muted">28</div><div class="day muted">29</div><div class="day muted">30</div><div class="day muted">31</div><div class="day">1</div>
            <div class="day">2</div><div class="day avail">3</div><div class="day">4</div><div class="day avail">5</div><div class="day">6</div><div class="day muted">7</div><div class="day muted">8</div>
            <div class="day avail">9</div><div class="day sel">10</div><div class="day avail">11</div><div class="day avail">12</div><div class="day">13</div><div class="day muted">14</div><div class="day muted">15</div>
            <div class="day avail">16</div><div class="day">17</div><div class="day avail">18</div><div class="day avail">19</div><div class="day avail">20</div><div class="day muted">21</div><div class="day muted">22</div>
          </div>
        </div>
        <div class="cal-times">
          <div class="tlabel">Tue, June 10 · EST</div>
          <div class="cal-slot">9:00 AM</div><div class="cal-slot">9:30 AM</div><div class="cal-slot">10:30 AM</div>
          <div class="cal-slot">1:00 PM</div><div class="cal-slot">2:30 PM</div>
          <div class="cal-foot">Connects to HubSpot Meetings once linked.</div>
        </div>
      </div>
    </div></div>
  </section>
`;

export function mountSections(){
  const main = document.createElement('main');
  main.id = 'content';
  main.innerHTML = `<div style="height:100vh"></div>` + SECTIONS_HTML;
  document.body.appendChild(main);

  // build sentences word-by-word
  main.querySelectorAll('[data-sentence]').forEach(p => {
    p.dataset.sentence.split(/\s+/).forEach(w => {
      const s = document.createElement('span');
      s.className = 'word reveal'; s.textContent = w;
      p.appendChild(s); p.appendChild(document.createTextNode(' '));
    });
  });

  // scroll-triggered staggered reveals (v5-style) inside sticky sections
  const secs = [...main.querySelectorAll('.scrub-sec:not(.t-rotator)')].map(sec => ({
    el: sec,
    items: [...sec.querySelectorAll('.reveal')],
    lineWrap: sec.querySelector('.logo-wall, .service-wall')
  }));
  secs.forEach(s => s.items.forEach((el, i) => el.style.transitionDelay = (i * 42) + 'ms'));

  function update(){
    for (const s of secs){
      const rect = s.el.getBoundingClientRect();
      const runway = s.el.offsetHeight - innerHeight;
      let p = runway > 0 ? (-rect.top) / runway : (rect.top <= 0 ? 1 : 0);
      p = Math.min(Math.max(p, 0), 1);
      const on = p > 0.10;
      s.items.forEach(el => el.classList.toggle('in', on));
      if (s.lineWrap) s.lineWrap.classList.toggle('group-in', on);
    }
  }
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
  initTestimonialRotator();
  return main;
}

// One sticky section; the three quotes rotate through it as you scroll.
export function initTestimonialRotator(){
  const rot = document.querySelector('.t-rotator');
  if (!rot) return;
  const quotes = [...rot.querySelectorAll('.t-quote')];
  quotes.forEach(q => [...q.querySelectorAll('.reveal')].forEach((el, i) => el.style.transitionDelay = (i * 42) + 'ms'));
  function update(){
    const rect = rot.getBoundingClientRect();
    const runway = rot.offsetHeight - innerHeight;
    let p = runway > 0 ? (-rect.top) / runway : 0;
    p = Math.min(Math.max(p, 0), 1);
    const idx = p <= 0.02 ? -1 : Math.min(quotes.length - 1, Math.floor(p * quotes.length));
    quotes.forEach((q, i) => q.querySelectorAll('.reveal').forEach(el => el.classList.toggle('in', i === idx)));
  }
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
}
