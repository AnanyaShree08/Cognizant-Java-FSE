console.log("Welcome to the Community Portal");

window.addEventListener("DOMContentLoaded", function () {
  
  alert("Welcome! The Community Event Portal has loaded successfully.");

  restoreSavedPreference();

  fetchEvents();

  setupJQuery();

  console.log("[DEBUG] DOMContentLoaded fired. Portal initialized.");
});

const PORTAL_NAME = "Local Community Event Portal";
const LAUNCH_DATE = "2025-01-01";

let availableSeats = 150;

const portalInfo = `${PORTAL_NAME} — Active since ${LAUNCH_DATE}. Seats available: ${availableSeats}`;
console.log("[TASK 2] Portal Info:", portalInfo);

function addSeat()    { availableSeats++; console.log("[TASK 2] Seats after cancellation:", availableSeats); }
function removeSeat() { availableSeats--; console.log("[TASK 2] Seats after registration:", availableSeats); }

let eventsData = [
  {
    id: 1,
    name: "Summer Music Concert",
    category: "music",
    date: "2025-06-10",
    venue: "City Amphitheatre",
    fee: 200,
    seats: 120,
    description: "An evening of live music by local and regional artists.",
    upcoming: true
  },
  {
    id: 2,
    name: "Digital Literacy Workshop",
    category: "workshop",
    date: "2025-06-15",
    venue: "Community Hall",
    fee: 500,
    seats: 40,
    description: "Learn essential digital skills for the modern workplace.",
    upcoming: true
  },
  {
    id: 3,
    name: "Annual Sports Day",
    category: "sports",
    date: "2025-06-20",
    venue: "City Stadium",
    fee: 0,
    seats: 200,
    description: "A day of friendly competition and community bonding.",
    upcoming: true
  },
  {
    id: 4,
    name: "Cultural Heritage Fair",
    category: "culture",
    date: "2025-06-25",
    venue: "Town Square",
    fee: 150,
    seats: 300,
    description: "Celebrate local art, food, and traditions.",
    upcoming: true
  },
  {
    id: 5,
    name: "Garden Festival",
    category: "culture",
    date: "2025-07-05",
    venue: "Botanical Garden",
    fee: 100,
    seats: 3,
    description: "Explore sustainable gardening and urban green spaces.",
    upcoming: true
  },
  {
    id: 6,
    name: "Old Year Reunion",
    category: "culture",
    date: "2024-12-31",
    venue: "City Hall",
    fee: 0,
    seats: 0,
    description: "Past event — no longer available.",
    upcoming: false
  }
];

let eventsClone = [...eventsData];

function getValidEvents(eventList) {
  const today = new Date().toISOString().split("T")[0];
  return eventList.filter(event => {
    
    if (!event.upcoming) return false;
    if (event.date < today) return false;
    if (event.seats <= 0) return false;
    return true;
  });
}

function renderEvents(eventList) {
  const container = document.getElementById("eventList");
  if (!container) return;
  container.innerHTML = "";

  const validEvents = getValidEvents(eventList);

  if (validEvents.length === 0) {
    container.innerHTML = `<p style="color:#888; padding:1rem;">No events match your filter.</p>`;
    return;
  }

  validEvents.forEach(function (event) {
    try {
      
      const card = createEventCard(event);
      container.appendChild(card);

      $(card).hide().fadeIn(500);

    } catch (err) {
      
      console.error("[TASK 3] Error rendering event:", event.name, err);
    }
  });
}

function makeCategoryCounter() {
  
  const categoryTotals = {};
  return function (category) {
    categoryTotals[category] = (categoryTotals[category] || 0) + 1;
    console.log("[TASK 4 Closure] Registrations for", category, ":", categoryTotals[category]);
    return categoryTotals[category];
  };
}

const countRegistration = makeCategoryCounter();

function addEvent(eventObj) {
  
  eventsData.push(eventObj);
  eventsClone = [...eventsData]; 
  console.log("[TASK 4] New event added:", eventObj.name);
}

function registerUser(eventId, userName) {
  
  const eventIndex = eventsData.findIndex(e => e.id === eventId);
  if (eventIndex === -1) throw new Error("Event not found: " + eventId);
  if (eventsData[eventIndex].seats <= 0) throw new Error("No seats left for: " + eventsData[eventIndex].name);

  eventsData[eventIndex].seats--;
  
  removeSeat();
  
  countRegistration(eventsData[eventIndex].category);
  console.log("[TASK 4] Registered:", userName, "for", eventsData[eventIndex].name);
  return eventsData[eventIndex];
}

