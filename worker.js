/**
 * Women's Empowerment Center™ — Booking System API
 * Cloudflare Worker Backend
 */

// ─── Static Space Data ───────────────────────────────────────────────────────

const SPACES_DATA = [
  // ── Standard Booths 1–26 ──
  {
    id: "1", number: 1, name: "Booth - Blue", type: "small",
    location: "Building A, Floor 1 · Bay 1 (North Wing)",
    description: "A bright, energizing corner space perfect for creative entrepreneurs and artisans. White pegboard display wall with natural north-facing light.",
    amenities: ["High-Speed WiFi", "2 Power Outlets", "LED Overhead Lighting", "Storage Shelf", "Display Hooks", "Climate Control"],
    sqft: 60, active: true
  },
  {
    id: "2", number: 2, name: "Booth - Rose", type: "small",
    location: "Building A, Floor 1 · Bay 2 (North Wing)",
    description: "Warm, inviting booth ideal for beauty and wellness professionals. Soft lighting and thoughtful layout for client-facing work.",
    amenities: ["High-Speed WiFi", "2 Power Outlets", "Warm LED Lighting", "Storage Shelf", "Display Hooks", "Mirror Mount"],
    sqft: 60, active: true
  },
  {
    id: "3", number: 3, name: "Booth - Lavender", type: "small",
    location: "Building A, Floor 1 · Bay 3 (North Wing)",
    description: "Calming corner space suited for counselors, coaches, and creatives. Cozy atmosphere with soft accent lighting.",
    amenities: ["High-Speed WiFi", "2 Power Outlets", "Dimmable Lighting", "Storage Shelf", "Corner Location"],
    sqft: 65, active: true
  },
  {
    id: "4", number: 4, name: "Booth - Amber", type: "small",
    location: "Building A, Floor 1 · Bay 4 (North Wing)",
    description: "A craftsperson's dream — sturdy work surface, extra outlet access, and strong overhead lighting for detailed work.",
    amenities: ["High-Speed WiFi", "4 Power Outlets", "Bright LED Lighting", "Storage Shelf", "Heavy-Duty Work Surface"],
    sqft: 70, active: true
  },
  {
    id: "5", number: 5, name: "Booth - Jade", type: "small",
    location: "Building A, Floor 1 · Bay 5 (North Wing)",
    description: "A serene, focused workspace popular with writers, designers, and consultants. Minimal and clean.",
    amenities: ["High-Speed WiFi", "2 Power Outlets", "LED Lighting", "Small Storage Cabinet", "Display Hooks"],
    sqft: 60, active: true
  },
  {
    id: "6", number: 6, name: "Booth - Opal", type: "small",
    location: "Building A, Floor 1 · Bay 6 (North Wing)",
    description: "Versatile studio space with extra wall display area, great for photographers, artists, and boutique sellers.",
    amenities: ["High-Speed WiFi", "2 Power Outlets", "Track Lighting", "Display Wall Panel", "Storage Shelf"],
    sqft: 62, active: true
  },
  {
    id: "7", number: 7, name: "Suite - Scarlet", type: "large",
    location: "Building A, Floor 1 · Bay 7 (North Wing)",
    description: "High-energy space with premium lighting setup — a favorite for jewelers, photographers, and visual artists.",
    amenities: ["High-Speed WiFi", "3 Power Outlets", "Studio-Grade Lighting", "Lockable Storage", "Display Hooks"],
    sqft: 65, active: true
  },
  {
    id: "8", number: 8, name: "Booth - Pearl", type: "small",
    location: "Building A, Floor 1 · Bay 8 (North Wing)",
    description: "Elegant and refined, perfect for luxury goods vendors and personal shopping consultants.",
    amenities: ["High-Speed WiFi", "2 Power Outlets", "Soft Track Lighting", "Storage Shelf", "Display Hooks", "Climate Control"],
    sqft: 60, active: true
  },
  {
    id: "9", number: 9, name: "Booth - Sapphire", type: "small",
    location: "Building A, Floor 1 · Bay 9 (North Wing)",
    description: "End-of-row booth with extra visibility and foot traffic. Great for retail and service businesses.",
    amenities: ["High-Speed WiFi", "2 Power Outlets", "LED Lighting", "Storage Shelf", "Corner Visibility", "Display Hooks"],
    sqft: 68, active: true
  },
  {
    id: "10", number: 10, name: "Suite - Azure", type: "large",
    location: "Building A, Floor 2 · Bay 1 (South Wing)",
    description: "Vibrant and welcoming second-floor booth with great visibility from the mezzanine.",
    amenities: ["High-Speed WiFi", "2 Power Outlets", "Warm LED Lighting", "Storage Shelf", "Mezzanine View"],
    sqft: 60, active: true
  },
  {
    id: "11", number: 11, name: "Booth - Violet", type: "small",
    location: "Building A, Floor 2 · Bay 2 (South Wing)",
    description: "Creative studio space with a calming purple-toned environment, beloved by artists and wellness practitioners.",
    amenities: ["High-Speed WiFi", "2 Power Outlets", "Dimmable LED Lighting", "Display Wall", "Storage Shelf"],
    sqft: 62, active: true
  },
  {
    id: "12", number: 12, name: "Booth - Ivory", type: "small",
    location: "Building A, Floor 2 · Bay 3 (South Wing)",
    description: "Clean white aesthetic perfect for food entrepreneurs, bakers, and product demos. Extra outlet access.",
    amenities: ["High-Speed WiFi", "4 Power Outlets", "Bright Overhead Lighting", "Storage Cabinet", "Easy-Clean Surface"],
    sqft: 70, active: true
  },
  {
    id: "13", number: 13, name: "Booth - Sage", type: "small",
    location: "Building A, Floor 2 · Bay 4 (South Wing)",
    description: "Nature-inspired, calming space ideal for herbalists, wellness coaches, and holistic practitioners.",
    amenities: ["High-Speed WiFi", "2 Power Outlets", "Natural-Tone Lighting", "Storage Shelf", "Display Hooks"],
    sqft: 60, active: true
  },
  {
    id: "14", number: 14, name: "Booth - Topaz", type: "small",
    location: "Building A, Floor 2 · Bay 5 (South Wing)",
    description: "Golden-hued ambiance with warm lighting, a favorite for jewelry designers and luxury boutique vendors.",
    amenities: ["High-Speed WiFi", "2 Power Outlets", "Warm Accent Lighting", "Lockable Storage", "Display Hooks", "Mirror Mount"],
    sqft: 65, active: true
  },
  {
    id: "15", number: 15, name: "Booth - Onyx", type: "small",
    location: "Building A, Floor 2 · Bay 6 (South Wing)",
    description: "Sleek, modern dark-accent space great for tech entrepreneurs, digital artists, and photographers.",
    amenities: ["High-Speed WiFi", "4 Power Outlets", "LED Track Lighting", "Storage Shelf", "Display Hooks"],
    sqft: 62, active: true
  },
  {
    id: "16", number: 16, name: "Booth - Fern", type: "small",
    location: "Building A, Floor 2 · Bay 7 (South Wing)",
    description: "Fresh, botanical-inspired corner booth with natural feel. Perfect for plant shops, natural beauty, and eco-brands.",
    amenities: ["High-Speed WiFi", "2 Power Outlets", "Natural Lighting", "Corner Location", "Storage Shelf", "Display Hooks"],
    sqft: 65, active: true
  },
  {
    id: "17", number: 17, name: "Booth - Blush", type: "small",
    location: "Building A, Floor 2 · Bay 8 (South Wing)",
    description: "Soft, feminine aesthetic beloved by fashion boutiques, beauty brands, and lifestyle entrepreneurs.",
    amenities: ["High-Speed WiFi", "2 Power Outlets", "Soft Warm Lighting", "Display Hooks", "Storage Shelf", "Mirror Mount"],
    sqft: 60, active: true
  },
  {
    id: "18", number: 18, name: "Booth - Teal", type: "small",
    location: "Building A, Floor 2 · Bay 9 (South Wing)",
    description: "Cool, professional teal-accented space for consultants, coaches, and service professionals.",
    amenities: ["High-Speed WiFi", "2 Power Outlets", "LED Overhead Lighting", "Storage Cabinet", "Display Hooks"],
    sqft: 60, active: true
  },
  {
    id: "19", number: 19, name: "Booth - Crimson", type: "small",
    location: "Building A, Floor 3 · Bay 1 (East Wing)",
    description: "Bold and striking space with high visibility, ideal for pop-up retail and product showcases.",
    amenities: ["High-Speed WiFi", "3 Power Outlets", "Adjustable Track Lighting", "Storage Shelf", "Display Hooks", "Climate Control"],
    sqft: 62, active: true
  },
  {
    id: "20", number: 20, name: "Booth - Gold", type: "small",
    location: "Building A, Floor 3 · Bay 2 (East Wing)",
    description: "Warm golden ambiance perfect for luxury brands, jewelry designers, and premium service providers.",
    amenities: ["High-Speed WiFi", "2 Power Outlets", "Warm LED Lighting", "Lockable Storage", "Display Hooks"],
    sqft: 65, active: true
  },
  {
    id: "21", number: 21, name: "Booth - Silver", type: "small",
    location: "Building A, Floor 3 · Bay 3 (East Wing)",
    description: "Modern and sleek with a contemporary feel, great for tech-forward businesses and digital services.",
    amenities: ["High-Speed WiFi", "3 Power Outlets", "LED Overhead Lighting", "Storage Shelf", "Display Wall Panel"],
    sqft: 60, active: true
  },
  {
    id: "22", number: 22, name: "Booth - Copper", type: "small",
    location: "Building A, Floor 3 · Bay 4 (East Wing)",
    description: "Artisan-style booth with warm copper tones and a handcrafted feel. Perfect for makers and craft vendors.",
    amenities: ["High-Speed WiFi", "4 Power Outlets", "Track Lighting", "Storage Shelf", "Heavy-Duty Work Surface", "Display Hooks"],
    sqft: 70, active: true
  },
  {
    id: "23", number: 23, name: "Booth - Emerald", type: "small",
    location: "Building A, Floor 3 · Bay 5 (East Wing)",
    description: "Rich and vibrant green-toned space that inspires growth. Ideal for wellness, health, and nature-focused brands.",
    amenities: ["High-Speed WiFi", "2 Power Outlets", "Dimmable LED Lighting", "Storage Cabinet", "Display Hooks"],
    sqft: 62, active: true
  },
  {
    id: "24", number: 24, name: "Booth - Indigo", type: "small",
    location: "Building A, Floor 3 · Bay 6 (East Wing)",
    description: "Deep, contemplative space perfect for artists, writers, and spiritual entrepreneurs. Corner location with extra privacy.",
    amenities: ["High-Speed WiFi", "2 Power Outlets", "Soft Accent Lighting", "Corner Location", "Storage Shelf", "Display Hooks"],
    sqft: 65, active: true
  },
  {
    id: "25", number: 25, name: "Booth - Mauve", type: "small",
    location: "Building A, Floor 3 · Bay 7 (East Wing)",
    description: "Elegant and versatile with soft purple undertones. Great for beauty professionals, consultants, and boutique sellers.",
    amenities: ["High-Speed WiFi", "2 Power Outlets", "Warm LED Lighting", "Storage Shelf", "Display Hooks", "Mirror Mount"],
    sqft: 60, active: true
  },
  {
    id: "26", number: 26, name: "Booth - Bronze", type: "small",
    location: "Building A, Floor 3 · Bay 8 (East Wing)",
    description: "Earthy, grounded aesthetic with warm bronze accents. End-of-row with extra visibility and foot traffic.",
    amenities: ["High-Speed WiFi", "3 Power Outlets", "LED Track Lighting", "Lockable Storage", "Corner Visibility", "Display Hooks"],
    sqft: 68, active: true
  },

  // ── Premium Booths 27–28 ──
  {
    id: "27", number: 27, name: "Booth - Scarlet", type: "small",
    location: "Building B, Main Floor · Suite 1",
    description: "Expansive premium suite with full display wall, counter space, and meeting area. Ideal for established businesses, pop-up shops, and product launches.",
    amenities: ["High-Speed WiFi", "8 Power Outlets", "Studio-Grade Lighting", "Large Storage Cabinet", "Full Display Wall", "Counter Space", "Meeting Table + 4 Chairs", "Mini Fridge", "Climate Control"],
    sqft: 180, active: true
  },
  {
    id: "28", number: 28, name: "Booth - Azure", type: "small",
    location: "Building B, Main Floor · Suite 2",
    description: "The pinnacle of our booth offerings. Premium finishes, professional lighting, double-sided display, and maximum visibility from the main corridor.",
    amenities: ["High-Speed WiFi", "8 Power Outlets", "Premium Track Lighting", "Locking Storage Cabinet", "Full Display System", "Counter Space", "Whiteboard", "Mini Fridge", "Sink Access", "Climate Control"],
    sqft: 200, active: true
  },

  // ── Event Space 29 ──
  {
    id: "29", number: 29, name: "The Grand Hall", type: "event",
    location: "Building C, Ground Floor · Main Event Space",
    description: "Our flagship event space. The Grand Hall accommodates 80+ guests and is ideal for workshops, seminars, market days, awards ceremonies, and community gatherings. Full AV and catering access.",
    amenities: ["High-Speed WiFi", "20+ Power Outlets", "Full PA System", "Dual Projection Screens", "Professional Stage Lighting", "Wireless Microphones (4)", "Flexible Seating (80+)", "10 Folding Tables", "Climate Control / HVAC", "Kitchenette Access", "Accessible Entrance", "Coat Check", "AV Tech Support Available"],
    sqft: 1200, active: true
  }
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateId() {
  return crypto.randomUUID();
}

function jsonResponse(data, status = 200, corsHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

function errorResponse(message, status = 400, corsHeaders = {}) {
  return jsonResponse({ error: message }, status, corsHeaders);
}

async function parseBody(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

// Parse date string "YYYY-MM-DD" → Date object (UTC noon to avoid TZ issues)
function parseDate(str) {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12));
}

// Format Date → "YYYY-MM-DD"
function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

// Calculate end date given startDate and bookingType
function calcEndDate(startDate, bookingType) {
  const start = parseDate(startDate);
  switch (bookingType) {
    case "daily":
      return startDate;
    case "weekend": {
      // startDate must be Saturday; end is Sunday
      const day = start.getUTCDay(); // 0=Sun,6=Sat
      if (day === 6) {
        const end = new Date(start);
        end.setUTCDate(end.getUTCDate() + 1);
        return formatDate(end);
      }
      return null; // invalid
    }
    case "weekday": {
      // startDate must be Monday; end is Friday
      const day = start.getUTCDay();
      if (day === 1) {
        const end = new Date(start);
        end.setUTCDate(end.getUTCDate() + 4);
        return formatDate(end);
      }
      return null; // invalid
    }
    case "weekly": {
      const end = new Date(start);
      end.setUTCDate(end.getUTCDate() + 6);
      return formatDate(end);
    }
    case "monthly": {
      const end = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 0, 12));
      return formatDate(end);
    }
    case "yearly": {
      const end = new Date(Date.UTC(start.getUTCFullYear(), 11, 31, 12));
      return formatDate(end);
    }
    default:
      return startDate;
  }
}

