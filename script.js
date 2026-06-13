/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const CITIES = [
  { name: 'Delhi', lat: 28.67, lng: 77.22, aqi: 168, cat: 'unhealth', pm25: 72, pm10: 145, no2: 52, o3: 28, co: 1.2, so2: 18, trend: [180,165,172,155,168,175,168] },
  { name: 'Mumbai', lat: 19.07, lng: 72.87, aqi: 89, cat: 'mod', pm25: 34, pm10: 68, no2: 38, o3: 44, co: 0.7, so2: 9, trend: [95,88,92,84,89,91,89] },
  { name: 'Beijing', lat: 39.90, lng: 116.40, aqi: 142, cat: 'unhealth', pm25: 55, pm10: 110, no2: 48, o3: 22, co: 1.1, so2: 24, trend: [160,145,138,150,142,155,142] },
  { name: 'London', lat: 51.50, lng: -0.12, aqi: 42, cat: 'good', pm25: 12, pm10: 24, no2: 32, o3: 56, co: 0.4, so2: 4, trend: [38,44,41,46,42,40,42] },
  { name: 'New York', lat: 40.71, lng: -74.00, aqi: 61, cat: 'mod', pm25: 18, pm10: 35, no2: 29, o3: 64, co: 0.5, so2: 6, trend: [65,58,63,60,61,66,61] },
  { name: 'Sao Paulo', lat: -23.55, lng: -46.63, aqi: 78, cat: 'mod', pm25: 28, pm10: 52, no2: 41, o3: 38, co: 0.8, so2: 11, trend: [82,75,80,72,78,81,78] },
  { name: 'Tokyo', lat: 35.69, lng: 139.69, aqi: 48, cat: 'good', pm25: 15, pm10: 28, no2: 35, o3: 52, co: 0.4, so2: 5, trend: [50,46,52,44,48,51,48] },
  { name: 'Cairo', lat: 30.04, lng: 31.24, aqi: 195, cat: 'vunhealt', pm25: 88, pm10: 176, no2: 64, o3: 18, co: 1.8, so2: 32, trend: [200,188,195,210,195,182,195] },
];

const MAP_CITIES = [
  ...CITIES,
  { name: 'Lagos', lat: 6.52, lng: 3.38, aqi: 112, cat: 'unhealth' },
  { name: 'Karachi', lat: 24.86, lng: 67.01, aqi: 158, cat: 'unhealth' },
  { name: 'Dhaka', lat: 23.81, lng: 90.41, aqi: 182, cat: 'vunhealt' },
  { name: 'Mexico City', lat: 19.43, lng: -99.13, aqi: 94, cat: 'mod' },
  { name: 'Paris', lat: 48.86, lng: 2.35, aqi: 38, cat: 'good' },
  { name: 'Sydney', lat: -33.87, lng: 151.21, aqi: 32, cat: 'good' },
  { name: 'Moscow', lat: 55.75, lng: 37.62, aqi: 55, cat: 'mod' },
  { name: 'Istanbul', lat: 41.01, lng: 28.97, aqi: 76, cat: 'mod' },
  { name: 'Jakarta', lat: -6.21, lng: 106.85, aqi: 136, cat: 'unhealth' },
  { name: 'Los Angeles', lat: 34.05, lng: -118.24, aqi: 82, cat: 'mod' },
  { name: 'Noida', lat: 28.54, lng: 77.39, aqi: 155, cat: 'unhealth' },
  { name: 'Ahmedabad', lat: 23.02, lng: 72.57, aqi: 101, cat: 'unhealth' },
  { name: 'Kolkata', lat: 22.57, lng: 88.36, aqi: 148, cat: 'unhealth' },
  { name: 'Bangalore', lat: 12.97, lng: 77.59, aqi: 62, cat: 'mod' },
  { name: 'Singapore', lat: 1.35, lng: 103.82, aqi: 44, cat: 'good' },
];

