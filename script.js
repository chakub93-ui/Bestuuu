
/* ==================================
   ZEHRII — BEYOND WORDS
   COMPLETE JAVASCRIPT
================================== */

/* MUSIC PLAYER */
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicBtn.textContent = "PAUSE Ⅱ";
    } catch {
      musicBtn.textContent = "ADD MUSIC FILE";
    }
  } else {
    music.pause();
    musicBtn.textContent = "PLAY ♫";
  }
});

music.addEventListener("ended", () => {
  musicBtn.textContent = "PLAY ♫";
});

/* SOUL JOURNAL */
const journalQuestions = [
  {
    category: "YOUR INNER WORLD",
    question: "What is something you wish people understood about you?"
  },
  {
    category: "YOUR DREAMS",
    question: "If nothing could stop you, what would your dream life look like?"
  },
  {
    category: "YOUR HEART",
    question: "What little thing can make you genuinely happy?"
  },
  {
    category: "YOUR MEMORIES",
    question: "Which memory would you love to relive one more time?"
  },
  {
    category: "YOUR STRENGTH",
    question: "What is something difficult you survived but rarely talk about?"
  },
  {
    category: "YOUR FUTURE",
    question: "What do you hope your future self will thank you for?"
  },
  {
    category: "JUST YOU",
    question: "If you could tell your heart one thing today, what would it be?"
  }
];

const journalKey = "zehrii_soul_journal_v1";
let journalIndex = 0;
let journalAnswers = JSON.parse(localStorage.getItem(journalKey) || "{}");

const questionNumber = document.getElementById("questionNumber");
const questionCategory = document.getElementById("questionCategory");
const questionText = document.getElementById("questionText");
const journalAnswer = document.getElementById("journalAnswer");
const progressFill = document.getElementById("progressFill");
const journalCard = document.getElementById("journalCard");
const journalComplete = document.getElementById("journalComplete");

function saveJournalAnswer() {
  journalAnswers[journalIndex] = journalAnswer.value;
  localStorage.setItem(journalKey, JSON.stringify(journalAnswers));
}

function renderJournal() {
  const item = journalQuestions[journalIndex];

  questionNumber.textContent =
    `QUESTION ${String(journalIndex + 1).padStart(2, "0")} / 07`;

  questionCategory.textContent = item.category;
  questionText.textContent = item.question;
  journalAnswer.value = journalAnswers[journalIndex] || "";

  progressFill.style.width =
    `${((journalIndex + 1) / journalQuestions.length) * 100}%`;

  document.getElementById("prevQuestion").disabled = journalIndex === 0;
  document.getElementById("prevQuestion").style.opacity =
    journalIndex === 0 ? "0.35" : "1";

  document.getElementById("nextQuestion").textContent =
    journalIndex === journalQuestions.length - 1
      ? "FINISH JOURNAL ✦"
      : "NEXT QUESTION ↗";
}

journalAnswer.addEventListener("input", saveJournalAnswer);

document.getElementById("nextQuestion").addEventListener("click", () => {
  saveJournalAnswer();

  if (journalIndex < journalQuestions.length - 1) {
    journalIndex++;
    renderJournal();
  } else {
    journalCard.classList.add("hidden");
    journalComplete.classList.remove("hidden");
  }
});

document.getElementById("prevQuestion").addEventListener("click", () => {
  saveJournalAnswer();

  if (journalIndex > 0) {
    journalIndex--;
    renderJournal();
  }
});

document.getElementById("restartJournal").addEventListener("click", () => {
  journalIndex = 0;
  journalCard.classList.remove("hidden");
  journalComplete.classList.add("hidden");
  renderJournal();
});

renderJournal();

/* BESTIE QUIZ */
const quizQuestions = [
  {
    question: "What matters most in a real friendship?",
    options: ["Trust", "Fame", "Expensive gifts", "Competition"],
    answer: 0
  },
  {
    question: "When your bestie feels low, what should you do?",
    options: ["Ignore them", "Listen and support them", "Laugh at them", "Leave them alone forever"],
    answer: 1
  },
  {
    question: "The best memories are usually made with...",
    options: ["Perfect plans", "Lots of money", "Your favourite people", "Strangers"],
    answer: 2
  },
  {
    question: "A true friendship needs...",
    options: ["Constant competition", "Honesty and effort", "Secrets and lies", "Only gifts"],
    answer: 1
  },
  {
    question: "If your bestie makes a mistake...",
    options: ["Understand and talk", "Never speak again", "Embarrass them", "Spread the story"],
    answer: 0
  },
  {
    question: "What is a perfect friendship vibe?",
    options: ["Always serious", "Never talking", "Being yourself", "Pretending"],
    answer: 2
  },
  {
    question: "One word for a forever friendship?",
    options: ["Temporary", "Replaceable", "Unforgettable", "Ordinary"],
    answer: 2
  }
];

