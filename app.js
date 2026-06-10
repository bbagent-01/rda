import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { SECTIONS_HTML, navHTML, wireNav } from './sections.js';

// ====================== shared page markup (one source for every version) ======================
const NAV = navHTML('');   // active link set by applyVariant

const BODY_HTML = `
  <div id="hero-pin">
    <div id="stage">
      <div class="layer layer-v1">
        <div id="video-wrap">
          <video id="v1-video" src="media/hero.mp4" muted playsinline preload="auto" webkit-playsinline></video>
        </div>
        <div class="v1-title"><h1>RDA Digital</h1></div>
      </div>
      <div class="layer layer-v2">
        <canvas id="gl"></canvas>
        <div id="gl-fallback">WebGL unavailable in this browser.</div>
      </div>
      <!-- welcome: auto-reveals on load, scrolls up out of focus -->
      <div class="hero-welcome" data-reveal data-autoplay data-delay="1200">
        <p class="sentence" data-sentence="A clear vision for victory."></p>
        <p class="sentence sub-big" data-sentence="If AI can build anything, clarity is what builds success"></p>
      </div>
    </div>
  </div>

  <video id="glass-source"  src="media/hero.mp4"  muted playsinline preload="auto" webkit-playsinline crossorigin="anonymous" style="position:absolute;width:2px;height:2px;opacity:0;pointer-events:none;left:-9999px"></video>
  <video id="glass-source2" src="media/hero2.mp4" muted playsinline preload="auto" webkit-playsinline crossorigin="anonymous" style="position:absolute;width:2px;height:2px;opacity:0;pointer-events:none;left:-9999px"></video>

  <div class="scroll-hint" id="hint">Scroll ↓</div>

  <main id="content">${SECTIONS_HTML}</main>

  <div id="variant-menu">${NAV}</div>

  <div id="controls">
    <div class="title-row"><span class="title">Hero Sandbox</span><button id="refreshBtn">↻ Refresh</button></div>
    <div class="ctrl"><div class="row"><span>Background size</span><span class="val" id="szVal">100%</span></div><input id="szSlider" type="range" min="60" max="180" step="1" value="100" /></div>
    <div class="ctrl"><div class="row"><span>Logo size</span><span class="val" id="lgVal">160%</span></div><input id="lgSlider" type="range" min="60" max="220" step="1" value="160" /></div>
    <div class="ctrl"><div class="row"><span>Bg follow dist</span><span class="val" id="bdVal">100%</span></div><input id="bdSlider" type="range" min="0" max="300" value="100" /></div>
    <div class="ctrl"><div class="row"><span>Bg follow speed</span><span class="val" id="bsVal">100%</span></div><input id="bsSlider" type="range" min="5" max="300" value="100" /></div>
    <div class="ctrl"><div class="row"><span>Logo follow dist</span><span class="val" id="ldVal">40%</span></div><input id="ldSlider" type="range" min="0" max="300" value="40" /></div>
    <div class="ctrl"><div class="row"><span>Logo follow speed</span><span class="val" id="lsVal">100%</span></div><input id="lsSlider" type="range" min="5" max="300" value="100" /></div>
    <div class="ctrl"><div class="row"><span>Scroll sensitivity</span><span class="val" id="ssVal">4</span></div><input id="ssSlider" type="range" min="1" max="40" step="1" value="4" /></div>
    <div class="divider">Reveal animation</div>
    <div class="ctrl"><div class="row"><span>Trigger position</span><span class="val" id="trVal">20%</span></div><input id="trSlider" type="range" min="0" max="90" step="1" value="20" /></div>
    <div class="ctrl"><div class="row"><span>Timing</span><span class="val" id="tmVal">2.2s</span></div><input id="tmSlider" type="range" min="0.2" max="8" step="0.1" value="2.2" /></div>
    <div class="ctrl"><div class="row"><span>Stagger delay</span><span class="val" id="stVal">42ms</span></div><input id="stSlider" type="range" min="0" max="300" step="2" value="42" /></div>
    <div class="ctrl"><div class="row"><span>Sticky (scroll)</span><span class="val" id="skVal">150%</span></div><input id="skSlider" type="range" min="100" max="320" step="5" value="150" /></div>
    <div class="ctrl"><div class="row"><span>Easing</span></div>
      <select id="esSelect">
        <option value="expo">Smooth (expo)</option><option value="cubic">Ease-out</option><option value="quad">Gentle</option>
        <option value="inout">Ease-in-out</option><option value="back">Back</option><option value="linear">Linear</option>
      </select>
    </div>
  </div>
`;

