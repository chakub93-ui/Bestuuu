
/* ==========================================
   RIYA × NOOR — PREMIUM WEBSITE SCRIPT
   Emotional • Funny • Attitude • Memories
========================================== */

"use strict";

// ==========================================
// 1. SOCIAL LINKS
// ==========================================

const SOCIAL_LINKS = {
  riyaInstagram: "https://www.instagram.com/riiiiyyya0/",
  noorInstagram: "https://www.instagram.com/",
  noorWhatsApp: "https://wa.me/917029418944"
};

// ==========================================
// 2. RIYA × NOOR CONVERSATIONS
// ==========================================

const conversations = [
  {
    title: "The First Feeling ❤️",
    subtitle: "Ek chhoti si baat...",
    messages: [
      { sender: "riya", text: "Oye Noorrr, ek baat bolu? 🥺" },
      { sender: "noor", text: "Nahi, pehle bata kitne paise chahiye 😂" },
      { sender: "riya", text: "Pagal ladke! Har baat paise se shuru hoti hai teri 😭" },
      { sender: "noor", text: "Achha baba, bol meri drama queen ❤️" },
      { sender: "riya", text: "Tu kabhi door mat jaana yaar..." },
      { sender: "noor", text: "Main door jaane ke liye aaya hi nahi tha ❤️" }
    ]
  },

  {
    title: "Riya Ka Gussa 😤",
    subtitle: "Danger zone activated!",
    messages: [
      { sender: "riya", text: "Mujhse baat mat karna ab! 😒" },
      { sender: "noor", text: "Theek hai, nahi karta." },
      { sender: "riya", text: "Achhaaa? Itni jaldi maan bhi gaya? 😭" },
      { sender: "noor", text: "Ab kya karu madam? 😂" },
      { sender: "riya", text: "Manana bhi nahi aata tujhe!" },
      { sender: "noor", text: "Tum gussa bhi cute karti ho, ab ismein meri kya galti? 😂❤️" }
    ]
  },

  {
    title: "Unlimited Drama 😂",
    subtitle: "Noor ki musibat!",
    messages: [
      { sender: "riya", text: "Noorrrrr 😭" },
      { sender: "noor", text: "Ab kya hua? 😂" },
      { sender: "riya", text: "Kuch nahi." },
      { sender: "noor", text: "Phir itne saare R kyun laga diye? 😭" },
      { sender: "riya", text: "Tumhe meri feelings samajh nahi aati!" },
      { sender: "noor", text: "Mujhe toh bas tumhara mood samajhne ke liye PhD chahiye 😂" }
    ]
  },

  {
    title: "A Little Promise 🫶",
    subtitle: "Dil se ek promise...",
    messages: [
      { sender: "riya", text: "Noor, ek promise karega?" },
      { sender: "noor", text: "Bolo madam, jaan bhi hazir hai 😂" },
      { sender: "riya", text: "Mere bure waqt mein bhi mere saath rehna." },
      { sender: "noor", text: "Sirf achhe waqt ke liye hota toh ye rishta hi kya hota?" },
      { sender: "riya", text: "Tu sach mein bahut special hai mere liye 🥹❤️" },
      { sender: "noor", text: "Aur tu meri favourite headache hai 😂❤️" }
    ]
  },

  {
    title: "The Real Bond ❤️",
    subtitle: "Har kisi ko nahi milta...",
    messages: [
      { sender: "riya", text: "Kabhi kabhi lagta hai main bahut zyada bolti hoon." },
      { sender: "noor", text: "Haan, ye toh sach hai 😂" },
      { sender: "riya", text: "Noorrrrr! 😡" },
      { sender: "noor", text: "Arey suno toh! Tumhari baatein sunna achha lagta hai ❤️" },
      { sender: "riya", text: "Sachhi? 🥺" },
      { sender: "noor", text: "Haan pagal, tum ho toh sab achha lagta hai." }
    ]
  },

  {
    title: "The Last Message 💌",
    subtitle: "Ek yaad jo hamesha rahe...",
    messages: [
      { sender: "riya", text: "Pata hai Noor, tu meri life ka best part hai." },
      { sender: "noor", text: "Aur tu meri life ka sabse beautiful notification ❤️" },
      { sender: "riya", text: "Kabhi bhool toh nahi jayega na mujhe?" },
      { sender: "noor", text: "Tumhe bhoolna itna easy hota toh yaad hi kyun rakhta? 🥺" },
      { sender: "riya", text: "Bas aise hi rehna mere saath..." },
      { sender: "noor", text: "Always. No matter what. ❤️" }
    ]
  }
];

