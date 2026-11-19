
/* ==========================================
   ZEHRII — A LITTLE WORLD OF RIYA
   All interactions in one clean script
========================================== */

// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader?.classList.add("hide"), 500);
});

// Intro
const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");

function enterWebsite() {
  intro?.classList.add("hide");
  document.body.style.overflow = "";
}

enterBtn?.addEventListener("click", enterWebsite);

// Auto opening intro
setTimeout(() => {
  enterWebsite();
}, 9000);

// Progress line
const progress = document.getElementById("progress");

function updateProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const value = total > 0 ? (window.scrollY / total) * 100 : 0;
  if (progress) progress.style.width = value + "%";
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// Cursor glow
const glow = document.getElementById("cursorGlow");

window.addEventListener("mousemove", (e) => {
  if (!glow || window.matchMedia("(pointer: coarse)").matches) return;
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// Particles
const particleContainer = document.getElementById("particles");

if (particleContainer) {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = (9 + Math.random() * 15) + "s";
    particle.style.animationDelay = (Math.random() * 12) + "s";
    particleContainer.appendChild(particle);
  }
}

// Reveal animations
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(el => observer.observe(el));
} else {
  revealItems.forEach(el => el.classList.add("show"));
}

// Chaos button — random Riya messages
const chaosBtn = document.getElementById("chaosBtn");
const chaosMessage = document.getElementById("chaosMessage");

const chaosLines = [
  "Tujhe tolerate karna meri hidden talent hai. 😂♡",
  "Tu irritating hai... par meri favourite irritating hai.",
  "Tere jaise नमूने ko friendship mein rakhna bravery award deserve karta hai. 🏆",
  "Jab tu nahi hoti, phone bhi boring lagta hai. Ab khush? 🙄❤️",
  "Tu meri bestie hai, isliye tera drama lifetime free hai.",
  "Zyada emotional mat ho, screenshot leke blackmail mat karna. 😂",
  "Tere liye itna kiya... ab treat toh banti hai madam. 🍟",
  "Dosti mein sorry kam, bakwaas zyada. That's our policy. 🤝"
];

chaosBtn?.addEventListener("click", () => {
  const line = chaosLines[Math.floor(Math.random() * chaosLines.length)];
  chaosMessage.textContent = line;
  chaosMessage.classList.add("show");
  spawnHearts(8);
});

// Hearts animation
function spawnHearts(amount = 6) {
  const symbols = ["♡", "♥", "✦", "✧"];
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.cssText = `
      position:fixed;
      left:${25 + Math.random() * 50}%;
      bottom:15%;
      z-index:999;
      color:#dba9c4;
      pointer-events:none;
      font-size:${14 + Math.random() * 24}px;
      animation:heartFly ${2 + Math.random() * 2}s ease-out forwards;
    `;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }
}

const heartStyle = document.createElement("style");
heartStyle.textContent = `
@keyframes heartFly {
  0% { opacity:0; transform:translateY(0) rotate(0deg) scale(.6); }
  20% { opacity:1; }
  100% { opacity:0; transform:translateY(-75vh) rotate(25deg) scale(1.4); }
}`;
document.head.appendChild(heartStyle);

// Quiz
const questions = [
  {
    question: "Who is the most dramatic person in this friendship?",
    options: ["Riya", "Zehrii", "Both of us", "The phone witnessing our chats"],
    answer: 2,
    feedback: "Correct. Dono milke ek Netflix series ho. 😂"
  },
  {
    question: "What is our friendship's official language?",
    options: ["English", "Silent treatment", "Bakwaas & laughter", "Formal emails"],
    answer: 2,
    feedback: "Bakwaas is our love language. ❤️"
  },
  {
    question: "After a fight, what usually happens?",
    options: ["We disappear forever", "We eventually talk again", "We file a legal case", "We become strangers"],
    answer: 1,
    feedback: "Gussa apni jagah, friendship apni jagah. 🫶"
  },
  {
    question: "Zehrii is actually...",
    options: ["An angel 24/7", "A little chaos", "A robot", "A boring person"],
    answer: 1,
    feedback: "A little chaos, a lot of love. 😂"
  },
  {
    question: "What's the one thing Riya wants Zehrii to remember?",
    options: ["Never reply", "Always act cool", "You matter, even on bad days", "Stop eating"],
    answer: 2,
    feedback: "Exactly. Tu important hai. Hamesha. ♡"
  }
];

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

const quizCount = document.getElementById("quizCount");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const quizNext = document.getElementById("quizNext");
const quizProgress = document.getElementById("quizProgress");
const quizResult = document.getElementById("quizResult");