document.getElementById('app').innerHTML = BODY_HTML;
wireNav();

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 329">
  <path d="M685.76,256.17S491.47,3.19,491.48,3.18c-.71-.93-1.62-1.68-2.67-2.18-4.38-2.17-9.92.64-10.65,5.51-.31,2.19-.08,252.83-.05,255.13.25,2.02,1.33,3.94,2.99,5.13,1.28.94,2.78,1.45,4.43,1.46,48.35-.06,145.88.04,194.28,0,6.05.06,9.8-7.23,5.95-12.06Z"/>
  <path d="M206.93,256.18l-60.72-79.4c9.52-3.52,19.55-8.95,28.34-17.33,32.91-28.81,33.22-102.36.28-131.48C146.75.12,105.15.24,103.46.24c-.31,0-95.86.02-96.14,0C4.2.29,1.24,2.48.36,5.49.13,6.21.03,6.96.02,7.73,0,7.74.06,183.13,0,183.12c0,0,0,77.61,0,77.61,0,2.29,1.08,4.54,2.91,5.93,1.3,1.01,2.87,1.57,4.58,1.57,0,0,98.14,0,98.14,0,0,.03,95.33,0,95.34.01,6.07.06,9.76-7.24,5.96-12.06ZM146.17,176.77"/>
  <path d="M383.46,20.89C331.62-6.19,295.35,1.36,245.85.03c0,0,.03,260.69.03,260.69,0,.27.02.55.05.82.21,1.95,1.2,3.78,2.73,5.01,1.29,1.05,2.93,1.68,4.73,1.68h46.4c37.33,1.21,101.56-10.11,127.19-61.76,10.08-19.35,15.29-42.95,15.26-70.81,0-53.81-19.78-92.43-58.78-114.78Z"/>
