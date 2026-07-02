/* ============================================================
   main.js — Shared site behaviour: navbar, scroll reveal,
   back-to-top button, alphabet grid interactivity.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---- Highlight active nav link ---- */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar-custom .nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href && href.split("/").pop() === currentPage) {
      link.classList.add("active");
    }
  });

  /* ---- Scroll reveal animation ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ---- Back to top button ---- */
  const backBtn = document.querySelector(".back-to-top");
  if (backBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) backBtn.classList.add("show");
      else backBtn.classList.remove("show");
    });
    backBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---- Hindi Alphabet Grid (Home Page) ---- */
  const grid = document.getElementById("alphabetGrid");
  if (grid && typeof hindiAlphabet !== "undefined") {
    hindiAlphabet.forEach((item, idx) => {
      const card = document.createElement("div");
      card.className = "alphabet-card reveal";
      card.innerHTML = `
        <span class="hi-letter">${item.letter}</span>
        <span class="translit">${item.translit}</span>
        <span class="ta-meaning">${item.ta}</span>
      `;
      card.addEventListener("click", () => showAlphabetDetail(idx));
      grid.appendChild(card);
    });

    // re-observe newly added reveal elements
    const observer2 = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll("#alphabetGrid .reveal").forEach(el => observer2.observe(el));
  }

  /* ---- Contact form (front-end only demo) ---- */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const successMsg = document.getElementById("contactSuccess");
      contactForm.reset();
      if (successMsg) {
        successMsg.classList.remove("d-none");
        setTimeout(() => successMsg.classList.add("d-none"), 5000);
      }
    });
  }
});

function showAlphabetDetail(idx) {
  const detail = document.getElementById("alphabetDetail");
  if (!detail) return;
  const item = hindiAlphabet[idx];
  detail.innerHTML = `
    <div class="d-flex align-items-center gap-3 flex-wrap">
      <span style="font-size:3rem; font-weight:700; color:var(--secondary);">${item.letter}</span>
      <div>
        <h5 class="mb-1">Transliteration: <strong>${item.translit}</strong></h5>
        <p class="mb-1"><strong>தமிழ் விளக்கம்:</strong> ${item.ta}</p>
        <p class="mb-0"><strong>English Explanation:</strong> ${item.en}</p>
      </div>
    </div>
  `;
  detail.classList.add("active");
  detail.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ============================================================
   Hindi Answer Checking Engine
   Used by small.html, medium.html, paragraph.html
   ============================================================ */

/**
 * Normalize a Hindi string for comparison:
 * - trims whitespace
 * - removes extra spaces
 * - normalizes danda (।) spacing
 */
function normalizeHindi(str) {
  return str
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\s+।/g, "।")
    .replace(/।+/g, "।");
}

/**
 * Tokenize a Hindi sentence into words (splitting on spaces,
 * keeping punctuation attached for now, then stripped per-word).
 */
function tokenize(str) {
  return normalizeHindi(str)
    .replace(/।/g, " । ")
    .split(" ")
    .map(w => w.trim())
    .filter(w => w.length > 0);
}

/**
 * Compare user's answer to the correct answer word-by-word using
 * a simple LCS-based diff so we can flag missing / wrong / extra words.
 * Returns { isCorrect, similarity, highlightedUser, highlightedCorrect, mistakes }
 */