// ==========================================
// 3. SPECIAL LOVE & FRIENDSHIP LINES
// ==========================================

const specialLines = [
  "Main perfect nahi hoon, par tere liye meri feelings real hain. ❤️",
  "Tu pareshan karta hai, lekin tere bina din bhi adhura lagta hai. 🥺",
  "Hamari nok-jhok hi toh hamari favourite story hai. 😂",
  "Duniya kuch bhi bole, tu mere liye special rahega. 🫶",
  "Riya ki smile ke peeche kabhi-kabhi Noor ki wajah hoti hai. ❤️",
  "Kuch log zindagi mein aate nahi, dil mein jagah bana lete hain.",
  "Ek tu hai jo gussa bhi dilata hai aur smile bhi. 😂",
  "Distance ho ya silence, apnepan ki jagah koi nahi le sakta. ❤️"
];

// ==========================================
// 4. HELPER FUNCTIONS
// ==========================================

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

function safeText(element, text) {
  if (element) element.textContent = text;
}

// ==========================================
// 5. MOBILE NAVIGATION
// ==========================================

function initNavigation() {
  const menuButton = $(".menu-toggle");
  const navigation = $(".nav-links");

  if (!menuButton || !navigation) return;

  menuButton.addEventListener("click", () => {
    const opened = navigation.classList.toggle("active");

    menuButton.setAttribute("aria-expanded", String(opened));
    menuButton.classList.toggle("active", opened);
  });

  $$(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("active");
      menuButton.classList.remove("active");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

// ==========================================
// 6. SCROLL REVEAL ANIMATIONS
// ==========================================

function initRevealAnimations() {
  const elements = $$(
    ".reveal, .fade-up, .story-card, .chapter-card, .profile-card"
  );

  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => {
      element.classList.add("visible", "active");
    });
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible", "active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach(element => observer.observe(element));
}

// ==========================================
// 7. CHAT CONVERSATION SYSTEM
// ==========================================

let currentConversation = 0;

function renderConversation(index) {
  const chatContainer = $(
    "#chat-messages, .chat-messages, [data-chat-messages]"
  );

  const titleElement = $(
    "#chat-title, .chat-title, [data-chat-title]"
  );

  const subtitleElement = $(
    "#chat-subtitle, .chat-subtitle, [data-chat-subtitle]"
  );

  if (!chatContainer) return;

  const conversation = conversations[index];
  if (!conversation) return;

  currentConversation = index;

  safeText(titleElement, conversation.title);
  safeText(subtitleElement, conversation.subtitle);

  chatContainer.innerHTML = "";

  conversation.messages.forEach((message, messageIndex) => {
    const bubble = document.createElement("div");

    bubble.className = `chat-bubble ${message.sender}`;
    bubble.style.animationDelay = `${messageIndex * 0.12}s`;

    const sender = document.createElement("span");
    sender.className = "chat-sender";
    sender.textContent =
      message.sender === "riya" ? "RIYA" : "NOOR";

    const content = document.createElement("p");
    content.textContent = message.text;

    bubble.append(sender, content);
    chatContainer.appendChild(bubble);
  });
}

function initChat() {
  const nextButton = $(
    "#next-conversation, .next-conversation, [data-next-chat]"
  );

  const previousButton = $(
    "#prev-conversation, .prev-conversation, [data-prev-chat]"
  );

  const randomButton = $(
    "#random-conversation, [data-random-chat]"
  );

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      const next = (currentConversation + 1) % conversations.length;
      renderConversation(next);
    });
  }

  if (previousButton) {
    previousButton.addEventListener("click", () => {
      const previous =
        (currentConversation - 1 + conversations.length) %
        conversations.length;

      renderConversation(previous);
    });
  }

  if (randomButton) {
    randomButton.addEventListener("click", () => {
      let randomIndex;

      do {
        randomIndex = Math.floor(
          Math.random() * conversations.length
        );
      } while (
        conversations.length > 1 &&
        randomIndex === currentConversation
      );

      renderConversation(randomIndex);
    });
  }

  renderConversation(0);
}

// ==========================================
// 8. RANDOM SPECIAL QUOTE
// ==========================================

