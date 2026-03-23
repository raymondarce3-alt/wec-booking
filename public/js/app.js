/**
 * Women's Empowerment Center™ — Shared Frontend Utilities
 */

// ─── API Config ───────────────────────────────────────────────────────────────
const API_BASE = (() => {
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    return 'http://localhost:8787';
  }
  return 'https://wec-booking.raymondarce3.workers.dev';
})();

// ─── API Helpers ──────────────────────────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const url = API_BASE + path;
  const defaults = {
    headers: { 'Content-Type': 'application/json' }
  };
  const merged = {
    ...defaults,
    ...options,
    headers: { ...defaults.headers, ...(options.headers || {}) }
  };
  const res = await fetch(url, merged);
  const data = await res.json().catch(() => ({ error: 'Invalid response' }));
  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}`);
  }
  return data;
}

const api = {
  getSpaces: (type) => apiFetch(`/api/spaces${type ? `?type=${type}` : ''}`),
  getSpace:  (id)   => apiFetch(`/api/space/${id}`),
  getAvailability: (spaceId, month) => {
    const params = new URLSearchParams({ month });
    if (spaceId) params.set('spaceId', spaceId);
    return apiFetch(`/api/availability?${params}`);
  },
  createBooking: (data) => apiFetch('/api/bookings', { method: 'POST', body: JSON.stringify(data) }),
  getBooking:    (id)   => apiFetch(`/api/bookings/${id}`),
  getBookings:   (adminPin, filters = {}) => {
    const params = new URLSearchParams({ adminPin, ...filters });
    return apiFetch(`/api/bookings?${params}`);
  },
  updateBooking: (id, data, adminPin) => apiFetch(`/api/bookings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Admin-Pin': adminPin },
    body: JSON.stringify(data)
  }),
  deleteBooking: (id, adminPin) => apiFetch(`/api/bookings/${id}?adminPin=${adminPin}`, {
    method: 'DELETE',
    headers: { 'X-Admin-Pin': adminPin }
  }),
  createMember: (data) => apiFetch('/api/members', { method: 'POST', body: JSON.stringify(data) }),
  getMembers:   (adminPin) => apiFetch(`/api/members?adminPin=${adminPin}`),
  createCheckout: (data) => apiFetch('/api/checkout', { method: 'POST', body: JSON.stringify(data) })
};

// ─── Navigation ───────────────────────────────────────────────────────────────
function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('nav-mobile');
  if (!toggle || !mobileMenu) return;

  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // Mark active link
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ─── Toast Notifications ──────────────────────────────────────────────────────
function showToast(message, type = 'info', duration = 4000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span style="font-weight:700;font-size:1rem">${icons[type] || icons.info}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(24px)';
    toast.style.transition = 'opacity .3s, transform .3s';
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

// ─── Date Utilities ───────────────────────────────────────────────────────────
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function formatDateDisplay(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  return `${MONTHS[m-1]} ${d}, ${y}`;
}

function formatDateShort(dateStr) {
  if (!dateStr) return '';
  const [, m, d] = dateStr.split('-').map(Number);
  return `${MONTHS[m-1].slice(0,3)} ${d}`;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function getDayOfWeek(dateStr) {
  const d = new Date(dateStr + 'T12:00:00Z');
  return d.getUTCDay(); // 0=Sun, 1=Mon, ..., 6=Sat
}

function getBookingEndDate(startDate, bookingType) {
  switch (bookingType) {
    case 'daily':   return startDate;
    case 'weekend': return addDays(startDate, 1);
    case 'weekday': return addDays(startDate, 4);
    case 'weekly':  return addDays(startDate, 6);
    case 'monthly': {
      const d = new Date(startDate + 'T12:00:00Z');
      const lastDay = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0, 12));
      return lastDay.toISOString().slice(0, 10);
    }
    default: return startDate;
  }
}

function bookingTypeLabel(type) {
  const labels = {
    daily:   'Daily',
    weekend: 'Weekend Block (Sat–Sun)',
    weekday: 'Weekday Block (Mon–Fri)',
    weekly:  'Weekly (7 days)',
    monthly: 'Monthly'
  };
  return labels[type] || type;
}

// ─── Space Utilities ──────────────────────────────────────────────────────────
function spaceTypeLabel(type) {
  const labels = { small: 'Standard Booth', large: 'Premium Suite', event: 'Event Space' };
  return labels[type] || type;
}

function spaceBadgeClass(type) {
  const classes = { small: 'badge-small', large: 'badge-large', event: 'badge-event' };
  return classes[type] || 'badge-gray';
}

var BOOTH_COLORS = {
  'Blue':'#1D4ED8','Rose':'#E11D48','Lavender':'#9333EA','Amber':'#D97706',
  'Jade':'#0F766E','Opal':'#64748B','Ruby':'#B91C1C','Pearl':'#A8B0B8',
  'Sapphire':'#1E3A8A','Coral':'#F97316','Violet':'#6D28D9','Ivory':'#B8A88A',
  'Sage':'#4D7C56','Topaz':'#CA8A04','Onyx':'#0F172A','Fern':'#15803D',
  'Blush':'#EC4899','Teal':'#0D9488','Crimson':'#9F1239','Gold':'#B45309',
  'Silver':'#9CA3AF','Copper':'#C2410C','Emerald':'#047857','Indigo':'#312E81',
  'Mauve':'#A855F7','Bronze':'#92400E','Scarlet':'#DC2626','Azure':'#0284C7'
};
function getBoothColor(name) {
  var parts = name.split(' - ');
  if (parts.length < 2) return null;
  return BOOTH_COLORS[parts[1].trim()] || null;
}