// Return all dates (YYYY-MM-DD) between start and end inclusive
function getDateRange(startDate, endDate) {
  const dates = [];
  const cur = parseDate(startDate);
  const end = parseDate(endDate);
  while (cur <= end) {
    dates.push(formatDate(cur));
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return dates;
}

// Do two date ranges overlap?
function datesOverlap(s1, e1, s2, e2) {
  return s1 <= e2 && s2 <= e1;
}

// ─── KV Space Initialisation ─────────────────────────────────────────────────

async function initSpaces(env) {
  const initialized = await env.WEC_KV.get("spaces:initialized");
  if (initialized) return;

  const ids = [];
  for (const space of SPACES_DATA) {
    await env.WEC_KV.put(`space:${space.id}`, JSON.stringify(space));
    ids.push(space.id);
  }
  await env.WEC_KV.put("spaces:all", JSON.stringify(ids));
  await env.WEC_KV.put("spaces:initialized", "true");
}

// ─── Route Handlers ───────────────────────────────────────────────────────────

// GET /api/spaces
async function handleGetSpaces(request, env, cors) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");

  let spaces = SPACES_DATA;
  if (type) spaces = spaces.filter(s => s.type === type);

  return jsonResponse(spaces, 200, cors);
}

// GET /api/spaces/:id
async function handleGetSpace(id, request, env, cors) {
  const space = SPACES_DATA.find(s => s.id === id);
  if (!space) return errorResponse("Space not found", 404, cors);

  // Attach upcoming bookings
  const bookingsRaw = await env.WEC_KV.get(`bookings:space:${id}`);
  const bookingIds = bookingsRaw ? JSON.parse(bookingsRaw) : [];

  const today = formatDate(new Date());
  const upcoming = [];
  for (const bid of bookingIds) {
    const b = await env.WEC_KV.get(`booking:${bid}`);
    if (b) {
      const booking = JSON.parse(b);
      if (booking.endDate >= today && booking.status !== "cancelled" && booking.status !== "denied") {
        upcoming.push({ startDate: booking.startDate, endDate: booking.endDate, status: booking.status });
      }
    }
  }

  return jsonResponse({ ...space, bookings: upcoming }, 200, cors);
}