function filterEventsByCategory(category) {
  
  const source = [...eventsData];
  let filtered;

  if (category === "all" || !category) {
    
    filtered = source.filter(e => e.upcoming);
  } else {
    filtered = source.filter(e => e.category === category);
  }

  renderEvents(filtered);
  console.log("[TASK 4] Filtered by:", category, "— Results:", filtered.length);
}

function Event(id, name, category, date, venue, fee, seats, description) {
  this.id          = id;
  this.name        = name;
  this.category    = category;
  this.date        = date;
  this.venue       = venue;
  this.fee         = fee;
  this.seats       = seats;
  this.description = description;
  this.upcoming    = true;
}

Event.prototype.checkAvailability = function () {
  if (this.seats > 10) return "Available";
  if (this.seats > 0)  return "Almost Full";
  return "Sold Out";
};

function logEventDetails(eventObj) {
  console.log("[TASK 5] Event details via Object.entries():");
  Object.entries(eventObj).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
}

const sampleEvent = new Event(99, "Demo Fest", "culture", "2025-08-01", "Park", 50, 5, "A demo event.");
console.log("[TASK 5] Availability:", sampleEvent.checkAvailability());
logEventDetails(sampleEvent);

function pushNewEvent() {
  const newEvent = {
    id: eventsData.length + 100,
    name: "Baking Workshop",
    category: "workshop",
    date: "2025-07-12",
    venue: "Community Kitchen",
    fee: 300,
    seats: 20,
    description: "Learn artisan bread-making techniques.",
    upcoming: true
  };
  eventsData.push(newEvent);
  console.log("[TASK 6] .push() — New event added:", newEvent.name);
}

function getMusicEvents() {
  const musicOnly = eventsData.filter(e => e.category === "music");
  console.log("[TASK 6] .filter() — Music events:", musicOnly.map(e => e.name));
  return musicOnly;
}

function getFormattedTitles() {
  return eventsData.map(e => {
    const cat = e.category.charAt(0).toUpperCase() + e.category.slice(1);
    return `${cat} — ${e.name}`;
  });
}
console.log("[TASK 6] .map() formatted titles:", getFormattedTitles());

function createEventCard(event) {
  
  const card = document.createElement("div");
  card.className = "eventCard event-card-fade";
  card.setAttribute("data-id", event.id);
  card.setAttribute("data-category", event.category);

  const feeText = event.fee === 0 ? "Free" : `₹${event.fee}`;
  const seatsClass = event.seats <= 10 ? "seats-badge low" : "seats-badge";

  card.innerHTML = `
    <span class="event-category-tag">${event.category.toUpperCase()}</span>
    <h3>${event.name}</h3>
    <p class="event-meta">📅 ${formatDate(event.date)} &nbsp;|&nbsp; 📍 ${event.venue}</p>
    <p class="event-meta">💳 ${feeText}</p>
    <p style="font-size:0.9rem; color:#555; margin-bottom:0.5rem;">${event.description}</p>
    <p class="${seatsClass}">🪑 ${event.seats} seats left</p>
    <button class="register-btn" onclick="handleRegisterClick(${event.id}, this)">
      Register
    </button>
  `;

  return card;
}