function renderQuiz() {
  if (quizIndex >= questions.length) {
    quizQuestion.style.display = "none";
    quizOptions.style.display = "none";
    quizFeedback.style.display = "none";
    quizNext.style.display = "none";
    quizCount.textContent = "FRIENDSHIP RESULT";
    quizProgress.style.width = "100%";
    quizResult.style.display = "block";

    const messages = [
      "0/5? Zehrii, tu Riya ko jaanti hai ya bas naam suna hai? 😂",
      "Thoda aur practice kar, bestie syllabus abhi baaki hai.",
      "Half marks! Friendship ka tuition free mein milega. 😂",
      "Almost perfect! Teri bestie knowledge strong hai. ❤️",
      "5/5! Certified Riya expert. Ab attitude kam kar. 😂♡"
    ];

    quizResult.innerHTML =
      `YOU SCORED ${quizScore} / ${questions.length}<br><br>${messages[quizScore] || messages[4]}`;
    return;
  }

  const q = questions[quizIndex];
  quizAnswered = false;
  quizCount.textContent = `QUESTION ${String(quizIndex + 1).padStart(2, "0")} / ${questions.length}`;
  quizQuestion.textContent = q.question;
  quizOptions.innerHTML = "";
  quizFeedback.textContent = "";
  quizNext.disabled = true;
  quizNext.textContent = quizIndex === questions.length - 1 ? "SEE MY RESULT →" : "NEXT QUESTION →";
  quizProgress.style.width = ((quizIndex / questions.length) * 100) + "%";

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.textContent = option;

    button.addEventListener("click", () => {
      if (quizAnswered) return;
      quizAnswered = true;

      const allOptions = quizOptions.querySelectorAll(".quiz-option");
      allOptions.forEach(b => b.disabled = true);

      if (index === q.answer) {
        button.classList.add("correct");
        quizScore++;
        quizFeedback.textContent = "♡ " + q.feedback;
      } else {
        button.classList.add("wrong");
        allOptions[q.answer].classList.add("correct");
        quizFeedback.textContent = "Wrong answer, bestie. " + q.feedback;
      }

      quizNext.disabled = false;
    });

    quizOptions.appendChild(button);
  });
}

quizNext?.addEventListener("click", () => {
  if (!quizAnswered) return;
  quizIndex++;
  renderQuiz();
});

renderQuiz();

// Journal
const journalInput = document.getElementById("journalInput");
const saveJournal = document.getElementById("saveJournal");
const savedMsg = document.getElementById("savedMsg");

if (journalInput) {
  journalInput.value = localStorage.getItem("zehriiJournal") || "";
}

saveJournal?.addEventListener("click", () => {
  const text = journalInput.value.trim();
  if (!text) {
    showToast("Pehle kuch toh likh, madam. 😂");
    return;
  }

  localStorage.setItem("zehriiJournal", text);
  savedMsg.textContent = "Your little memory is saved on this device. ♡";
  showToast("Memory saved. Don't delete it, okay? ♡");
});

// Letter Modal
const letterModal = document.getElementById("letterModal");
const letterOpen = document.getElementById("letterOpen");
const modalClose = document.getElementById("modalClose");

letterOpen?.addEventListener("click", () => {
  letterModal.classList.add("show");
  document.body.style.overflow = "hidden";
});

function closeLetter() {
  letterModal.classList.remove("show");
  document.body.style.overflow = "";
}

modalClose?.addEventListener("click", closeLetter);

letterModal?.addEventListener("click", (e) => {
  if (e.target === letterModal) closeLetter();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLetter();
});

// Final message
const finalBtn = document.getElementById("finalBtn");
const finalMessage = document.getElementById("finalMessage");

finalBtn?.addEventListener("click", () => {
  finalMessage.classList.toggle("show");
  finalBtn.textContent = finalMessage.classList.contains("show")
    ? "CLOSE MY MESSAGE ↑"
    : "ONE LAST THING ↗";

  if (finalMessage.classList.contains("show")) spawnHearts(12);
});

// Toast
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

// Ambient music — generated sound, no music file required
let audioContext;
let musicPlaying = false;
let oscillators = [];
let gainNode;

const musicBtn = document.getElementById("musicBtn");

musicBtn?.addEventListener("click", async () => {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      showToast("Ambient sound is not supported in this browser.");
      return;
    }
    audioContext = new AudioContext();
    gainNode = audioContext.createGain();
    gainNode.gain.value = 0.035;
    gainNode.connect(audioContext.destination);
  }

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  if (!musicPlaying) {
    const notes = [196, 246.94, 293.66];
    notes.forEach((frequency, i) => {
      const oscillator = audioContext.createOscillator();
      const volume = audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      volume.gain.value = 0.13 / (i + 1);
      oscillator.connect(volume);
      volume.connect(gainNode);
      oscillator.start();
      oscillators.push({ oscillator, volume });
    });

    musicPlaying = true;
    musicBtn.innerHTML = "♫ <span>Sound ON</span>";
    showToast("Little ambient vibes are on. ♡");
  } else {
    oscillators.forEach(({ oscillator }) => oscillator.stop());
    oscillators = [];
    musicPlaying = false;
    musicBtn.innerHTML = "♫ <span>Sound OFF</span>";
    showToast("Sound off. Silence mode. 😂");
  }
});

console.log("ZEHRII — all systems ready ♡");