function checkHindiAnswer(userText, correctText) {
  const userTokens = tokenize(userText);
  const correctTokens = tokenize(correctText);

  const normUser = normalizeHindi(userText);
  const normCorrect = normalizeHindi(correctText);

  if (normUser === normCorrect) {
    return {
      isCorrect: true,
      similarity: 100,
      highlightedUser: escapeHtml(userText),
      mistakes: []
    };
  }

  // LCS to find matching subsequence of words
  const m = userTokens.length, n = correctTokens.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (userTokens[i - 1] === correctTokens[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to mark matched vs mismatched words in user's answer
  const userMatched = new Array(m).fill(false);
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (userTokens[i - 1] === correctTokens[j - 1]) {
      userMatched[i - 1] = true;
      i--; j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  const lcsLength = dp[m][n];
  const similarity = Math.round((2 * lcsLength / (m + n || 1)) * 100);

  // Build highlighted user output (mistakes wrapped in span)
  const highlightedUser = userTokens
    .map((w, idx) => {
      if (w === "।") return "।";
      return userMatched[idx] ? escapeHtml(w) : `<span class="mistake-word">${escapeHtml(w)}</span>`;
    })
    .join(" ")
    .replace(/ ।/g, "।");

  // Identify missing words (present in correct, not matched from user)
  const correctMatchedFlags = new Array(n).fill(false);
  let ii = m, jj = n;
  while (ii > 0 && jj > 0) {
    if (userTokens[ii - 1] === correctTokens[jj - 1]) {
      correctMatchedFlags[jj - 1] = true;
      ii--; jj--;
    } else if (dp[ii - 1][jj] >= dp[ii][jj - 1]) {
      ii--;
    } else {
      jj--;
    }
  }
  const missingWords = correctTokens.filter((w, idx) => !correctMatchedFlags[idx] && w !== "।");
  const wrongWords = userTokens.filter((w, idx) => !userMatched[idx] && w !== "।");

  const mistakes = [];
  if (wrongWords.length > 0) {
    mistakes.push(`தவறான/பொருந்தாத சொற்கள் (Incorrect words used): ${wrongWords.join(", ")}`);
  }
  if (missingWords.length > 0) {
    mistakes.push(`விடுபட்ட சொற்கள் (Missing words): ${missingWords.join(", ")}`);
  }
  if (normUser.length > 0 && Math.abs(m - n) === 0 && wrongWords.length > 0) {
    mistakes.push("சொல் வரிசை அல்லது இலக்கண வடிவம் (Word order or grammar form) சரிபார்க்கவும் — Check word order or grammatical form (gender/tense agreement).");
  }
  if (normUser.length === 0) {
    mistakes.push("பதில் காலியாக உள்ளது (Answer is empty). தயவுசெய்து மொழிபெயர்ப்பை உள்ளிடவும்.");
  }

  return {
    isCorrect: false,
    similarity: isFinite(similarity) ? similarity : 0,
    highlightedUser: highlightedUser || "<em>(no answer)</em>",
    mistakes
  };
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Renders the result panel for a practice question.
 * @param {HTMLElement} panelEl - container element for result
 * @param {string} userAnswer
 * @param {object} questionData - { hindi, explanation }
 */
function renderResult(panelEl, userAnswer, questionData) {
  const result = checkHindiAnswer(userAnswer, questionData.hindi);
  panelEl.classList.remove("correct", "incorrect");
  panelEl.classList.add("show", result.isCorrect ? "correct" : "incorrect");

  let html = "";
  if (result.isCorrect) {
    html += `<h5>✅ சரி! (Correct!) — Similarity: ${result.similarity}%</h5>`;
    html += `<p>வாழ்த்துக்கள்! உங்கள் பதில் சரியானது. Great job — your translation is accurate.</p>`;
  } else {
    html += `<h5>❌ மீண்டும் முயற்சிக்கவும் (Needs Correction) — Similarity: ${result.similarity}%</h5>`;
    html += `<p><strong>உங்கள் பதில் (Your answer) with mistakes highlighted:</strong></p>`;
    html += `<div class="correct-answer-box" style="font-weight:400; font-size:1.1rem;">${result.highlightedUser}</div>`;
    html += `<p><strong>சரியான இந்தி வாக்கியம் (Correct Hindi Sentence):</strong></p>`;
    html += `<div class="correct-answer-box">${escapeHtml(questionData.hindi)}</div>`;

    if (result.mistakes.length) {
      html += `<div class="explanation-box"><strong>கண்டறியப்பட்ட தவறுகள் (Detected mistakes):</strong><ul>`;
      result.mistakes.forEach(m => html += `<li>${escapeHtml(m)}</li>`);
      html += `</ul></div>`;
    }
  }

  html += `<div class="explanation-box mt-2"><strong>மேம்பாட்டிற்கான விளக்கம் (Explanation to improve):</strong><ul>`;
  questionData.explanation.forEach(exp => html += `<li>${exp}</li>`);
  html += `</ul></div>`;

  panelEl.innerHTML = html;
}
