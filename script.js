
/* =====================================
   RIYA × ZEHRII
   COMPLETE WORKING JAVASCRIPT
   ===================================== */

"use strict";

// SHORTCUTS
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ---------- STAR BACKGROUND ----------

const stars = $("#stars");

if (stars) {
  for (let i = 0; i < 65; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 4 + "s";
    stars.appendChild(star);
  }
}

// ---------- FLOATING HEARTS ----------

const hearts = $("#hearts");

function createHeart() {
  if (!hearts) return;

  const heart = document.createElement("span");
  heart.className = "floating-particle";
  heart.textContent = ["♥", "♡", "✦"][Math.floor(Math.random() * 3)];

  heart.style.left = Math.random() * 100 + "%";
  heart.style.animationDuration = (5 + Math.random() * 5) + "s";
  heart.style.fontSize = (12 + Math.random() * 16) + "px";

  hearts.appendChild(heart);

  setTimeout(() => heart.remove(), 11000);
}

setInterval(createHeart, 1200);

// ---------- SCROLL ANIMATIONS ----------

const revealElements = $$(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

// ---------- TOAST ----------

let toastTimer;

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

// ---------- MOBILE MENU ----------

const menuButton = $("#menuButton");
const navigation = $(".navbar nav");

menuButton?.addEventListener("click", () => {
  const opened = navigation.classList.toggle("open");
  menuButton.textContent = opened ? "✕" : "☰";
});

navigation?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.textContent = "☰";
  });
});

// ---------- RIYA MOOD CONTROL ----------

const moodMessages = {
  angry: [
    "Zehrii abhi mujhse baat mat karna! 😒",
    "Mujhe manana padega, samjhe? 😤",
    "Tumhari toh aaj khair nahi hai! 😂",
    "Itna attitude? Main bhi kam nahi! 😭"
  ],

  cute: [
    "Oyee bestu, ek hug toh banta hai! 🥺❤️",
    "Tu na bohot achha hai yaar!",
    "Chal ab thoda sweet ban ja! 💗",
    "Aaj Riya ko extra attention chahiye!"
  ],

  funny: [
    "HAHAHA Zehrii tera dimag kahan hai? 🤣",
    "Pagal hai tu, ek number wala!",
    "Riya ki comedy ka koi jawab nahi! 😂",
    "Teri harkatein dekh kar hasi aa gayi!"
  ],

  sad: [
    "Aaj bas thoda sa pyaar aur care chahiye. 🥹",
    "Ek virtual hug bhej na bestu. ❤️",
    "Sab theek ho jayega, smile kar! 🫂",
    "Kabhi kabhi bas kisi apne ki zarurat hoti hai."
  ]
};

$$(".mood-card").forEach(button => {
  button.addEventListener("click", () => {
    const mood = button.dataset.mood;
    const messages = moodMessages[mood];

    if (!messages) return;

    const message = messages[
      Math.floor(Math.random() * messages.length)
    ];

    $("#moodResponse").textContent = message;

    $$(".mood-card").forEach(card => {
      card.classList.remove("selected");
    });

    button.classList.add("selected");

    showToast("Riya ka mood update ho gaya! 😂");
  });
});

// ---------- ZEHRII CHAOS BUTTON ----------

const chaosMessages = [
  "RIYA: Oye Zehrii! Mujhe ignore kar raha hai? 😭",
  "RIYA: Achha ji, ab attitude aane laga? 😒",
  "RIYA: Main jaa rahi hoon... 2 minute mein wapas aaungi! 😂",
  "RIYA: Teri khair nahi bestu! 🤣",
  "RIYA: Abhi toh trailer tha, picture baaki hai! 😈",
  "RIYA: Sun raha hai na meri baat? 😭❤️",
  "RIYA: Itna innocent mat ban, sab pata hai mujhe! 😂"
];

let chaosCount = 0;

$("#chaosBtn")?.addEventListener("click", () => {
  const response = $("#chaosResponse");

  response.textContent =
    chaosMessages[chaosCount % chaosMessages.length];

  response.animate(
    [
      { opacity: 0, transform: "scale(.85)" },
      { opacity: 1, transform: "scale(1)" }
    ],
    { duration: 350, easing: "ease-out" }
  );

  chaosCount++;

  if (chaosCount % 3 === 0) {
    showToast("Zehrii is officially in trouble! 😂");
  }
});

// ---------- BESTU QUIZ ----------