</svg>`;

// ====================== state ======================
const hint    = document.getElementById('hint');
const welcome = document.querySelector('.hero-welcome');
const wrapV1  = document.getElementById('video-wrap');
const v1video = document.getElementById('v1-video');
const src     = document.getElementById('glass-source');
const src2    = document.getElementById('glass-source2');
const VID_ASPECT = 832/464, VID_ASPECT2 = 640/608;

let variant = +(document.body.dataset.variant) || 5;

let HALF_PASSES = 4;
const MAX_FOLLOW = 0.35;
let FOLLOW = 1.0 * MAX_FOLLOW, followNorm = 1.0;
let bgDist = 1.0, bgSpd = 1.0, lgDistF = 0.4, lgSpdF = 1.0;   // follow distance/speed (bg + glass logo)
let sizeBg = 1.0, sizeLogo = 1.6;
const SCRUB_EASE = 0.12, FOLLOW_EASE = 0.08, FOLLOW_EASE_SLOW = 0.018;

let targetTime = 0, curTime = 0, ready = false;
let mx = 0, my = 0, cx = 0, cy = 0, nx = 0, ny = 0;
let scrollVel = 0, lastSY = 0, prevNow = 0;

const pingpong = x => { const m = x % 2; return m < 1 ? m : 2 - m; };
const activeVideos = () => variant >= 4 ? [src2] : variant >= 2 ? [src] : [v1video];
const activeDuration = () => { const v = activeVideos()[0]; return (v && v.duration) ? v.duration : 0; };

function computeTarget(){
  const dur = activeDuration();
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const p = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
  targetTime = pingpong(p * HALF_PASSES) * dur;
}

// ====================== WebGL hero ======================
let gl = { ready:false };
function initGL(){
  try {
    const canvas = document.getElementById('gl');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 4000);
    camera.position.set(0, 0, 620);
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const vtex = new THREE.VideoTexture(src);  vtex.colorSpace = THREE.SRGBColorSpace;
    const vtex2 = new THREE.VideoTexture(src2); vtex2.colorSpace = THREE.SRGBColorSpace;

    const planeMat = new THREE.ShaderMaterial({
      uniforms: { map:{value:vtex}, uRes:{value:new THREE.Vector2(1,1)}, uFocalW:{value:0.5}, uVidAspect:{value:832/464}, uCenter:{value:new THREE.Vector2(0.5,0.5)} },
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader: `
        uniform sampler2D map; uniform vec2 uRes; uniform float uFocalW; uniform float uVidAspect; uniform vec2 uCenter; varying vec2 vUv;
        void main(){
          float aspect = uRes.x / uRes.y;
          float halfW = uFocalW * 0.5;
          float halfH = halfW * aspect / uVidAspect;
          vec2 d = vUv - uCenter;
          vec2 e2 = vec2(d.x/halfW, d.y/halfH);
          float e = length(e2);
          vec2 luv = e2 * 0.5 + 0.5;
          float inBox = step(0.0, luv.x)*step(luv.x,1.0)*step(0.0, luv.y)*step(luv.y,1.0);
          vec3 col = pow(texture2D(map, luv).rgb, vec3(2.2)) * inBox;
          float mask = 1.0 - smoothstep(0.38, 0.82, e);
          gl_FragColor = vec4(col * mask, 1.0);
        }`
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1,1), planeMat);
    plane.position.z = -2; scene.add(plane);

    const matLit = new THREE.MeshPhysicalMaterial({ color:0xffffff, metalness:0, roughness:0.07, transmission:1, thickness:42, ior:1.5, clearcoat:1, clearcoatRoughness:0.12, envMapIntensity:1.4, specularIntensity:1, attenuationColor:new THREE.Color(0xffffff), attenuationDistance:4 });
    const matClear = new THREE.MeshPhysicalMaterial({ color:0xffffff, metalness:0, roughness:0, transmission:1, thickness:78, ior:1.5, clearcoat:0, specularIntensity:0, envMapIntensity:0, attenuationColor:new THREE.Color(0xffffff), attenuationDistance:8 });

    const svg = new SVGLoader().parse(LOGO_SVG);
    const shapes = []; svg.paths.forEach(p => SVGLoader.createShapes(p).forEach(s => shapes.push(s)));
    function makeGeo(opts){ const g = new THREE.ExtrudeGeometry(shapes, opts); g.computeBoundingBox(); const b = g.boundingBox; g.translate(-(b.max.x+b.min.x)/2, -(b.max.y+b.min.y)/2, -(b.max.z+b.min.z)/2); return g; }
    const geoStd = makeGeo({ depth:60, bevelEnabled:true, bevelThickness:10, bevelSize:8, bevelSegments:5, curveSegments:28 });
    const geoSmooth = makeGeo({ depth:34, bevelEnabled:true, bevelThickness:14, bevelSize:15, bevelSegments:18, curveSegments:80 });
    const geoFlat = makeGeo({ depth:18, bevelEnabled:true, bevelThickness:5, bevelSize:9, bevelSegments:24, curveSegments:220 });
    geoStd.computeBoundingBox();
    const logoNativeW = geoStd.boundingBox.max.x - geoStd.boundingBox.min.x;

    const meshLit = new THREE.Mesh(geoStd, matLit);
    const meshClear = new THREE.Mesh(geoSmooth, matClear);
    const meshFlat = new THREE.Mesh(geoFlat, matClear);
    meshClear.visible = false; meshFlat.visible = false;
    const logo = new THREE.Group(); logo.add(meshLit); logo.add(meshClear); logo.add(meshFlat);
    const grp = new THREE.Group(); grp.add(logo); scene.add(grp);

    gl = { ready:true, renderer, scene, camera, plane, planeMat, logo, grp, meshLit, meshClear, meshFlat, logoNativeW, vtex, vtex2 };
    layoutGL();
    window.addEventListener('resize', layoutGL);
  } catch (e) {
    console.error('WebGL init failed', e);
    const c = document.getElementById('gl'); if (c) c.style.display = 'none';
    const f = document.getElementById('gl-fallback'); if (f) f.style.display = 'flex';
  }
}
function visibleAt(z){ const dist = gl.camera.position.z - z; const h = 2*Math.tan(THREE.MathUtils.degToRad(gl.camera.fov)/2)*dist; return { w:h*gl.camera.aspect, h }; }
function layoutGL(){
  if (!gl.ready) return;
  const W = innerWidth, H = innerHeight;
  gl.renderer.setSize(W, H, false);
  gl.camera.aspect = W/H; gl.camera.updateProjectionMatrix();
  const visP = visibleAt(gl.plane.position.z);
  gl.plane.scale.set(visP.w*1.04, visP.h*1.04, 1);
  gl.planeMat.uniforms.uRes.value.set(W, H);
  gl.planeMat.uniforms.uFocalW.value = 0.5 * sizeBg;
  const vis = visibleAt(0);
  const s = (vis.w * 0.5 * 0.98 * sizeLogo) / gl.logoNativeW;
  gl.meshLit.scale.set(s,-s,s); gl.meshClear.scale.set(s,-s,s); gl.meshFlat.scale.set(s,-s,s);
}

// ====================== main loop ======================
let lastVT = 0, lastAdvance = 0;
function tick(now){
  prevNow = now;
  if (variant >= 4){
    scrollVel *= 0.92;
    if (src2.paused) src2.play().catch(()=>{});
    // cap the boost — extreme playbackRates stall the decoder (the "freeze" bug)
    src2.playbackRate = Math.min(0.5 + scrollVel * HALF_PASSES * 0.0004, 4);
    // stall watchdog: if frames stop advancing while playing, kick the decoder
    if (src2.currentTime !== lastVT){ lastVT = src2.currentTime; lastAdvance = now; }
    else if (!src2.paused && now - lastAdvance > 1200){
      lastAdvance = now;
      try { src2.currentTime = (src2.currentTime + 0.05) % (src2.duration || 1); } catch(e){}
      src2.play().catch(()=>{});
    }
  } else if (ready){
    const dur = activeDuration();
    if (dur){
      curTime += (targetTime - curTime) * SCRUB_EASE;
      if (Math.abs(targetTime - curTime) < 0.001) curTime = targetTime;
      const t = Math.min(Math.max(curTime, 0), Math.max(dur - 0.04, 0));
      for (const v of activeVideos()) if (Math.abs(v.currentTime - t) > 0.001) v.currentTime = t;
    }
  }
  cx += (mx - cx) * FOLLOW_EASE; cy += (my - cy) * FOLLOW_EASE;
  wrapV1.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px) scale(${sizeBg.toFixed(3)})`;

  if (variant >= 2 && gl.ready){
    const u = gl.planeMat.uniforms;
    let tcx, tcy;
    if (variant === 2){
      const vis = visibleAt(0);
      const tiltY = nx*0.5*followNorm, tiltX = ny*0.35*followNorm;
      gl.logo.rotation.y += (tiltY - gl.logo.rotation.y)*0.07;
      gl.logo.rotation.x += (tiltX - gl.logo.rotation.x)*0.07;
      const dx = nx*vis.w*0.04*followNorm, dy = -ny*vis.h*0.04*followNorm;
      gl.grp.position.x += (dx - gl.grp.position.x)*0.07;
      gl.grp.position.y += (dy - gl.grp.position.y)*0.07;
      tcx = 0.5 + nx*0.03*followNorm; tcy = 0.5 - ny*0.03*followNorm;
    } else {
      // v10: the flat logo turns gently in space toward the cursor; other variants stay locked
      const tY = variant === 10 ? nx * 0.22 : 0;
      const tX = variant === 10 ? ny * 0.15 : 0;
      const te = variant === 10 ? 0.04 : 0.1;
      gl.logo.rotation.x += (tX - gl.logo.rotation.x) * te;
      gl.logo.rotation.y += (tY - gl.logo.rotation.y) * te;
      // glass logo drifts toward the mouse with its own distance + speed
      const vis = visibleAt(0);
      const ldx = nx * vis.w * 0.10 * lgDistF, ldy = -ny * vis.h * 0.10 * lgDistF;
      const le = 0.03 * lgSpdF;
      gl.grp.position.x += (ldx - gl.grp.position.x) * le;
      gl.grp.position.y += (ldy - gl.grp.position.y) * le;
      // background travel distance is independent of its speed
      tcx = 0.5 + nx*0.22*bgDist; tcy = 0.5 - ny*0.22*bgDist;
    }
    const fe = (variant >= 4 ? FOLLOW_EASE_SLOW : 0.07) * (variant >= 3 ? bgSpd : 1);
    u.uCenter.value.x += (tcx - u.uCenter.value.x) * fe;
    u.uCenter.value.y += (tcy - u.uCenter.value.y) * fe;
    gl.renderer.render(gl.scene, gl.camera);
  }
  updateReveals();
  requestAnimationFrame(tick);
}