function initSpecialQuotes() {
  const quoteElement = $(
    "#special-quote, .special-quote, [data-special-quote]"
  );

  const quoteButton = $(
    "#new-quote, .new-quote, [data-new-quote]"
  );

  if (!quoteElement) return;

  function showRandomQuote() {
    const randomIndex = Math.floor(
      Math.random() * specialLines.length
    );

    quoteElement.style.opacity = "0";

    setTimeout(() => {
      quoteElement.textContent = specialLines[randomIndex];
      quoteElement.style.opacity = "1";
    }, 200);
  }

  if (quoteButton) {
    quoteButton.addEventListener("click", showRandomQuote);
  }

  showRandomQuote();
}

// ==========================================
// 9. INSTAGRAM & WHATSAPP BUTTONS
// ==========================================

function initSocialLinks() {
  const riyaButtons = $$(
    ".riya-instagram, [data-riya-instagram]"
  );

  const noorButtons = $$(
    ".noor-instagram, [data-noor-instagram]"
  );

  const whatsappButtons = $$(
    ".noor-whatsapp, [data-noor-whatsapp]"
  );

  riyaButtons.forEach(button => {
    button.href = SOCIAL_LINKS.riyaInstagram;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
  });

  noorButtons.forEach(button => {
    button.href = SOCIAL_LINKS.noorInstagram;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
  });

  whatsappButtons.forEach(button => {
    button.href = SOCIAL_LINKS.noorWhatsApp;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
  });
}

// ==========================================
// 10. HEART PARTICLE EFFECT
// ==========================================

function createHeart() {
  const heart = document.createElement("span");

  heart.className = "floating-heart";
  heart.textContent = ["❤️", "💗", "💕", "✨", "🫶"][
    Math.floor(Math.random() * 5)
  ];

  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${4 + Math.random() * 4}s`;
  heart.style.fontSize = `${12 + Math.random() * 15}px`;

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 8500);
}

function initHeartEffect() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const heartContainer = document.querySelector(
    ".floating-hearts, #floating-hearts"
  );

  if (!heartContainer) return;

  setInterval(() => {
    const heart = document.createElement("span");

    heart.className = "floating-heart";
    heart.textContent = ["❤️", "💗", "✨", "🫶"][
      Math.floor(Math.random() * 4)
    ];

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${5 + Math.random() * 4}s`;

    heartContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 9000);
  }, 1200);
}

// ==========================================
// 11. BUTTON CLICK ANIMATIONS
// ==========================================

function initButtonEffects() {
  $$("button, .btn, .button").forEach(button => {
    button.addEventListener("click", () => {
      button.classList.remove("clicked");

      requestAnimationFrame(() => {
        button.classList.add("clicked");
      });

      setTimeout(() => {
        button.classList.remove("clicked");
      }, 350);
    });
  });
}

// ==========================================
// 12. CURRENT YEAR IN FOOTER
// ==========================================

function initFooter() {
  const yearElement = $(
    "#current-year, .current-year, [data-year]"
  );

  safeText(yearElement, new Date().getFullYear());
}

// ==========================================
// 13. SMOOTH SCROLL
// ==========================================

function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = $(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

// ==========================================
// 14. CUSTOM CURSOR GLOW
// ==========================================

function initCursorGlow() {
  if (
    !window.matchMedia("(pointer: fine)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  document.addEventListener("pointermove", event => {
    document.documentElement.style.setProperty(
      "--mouse-x",
      `${event.clientX}px`
    );

    document.documentElement.style.setProperty(
      "--mouse-y",
      `${event.clientY}px`
    );
  });
}

// ==========================================
// 15. PAGE LOADING
// ==========================================

function initPageLoader() {
  const loader = $(".page-loader, #page-loader");

  window.addEventListener("load", () => {
    if (loader) {
      loader.classList.add("loaded");

      setTimeout(() => {
        loader.remove();
      }, 800);
    }

    document.body.classList.add("page-ready");
  });
}

// ==========================================
// 16. INITIALIZE EVERYTHING
// ==========================================

function initRiyaNoorWebsite() {
  initNavigation();
  initRevealAnimations();
  initChat();
  initSpecialQuotes();
  initSocialLinks();
  initHeartEffect();
  initButtonEffects();
  initFooter();
  initSmoothScroll();
  initCursorGlow();
  initPageLoader();

  console.log(
    "%c RIYA × NOOR ❤️ ",
    "background:#650b27;color:white;font-size:18px;padding:10px;"
  );

  console.log("Made with love, memories and a little drama. ❤️");
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initRiyaNoorWebsite
  );
} else {
  initRiyaNoorWebsite();
}
