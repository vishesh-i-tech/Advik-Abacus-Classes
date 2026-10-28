/**
 * Abacus Classes — Core Application Script
 * Clean, production-ready vanilla JavaScript (Zero dependencies)
 */

// ==========================================================================
// 1. CENTRALIZED BUSINESS CONFIGURATION
// All editable business text, phone numbers, and placeholders are kept here.
// ==========================================================================
const CONFIG = {
  // Brand Identity
  BUSINESS_NAME: "Abacus Classes", // Change to "Advik Abacus Classes" anytime
  TAGLINE: "Make Maths Fun. Build Sharp Minds.",
  LOCATION_SHORT: "Gulabra, Chhindwara, MP 480001",
  MAPS_URL: "https://www.google.com/maps/search/?api=1&query=Gulabra%2C+Chhindwara%2C+Madhya+Pradesh+480001",

  // Phone & WhatsApp
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
  SHOW_FOUNDING_OFFER: true, // Set to false to hide the banner
  OFFER_BADGE: "Founding Batch Enrollment",
  OFFER_TITLE: "Special Introductory Offer for Early Registrations",
  OFFER_DETAILS: "[Add offer details: Special introductory fee concession for the first 15 admissions + Free Abacus Starter Kit]",

  // Google Sheets via Apps Script Web App Endpoint
  // Paste your published Web App URL here to automatically log submissions. Leave empty ("") if using WhatsApp only.
  FORM_ENDPOINT: ""
};

// ==========================================================================
// 2. DOM INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  injectBusinessConfig();
  initStickyHeader();
  initMobileNavigation();
  initFAQAccordion();
  initDemoBookingForm();
  initSmoothScrollOffsets();
});

/**
 * Injects dynamic business values from CONFIG into the page
 */
function injectBusinessConfig() {
  // Business Name
  document.querySelectorAll(".business-name-dyn").forEach(el => {
    el.textContent = CONFIG.BUSINESS_NAME;
  });

  // Phone Displays & Links
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

// ==========================================================================
// 3. STICKY HEADER SCROLL STATE
// ==========================================================================
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ==========================================================================
// 4. MOBILE NAVIGATION DRAWER
// ==========================================================================
function initMobileNavigation() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileDrawer = document.getElementById("mobile-nav-drawer");
  const navLinks = document.querySelectorAll(".mobile-nav-link, .mobile-drawer-cta a");

  if (!hamburgerBtn || !mobileDrawer) return;

  const toggle = (forceState) => {
    const isCurrentlyOpen = hamburgerBtn.getAttribute("aria-expanded") === "true";
    const newState = forceState !== undefined ? forceState : !isCurrentlyOpen;

    hamburgerBtn.setAttribute("aria-expanded", newState ? "true" : "false");
    hamburgerBtn.setAttribute("aria-label", newState ? "Close menu" : "Open menu");

    if (newState) {
      mobileDrawer.classList.add("open");
    } else {
      mobileDrawer.classList.remove("open");
    }
  };

  hamburgerBtn.addEventListener("click", () => toggle());

  // Close when clicking nav link
  navLinks.forEach(link => {
    link.addEventListener("click", () => toggle(false));
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (
      mobileDrawer.classList.contains("open") &&
      !mobileDrawer.contains(e.target) &&
      !hamburgerBtn.contains(e.target)
    ) {
      toggle(false);
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileDrawer.classList.contains("open")) {
      toggle(false);
      hamburgerBtn.focus();
    }
  });
}

// ==========================================================================
// 5. ACCESSIBLE FAQ ACCORDION (WIDE, KEYBOARD ACCESSIBLE)
// ==========================================================================
function initFAQAccordion() {
  const buttons = document.querySelectorAll(".faq-toggle-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isExpanded = btn.getAttribute("aria-expanded") === "true";
      const pane = document.getElementById(btn.getAttribute("aria-controls"));

      // Close all other panes
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

    // Keyboard support: Enter / Space
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });
}

// ==========================================================================
// 6. DEMO BOOKING FORM (10-Digit Mobile, WhatsApp & Google Sheets)
// ==========================================================================
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

  // Format phone: digits only, max 10
  parentPhone.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
    clearError(parentPhone);
  });

  parentName.addEventListener("input", () => clearError(parentName));
  childAge.addEventListener("change", () => clearError(childAge));
  courseInterest.addEventListener("change", () => clearError(courseInterest));
  preferredTime.addEventListener("change", () => clearError(preferredTime));

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    let firstError = null;

    // Validate Name (>= 2 chars)
    const nameVal = parentName.value.trim();
    if (!nameVal || nameVal.length < 2) {
      showError(parentName, "Please enter your full name (minimum 2 characters)");
      isValid = false;
      firstError = firstError || parentName;
    } else {
      clearError(parentName);
    }

    // Validate Indian Mobile Number (10 digits starting with 6-9)
    const phoneVal = parentPhone.value.trim();
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneVal || !phoneRegex.test(phoneVal)) {
      showError(parentPhone, "Please enter a valid 10-digit mobile number (e.g., 9876543210)");
      isValid = false;
      firstError = firstError || parentPhone;
    } else {
      clearError(parentPhone);
    }

    // Validate Age
    if (!childAge.value) {
      showError(childAge, "Please select child's age group");
      isValid = false;
      firstError = firstError || childAge;
    } else {
      clearError(childAge);
    }

    // Validate Course
    if (!courseInterest.value) {
      showError(courseInterest, "Please select interested program");
      isValid = false;
      firstError = firstError || courseInterest;
    } else {
      clearError(courseInterest);
    }

    // Validate Time Slot
    if (!preferredTime.value) {
      showError(preferredTime, "Please choose your preferred time slot");
      isValid = false;
      firstError = firstError || preferredTime;
    } else {
      clearError(preferredTime);
    }

    if (!isValid) {
      if (firstError) firstError.focus();
      return;
    }

    // Prepare WhatsApp Message
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
*Preferred Time Slot:* ${details.time}
*Location:* Gulabra, Chhindwara, MP
----------------------------------------
Please share the upcoming demo class schedule. Thank you!`;

    const waUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

    // Optional Google Sheets logging via Apps Script
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
      successBanner.classList.add("show");
      if (directWaBtn) directWaBtn.setAttribute("href", waUrl);
      form.style.display = "none";
    }

    // Open WhatsApp
    window.open(waUrl, "_blank", "noopener,noreferrer");
  });
}

function showError(el, message) {
  el.classList.add("error");
  const group = el.closest(".input-group");
  if (group) {
    const err = group.querySelector(".field-error-text");
    if (err) {
      err.textContent = message;
      err.classList.add("show");
    }
  }
}

function clearError(el) {
  el.classList.remove("error");
  const group = el.closest(".input-group");
  if (group) {
    const err = group.querySelector(".field-error-text");
    if (err) {
      err.classList.remove("show");
    }
  }
}

// ==========================================================================
// 7. SMOOTH SCROLL OFFSET FOR STICKY HEADER
// ==========================================================================
function initSmoothScrollOffsets() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
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