// ====================== events ======================
function onScroll(){
  const sy = window.scrollY;
  scrollVel = Math.min(scrollVel + Math.abs(sy - lastSY), 4000);
  lastSY = sy;
  computeTarget();
  hint.style.opacity = sy > 40 ? '0' : '1';
  if (welcome){
    // scroll up out of focus, the same direction the sections move
    const wp = Math.min(Math.max(sy / (innerHeight * 0.6), 0), 1);
    welcome.style.transform = `translateY(${(-wp*70).toFixed(1)}px)`;
    welcome.style.opacity = (1 - wp).toFixed(3);
  }
}
function onMouse(e){
  mx = (e.clientX - innerWidth/2) * FOLLOW;
  my = (e.clientY - innerHeight/2) * FOLLOW;
  nx = (e.clientX / innerWidth) * 2 - 1;
  ny = (e.clientY / innerHeight) * 2 - 1;
}
function prime(){
  [v1video, src].forEach(v => { const p = v.play(); if (p && p.then) p.then(()=>v.pause()).catch(()=>{}); });
  src2.loop = true;
  if (variant >= 4) src2.play().catch(()=>{});
  else { const p = src2.play(); if (p && p.then) p.then(()=>src2.pause()).catch(()=>{}); }
}
src.addEventListener('loadedmetadata', () => { computeTarget(); curTime = targetTime; ready = true; prime(); });
src2.addEventListener('loadedmetadata', () => { computeTarget(); prime(); });
window.addEventListener('touchstart', prime, { once:true, passive:true });
window.addEventListener('click', prime, { once:true });
// resume the background video whenever the tab/window comes back into focus
function resumeVideo(){ scrollVel = 0; if (variant >= 4 && src2.paused) src2.play().catch(()=>{}); }
document.addEventListener('visibilitychange', () => { if (!document.hidden) resumeVideo(); });
window.addEventListener('focus', resumeVideo);
window.addEventListener('pageshow', resumeVideo);