const FEATURES = [
  { icon: '🌐', name: 'OpenAQ Integration', desc: 'Direct pipeline to OpenAQ\'s 30,000+ station dataset, refreshed hourly across 6 pollutants.' },
  { icon: '🗺️', name: 'Interactive Heatmap', desc: 'Leaflet.js powered map with custom AQI circle markers. Click any city for full breakdown.' },
  { icon: '⚡', name: 'Real-time Updates', desc: 'WebSocket connection streams data updates every 60 seconds without page refresh.' },
  { icon: '📊', name: 'Trend Analysis', desc: '7-day rolling chart shows pollution pattern — useful for planning outdoor activity.' },
  { icon: '🌬️', name: 'Pollutant Breakdown', desc: 'PM2.5, PM10, NO2, O3, CO, and SO2 tracked individually with ug/m3 readings.' },
  { icon: '📱', name: 'Health Advisories', desc: 'Contextual recommendations per AQI level — from safe outdoor activity to stay indoors.' },
];

const AQI_SCALE = [
  { range: '0-50',    name: 'Good',          advice: 'Air quality is satisfactory. Outdoor activity is safe for all.', bg: '#0a2e1a', color: '#2ED573' },
  { range: '51-100',  name: 'Moderate',      advice: 'Unusually sensitive people should limit prolonged outdoor exertion.', bg: '#2e1f0a', color: '#F5A623' },
  { range: '101-150', name: 'Unhealthy*',    advice: 'Sensitive groups should reduce prolonged outdoor exertion.', bg: '#2e1508', color: '#FF6B35' },
  { range: '151-200', name: 'Unhealthy',     advice: 'Everyone may begin to experience health effects.', bg: '#2e0a0e', color: '#FF4757' },
  { range: '201-300', name: 'Very Unhealthy',advice: 'Health warnings. Everyone may experience serious effects.', bg: '#1e0a2e', color: '#A855F7' },
  { range: '300+',    name: 'Hazardous',     advice: 'Emergency conditions. Entire population affected.', bg: '#1a0a0a', color: '#8B0000' },
];

const AQI_CATS = {
  good:     { color: '#2ED573', hex: '#2ED573' },
  mod:      { color: '#F5A623', hex: '#F5A623' },
  unhealth: { color: '#FF4757', hex: '#FF4757' },
  vunhealt: { color: '#A855F7', hex: '#A855F7' },
};

const CAT_LABELS = {
  good: 'Good', mod: 'Moderate', unhealth: 'Unhealthy', vunhealt: 'Very Unhealthy'
};

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Today'];

/* ═══════════════════════════════════════
   SCROLL EFFECTS
═══════════════════════════════════════ */
const scrollProgress = document.getElementById('scroll-progress');
const scrollPathActive = document.getElementById('scroll-path-active');
const pathLen = 1000;

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const pct = scrolled / maxScroll;

  scrollProgress.style.width = (pct * 100) + '%';

  const offset = pathLen * (1 - pct);
  scrollPathActive.style.strokeDashoffset = offset;
});