const questions = [
  {
    question: "Riya gussa ho jaye toh kya karna chahiye?",
    answers: [
      "Ignore kar dena 😂",
      "Sorry bolke manana 🥺",
      "Ulta ladna 😭"
    ],
    correct: 1
  },
  {
    question: "Riya ka favourite kaam kya hai?",
    answers: [
      "Zehrii ko pareshan karna 🤣",
      "Sirf sona 😴",
      "Zehrii ko ignore karna 😒"
    ],
    correct: 0
  },
  {
    question: "Zehrii ko Riya se kya kehna chahiye?",
    answers: [
      "Jaao yahan se!",
      "Tu meri besti hai ❤️",
      "Mujhe nahi pata!"
    ],
    correct: 1
  },
  {
    question: "Riya aur Zehrii ki jodi kaisi hai?",
    answers: [
      "Full comedy show 🤣",
      "Unlimited drama 😂",
      "Dono hi sahi hain! ❤️"
    ],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let quizFinished = false;
let answered = false;

function loadQuestion() {
  const q = questions[currentQuestion];

  $("#quizCount").textContent =
    `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / 04`;

  $("#quizScore").textContent = `SCORE: ${score}`;
  $("#progressBar").style.width =
    ((currentQuestion + 1) / questions.length * 100) + "%";

  $("#question").textContent = q.question;
  $("#quizFeedback").textContent = "";
  $("#nextQuestion").hidden = true;

  const answersContainer = $("#answers");
  answersContainer.innerHTML = "";

  answered = false;
  quizFinished = false;

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.className = "answer";
    button.textContent = answer;

    button.addEventListener("click", () => {
      if (answered || quizFinished) return;

      answered = true;

      const correct = index === q.correct;

      if (correct) {
        score++;
        button.classList.add("correct");

        $("#quizFeedback").textContent =
          "Wahhhh! Bestu ko sab pata hai! ❤️";
      } else {
        button.classList.add("wrong");

        $("#quizFeedback").textContent =
          "Galat jawab! Ab Riya naraz ho jayegi! 😭";
      }

      $("#quizScore").textContent = `SCORE: ${score}`;

      answersContainer.querySelectorAll("button").forEach((item, i) => {
        item.disabled = true;

        if (i === q.correct) {
          item.classList.add("correct");
        }
      });

      $("#nextQuestion").hidden = false;

      $("#nextQuestion").textContent =
        currentQuestion === questions.length - 1
          ? "See My Result ❤️"
          : "Next Question →";
    });

    answersContainer.appendChild(button);
  });
}

function showQuizResult() {
  quizFinished = true;

  $("#quizCount").textContent = "TEST COMPLETED";
  $("#progressBar").style.width = "100%";

  $("#question").textContent = "Your Bestu Result! 🏆";

  $("#answers").innerHTML = "";

  let resultMessage;

  if (score === 4) {
    resultMessage = "Perfect! Riya is super proud of you! 🥹❤️";
  } else if (score >= 2) {
    resultMessage = "Not bad bestu! Thodi aur practice karo. 😂";
  } else {
    resultMessage = "Zehrii! Riya ko ab tumhe training deni padegi! 😭";
  }

  $("#quizFeedback").textContent =
    `Your score: ${score}/4. ${resultMessage}`;

  $("#nextQuestion").textContent = "Play Again ↻";
  $("#nextQuestion").hidden = false;
}

$("#nextQuestion")?.addEventListener("click", () => {
  if (quizFinished) {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    return;
  }

  if (!answered) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    showQuizResult();
  }
});

loadQuestion();

// ---------- LOVE LETTER POPUP ----------

const modal = $("#letterModal");

function openLetter() {
  modal?.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLetter() {
  modal?.classList.remove("active");
  document.body.style.overflow = "";
}

$("#openLetter")?.addEventListener("click", openLetter);
$("#closeLetter")?.addEventListener("click", closeLetter);

modal?.addEventListener("click", event => {
  if (event.target === modal) closeLetter();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeLetter();
});

// ---------- FINAL SURPRISE ----------

let surpriseOpened = false;

$("#finalBtn")?.addEventListener("click", () => {
  if (surpriseOpened) {
    showToast("Surprise toh pehle hi mil gaya bestu! 😂❤️");
    return;
  }

  surpriseOpened = true;

  $("#finalMessage").innerHTML = `
    <div class="final-surprise">
      <div class="surprise-heart">❤️</div>
      <h2>Oye Zehriii!</h2>
      <p>
        Tu chahe jitna bhi pareshan kare,
        Riya ki list mein tu special hi rahega! 😂
      </p>
      <h2>Bestu Forever! 🫶</h2>
      <p>— From your Riya 💗</p>
    </div>
  `;

  $("#finalBtn").textContent = "Surprise Unlocked ❤️";

  showToast("Special surprise unlocked! 🥹");

  for (let i = 0; i < 20; i++) {
    setTimeout(createHeart, i * 100);
  }
});

// ---------- SMOOTH SCROLL ----------

$$('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const target = $(link.getAttribute("href"));

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

// ---------- WEBSITE READY ----------

console.log("RIYA × ZEHRII: Website loaded successfully! ❤️");

showToast("Welcome to Riya's little world! 💗");