// GET /api/bookings
async function handleGetBookings(request, env, cors) {
  const url = new URL(request.url);
  const spaceId = url.searchParams.get("spaceId");
  const status = url.searchParams.get("status");
  const adminPin = url.searchParams.get("adminPin") || request.headers.get("x-admin-pin");

  // Only allow full listing with admin pin
  if (!adminPin || adminPin !== (env.ADMIN_PIN || "wec-admin-2024")) {
    return errorResponse("Unauthorized — admin PIN required", 401, cors);
  }

  const allRaw = await env.WEC_KV.get("bookings:all");
  const allIds = allRaw ? JSON.parse(allRaw) : [];

  const bookings = [];
  for (const id of allIds) {
    const raw = await env.WEC_KV.get(`booking:${id}`);
    if (raw) {
      const b = JSON.parse(raw);
      if (spaceId && b.spaceId !== spaceId) continue;
      if (status && b.status !== status) continue;
      bookings.push(b);
    }
  }

  // Sort newest first
  bookings.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return jsonResponse(bookings, 200, cors);
}

// GET /api/bookings/:id
async function handleGetBooking(id, env, cors) {
  const raw = await env.WEC_KV.get(`booking:${id}`);
  if (!raw) return errorResponse("Booking not found", 404, cors);
  return jsonResponse(JSON.parse(raw), 200, cors);
}