/* ═══════════════════════════════════════
   REVEAL ON SCROLL
═══════════════════════════════════════ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ═══════════════════════════════════════
   3D GLOBE (Three.js) — Black grid theme
═══════════════════════════════════════ */
(function initGlobe() {
  const canvas = document.getElementById('globe-canvas');
  const tooltip = document.getElementById('globe-tooltip');
  const W = 480, H = 480;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(W, H);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W/H, 0.1, 100);
  camera.position.z = 2.8;

  // Globe mesh — black
  const geo = new THREE.SphereGeometry(1, 64, 64);
  const mat = new THREE.MeshPhongMaterial({
    color: 0x0a0a0a,
    emissive: 0x000000,
    specular: 0x222222,
    shininess: 30,
    wireframe: false,
  });
  const globe = new THREE.Mesh(geo, mat);
  scene.add(globe);

  // Black grid lines overlay — white/light lines on black globe
  const wireGeo = new THREE.SphereGeometry(1.002, 24, 24);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x333333, wireframe: true, opacity: 0.5, transparent: true
  });
  scene.add(new THREE.Mesh(wireGeo, wireMat));

  // Subtle red ring
  const ringGeo = new THREE.TorusGeometry(1.08, 0.004, 8, 120);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xCC1B1B, transparent: true, opacity: 0.35 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  scene.add(ring);

  // Second ring
  const ring2 = ring.clone();
  ring2.rotation.set(0.5, 0.5, 0);
  ring2.material = ringMat.clone();
  ring2.material.opacity = 0.15;
  scene.add(ring2);

  // Lighting — neutral to keep globe black
  scene.add(new THREE.AmbientLight(0x888888, 0.6));
  const light1 = new THREE.DirectionalLight(0xffffff, 0.4);
  light1.position.set(3, 2, 4);
  scene.add(light1);
  const light2 = new THREE.DirectionalLight(0xCC1B1B, 0.2);
  light2.position.set(-4, -1, -2);
  scene.add(light2);

  // Convert lat/lng to 3D point
  function latLngTo3D(lat, lng, r=1.03) {
    const phi   = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
       r * Math.cos(phi),
       r * Math.sin(phi) * Math.sin(theta)
    );
  }

  // AQI dots on globe
  const dots = [];
  MAP_CITIES.forEach(city => {
    const pos = latLngTo3D(city.lat, city.lng);
    const c = AQI_CATS[city.cat];
    const size = city.aqi > 150 ? 0.028 : city.aqi > 100 ? 0.022 : 0.016;
    const dotGeo = new THREE.SphereGeometry(size, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(c.hex),
      transparent: true, opacity: 0.9
    });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.copy(pos);
    dot.userData = city;
    globe.add(dot);
    dots.push(dot);

    // Pulse ring for high AQI
    if (city.aqi > 140) {
      const pr = new THREE.TorusGeometry(size * 2.5, size * 0.3, 4, 16);
      const pm = new THREE.MeshBasicMaterial({ color: new THREE.Color(c.hex), transparent: true, opacity: 0.3 });
      const pulse = new THREE.Mesh(pr, pm);
      pulse.position.copy(pos);
      pulse.lookAt(0,0,0);
      pulse.userData.isPulse = true;
      globe.add(pulse);
    }
  });

  // Mouse interaction
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let isDragging = false, prevMouse = { x: 0, y: 0 };
  let rotX = 0, rotY = 0;
  let autoRotate = true;

  canvas.addEventListener('mousedown', e => {
    isDragging = true; autoRotate = false;
    prevMouse = { x: e.clientX, y: e.clientY };
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
    setTimeout(() => { autoRotate = true; }, 3000);
  });
  canvas.addEventListener('mousemove', e => {
    if (isDragging) {
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      rotY += dx * 0.005; rotX += dy * 0.005;
      prevMouse = { x: e.clientX, y: e.clientY };
    }
    // Tooltip
    const rect = canvas.getBoundingClientRect();
    mouse.x =  ((e.clientX - rect.left)  / W) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / H) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(dots);
    if (hits.length) {
      const c = hits[0].object.userData;
      if (c.name) {
        tooltip.style.opacity = '1';
        tooltip.style.left = (e.clientX - rect.left + 12) + 'px';
        tooltip.style.top  = (e.clientY - rect.top  - 30) + 'px';
        const col = AQI_CATS[c.cat].hex;
        tooltip.innerHTML = `<strong style="color:${col}">${c.name}</strong> &nbsp; AQI <strong style="color:${col}">${c.aqi}</strong>`;
      }
    } else {
      tooltip.style.opacity = '0';
    }
  });

  let t = 0;
  (function animate() {
    requestAnimationFrame(animate);
    t += 0.01;
    if (autoRotate) rotY += 0.003;
    globe.rotation.x = rotX;
    globe.rotation.y = rotY;
    ring.rotation.z = t * 0.2;

    // Pulse animation
    globe.children.forEach(c => {
      if (c.userData.isPulse) {
        c.material.opacity = 0.15 + 0.2 * Math.abs(Math.sin(t * 2));
        c.scale.setScalar(0.9 + 0.2 * Math.abs(Math.sin(t * 1.5)));
      }
    });
    renderer.render(scene, camera);
  })();
})();