// ====================== reveals ======================
const scrubSecs = [];
const autoGroups = [];
let revStagger = 42, revTrigger = 20, revTiming = 2.2;
const EASE = {
  expo:   t => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t),
  cubic:  t => 1 - Math.pow(1 - t, 3),
  quad:   t => 1 - (1 - t) * (1 - t),
  inout:  t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2,
  back:   t => 1 + 2.70158 * Math.pow(t-1, 3) + 1.70158 * Math.pow(t-1, 2),
  linear: t => t
};
let revEase = EASE.expo;

function updateReveals(){
  const scrub = (variant === 6);
  const trigOff = Math.min(revTrigger / 100 * 0.85, 0.88);
  const fd = Math.max(0.02, revTiming * 0.06);
  const sg = revStagger * 0.0012;
  for (const s of scrubSecs){
    const rect = s.el.getBoundingClientRect();
    const runway = s.el.offsetHeight - window.innerHeight;
    let p = runway > 0 ? (-rect.top) / runway : (rect.top <= 0 ? 1 : 0);
    p = Math.min(Math.max(p, 0), 1);
    if (scrub){
      const pe = trigOff < 1 ? Math.min(Math.max((p - trigOff) / (1 - trigOff), 0), 1) : 0;
      s.items.forEach((el, i) => {
        const e = revEase(Math.min(Math.max((pe - i * sg) / fd, 0), 1));
        el.style.opacity = e.toFixed(3);
        el.style.transform = `translateY(${((1 - e) * 30).toFixed(1)}px)`;
      });
      const span = (s.items.length - 1) * sg + fd || 1;
      const lp = revEase(Math.min(pe / span, 1));
      s.hlines.forEach(l => l.style.transform = `scaleX(${lp.toFixed(3)})`);
      s.vlines.forEach(l => l.style.transform = `scaleY(${lp.toFixed(3)})`);
    } else {
      const on = p > (revTrigger / 100 * 0.5);
      s.items.forEach(el => el.classList.toggle('in', on));
      if (s.lineWrap) s.lineWrap.classList.toggle('group-in', on);
    }
  }
}
function applyStagger(){
  scrubSecs.forEach(s => s.items.forEach((el, i) => el.style.transitionDelay = (i * revStagger) + 'ms'));
  autoGroups.forEach(g => g.items.forEach((el, i) => el.style.transitionDelay = (i * revStagger) + 'ms'));
}
function resetReveals(){
  scrubSecs.forEach(s => {
    s.items.forEach(el => { el.style.opacity = ''; el.style.transform = ''; el.classList.remove('in'); });
    [...s.hlines, ...s.vlines].forEach(l => l.style.transform = '');
    if (s.lineWrap) s.lineWrap.classList.remove('group-in');
  });
}
function initContent(){
  document.querySelectorAll('[data-sentence]').forEach(p => {
    p.dataset.sentence.split(/\s+/).forEach(w => {
      const span = document.createElement('span');
      span.className = 'word reveal'; span.textContent = w;
      p.appendChild(span); p.appendChild(document.createTextNode(' '));
    });
  });
  // hero welcome: time-based reveal on load (auto-triggers without scroll)
  document.querySelectorAll('[data-reveal][data-autoplay]').forEach(group => {
    const items = [...group.querySelectorAll('.reveal')];
    items.forEach((el, i) => el.style.transitionDelay = (i * revStagger) + 'ms');
    autoGroups.push({ group, items });
    setTimeout(() => items.forEach(el => el.classList.add('in')), +(group.dataset.delay || 650));
  });
  // scroll-driven sections (hero welcome handled separately)
  document.querySelectorAll('.scrub-sec:not(.auto-sec)').forEach(sec => {
    scrubSecs.push({ el: sec, items: [...sec.querySelectorAll('.reveal')],
                     hlines: [...sec.querySelectorAll('.hline')], vlines: [...sec.querySelectorAll('.vline')],
                     lineWrap: sec.querySelector('.logo-wall, .service-wall') });
  });
  applyStagger();
  updateReveals();
}

