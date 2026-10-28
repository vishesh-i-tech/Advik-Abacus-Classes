/**
 * ============================================================================
 * ABACUS CLASSES — INTERACTIVE SCRIPT
 * ============================================================================
 * Adapted with VK-Coaching-RECORDS interactive logic.
 * Zero external libraries, lightning-fast vanilla JavaScript.
 */

// ============================================================================
// 1. BUSINESS CONFIGURATION OBJECT
// All editable business details, phone numbers, and placeholders are kept here.
// ============================================================================
const CONFIG = {
  // Brand Identity
  BUSINESS_NAME: "Abacus Classes", // Change to "Advik Abacus Classes" anytime
  TAGLINE: "Make Maths Fun. Build Sharp Minds.",
  LOCATION_SHORT: "Gulabra, Chhindwara, MP 480001",
  MAPS_URL: "https://www.google.com/maps/search/?api=1&query=Gulabra%2C+Chhindwara%2C+Madhya+Pradesh+480001",

  // Contact Details
  PHONE_DISPLAY: "+91 97543 74490",
  PHONE_RAW: "+919754374490",
  WHATSAPP_NUMBER: "919754374490",
  WHATSAPP_DEFAULT_MSG: "Hi, I want to know about the demo class at Abacus Classes",

  // Unknown Business Details (Visible placeholders for the owner to finalize)
  FEES_PLACEHOLDER: "[Add fees]",
  TIMINGS_PLACEHOLDER: "[Add timings]",
  FULL_ADDRESS_PLACEHOLDER: "[Add full address / landmark, Gulabra]",
  TEACHER_INFO_PLACEHOLDER: "[Add certified trainer background, experience, and credentials]",
  EMAIL_PLACEHOLDER: "[Add email]",

  // Founding Batch Offer Banner
  SHOW_FOUNDING_OFFER: true,
  OFFER_BADGE: "Founding Batch Enrollment",
  OFFER_TITLE: "Special Introductory Offer for Early Registrations",
  OFFER_DETAILS: "[Add offer details: Special introductory fee concession for the first 15 admissions + Free Abacus Starter Kit]",

  // Google Sheets Webhook endpoint (Leave empty "" if using WhatsApp only)
  FORM_ENDPOINT: ""
};

// ============================================================================
// 2. DOM INITIALIZATION
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  injectBusinessConfig();
  initStickyHeader();
  initMobileNavigation();
  initFAQAccordion();
  initInteractiveAbacusBeads();
  initDemoBookingForm();
  initSmoothScrollOffsets();
});

/**
 * Injects dynamic business values from CONFIG into DOM elements
 */