/* ═══════════════════════════════════════
   CITY MONITOR
═══════════════════════════════════════ */
let activeCity = CITIES[0];

function aqiColor(cat) { return AQI_CATS[cat]?.hex || '#7A7060'; }

function buildCitySelector() {
  const el = document.getElementById('city-selector');
  el.innerHTML = CITIES.map((c, i) => `
    <button class="city-btn ${i===0?'active':''}" onclick="selectCity(${i})" id="city-btn-${i}">
      <span>${c.name}</span>
      <span class="city-aqi-badge aqi-${c.cat}">${c.aqi}</span>
    </button>
  `).join('');
}

function selectCity(idx) {
  document.querySelectorAll('.city-btn').forEach((b,i) => b.classList.toggle('active', i===idx));
  activeCity = CITIES[idx];
  renderCityDetail();
}

function renderCityDetail() {
  const c = activeCity;
  const col = aqiColor(c.cat);
  const maxAqi = Math.max(...c.trend);

  document.getElementById('city-detail').innerHTML = `
    <div class="aqi-display">
      <div class="aqi-number" style="color:${col}">${c.aqi}</div>
      <div class="aqi-meta">
        <div class="aqi-label" style="color:${col}">${CAT_LABELS[c.cat]}</div>
        <div class="aqi-city-name">${c.name} · AQI US Standard</div>
      </div>
    </div>

    <div class="pollutants-grid">
      ${[['PM2.5',c.pm25,'µg/m³'],['PM10',c.pm10,'µg/m³'],['NO₂',c.no2,'µg/m³'],
         ['O₃',c.o3,'µg/m³'],['CO',c.co,'mg/m³'],['SO₂',c.so2,'µg/m³']]
        .map(([n,v,u]) => `
        <div class="pollutant-card">
          <div class="pollutant-name">${n}</div>
          <div class="pollutant-val">${v}<span class="pollutant-unit"> ${u}</span></div>
        </div>`).join('')}
    </div>

    <div class="aqi-chart">
      <div class="chart-title">7-day trend</div>
      <div class="chart-bars">
        ${c.trend.map((v,i) => {
          const pct = (v / (maxAqi * 1.15)) * 100;
          const opacity = 0.35 + (i / c.trend.length) * 0.65;
          return `<div class="chart-bar-wrap">
            <div class="chart-bar" style="height:${pct}%;background:${col};opacity:${opacity}"></div>
            <div class="chart-bar-label">${DAYS[i]}</div>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;
}

buildCitySelector();
renderCityDetail();