// ====================== controls ======================
const szS = document.getElementById('szSlider'), lgS = document.getElementById('lgSlider'),
      ssS = document.getElementById('ssSlider');
const szV = document.getElementById('szVal'), lgV = document.getElementById('lgVal'),
      ssV = document.getElementById('ssVal');
const bdS = document.getElementById('bdSlider'), bsS = document.getElementById('bsSlider'),
      ldS = document.getElementById('ldSlider'), lsS = document.getElementById('lsSlider');
const bdV = document.getElementById('bdVal'), bsV = document.getElementById('bsVal'),
      ldV = document.getElementById('ldVal'), lsV = document.getElementById('lsVal');
szS.addEventListener('input', () => { sizeBg = +szS.value/100; szV.textContent = szS.value+'%'; if (gl.ready) layoutGL(); });
lgS.addEventListener('input', () => { sizeLogo = +lgS.value/100; lgV.textContent = lgS.value+'%'; if (gl.ready) layoutGL(); });
ssS.addEventListener('input', () => { HALF_PASSES=+ssS.value; ssV.textContent=ssS.value; computeTarget(); });
bdS.addEventListener('input', () => { bgDist = +bdS.value/100; bdV.textContent = bdS.value+'%'; FOLLOW = bgDist*MAX_FOLLOW; followNorm = bgDist; });
bsS.addEventListener('input', () => { bgSpd = +bsS.value/100; bsV.textContent = bsS.value+'%'; });
ldS.addEventListener('input', () => { lgDistF = +ldS.value/100; ldV.textContent = ldS.value+'%'; });
lsS.addEventListener('input', () => { lgSpdF = +lsS.value/100; lsV.textContent = lsS.value+'%'; });

const trS = document.getElementById('trSlider'), tmS = document.getElementById('tmSlider'),
      stS = document.getElementById('stSlider'), esS = document.getElementById('esSelect');