// POST /api/bookings
async function handleCreateBooking(request, env, cors) {
  const body = await parseBody(request);
  if (!body) return errorResponse("Invalid JSON body", 400, cors);

  const { spaceId, bookingType, startDate, contactName, contactEmail, contactPhone, notes, memberId } = body;

  // Validate required fields
  if (!spaceId) return errorResponse("spaceId is required", 400, cors);
  if (!bookingType) return errorResponse("bookingType is required", 400, cors);
  if (!startDate) return errorResponse("startDate is required", 400, cors);
  if (!contactName) return errorResponse("contactName is required", 400, cors);
  if (!contactEmail) return errorResponse("contactEmail is required", 400, cors);

  const validTypes = ["daily", "weekend", "weekday", "weekly", "monthly", "yearly"];
  if (!validTypes.includes(bookingType)) {
    return errorResponse("bookingType must be one of: " + validTypes.join(", "), 400, cors);
  }

  // Validate date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    return errorResponse("startDate must be YYYY-MM-DD", 400, cors);
  }

  // Validate space exists
  const space = SPACES_DATA.find(s => s.id === spaceId);
  if (!space) return errorResponse("Space not found", 404, cors);

  // Calculate end date
  const endDate = calcEndDate(startDate, bookingType);
  if (!endDate) {
    return errorResponse(
      bookingType === "weekend"
        ? "For weekend bookings, startDate must be a Saturday"
        : "For weekday bookings, startDate must be a Monday",
      400, cors
    );
  }

  // Check for conflicts (approved bookings only)
  const existingRaw = await env.WEC_KV.get(`bookings:space:${spaceId}`);
  const existingIds = existingRaw ? JSON.parse(existingRaw) : [];
  for (const eid of existingIds) {
    const raw = await env.WEC_KV.get(`booking:${eid}`);
    if (!raw) continue;
    const existing = JSON.parse(raw);
    if (existing.status === "cancelled" || existing.status === "denied") continue;
    if (datesOverlap(startDate, endDate, existing.startDate, existing.endDate)) {
      return errorResponse(
        `Space is already booked from ${existing.startDate} to ${existing.endDate} (booking ${eid})`,
        409, cors
      );
    }
  }

  // Create booking
  const id = generateId();
  const booking = {
    id,
    spaceId,
    spaceName: space.name,
    spaceType: space.type,
    bookingType,
    startDate,
    endDate,
    contactName: contactName.trim(),
    contactEmail: contactEmail.trim().toLowerCase(),
    contactPhone: contactPhone ? contactPhone.trim() : null,
    notes: notes ? notes.trim() : null,
    memberId: memberId || null,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await env.WEC_KV.put(`booking:${id}`, JSON.stringify(booking));

  // Update space index
  existingIds.push(id);
  await env.WEC_KV.put(`bookings:space:${spaceId}`, JSON.stringify(existingIds));

  // Update global index
  const allRaw = await env.WEC_KV.get("bookings:all");
  const allIds = allRaw ? JSON.parse(allRaw) : [];
  allIds.push(id);
  await env.WEC_KV.put("bookings:all", JSON.stringify(allIds));

  return jsonResponse({ success: true, booking }, 201, cors);
}