let quizIndex = 0;
let quizScore = 0;
let selectedAnswer = null;

const quizBox = document.getElementById("quizBox");
const quizResult = document.getElementById("quizResult");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizNext = document.getElementById("quizNext");
const quizProgress = document.getElementById("quizProgress");

function renderQuiz() {
  const q = quizQuestions[quizIndex];
  selectedAnswer = null;
  quizNext.disabled = true;

  document.getElementById("quizCount").textContent =
    `QUESTION ${String(quizIndex + 1).padStart(2, "0")} / 07`;

  quizProgress.style.width =
    `${((quizIndex + 1) / quizQuestions.length) * 100}%`;

  quizQuestion.textContent = q.question;
  quizOptions.innerHTML = "";

  q.options.forEach((option, i) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.textContent = option;

    button.addEventListener("click", () => {
      selectedAnswer = i;

      document.querySelectorAll(".quiz-option").forEach(btn => {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");
      quizNext.disabled = false;
    });

    quizOptions.appendChild(button);
  });

  quizNext.textContent =
    quizIndex === quizQuestions.length - 1
      ? "SEE MY RESULT ✦"
      : "NEXT QUESTION →";
}

quizNext.addEventListener("click", () => {
  if (selectedAnswer === null) return;

  if (selectedAnswer === quizQuestions[quizIndex].answer) {
    quizScore++;
  }

  if (quizIndex < quizQuestions.length - 1) {
    quizIndex++;
    renderQuiz();
  } else {
    showQuizResult();
  }
});

function showQuizResult() {
  quizBox.classList.add("hidden");
  quizResult.classList.remove("hidden");

  document.getElementById("resultScore").textContent =
    `You got ${quizScore} out of ${quizQuestions.length} right!`;

  let title, message;

  if (quizScore >= 6) {
    title = "A heart full of friendship ♡";
    message = "You really understand what makes a friendship beautiful.";
  } else if (quizScore >= 4) {
    title = "Beautiful bestie energy ✦";
    message = "You know the little things that make friendship matter.";
  } else {
    title = "Friendship is a journey ♡";
    message = "Every little moment is another chance to know each other.";
  }

  document.getElementById("resultTitle").textContent = title;
  document.getElementById("resultMessage").textContent = message;
}

document.getElementById("quizRestart").addEventListener("click", () => {
  quizIndex = 0;
  quizScore = 0;
  selectedAnswer = null;
  quizBox.classList.remove("hidden");
  quizResult.classList.add("hidden");
  renderQuiz();
});

renderQuiz();

/* RIYA'S LETTER */
const letterOverlay = document.getElementById("letterOverlay");

document.getElementById("openLetter").addEventListener("click", () => {
  letterOverlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});

function closeLetter() {
  letterOverlay.classList.add("hidden");
  document.body.style.overflow = "";
}

document.getElementById("closeLetter").addEventListener("click", closeLetter);

letterOverlay.addEventListener("click", (event) => {
  if (event.target === letterOverlay) {
    closeLetter();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLetter();
  }
});

/* SCROLL REVEAL */
const revealItems = document.querySelectorAll(
  ".memory-card, .promise-item, .music-card"
);

revealItems.forEach(item => {
  item.style.opacity = "0";
  item.style.transform = "translateY(25px)";
  item.style.transition = "opacity .7s ease, transform .7s ease";
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => {
    item.style.opacity = "1";
    item.style.transform = "none";
  });
}

console.log("ZEHRII — Beyond Words is ready ♡");

// ===== ZEHRII INTRO SCREEN =====
const introScreen = document.getElementById("introScreen");

if (introScreen) {
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    introScreen.classList.add("hide");
    document.body.style.overflow = "";
  }, 2500);
}

// ===== SCROLL PROGRESS =====
const progressBar = document.getElementById("scrollProgress");

function updateScrollProgress() {
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const percentage =
    maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = percentage + "%";
  }
}

window.addEventListener("scroll", updateScrollProgress, {
  passive: true
});

updateScrollProgress();

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById("customCursor");

if (cursor && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.style.width = "18px";
      cursor.style.height = "18px";
    });

    element.addEventListener("mouseleave", () => {
      cursor.style.width = "10px";
      cursor.style.height = "10px";
    });
  });
}
