/* =========================================================
   MindSpring — JavaScript
   Edit this file to change menu, daily advice, and form behavior.
   ========================================================= */

"use strict";

/* 1. MOBILE NAVIGATION */
const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  // Close the mobile menu after a navigation link is selected.
  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

  // Close the menu when the user presses Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      primaryNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
  });
}

/* 2. DAILY ADVICE
   Add or edit the messages in this array to change the advice options.
*/
const dailyTips = [
  "You are allowed to rest without earning it first. Your worth isn't measured by your productivity.",
  "You do not have to solve everything today. Choose one manageable next step.",
  "Talk to yourself with the same patience you would offer a good friend.",
  "Taking a break is a way to care for yourself, not a sign of failure.",
  "You can ask for help. You do not have to carry every difficult feeling alone.",
  "Progress can be quiet and gradual. Small steps still count.",
  "Your feelings matter, even when you cannot explain them perfectly.",
  "Try taking three slow breaths and noticing what is around you right now.",
  "A mistake is something you experienced; it is not your whole identity.",
  "You are allowed to set boundaries and make room for your own needs.",
  "You do not need to compare your progress with someone else's journey.",
  "Rest, connection, movement, and time outdoors may help support your wellbeing."
];

const newTipButton = document.getElementById("newTip");
const tipText = document.getElementById("tipText");
const tipCount = document.getElementById("tipCount");

let previousTipIndex = 0;
let tipsShown = 1;

if (newTipButton && tipText && tipCount) {
  newTipButton.addEventListener("click", () => {
    if (dailyTips.length === 0) {
      return;
    }

    let nextIndex = previousTipIndex;

    // Avoid showing the same tip twice in a row when possible.
    if (dailyTips.length > 1) {
      while (nextIndex === previousTipIndex) {
        nextIndex = Math.floor(Math.random() * dailyTips.length);
      }
    }

    previousTipIndex = nextIndex;
    tipsShown += 1;

    tipText.textContent = dailyTips[nextIndex];
    tipCount.textContent = `A small step is still a step. Reminder ${tipsShown}.`;
  });
}

/* 3. ONLINE PROGRAM REGISTRATION FORM
   Demo behavior only: this does not send data to a server.
*/
const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

if (registerForm && registerMessage) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!registerForm.checkValidity()) {
      registerForm.reportValidity();
      return;
    }

    const formData = new FormData(registerForm);
    const participantName = String(formData.get("fullName") || "").trim();

    registerMessage.textContent =
      `Thank you${participantName ? `, ${participantName}` : ""}! Your form is valid, but this demo has not sent or saved your registration.`;

    registerForm.reset();
  });
}

/* 4. CONTACT FORM
   Demo behavior only: this prepares a message locally and does not transmit it.
*/
const contactForm = document.getElementById("contactForm");
const contactMessage = document.getElementById("contactMessage");

if (contactForm && contactMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    contactMessage.textContent =
      "Your message is ready, but it has not been sent. Connect a secure form service or backend to receive messages.";

    // The entered fields are intentionally left in place so the visitor
    // can copy their message before connecting a real submission service.
  });
}

/* 5. AUTOMATIC FOOTER YEAR */
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
