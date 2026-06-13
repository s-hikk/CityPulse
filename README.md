# CityPulse — Real-time Air Quality Intelligence

> Know what you breathe. Live data from 30,000+ stations across 180+ countries.

![CityPulse Hero](https://img.shields.io/badge/status-live-00D4AA?style=flat-square)
![OpenAQ](https://img.shields.io/badge/data-OpenAQ%20v3-00D4AA?style=flat-square)
![Three.js](https://img.shields.io/badge/3D-Three.js-black?style=flat-square)
![Leaflet](https://img.shields.io/badge/map-Leaflet.js-1a9641?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

---

## What is CityPulse?

CityPulse is an interactive air quality monitoring dashboard that pulls live sensor data directly from the [OpenAQ](https://openaq.org) global network. It translates raw atmospheric measurements — PM2.5, PM10, NO₂, O₃, CO, SO₂ — into a single AQI number and presents them through three interfaces: a 3D interactive globe, a city-by-city monitor with 7-day trend charts, and a full-screen heatmap with 200+ live station markers.

Built as a portfolio project to demonstrate real-time API integration, WebGL 3D rendering, and SVG scroll animation techniques.

---

## Live Demo

**[citypulse.vercel.app](https://citypulse.vercel.app)** *(deploy link — update once hosted)*

---

## Screenshots

| Globe | Monitor | Map |
|-------|---------|-----|
| Interactive 3D globe with AQI city dots | City selector with pollutant breakdown | Global heatmap with live station markers |

---

## Features

### Live Data Pipeline
- Calls **OpenAQ v3 API** directly from the browser — no backend proxy required for the demo
- Incremental rendering: cities appear immediately with reference estimates, then silently update as each API call resolves
- Parallel fetches across 7 global regions for map coverage (South Asia, East Asia, Europe, North America, South America, Africa, Middle East)
- 7-day PM2.5 trend via `/v3/measurements` endpoint, bucketed by day and converted to AQI

### 3D Interactive Globe (Three.js)
- WebGL-rendered sphere with wireframe overlay and teal orbit rings
- 40 city markers colour-coded by AQI category, with pulse animations on high-pollution cities
- Drag to rotate, auto-rotation resumes after 3 seconds idle
- Raycasting mouse hover shows city name and live AQI in a floating tooltip

### Scroll-Driven SVG Line
- Catmull-Rom smooth sine wave path pre-computed from page height at load time
- Draws itself based on `scrollY` position via `strokeDashoffset` — no animation loop, purely scroll-driven
- Glowing head dot tracks the tip of the drawn line
- Oscillates left-to-right, full page height

### City Monitor
- 40 cities across 6 continents, displayed in a 2-column grid
- Per-city: AQI number, health category, last updated timestamp, six pollutant readings (µg/m³), 7-day bar chart
- Live OpenAQ badge vs reference estimate indicator per city
- Lazy-loads 7-day trend on city selection to avoid upfront API cost

### Interactive Map
- Leaflet.js with dark-themed OpenStreetMap tiles (`noWrap: true` for clean single-world render)
- 200+ station markers sized and coloured by AQI value
- Toggle between AQI, PM2.5, NO₂, O₃ display modes
- City search with smooth `flyTo` animation and auto-popup
- Map bounds locked to prevent world duplication on scroll-out

### Hero Wind Animation
- 120 sine-wave particle streams on a `<canvas>` behind the hero section
- Each particle has individual amplitude, frequency, speed, opacity fade envelope, and gradient trail
- Represents air currents visually — teal and white particles on a dark field

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend framework | React 18 + Vite |
| 3D rendering | Three.js (r128) |
| Map | Leaflet.js 1.9.4 |
| Data source | OpenAQ API v3 |
| Styling | Vanilla CSS (custom properties, no framework) |
| Fonts | Space Grotesk, Inter (Google Fonts) |
| Backend (planned) | Node.js + Express |
| Deploy | Vercel |

---

## AQI Reference

AQI is calculated from PM2.5 concentration using US EPA breakpoints:

| AQI | Category | Color |
|-----|----------|-------|
| 0 – 50 | Good | `#2ED573` |
| 51 – 100 | Moderate | `#F5A623` |
| 101 – 150 | Unhealthy for Sensitive Groups | `#FF6B35` |
| 151 – 200 | Unhealthy | `#FF4757` |
| 201 – 300 | Very Unhealthy | `#A855F7` |
| 301 + | Hazardous | `#FF6B6B` |

Formula:
```
AQI = ((I_hi - I_lo) / (C_hi - C_lo)) × (C - C_lo) + I_lo
```
where `C` is the PM2.5 concentration, `C_lo/C_hi` are the breakpoint concentrations, and `I_lo/I_hi` are the corresponding AQI values.

---

## Cities Covered

40 cities across 6 continents with reference coordinates and live API enrichment:

**South Asia** — Delhi, Noida, Mumbai, Kolkata, Bangalore, Ahmedabad, Hyderabad, Chennai, Dhaka, Karachi, Lahore

**East Asia & Southeast Asia** — Beijing, Shanghai, Guangzhou, Chengdu, Tokyo, Seoul, Bangkok, Jakarta, Singapore

**Europe** — London, Paris, Berlin, Madrid, Rome, Warsaw, Moscow, Istanbul

**Americas** — New York, Los Angeles, Chicago, Houston, Mexico City, Sao Paulo, Buenos Aires

**Africa & Oceania** — Cairo, Lagos, Nairobi, Johannesburg, Sydney

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/s-hikk/citypulse.git
cd citypulse
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
npm run preview
```

### Single-file version

The `citypulse.html` file in the root is a self-contained version with no build step — open directly in a browser. All dependencies are loaded from CDN. Useful for demos and portfolio sharing.

---

## Project Structure

```
citypulse/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Globe.jsx          # Three.js WebGL globe
│   │   ├── LeafletMap.jsx     # Leaflet map + markers
│   │   ├── CityMonitor.jsx    # City selector + detail panel
│   │   ├── WindCanvas.jsx     # Hero particle animation
│   │   └── ScrollLine.jsx     # SVG scroll-driven path
│   ├── api/
│   │   ├── openaq.js          # OpenAQ v3 fetch helpers
│   │   └── aqi.js             # PM2.5 → AQI conversion
│   ├── data/
│   │   └── cities.js          # City coordinates + fallback AQI
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── citypulse.html             # Self-contained single-file demo
├── package.json
└── README.md
```

---

## API Details

### OpenAQ v3

CityPulse uses two OpenAQ v3 endpoints:

**Latest readings per city**
```
GET /v3/locations?coordinates={lat},{lng}&radius=40000&limit=10&order_by=lastUpdated&sort=desc
```

**7-day PM2.5 trend**
```
GET /v3/measurements?coordinates={lat},{lng}&radius=30000&parameters_id=2&date_from={7daysAgo}&date_to={today}&limit=1000
```

**Important schema note for v3:** The `parameter` field on each sensor is an object, not a string:
```json
{
  "parameter": {
    "id": 2,
    "name": "pm25",
    "units": "µg/m³",
    "displayName": "PM2.5"
  }
}
```
Read `sensor.parameter.name`, not `sensor.parameter` directly.

No API key required for public endpoints, but rate limits apply. A Node.js proxy is recommended for production to cache responses and avoid per-city rate limiting.

---

## Key Implementation Notes

### Scroll SVG line
The path is a Catmull-Rom spline generated at load time from the full page height. `getTotalLength()` measures it once, then `scrollY / maxScroll` maps to `strokeDashoffset`:

```js
const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
activePath.setAttribute('stroke-dashoffset', pathLen * (1 - pct));
```

### Map tile duplication fix
Two options are needed together — `noWrap: true` on the tile layer alone is not enough:

```js
L.map('map', {
  worldCopyJump: false,
  maxBounds: [[-90, -200], [90, 200]],
  maxBoundsViscosity: 1.0,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  noWrap: true,
});
```

### Lat/lng to 3D globe position
```js
function latLngTo3D(lat, lng, radius = 1.03) {
  const phi   = (90 - lat)  * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
     radius * Math.cos(phi),
     radius * Math.sin(phi) * Math.sin(theta)
  );
}
```

---

## Roadmap

- [ ] Node.js proxy server for API caching and rate limit handling
- [ ] Historical data view (30-day, 90-day)
- [ ] Location-based auto-detection on load
- [ ] Push notifications for AQI threshold breaches
- [ ] Comparison mode — two cities side by side
- [ ] CSV export for city data
- [ ] PWA support for offline reference
- [ ] Dark/light theme toggle

---

## Research Publication

This project was developed alongside published research in computational environmental monitoring:

**Shikhar Bhardwaj et al.** — *[Paper Title]*, ICCDM 2026, Springer Lecture Notes in Networks and Systems (LNNS), Scopus-indexed.

---

## Author

**Shikhar Bhardwaj**
B.Tech Information Technology — KIET Group of Institutions, Ghaziabad (2022–2026)

- GitHub: [@s-hikk](https://github.com/s-hikk)
- LinkedIn: [shikhar-bhardwaj-110b34309](https://www.linkedin.com/in/shikhar-bhardwaj-110b34309/)
- Portfolio: *Coming soon — built on the CityPulse template*

---

## License

MIT License — see [LICENSE](LICENSE) for details.

Data provided by [OpenAQ](https://openaq.org) under CC BY 4.0. AQI methodology from the [US EPA AirNow program](https://www.airnow.gov/aqi/aqi-basics/).

---

## Acknowledgements

- [OpenAQ](https://openaq.org) — open air quality data platform
- [Leaflet.js](https://leafletjs.com) — open-source interactive maps
- [Three.js](https://threejs.org) — WebGL 3D library
- [OpenStreetMap](https://www.openstreetmap.org) contributors — map tiles
- [WHO Air Quality Guidelines](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health) — health threshold reference