function renderSpaceCard(space) {
  const amenitiesHtml = space.amenities.map(a =>
    `<span class="amenity-tag">${a}</span>`
  ).join('');

  const boothColor = getBoothColor(space.name);
  const bgStyle = boothColor
    ? `background:linear-gradient(135deg,${boothColor}88 0%,${boothColor}CC 100%)`
    : `background:linear-gradient(135deg,#E8D5F5 0%,#F5E6D0 100%)`;
  const lightColors = ['Ivory','Pearl','Silver','Opal'];
  const colorName = space.name.includes(' - ') ? space.name.split(' - ')[1].trim() : '';
  const isLight = lightColors.includes(colorName);
  const iconFill = boothColor ? (isLight ? '#333' : '#fff') : 'var(--purple)';
  const borderStyle = isLight ? 'border:2px solid #333;' : '';

  return `
    <div class="card space-card" data-id="${space.id}" data-type="${space.type}">
      <div class="card-image" style="${bgStyle}${isLight ? ';border:2px solid #555' : ''}">
        <span class="card-badge ${spaceBadgeClass(space.type)}">${spaceTypeLabel(space.type)}</span>
        <div class="card-image-placeholder" style="background:${boothColor ? boothColor : 'rgba(107,45,139,.15)'};${borderStyle}">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width:36px;height:36px;fill:none;stroke:${isLight ? '#333' : iconFill};stroke-width:1.5"><path d="M6 3h12l4 6-10 13L2 9z" fill="${iconFill}" opacity=".3"/><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M2 9h20"/><path d="M10 3l-2 6 4 13 4-13-2-6"/></svg>
        </div>
      </div>
      <div class="card-body">
        <h3 style="margin-bottom:8px">${space.name}</h3>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;flex-wrap:wrap">
          <span style="font-size:.85rem;color:var(--gray-600);font-weight:600">Size: ${space.sqft} sq ft</span>
          <span style="font-size:.95rem;color:var(--purple);font-weight:700">${space.price || '$250/mo'}</span>
        </div>
        <div class="space-meta">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${space.location.split('·')[0].trim()}
        </div>
        <div class="amenities-list">${amenitiesHtml}</div>
        <p style="font-size:.82rem;line-height:1.6;margin-bottom:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${space.description}</p>
      </div>
      <div class="card-footer" style="display:flex;gap:8px">
        <a href="booking.html?spaceId=${space.id}" class="btn btn-primary btn-sm" style="flex:1;text-align:center">Book Now</a>
        <button class="btn btn-secondary btn-sm" onclick="showSpaceDetails('${space.id}')">Details</button>
      </div>
    </div>
  `;
}

function spaceIcon() {
  return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
}

// ─── Status helpers ───────────────────────────────────────────────────────────
function statusBadge(status) {
  const map = {
    pending:   ['badge-yellow', 'Pending'],
    approved:  ['badge-green',  'Approved'],
    denied:    ['badge-red',    'Denied'],
    cancelled: ['badge-gray',   'Cancelled']
  };
  const [cls, label] = map[status] || ['badge-gray', status];
  return `<span class="badge ${cls}">${label}</span>`;
}

// ─── DOM Helpers ──────────────────────────────────────────────────────────────
function el(id) { return document.getElementById(id); }
function qs(sel, ctx = document) { return ctx.querySelector(sel); }
function qsa(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

function setHTML(id, html) {
  const e = el(id);
  if (e) e.innerHTML = html;
}

function show(id) { const e = el(id); if (e) e.classList.remove('hidden'); }
function hide(id) { const e = el(id); if (e) e.classList.add('hidden'); }

function showLoading(containerId, message = 'Loading…') {
  setHTML(containerId, `
    <div class="loading-overlay">
      <div class="spinner"></div>
      <p>${message}</p>
    </div>
  `);
}

function showError(containerId, message, retry = null) {
  setHTML(containerId, `
    <div style="text-align:center;padding:48px 24px">
      <div style="font-size:2rem;margin-bottom:12px">⚠️</div>
      <p style="color:#dc2626;font-weight:600;margin-bottom:8px">Something went wrong</p>
      <p style="font-size:.88rem">${message}</p>
      ${retry ? `<button class="btn btn-secondary btn-sm mt-4" onclick="${retry}()">Try Again</button>` : ''}
    </div>
  `);
}

// ─── URL Params ───────────────────────────────────────────────────────────────
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// ─── Local storage helpers ────────────────────────────────────────────────────
const store = {
  get: (key) => { try { return JSON.parse(localStorage.getItem('wec_' + key)); } catch { return null; } },
  set: (key, val) => localStorage.setItem('wec_' + key, JSON.stringify(val)),
  del: (key) => localStorage.removeItem('wec_' + key)
};

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', initNav);