// PUT /api/bookings/:id
async function handleUpdateBooking(id, request, env, cors) {
  const adminPin = request.headers.get("x-admin-pin");
  if (!adminPin || adminPin !== (env.ADMIN_PIN || "wec-admin-2024")) {
    return errorResponse("Unauthorized — admin PIN required", 401, cors);
  }

  const raw = await env.WEC_KV.get(`booking:${id}`);
  if (!raw) return errorResponse("Booking not found", 404, cors);

  const body = await parseBody(request);
  if (!body) return errorResponse("Invalid JSON body", 400, cors);

  const booking = JSON.parse(raw);
  const validStatuses = ["pending", "approved", "denied", "cancelled"];

  if (body.status && !validStatuses.includes(body.status)) {
    return errorResponse("status must be one of: " + validStatuses.join(", "), 400, cors);
  }

  const updated = {
    ...booking,
    status: body.status ?? booking.status,
    notes: body.notes !== undefined ? body.notes : booking.notes,
    updatedAt: new Date().toISOString()
  };

  await env.WEC_KV.put(`booking:${id}`, JSON.stringify(updated));
  return jsonResponse({ success: true, booking: updated }, 200, cors);
}

// DELETE /api/bookings/:id
async function handleDeleteBooking(id, request, env, cors) {
  const raw = await env.WEC_KV.get(`booking:${id}`);
  if (!raw) return errorResponse("Booking not found", 404, cors);

  const booking = JSON.parse(raw);

  // Allow cancellation by owner (via email match) or admin
  const url = new URL(request.url);
  const adminPin = request.headers.get("x-admin-pin") || url.searchParams.get("adminPin");
  const cancelEmail = url.searchParams.get("email");

  const isAdmin = adminPin && adminPin === (env.ADMIN_PIN || "wec-admin-2024");
  const isOwner = cancelEmail && cancelEmail.toLowerCase() === booking.contactEmail;

  if (!isAdmin && !isOwner) {
    return errorResponse("Unauthorized — provide admin PIN or matching email to cancel", 401, cors);
  }

  const updated = { ...booking, status: "cancelled", updatedAt: new Date().toISOString() };
  await env.WEC_KV.put(`booking:${id}`, JSON.stringify(updated));

  return jsonResponse({ success: true, message: "Booking cancelled" }, 200, cors);
}