/* ═══════════════════════════════════════
   LEAFLET MAP
═══════════════════════════════════════ */
const map = L.map('leaflet-map', {
  center: [25, 10],
  zoom: 2,
  zoomControl: false,
  attributionControl: false,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

L.control.zoom({ position: 'bottomright' }).addTo(map);

const markers = [];
let currentMode = 'aqi';

function getAqiColor(aqi) {
  if (aqi <= 50)  return '#2ED573';
  if (aqi <= 100) return '#F5A623';
  if (aqi <= 150) return '#FF6B35';
  if (aqi <= 200) return '#FF4757';
  if (aqi <= 300) return '#A855F7';
  return '#8B0000';
}

function plotMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers.length = 0;

  MAP_CITIES.forEach(city => {
    const val = currentMode === 'aqi' ? city.aqi
      : currentMode === 'pm25' ? (city.pm25 || Math.round(city.aqi * 0.45))
      : currentMode === 'no2'  ? (city.no2  || Math.round(city.aqi * 0.3))
      : (city.o3 || Math.round(city.aqi * 0.2));

    const color = getAqiColor(city.aqi);
    const r = Math.max(14, Math.min(36, Math.round(val / 10) + 14));

    const icon = L.divIcon({
      className: '',
      html: `<div class="aqi-marker" style="width:${r*2}px;height:${r*2}px;background:${color}22;border:2px solid ${color};color:${color};font-size:${r < 20 ? 9 : 11}px;">${val}</div>`,
      iconSize: [r*2, r*2],
      iconAnchor: [r, r],
    });

    const marker = L.marker([city.lat, city.lng], { icon });
    const fullCity = CITIES.find(c => c.name === city.name);
    marker.bindPopup(`
      <div style="font-family:'Space Grotesk',sans-serif;min-width:180px;">
        <div style="font-size:1rem;font-weight:700;margin-bottom:4px;">${city.name}</div>
        <div style="font-size:0.8rem;color:#7A7060;margin-bottom:8px;">AQI: <strong style="color:${color};font-size:1.1rem">${city.aqi}</strong></div>
        ${fullCity ? `
          <div style="font-size:0.75rem;color:#7A7060;">PM2.5: ${fullCity.pm25} µg/m³</div>
          <div style="font-size:0.75rem;color:#7A7060;">NO₂: ${fullCity.no2} µg/m³</div>
          <div style="font-size:0.75rem;color:#7A7060;">O₃: ${fullCity.o3} µg/m³</div>
        ` : ''}
        <div style="font-size:0.7rem;color:${color};margin-top:8px;font-weight:600;">${CAT_LABELS[city.cat]}</div>
      </div>
    `, { className: 'light-popup' });

    marker.addTo(map);
    markers.push(marker);
  });
}

// Light popup styles
const styleEl = document.createElement('style');
styleEl.textContent = `
  .light-popup .leaflet-popup-content-wrapper {
    background: #F5F0E8; color: #1A1008;
    border: 1px solid rgba(26,16,8,0.12);
    border-radius: 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }
  .light-popup .leaflet-popup-tip { background: #F5F0E8; }
  .light-popup .leaflet-popup-close-button { color: #7A7060 !important; }
`;
document.head.appendChild(styleEl);

plotMarkers();

function setMapMode(mode, btn) {
  currentMode = mode;
  document.querySelectorAll('.map-ctrl-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  plotMarkers();
}

function searchMapCity() {
  const q = document.getElementById('map-search-input').value.trim().toLowerCase();
  const found = MAP_CITIES.find(c => c.name.toLowerCase().includes(q));
  if (found) {
    map.flyTo([found.lat, found.lng], 8, { duration: 1.2 });
    const m = markers.find(mk => {
      const pos = mk.getLatLng();
      return Math.abs(pos.lat - found.lat) < 0.5 && Math.abs(pos.lng - found.lng) < 0.5;
    });
    if (m) m.openPopup();
  }
}

document.getElementById('map-search-input').addEventListener('keypress', e => {
  if (e.key === 'Enter') searchMapCity();
});

/* ═══════════════════════════════════════
   FEATURES
═══════════════════════════════════════ */
document.getElementById('features-grid').innerHTML = FEATURES.map(f => `
  <div class="feature-cell">
    <div class="feature-icon">${f.icon}</div>
    <div class="feature-name">${f.name}</div>
    <div class="feature-desc">${f.desc}</div>
  </div>
`).join('');

/* ═══════════════════════════════════════
   AQI SCALE
═══════════════════════════════════════ */
document.getElementById('scale-row').innerHTML = AQI_SCALE.map(s => `
  <div class="scale-cell" style="background:${s.bg}">
    <div class="scale-aqi-range" style="color:${s.color}">${s.range}</div>
    <div class="scale-name" style="color:${s.color}">${s.name}</div>
    <div class="scale-advice" style="color:${s.color}">${s.advice}</div>
  </div>
`).join('');

/* ═══════════════════════════════════════
   RE-OBSERVE DYNAMIC CONTENT
═══════════════════════════════════════ */
setTimeout(() => {
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}, 100);