function handleRegisterClick(eventId, btn) {
  
  try {
    const updatedEvent = registerUser(eventId, "Portal User");
    
    btn.textContent = "✅ Registered";
    btn.classList.add("registered");
    btn.disabled = true;

    const card = btn.closest(".eventCard");
    const seatEl = card.querySelector(".seats-badge");
    if (seatEl) {
      seatEl.textContent = `🪑 ${updatedEvent.seats} seats left`;
      seatEl.className = updatedEvent.seats <= 10 ? "seats-badge low" : "seats-badge";
    }

    console.log("[TASK 7 & 8] DOM updated after registration for event ID:", eventId);
  } catch (err) {
    
    alert("Registration failed: " + err.message);
    console.error("[TASK 3] Registration error:", err);
  }
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function handleQuickSearch(event) {
  if (event.key === "Enter") {
    
    const query = document.querySelector("#searchInput").value.trim().toLowerCase();
    const results = eventsData.filter(e =>
      e.name.toLowerCase().includes(query) && e.upcoming
    );
    renderEvents(results);
    console.log("[TASK 8] Quick search for:", query, "| Results:", results.length);
  }
}

async function fetchEvents() {
  const spinner = document.getElementById("loadingSpinner");
  const list    = document.getElementById("eventList");

  if (spinner) spinner.style.display = "flex";
  if (list)    list.style.display    = "none";

  try {

    const mockData = await simulateFetchFromAPI();

    if (mockData && mockData.length > 0) {
      eventsData = mockData;
      eventsClone = [...eventsData]; 
    }

    renderEvents(eventsData);
    console.log("[TASK 9] Events fetched (async/await):", eventsData.length, "events loaded.");

  } catch (error) {
    
    console.error("[TASK 9] Fetch error:", error);
    renderEvents(eventsData); 
  } finally {
    
    if (spinner) spinner.style.display = "none";
    if (list)    list.style.display    = "";
  }
}

function simulateFetchFromAPI() {
  return new Promise(function (resolve, reject) {
    
    setTimeout(function () {
      
      resolve(eventsData);
    }, 1200);
  });
}

function fetchEventsWithPromise() {
  console.log("[TASK 9] Fetching events using .then()/.catch() style...");
  simulateFetchFromAPI()
    .then(function (data) {
      console.log("[TASK 9] .then() resolved with", data.length, "events.");
      renderEvents(data);
    })
    .catch(function (err) {
      console.error("[TASK 9] .catch() error:", err);
    });
}

function createEventSummary(name = "Unknown Event", date = "TBA", fee = 0) {
  return `Event: ${name} | Date: ${date} | Fee: ${fee === 0 ? "Free" : "₹" + fee}`;
}
console.log("[TASK 10] Default params:", createEventSummary());
console.log("[TASK 10] With params:", createEventSummary("Music Night", "2025-07-01", 200));

function displayEventDetails(event) {
  
  const { name, category, date, venue, fee, seats } = event;
  console.log(`[TASK 10] Destructured → Name: ${name}, Category: ${category}, Venue: ${venue}, Seats: ${seats}`);
}
displayEventDetails(eventsData[0]);

function safeFilterEvents(category) {
  
  const cloned = [...eventsData];
  return cloned.filter(e => e.category === category);
}
console.log("[TASK 10] Spread + filter (workshop):", safeFilterEvents("workshop").map(e => e.name));

function handleFormSubmit(event) {
  
  event.preventDefault();
  console.log("[TASK 11] Form submit intercepted with preventDefault().");

  const form     = document.getElementById("registrationForm");
  const nameVal  = form.elements["fullName"].value.trim();
  const emailVal = form.elements["email"].value.trim();
  const dateVal  = form.elements["eventDate"].value;
  const typeVal  = form.elements["eventType"].value;

  let valid = true;

  const nameError  = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");

  nameError.textContent  = "";
  emailError.textContent = "";

  if (!nameVal) {
    nameError.textContent = "⚠️ Full name is required.";
    valid = false;
  }

  if (!emailVal || !emailVal.includes("@")) {
    emailError.textContent = "⚠️ A valid email address is required.";
    valid = false;
  }

  if (!dateVal) {
    valid = false;
    console.warn("[TASK 11] Date field is empty.");
  }

  if (!typeVal) {
    valid = false;
    console.warn("[TASK 11] Event type not selected.");
  }

  if (!valid) {
    console.log("[TASK 11] Validation failed. Errors displayed inline.");
    return;
  }

  showFormConfirmation(nameVal, typeVal, dateVal);

  postRegistrationData({ name: nameVal, email: emailVal, date: dateVal, type: typeVal });

  console.log(`[TASK 11 & 13] Form submitted: Name=${nameVal}, Email=${emailVal}, Event=${typeVal}`);
}

function showFormConfirmation(name, eventType, date) {
  const output = document.getElementById("formOutput");
  if (!output) return;

  output.textContent = `✅ Thank you, ${name}! You have registered for the ${eventType} event on ${formatDate(date)}. A confirmation email will be sent shortly.`;
  output.classList.add("visible");

  $(output).hide().fadeIn(600);

  console.log("[TASK 6 & 14] Confirmation shown and jQuery fadeIn applied.");
}

function postRegistrationData(data) {
  console.log("[TASK 12] POSTing registration data:", data);

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(function (response) {
      if (!response.ok) throw new Error("Server error: " + response.status);
      return response.json();
    })
    .then(function (result) {
      console.log("[TASK 12] POST success. Server response ID:", result.id);
      
      setTimeout(function () {
        console.log("[TASK 12] Delayed confirmation: Registration confirmed on server.");
      }, 2000);
    })
    .catch(function (err) {
      console.error("[TASK 12] POST failed:", err.message);
    });
}

function debugFormStep(stepName, data) {
  
  console.log(`[TASK 13 DEBUG] Step: "${stepName}" | Data:`, data);
  
}

function logFetchPayload(payload) {
  console.log("[TASK 13] Fetch Request Payload:", JSON.stringify(payload, null, 2));
}

function validatePhone(value) {
  const phoneError = document.getElementById("phoneError");
  if (!phoneError) return;

  phoneError.textContent = "";

  if (value === "") return; 

  const phoneRegex = /^(\+91|0)?[6-9]\d{9}$/;
  if (!phoneRegex.test(value.replace(/\s/g, ""))) {
    phoneError.textContent = "⚠️ Enter a valid phone number (e.g. +91 98765 43210).";
    console.log("[TASK 6] Phone validation failed:", value);
  } else {
    console.log("[TASK 6] Phone valid:", value);
  }
}

const eventFees = {
  music:    "₹200",
  workshop: "₹500",
  sports:   "Free",
  culture:  "₹150",
  garden:   "₹100"
};

function showEventFee(selectedValue) {
  const feeDisplay = document.getElementById("eventFeeDisplay");
  if (!feeDisplay) return;

  if (selectedValue && eventFees[selectedValue]) {
    feeDisplay.textContent = `💳 Event Fee: ${eventFees[selectedValue]}`;
  } else {
    feeDisplay.textContent = "";
  }
  console.log("[TASK 6] onchange — Selected event type:", selectedValue, "| Fee:", eventFees[selectedValue]);
}

function displaySelectedEventFee(value) {
  const feeInfo = document.getElementById("feeInfo");
  if (!feeInfo) return;

  const feeMap = {
    music:    "Music Concert — Fee: ₹200",
    workshop: "Workshop — Fee: ₹500",
    sports:   "Sports Day — Free entry!",
    culture:  "Cultural Fair — Fee: ₹150"
  };

  feeInfo.textContent = value ? feeMap[value] || "" : "";
  console.log("[TASK 6] Feedback dropdown changed to:", value);
}

function countCharacters(textarea) {
  const counter = document.getElementById("charCount");
  if (!counter) return;

  const len = textarea.value.length;
  counter.textContent = `${len} / 500 characters`;

  if (len > 450) {
    counter.style.color = "#e03c3c";
  } else {
    counter.style.color = "#aaa";
  }
  
  console.log("[TASK 6 & 13] Feedback textarea character count:", len);
}

function submitFeedback() {
  const text       = document.getElementById("feedbackText").value.trim();
  const eventSel   = document.getElementById("feedbackEvent").value;
  const confirmEl  = document.getElementById("feedbackConfirmation");
  if (!confirmEl) return;

  if (!text || !eventSel) {
    confirmEl.textContent = "⚠️ Please select an event and write your feedback.";
    confirmEl.style.color = "#e03c3c";
    return;
  }

  confirmEl.textContent = "✅ Thank you for your feedback! We appreciate your input.";
  confirmEl.style.color = "#27ae60";
  console.log("[TASK 6] Feedback submitted for event:", eventSel);
}

function enlargeImage(imgEl) {
  const lightbox    = document.getElementById("imageLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  if (!lightbox || !lightboxImg) return;

  lightboxImg.src = imgEl.src;
  lightboxImg.alt = imgEl.alt;
  lightbox.classList.add("active");
  console.log("[TASK 6] ondblclick — Image enlarged:", imgEl.alt);
}

function closeLightbox() {
  const lightbox = document.getElementById("imageLightbox");
  if (lightbox) lightbox.classList.remove("active");
  console.log("[TASK 6] Lightbox closed.");
}

function videoReady() {
  const statusEl = document.getElementById("videoStatus");
  if (statusEl) {
    statusEl.textContent = "✅ Video ready to play — Press play to watch!";
    statusEl.style.color = "#27ae60";
  }
  console.log("[TASK 7] oncanplay — Video is ready to play.");
}

function videoPlaying() {
  console.log("[TASK 7] Video started playing.");
}

function videoPaused() {
  console.log("[TASK 7] Video paused.");
}

let formDirty = false;

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  if (form) {
    form.addEventListener("input", function () {
      formDirty = true;
    });
    
    form.addEventListener("submit", function () {
      formDirty = false;
    });
  }
});