const trV = document.getElementById('trVal'), tmV = document.getElementById('tmVal'), stV = document.getElementById('stVal');
const CSS_BEZ = { expo:'cubic-bezier(.16,1,.3,1)', cubic:'cubic-bezier(.22,.61,.36,1)', quad:'cubic-bezier(.25,.46,.45,.94)', inout:'cubic-bezier(.45,0,.55,1)', back:'cubic-bezier(.34,1.56,.64,1)', linear:'linear' };
trS.addEventListener('input', () => { revTrigger = +trS.value; trV.textContent = trS.value + '%'; updateReveals(); });
tmS.addEventListener('input', () => { revTiming = +tmS.value; tmV.textContent = tmS.value + 's'; document.documentElement.style.setProperty('--rv-dur', tmS.value + 's'); updateReveals(); });
stS.addEventListener('input', () => { revStagger = +stS.value; stV.textContent = stS.value + 'ms'; applyStagger(); updateReveals(); });
esS.addEventListener('change', () => { revEase = EASE[esS.value] || EASE.expo; document.documentElement.style.setProperty('--rv-ease', CSS_BEZ[esS.value] || 'ease'); });
const skS = document.getElementById('skSlider'), skV = document.getElementById('skVal');
skS.addEventListener('input', () => { skV.textContent = skS.value + '%'; document.documentElement.style.setProperty('--scrub-h', skS.value + 'vh'); updateReveals(); });

function applyPreset({bg, logo, ss, bd, bs, ld, ls}){
  const set = (s, v) => { s.value = v; s.dispatchEvent(new Event('input')); };
  set(szS, bg); set(lgS, logo); set(ssS, ss);
  set(bdS, bd); set(bsS, bs); set(ldS, ld); set(lsS, ls);
}

// persist control values across reloads so Refresh replays the page without resetting them
const CTRL_KEY = 'rda_ctrls_v1';
const ALL_SLIDERS = [szS, lgS, bdS, bsS, ldS, lsS, ssS, trS, tmS, stS, skS];
let suppressPersist = true;
function persist(){
  if (suppressPersist) return;
  const o = {}; ALL_SLIDERS.forEach(s => o[s.id] = s.value); o.es = esS.value;
  try { localStorage.setItem(CTRL_KEY, JSON.stringify(o)); } catch(e){}
}
function restoreControls(){
  let o; try { o = JSON.parse(localStorage.getItem(CTRL_KEY)); } catch(e){}
  if (!o) return;
  ALL_SLIDERS.forEach(s => { if (o[s.id] != null) { s.value = o[s.id]; s.dispatchEvent(new Event('input')); } });
  if (o.es) { esS.value = o.es; esS.dispatchEvent(new Event('change')); }
}
document.getElementById('controls').addEventListener('input', persist);
document.getElementById('controls').addEventListener('change', persist);
document.getElementById('refreshBtn').addEventListener('click', () => location.reload());

// ====================== apply a fixed variant (one per page) ======================
function applyVariant(v){
  variant = v;
  [1,2,3,4,5,6,10].forEach(n => document.body.classList.toggle('v'+n, variant === n));
  document.querySelectorAll('#variant-menu a').forEach(a => a.classList.toggle('active', +a.dataset.v === variant));
  const dropBtn = document.querySelector('#variant-menu .drop-btn');
  if (dropBtn) dropBtn.classList.toggle('active', !!document.querySelector(`#variant-menu .drop-list a[data-v="${variant}"]`));
  if (variant >= 5) applyPreset({ bg:100, logo:97, ss:12, bd:160, bs:45, ld:50, ls:45 });
  document.body.classList.toggle('scrubmode', variant === 6);
  resetReveals(); updateReveals();
  if (gl.ready){
    gl.meshLit.visible   = variant === 2;
    gl.meshClear.visible = variant === 3;
    gl.meshFlat.visible  = variant >= 4;
    gl.planeMat.uniforms.map.value        = variant >= 4 ? gl.vtex2 : gl.vtex;
    gl.planeMat.uniforms.uVidAspect.value = variant >= 4 ? VID_ASPECT2 : VID_ASPECT;
    if (variant >= 2) layoutGL();
  }
  src2.loop = true;
  if (variant >= 4) src2.play().catch(()=>{});
  else { src2.pause(); const dur = activeDuration(); const t = Math.min(Math.max(curTime,0), Math.max(dur-0.04,0)); activeVideos().forEach(v => v.currentTime = t); }
}

window.addEventListener('scroll', onScroll, { passive:true });
window.addEventListener('resize', computeTarget);
window.addEventListener('mousemove', onMouse, { passive:true });

// ====================== run ======================
initContent();
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
initGL();
applyVariant(variant);
restoreControls();
suppressPersist = false;
requestAnimationFrame(tick);
