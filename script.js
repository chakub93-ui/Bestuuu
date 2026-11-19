
// =====================================
// ZEHRII × RIYA - INTERACTIVE WORLD
// Made with love by Riya ❤️
// =====================================

const $ = (selector) => document.querySelector(selector);

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
  heart.style.fontSize = (12 + Math.random() * 18) + "px";

  hearts.appendChild(heart);

  setTimeout(() => heart.remove(), 10000);
}

setInterval(createHeart, 900);

// ---------- REVEAL ANIMATIONS ----------

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});

// ---------- TOAST MESSAGE ----------

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

// ---------- RIYA MOOD CONTROL ----------

const moods = {
  angry: [
    "Zehrii abhi mujhse baat mat karna! 😒",
    "Mujhe manana padega, samjhe? 😤",
    "Tumhari toh aaj khair nahi hai! 😂"
  ],

  cute: [
    "Oyee bestu, ek hug toh banta hai! 🥺❤️",
    "Tu na bohot achha hai yaar!",
    "Chal ab thoda sweet ban ja! 💗"
  ],

  funny: [
    "HAHAHA Zehrii tera dimag kahan hai? 🤣",
    "Pagal hai tu, ek number wala!",
    "Riya ki comedy ka koi jawab nahi! 😂"
  ],

  sad: [
    "Aaj bas thoda sa pyaar aur care chahiye. 🥹",
    "Ek virtual hug bhej na bestu. ❤️",
    "Sab theek ho jayega, smile kar! 🫂"
  ]
};

document.querySelectorAll(".mood-card").forEach(button => {
  button.addEventListener("click", () => {
    const mood = button.dataset.mood;
    const responses = moods[mood];

    if (!responses) return;

    const response = $("#moodResponse");

    response.innerHTML = `
      <p>${responses[Math.floor(Math.random() * responses.length)]}</p>
      <small>— Riya's mood report ❤️</small>
    `;

    document.querySelectorAll(".mood-card").forEach(card => {
      card.classList.remove("selected");
    });

    button.classList.add("selected");

    showToast("Riya ka mood update ho gaya! 😂");
  });
});

// ---------- CHAOS BUTTON ----------

const chaosMessages = [
  "RIYA: Oye Zehrii! Mujhe ignore kar raha hai? 😭",
  "RIYA: Achha ji, ab attitude aane laga? 😒",
  "RIYA: Main jaa rahi hoon... 2 minute mein wapas aaungi! 😂",
  "RIYA: Teri khair nahi bestu! 🤣",
  "RIYA: Abhi toh trailer tha, picture baaki hai! 😈"
];

let chaosCount = 0;

$("#chaosBtn")?.addEventListener("click", () => {
  const response = $("#chaosResponse");

  response.textContent =
    chaosMessages[chaosCount % chaosMessages.length];

  response.classList.remove("chaos-pop");
  void response.offsetWidth;
  response.classList.add("chaos-pop");

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
    correct: 1,
    success: "Wahhh! Bestu ko samajh aa gaya! ❤️",
    fail: "Galat jawab! Ab Riya naraz ho jayegi! 😭"
  },
  {
    question: "Riya ka favourite kaam kya hai?",
    answers: [
      "Zehrii ko pareshan karna 🤣",
      "Sirf sona 😴",
      "Zehrii ko ignore karna 😒"
    ],
    correct: 0,
    success: "Bilkul sahi! Riya ki asli identity! 😂",
    fail: "Itna bhi nahi jaanta apni Besti ko? 😭"
  },
  {
    question: "Zehrii ko Riya se kya kehna chahiye?",
    answers: [
      "Jaao yahan se!",
      "Tu meri besti hai ❤️",
      "Mujhe nahi pata!"
    ],
    correct: 1,
    success: "Awww! Riya blush kar rahi hai! 🥹",
    fail: "Zehrii! Dobara soch ke jawab de! 😤"
  },
  {
    question: "Riya aur Zehrii ki jodi kaisi hai?",
    answers: [
      "Full comedy show 🤣",
      "Unlimited drama 😂",
      "Dono hi sahi hain! ❤️"
    ],
    correct: 2,
    success: "Perfect answer! You passed the Bestu test! 🏆",
    fail: "Dono hi sahi hain bhai! 😂"
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
  const q = questions[currentQuestion];

  $("#question").textContent = q.question;
  $("#quizCount").textContent =
    `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / 04`;

  $("#progressBar").style.width =
    ((currentQuestion + 1) / questions.length * 100) + "%";

  $("#quizFeedback").textContent = "";
  $("#nextQuestion").hidden = true;
  $("#answers").innerHTML = "";

  answered = false;

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = answer;

    button.addEventListener("click", () => {
      if (answered) return;

      answered = true;

      const correct = index === q.correct;

      if (correct) {
        score++;
        button.classList.add("correct");
        $("#quizFeedback").textContent = q.success;
      } else {
        button.classList.add("wrong");
        $("#quizFeedback").textContent = q.fail;
      }

      $("#answers").querySelectorAll("button").forEach((item, i) => {
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

    $("#answers").appendChild(button);
  });
}

$("#nextQuestion")?.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    $("#question").textContent = "Your Bestu Score! 🏆";
    $("#answers").innerHTML = "";
    $("#quizFeedback").textContent =
      `${score}/4 correct! ${score === 4
        ? "Riya is proud of you! ❤️"
        : "Abhi aur practice karni padegi Zehrii! 😂"}`;

    $("#nextQuestion").textContent = "Play Again ↻";
    $("#nextQuestion").hidden = false;

    currentQuestion = -1;
    $("#progressBar").style.width = "100%";
  }

  if (currentQuestion === -1) {
    return;
  }
});

$("#nextQuestion")?.addEventListener("click", () => {
  if (currentQuestion === -1) {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
  }
});

loadQuestion();

// ---------- LOVE LETTER ----------

const modal = $("#letterModal");

$("#openLetter")?.addEventListener("click", () => {
  modal?.classList.add("active");
  document.body.style.overflow = "hidden";
});

function closeLetter() {
  modal?.classList.remove("active");
  document.body.style.overflow = "";
}

$("#closeLetter")?.addEventListener("click", closeLetter);

modal?.addEventListener("click", event => {
  if (event.target === modal) closeLetter();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeLetter();
});

// ---------- FINAL SURPRISE ----------

$("#finalBtn")?.addEventListener("click", () => {
  const message = $("#finalMessage");

  message.innerHTML = `
    <div class="final-surprise">
      <div class="surprise-heart">❤️</div>
      <h3>Oye Zehriii!</h3>
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

// ---------- MUSIC BUTTON ----------

$("#musicBtn")?.addEventListener("click", () => {
  showToast("Music feature ke liye audio file add karni hogi! 🎵");
});

// ---------- SMOOTH SCROLL ----------

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

console.log("❤️ Riya × Zehrii world loaded successfully!");