function handleBeforeUnload(e) {
  if (formDirty) {
    const message = "You have unsaved form data. Are you sure you want to leave?";
    e.returnValue = message; 
    console.log("[TASK 7] onbeforeunload triggered — form is dirty.");
    return message;
  }
}

function saveEventPreference(value) {
  if (value) {
    
    localStorage.setItem("preferredEventType", value);
    
    sessionStorage.setItem("sessionEventType", value);
    console.log("[TASK 8] localStorage saved preferredEventType:", value);
  }
}

function restoreSavedPreference() {
  
  const saved = localStorage.getItem("preferredEventType");

  const prefDisplay = document.getElementById("savedPrefDisplay");
  const eventSelect = document.getElementById("eventType");

  if (saved) {
    if (eventSelect) eventSelect.value = saved;
    if (prefDisplay) {
      prefDisplay.textContent = `⭐ Saved preference: ${saved.charAt(0).toUpperCase() + saved.slice(1)}`;
    }
    console.log("[TASK 8] localStorage retrieved preferredEventType:", saved);
  } else {
    if (prefDisplay) prefDisplay.textContent = "No preference saved yet.";
  }
}

function clearPreferences() {
  
  localStorage.removeItem("preferredEventType");
  
  sessionStorage.clear();

  const prefDisplay = document.getElementById("savedPrefDisplay");
  if (prefDisplay) prefDisplay.textContent = "Preferences cleared.";

  const eventSelect = document.getElementById("eventType");
  if (eventSelect) eventSelect.value = "";

  console.log("[TASK 8] localStorage and sessionStorage cleared.");
}