function injectBusinessConfig() {
  // Business Name
  document.querySelectorAll(".business-name-dyn").forEach(el => {
    el.textContent = CONFIG.BUSINESS_NAME;
  });

  // Phone Displays & Tel Links
  document.querySelectorAll(".phone-display-dyn").forEach(el => {
    el.textContent = CONFIG.PHONE_DISPLAY;
  });
  document.querySelectorAll(".phone-link-dyn").forEach(el => {
    el.setAttribute("href", `tel:${CONFIG.PHONE_RAW}`);
  });

  // WhatsApp Links
  const defaultWaUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(CONFIG.WHATSAPP_DEFAULT_MSG)}`;
  document.querySelectorAll(".whatsapp-link-dyn").forEach(el => {
    el.setAttribute("href", defaultWaUrl);
  });

  // Google Maps Links
  document.querySelectorAll(".maps-link-dyn").forEach(el => {
    el.setAttribute("href", CONFIG.MAPS_URL);
  });

  // Placeholders
  document.querySelectorAll(".fees-placeholder-dyn").forEach(el => {
    el.textContent = CONFIG.FEES_PLACEHOLDER;
  });
  document.querySelectorAll(".timings-placeholder-dyn").forEach(el => {
    el.textContent = CONFIG.TIMINGS_PLACEHOLDER;
  });
  document.querySelectorAll(".address-placeholder-dyn").forEach(el => {
    el.textContent = CONFIG.FULL_ADDRESS_PLACEHOLDER;
  });
  document.querySelectorAll(".teacher-placeholder-dyn").forEach(el => {
    el.textContent = CONFIG.TEACHER_INFO_PLACEHOLDER;
  });
  document.querySelectorAll(".email-placeholder-dyn").forEach(el => {
    el.textContent = CONFIG.EMAIL_PLACEHOLDER;
  });

  // Founding Offer Banner
  const offerSection = document.getElementById("founding-offer-section");
  if (offerSection) {
    if (CONFIG.SHOW_FOUNDING_OFFER) {
      offerSection.style.display = "block";
      const badge = document.getElementById("offer-badge-dyn");
      const title = document.getElementById("offer-title-dyn");
      const details = document.getElementById("offer-details-dyn");
      if (badge) badge.textContent = CONFIG.OFFER_BADGE;
      if (title) title.textContent = CONFIG.OFFER_TITLE;
      if (details) details.textContent = CONFIG.OFFER_DETAILS;
    } else {
      offerSection.style.display = "none";
    }
  }

  // Auto-update copyright year
  const yearEl = document.getElementById("copyright-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ============================================================================
// 3. STICKY HEADER SCROLL
// ============================================================================
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 15) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ============================================================================
// 4. MOBILE NAVIGATION DRAWER
// ============================================================================
function initMobileNavigation() {
  const hamburgerBtn = document.getElementById("mobileMenuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const navLinks = document.querySelectorAll(".mobile-nav-link, .mobile-drawer-footer a");

  if (!hamburgerBtn || !mobileDrawer) return;

  const toggle = (forceState) => {
    const isCurrentlyOpen = hamburgerBtn.getAttribute("aria-expanded") === "true";
    const newState = forceState !== undefined ? forceState : !isCurrentlyOpen;

    hamburgerBtn.setAttribute("aria-expanded", newState ? "true" : "false");
    hamburgerBtn.setAttribute("aria-label", newState ? "Close menu" : "Open menu");

    if (newState) {
      mobileDrawer.classList.add("open");
      mobileDrawer.removeAttribute("hidden");
    } else {
      mobileDrawer.classList.remove("open");
      mobileDrawer.setAttribute("hidden", "");
    }
  };

  hamburgerBtn.addEventListener("click", () => toggle());

  navLinks.forEach(link => {
    link.addEventListener("click", () => toggle(false));
  });

  document.addEventListener("click", (e) => {
    if (
      mobileDrawer.classList.contains("open") &&
      !mobileDrawer.contains(e.target) &&
      !hamburgerBtn.contains(e.target)
    ) {
      toggle(false);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileDrawer.classList.contains("open")) {
      toggle(false);
      hamburgerBtn.focus();
    }
  });
}

// ============================================================================
// 5. ACCESSIBLE FAQ ACCORDION
// ============================================================================
function initFAQAccordion() {
  const buttons = document.querySelectorAll(".faq-trigger-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isExpanded = btn.getAttribute("aria-expanded") === "true";
      const pane = document.getElementById(btn.getAttribute("aria-controls"));

      // Close other panes
      buttons.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute("aria-expanded", "false");
          const otherPane = document.getElementById(otherBtn.getAttribute("aria-controls"));
          if (otherPane) otherPane.classList.remove("open");
        }
      });

      // Toggle current pane
      if (isExpanded) {
        btn.setAttribute("aria-expanded", "false");
        if (pane) pane.classList.remove("open");
      } else {
        btn.setAttribute("aria-expanded", "true");
        if (pane) pane.classList.add("open");
      }
    });

    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });
}

// ============================================================================
// 6. INTERACTIVE ABACUS BEADS (HERO SHOWCASE)
// Tap beads to move them up/down and update total counter
// ============================================================================
function initInteractiveAbacusBeads() {
  const beads = document.querySelectorAll(".interactive-soroban-bead");
  const scoreDisplay = document.getElementById("active-bead-score");
  if (!beads.length) return;

  beads.forEach(bead => {
    bead.addEventListener("click", () => {
      const isUpper = bead.classList.contains("upper-bead");
      const baseCy = parseFloat(bead.getAttribute("data-base-cy"));
      const currentCy = parseFloat(bead.getAttribute("cy"));

      if (isUpper) {
        // Upper deck: toggles down towards beam (value = 5)
        const isDown = currentCy > baseCy;
        bead.setAttribute("cy", isDown ? baseCy : baseCy + 14);
        bead.setAttribute("data-active", isDown ? "false" : "true");
      } else {
        // Lower deck: toggles up towards beam (value = 1)
        const isUp = currentCy < baseCy;
        bead.setAttribute("cy", isUp ? baseCy : baseCy - 14);
        bead.setAttribute("data-active", isUp ? "false" : "true");
      }

      // Calculate total count
      let total = 0;
      beads.forEach(b => {
        if (b.getAttribute("data-active") === "true") {
          total += b.classList.contains("upper-bead") ? 5 : 1;
        }
      });

      if (scoreDisplay) {
        scoreDisplay.textContent = total;
      }
    });
  });
}

// ============================================================================
// 7. DEMO BOOKING FORM (10-Digit Mobile, WhatsApp & Google Sheets)
// ============================================================================
function initDemoBookingForm() {
  const form = document.getElementById("demo-booking-form");
  const successBanner = document.getElementById("form-success-banner");
  const directWaBtn = document.getElementById("reopen-wa-btn");

  if (!form) return;

  const parentName = document.getElementById("parent-name");
  const parentPhone = document.getElementById("parent-phone");
  const childAge = document.getElementById("child-age");
  const courseInterest = document.getElementById("course-interest");
  const preferredTime = document.getElementById("preferred-time");

  // Phone input hygiene (numbers only, max 10)
  parentPhone.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
    clearFieldError(parentPhone);
  });

  parentName.addEventListener("input", () => clearFieldError(parentName));
  childAge.addEventListener("change", () => clearFieldError(childAge));
  courseInterest.addEventListener("change", () => clearFieldError(courseInterest));
  preferredTime.addEventListener("change", () => clearFieldError(preferredTime));

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    let firstError = null;

    // Validate Name (>= 2 chars)
    const nameVal = parentName.value.trim();
    if (!nameVal || nameVal.length < 2) {
      showFieldError(parentName, "Please enter your full name (minimum 2 characters)");
      isValid = false;
      firstError = firstError || parentName;
    } else {
      clearFieldError(parentName);
    }

    // Validate 10-Digit Indian Mobile (starts with 6, 7, 8, 9)
    const phoneVal = parentPhone.value.trim();
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneVal || !phoneRegex.test(phoneVal)) {
      showFieldError(parentPhone, "Please enter a valid 10-digit mobile number (e.g., 9876543210)");
      isValid = false;
      firstError = firstError || parentPhone;
    } else {
      clearFieldError(parentPhone);
    }

    // Validate Age
    if (!childAge.value) {
      showFieldError(childAge, "Please choose child's age group");
      isValid = false;
      firstError = firstError || childAge;
    } else {
      clearFieldError(childAge);
    }

    // Validate Course
    if (!courseInterest.value) {
      showFieldError(courseInterest, "Please select an interested program");
      isValid = false;
      firstError = firstError || courseInterest;
    } else {
      clearFieldError(courseInterest);
    }

    // Validate Time Slot
    if (!preferredTime.value) {
      showFieldError(preferredTime, "Please choose your preferred time slot");
      isValid = false;
      firstError = firstError || preferredTime;
    } else {
      clearFieldError(preferredTime);
    }

    if (!isValid) {
      if (firstError) firstError.focus();
      return;
    }

    // Construct structured WhatsApp message
    const details = {
      parentName: nameVal,
      phone: phoneVal,
      childAge: childAge.value,
      course: courseInterest.value,
      time: preferredTime.value,
      timestamp: new Date().toISOString()
    };

    const waText = 
`*Free Demo Class Inquiry - ${CONFIG.BUSINESS_NAME}*
----------------------------------------
*Parent Name:* ${details.parentName}
*Mobile Number:* +91 ${details.phone}
*Child's Age Group:* ${details.childAge}
*Interested Course:* ${details.course}
*Preferred Time:* ${details.time}
*Location:* Gulabra, Chhindwara, MP
----------------------------------------
Please confirm the upcoming free demo class slot. Thank you!`;

    const waUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

    // Optional Google Sheets logging
    if (CONFIG.FORM_ENDPOINT && CONFIG.FORM_ENDPOINT.trim() !== "") {
      try {
        fetch(CONFIG.FORM_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(details)
        }).catch(err => console.warn("Google Sheets sync:", err));
      } catch (err) {
        console.warn("Google Sheets sync error:", err);
      }
    }

    // Show Confirmation on Page
    if (successBanner) {
      successBanner.classList.add("visible");
      if (directWaBtn) directWaBtn.setAttribute("href", waUrl);
      form.style.display = "none";
    }

    // Open WhatsApp in new tab / app
    window.open(waUrl, "_blank", "noopener,noreferrer");
  });
}

function showFieldError(el, msg) {
  el.classList.add("error");
  const block = el.closest(".input-block");
  if (block) {
    const err = block.querySelector(".field-error-msg");
    if (err) {
      err.textContent = msg;
      err.classList.add("visible");
    }
  }
}

function clearFieldError(el) {
  el.classList.remove("error");
  const block = el.closest(".input-block");
  if (block) {
    const err = block.querySelector(".field-error-msg");
    if (err) {
      err.classList.remove("visible");
    }
  }
}

// ============================================================================
// 8. SMOOTH SCROLL OFFSET FOR STICKY HEADER
// ============================================================================
function initSmoothScrollOffsets() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 84;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}
