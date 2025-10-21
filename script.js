// UI 
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.target.classList.toggle('show', e.isIntersecting));
  }, { threshold: 0.25 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
});

(() => {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  const onScroll = () => btn.classList.toggle('visible', window.scrollY > 300);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Map: Leaflet + point
window.addEventListener('load', () => {
  const mapDiv = document.getElementById('mapCanvas');
  if (!mapDiv) return;

  if (typeof window.L === 'undefined') {
    console.error('Leaflet yüklenemedi');
    return;
  }

  // coordinates
  const lat = 39.86564580864383;
  const lon = 32.73395101304132;

  // map
  const map = L.map('mapCanvas', {
    zoomControl: true
  }).setView([lat, lon], 17);

  // OSM 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // point
  const marker = L.marker([lat, lon]).addTo(map);

});


// sparkle rain 7sec
window.addEventListener('load', () => {
  const container = document.getElementById('sparkle-container');
  if (!container) return;

  const duration = 7000; 
  const interval = 120;  

  const sparkle = () => {
    const star = document.createElement('div');
    star.className = 'sparkle';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.animationDuration = (2 + Math.random() * 2) + 's';
    star.style.transform = `rotate(45deg) scale(${0.6 + Math.random()*1.4})`;
    container.appendChild(star);
    setTimeout(() => star.remove(), 3000);
  };

  const generator = setInterval(sparkle, interval);
  setTimeout(() => {
    clearInterval(generator);
    setTimeout(() => container.remove(), 2000);
  }, duration);
});