function findNearbyEvents() {
  const resultEl = document.getElementById("locationResult");
  if (!resultEl) return;

  resultEl.innerHTML = "⏳ Fetching your location…";

  if (!navigator.geolocation) {
    resultEl.innerHTML = "❌ Geolocation is not supported by your browser.";
    return;
  }

  const geoOptions = {
    enableHighAccuracy: true,   
    timeout:            10000,  
    maximumAge:         0       
  };

  navigator.geolocation.getCurrentPosition(
    geoSuccess,   
    geoError,     
    geoOptions
  );
}

function geoSuccess(position) {
  const lat = position.coords.latitude.toFixed(5);
  const lng = position.coords.longitude.toFixed(5);
  const acc = Math.round(position.coords.accuracy);

  const resultEl = document.getElementById("locationResult");
  resultEl.innerHTML = `
    ✅ <strong>Location found!</strong><br/>
    📍 Latitude: <strong>${lat}</strong><br/>
    📍 Longitude: <strong>${lng}</strong><br/>
    🎯 Accuracy: ±${acc} metres<br/><br/>
    🏛️ Nearest events are at <strong>City Amphitheatre</strong> (2.1 km)
    and <strong>Community Hall</strong> (3.4 km).
  `;
  console.log("[TASK 9] Geolocation success — Lat:", lat, "Lng:", lng, "Accuracy:", acc + "m");
}

function geoError(error) {
  const resultEl = document.getElementById("locationResult");
  let message = "";

  switch (error.code) {
    case error.PERMISSION_DENIED:
      message = "❌ Location access was denied. Please allow location access in your browser settings.";
      break;
    case error.POSITION_UNAVAILABLE:
      message = "❌ Location information is currently unavailable. Please try again later.";
      break;
    case error.TIMEOUT:
      message = "⏱️ Location request timed out. Please check your connection and try again.";
      break;
    default:
      message = "❌ An unknown error occurred while retrieving your location.";
  }

  resultEl.innerHTML = message;
  console.error("[TASK 9] Geolocation error (code " + error.code + "):", error.message);
}

function toggleNav() {
  const navLinks = document.querySelector(".nav-links");
  if (navLinks) {
    navLinks.classList.toggle("open");
    console.log("[CSS TASK 10] Mobile nav toggled:", navLinks.classList.contains("open") ? "open" : "closed");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      const navLinks = document.querySelector(".nav-links");
      if (navLinks) navLinks.classList.remove("open");
    });
  });
});

function setupJQuery() {
  
  $("#registerBtn").click(function () {
    
    console.log("[TASK 14] jQuery — #registerBtn click detected.");
    
  });

  $(document).on("dblclick", ".eventCard", function () {
    const card = $(this);
    card.fadeOut(400, function () {
      
      card.fadeIn(600);
    });
    console.log("[TASK 14] jQuery — eventCard double-clicked: fadeOut then fadeIn.");
  });

  console.log("[TASK 14] jQuery handlers attached. jQuery version:", $.fn.jquery);
  
}

console.log("[TASK 13 & 1] main.js fully loaded and executed. All tasks initialized.");