// GET /api/availability?spaceId=X&month=YYYY-MM
async function handleGetAvailability(request, env, cors) {
  const url = new URL(request.url);
  const spaceId = url.searchParams.get("spaceId");
  const month = url.searchParams.get("month"); // YYYY-MM

  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return errorResponse("month parameter required (YYYY-MM)", 400, cors);
  }

  const [year, mon] = month.split("-").map(Number);
  const daysInMonth = new Date(Date.UTC(year, mon, 0)).getUTCDate();

  // Build list of spaces to check
  const spacesToCheck = spaceId
    ? SPACES_DATA.filter(s => s.id === spaceId)
    : SPACES_DATA;

  const result = {};

  for (const space of spacesToCheck) {
    const existingRaw = await env.WEC_KV.get(`bookings:space:${space.id}`);
    const existingIds = existingRaw ? JSON.parse(existingRaw) : [];

    const bookedDates = new Set();
    const pendingDates = new Set();

    for (const bid of existingIds) {
      const raw = await env.WEC_KV.get(`booking:${bid}`);
      if (!raw) continue;
      const b = JSON.parse(raw);
      if (b.status === "cancelled" || b.status === "denied") continue;

      const range = getDateRange(b.startDate, b.endDate);
      for (const d of range) {
        if (!d.startsWith(month)) continue;
        if (b.status === "approved") bookedDates.add(d);
        else if (b.status === "pending") pendingDates.add(d);
      }
    }

    const days = {};
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${month}-${String(d).padStart(2, "0")}`;
      if (bookedDates.has(dateStr)) days[dateStr] = "booked";
      else if (pendingDates.has(dateStr)) days[dateStr] = "pending";
      else days[dateStr] = "available";
    }

    result[space.id] = { space: { id: space.id, name: space.name, type: space.type }, days };
  }

  return jsonResponse({ month, availability: result }, 200, cors);
}

// POST /api/members
async function handleCreateMember(request, env, cors) {
  const body = await parseBody(request);
  if (!body) return errorResponse("Invalid JSON body", 400, cors);

  const { name, email, phone, tier, businessName, businessType, notes } = body;

  if (!name) return errorResponse("name is required", 400, cors);
  if (!email) return errorResponse("email is required", 400, cors);
  if (!tier) return errorResponse("tier is required", 400, cors);

  const validTiers = ["community", "professional", "enterprise"];
  if (!validTiers.includes(tier)) {
    return errorResponse("tier must be one of: " + validTiers.join(", "), 400, cors);
  }

  // Check duplicate email
  const allRaw = await env.WEC_KV.get("members:all");
  const allIds = allRaw ? JSON.parse(allRaw) : [];
  for (const mid of allIds) {
    const raw = await env.WEC_KV.get(`member:${mid}`);
    if (raw) {
      const m = JSON.parse(raw);
      if (m.email === email.toLowerCase()) {
        return errorResponse("A member with this email already exists", 409, cors);
      }
    }
  }

  const id = generateId();
  const member = {
    id,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? phone.trim() : null,
    tier,
    businessName: businessName ? businessName.trim() : null,
    businessType: businessType ? businessType.trim() : null,
    notes: notes ? notes.trim() : null,
    status: "active",
    joinDate: formatDate(new Date()),
    createdAt: new Date().toISOString()
  };

  await env.WEC_KV.put(`member:${id}`, JSON.stringify(member));
  allIds.push(id);
  await env.WEC_KV.put("members:all", JSON.stringify(allIds));

  return jsonResponse({ success: true, member }, 201, cors);
}

// POST /api/checkout — Create Stripe Checkout Session
async function handleCreateCheckout(request, env, cors) {
  const body = await request.json();
  const { priceId, bookingId, customerEmail, spaceName, bookingType, startDate } = body;

  if (!priceId || !bookingId || !customerEmail) {
    return errorResponse("Missing required fields: priceId, bookingId, customerEmail", 400, cors);
  }

  const stripeKey = env.STRIPE_SK;
  if (!stripeKey) {
    return errorResponse("Stripe not configured", 500, cors);
  }

  const siteUrl = "https://wec-booking-site-4mh.pages.dev";

  const params = new URLSearchParams();
  params.append("mode", "payment");
  params.append("payment_method_types[0]", "card");
  params.append("line_items[0][price]", priceId);
  params.append("line_items[0][quantity]", "1");
  params.append("customer_email", customerEmail);
  params.append("success_url", `${siteUrl}/booking.html?success=true&bookingId=${bookingId}`);
  params.append("cancel_url", `${siteUrl}/booking.html?canceled=true&bookingId=${bookingId}`);
  params.append("metadata[bookingId]", bookingId);
  params.append("metadata[spaceName]", spaceName || "");
  params.append("metadata[bookingType]", bookingType || "");
  params.append("metadata[startDate]", startDate || "");

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${stripeKey}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString()
  });

  const session = await res.json();

  if (session.error) {
    return errorResponse(`Stripe error: ${session.error.message}`, 400, cors);
  }

  // Update booking status to pending_payment
  const bookingRaw = await env.WEC_KV.get(`booking:${bookingId}`);
  if (bookingRaw) {
    const booking = JSON.parse(bookingRaw);
    booking.status = "pending_payment";
    booking.stripeSessionId = session.id;
    await env.WEC_KV.put(`booking:${bookingId}`, JSON.stringify(booking));
  }

  return jsonResponse({ url: session.url, sessionId: session.id }, 200, cors);
}

// POST /api/webhook/stripe — Handle Stripe webhook events
async function handleStripeWebhook(request, env, cors) {
  const body = await request.text();
  let event;
  
  try {
    event = JSON.parse(body);
  } catch (e) {
    return errorResponse("Invalid JSON", 400, cors);
  }

  // Handle checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;
    const customerEmail = session.customer_email || session.metadata?.customerEmail;
    const spaceName = session.metadata?.spaceName || "";
    const bookingType = session.metadata?.bookingType || "";
    const startDate = session.metadata?.startDate || "";
    const amountPaid = session.amount_total ? (session.amount_total / 100).toFixed(2) : "0.00";

    // Update booking status in KV
    if (bookingId) {
      const bookingRaw = await env.WEC_KV.get(`booking:${bookingId}`);
      if (bookingRaw) {
        const booking = JSON.parse(bookingRaw);
        booking.status = "paid";
        booking.paidAt = new Date().toISOString();
        booking.stripePaymentId = session.payment_intent;
        booking.amountPaid = amountPaid;
        await env.WEC_KV.put(`booking:${bookingId}`, JSON.stringify(booking));
      }
    }

    // Create contact in GoHighLevel
    const ghlApiKey = env.GHL_API_KEY;
    const ghlLocationId = env.GHL_LOCATION_ID;
    if (ghlApiKey && ghlLocationId && customerEmail) {
      try {
        // Parse name from booking
        let firstName = "", lastName = "";
        if (bookingId) {
          const bookingRaw = await env.WEC_KV.get(`booking:${bookingId}`);
          if (bookingRaw) {
            const booking = JSON.parse(bookingRaw);
            const parts = (booking.contactName || "").split(" ");
            firstName = parts[0] || "";
            lastName = parts.slice(1).join(" ") || "";
          }
        }

        // Create/update GHL contact
        const ghlRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${ghlApiKey}`,
            "Content-Type": "application/json",
            "Version": "2021-07-28"
          },
          body: JSON.stringify({
            locationId: ghlLocationId,
            firstName: firstName,
            lastName: lastName,
            email: customerEmail,
            source: "WEC Booking System",
            tags: ["WEC Booth Rental", `booth-${bookingType}`, spaceName.replace(/\s+/g, "-").toLowerCase()],
            customFields: [
              { key: "booking_id", value: bookingId || "" },
              { key: "space_name", value: spaceName },
              { key: "booking_type", value: bookingType },
              { key: "start_date", value: startDate },
              { key: "amount_paid", value: `$${amountPaid}` }
            ]
          })
        });
        const ghlData = await ghlRes.json();
        
        // Trigger welcome workflow if contact was created
        if (ghlData.contact?.id && env.GHL_WELCOME_WORKFLOW_ID) {
          await fetch(`https://services.leadconnectorhq.com/contacts/${ghlData.contact.id}/workflow/${env.GHL_WELCOME_WORKFLOW_ID}`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${ghlApiKey}`,
              "Content-Type": "application/json",
              "Version": "2021-07-28"
            },
            body: JSON.stringify({ eventStartTime: new Date().toISOString() })
          });
        }
      } catch (ghlErr) {
        console.error("GHL error:", ghlErr);
        // Don't fail the webhook — booking is still valid
      }
    }
  }

  return jsonResponse({ received: true }, 200, cors);
}

// GET /api/members
async function handleGetMembers(request, env, cors) {
  const adminPin = request.headers.get("x-admin-pin") || new URL(request.url).searchParams.get("adminPin");
  if (!adminPin || adminPin !== (env.ADMIN_PIN || "wec-admin-2024")) {
    return errorResponse("Unauthorized — admin PIN required", 401, cors);
  }

  const allRaw = await env.WEC_KV.get("members:all");
  const allIds = allRaw ? JSON.parse(allRaw) : [];

  const members = [];
  for (const id of allIds) {
    const raw = await env.WEC_KV.get(`member:${id}`);
    if (raw) members.push(JSON.parse(raw));
  }

  members.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return jsonResponse(members, 200, cors);
}

// ─── Main Fetch Handler ───────────────────────────────────────────────────────

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Admin-Pin"
    };

    // Preflight
    if (method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    // Initialise spaces KV on cold start (idempotent)
    await initSpaces(env);

    try {
      // ── Spaces ──
      if (path === "/api/spaces" && method === "GET") {
        return handleGetSpaces(request, env, cors);
      }
      if (/^\/api\/spaces\/[\w-]+$/.test(path) && method === "GET") {
        return handleGetSpace(path.split("/").pop(), request, env, cors);
      }

      // ── Bookings ──
      if (path === "/api/bookings" && method === "GET") {
        return handleGetBookings(request, env, cors);
      }
      if (path === "/api/bookings" && method === "POST") {
        return handleCreateBooking(request, env, cors);
      }
      if (/^\/api\/bookings\/[\w-]+$/.test(path) && method === "GET") {
        return handleGetBooking(path.split("/").pop(), env, cors);
      }
      if (/^\/api\/bookings\/[\w-]+$/.test(path) && method === "PUT") {
        return handleUpdateBooking(path.split("/").pop(), request, env, cors);
      }
      if (/^\/api\/bookings\/[\w-]+$/.test(path) && method === "DELETE") {
        return handleDeleteBooking(path.split("/").pop(), request, env, cors);
      }

      // ── Availability ──
      if (path === "/api/availability" && method === "GET") {
        return handleGetAvailability(request, env, cors);
      }

      // ── Members ──
      if (path === "/api/members" && method === "GET") {
        return handleGetMembers(request, env, cors);
      }
      if (path === "/api/members" && method === "POST") {
        return handleCreateMember(request, env, cors);
      }

      // ── Stripe ──
      if (path === "/api/checkout" && method === "POST") {
        return handleCreateCheckout(request, env, cors);
      }
      if (path === "/api/webhook/stripe" && method === "POST") {
        return handleStripeWebhook(request, env, cors);
      }

      // ── Health ──
      if (path === "/api/health") {
        return jsonResponse({ status: "ok", service: "WEC Booking API", timestamp: new Date().toISOString() }, 200, cors);
      }

      // Serve static assets for non-API routes
      if (env.ASSETS) {
        return env.ASSETS.fetch(request);
      }
      
      // Redirect all requests to the latest Pages deployment with pre-qualification flow
      const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Women's Empowerment Center™ — Space Booking</title>
  <meta http-equiv="refresh" content="0; url=https://ac2696d6.wec-booking-site-4mh.pages.dev${path}">
</head>
<body>
  <p>Redirecting to <a href="https://ac2696d6.wec-booking-site-4mh.pages.dev${path}">Women's Empowerment Center Booking</a>...</p>
</body>
</html>`;
      return new Response(redirectHtml, {
        headers: { "Content-Type": "text/html", ...cors }
      });
      
      return errorResponse("Endpoint not found", 404, cors);
    } catch (err) {
      console.error("Worker error:", err);
      return errorResponse("Internal server error: " + err.message, 500, cors);
    }
  }
};
