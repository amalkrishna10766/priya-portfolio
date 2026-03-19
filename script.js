window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    if (loader) loader.classList.add("hide");
  }, 900);
});

const typedText = document.getElementById("typedText");
const sentence = "ELEGANCE • AWARENESS • PRECISION • TRUST";
let index = 0;

setInterval(() => {
  index = (index + 1) % (sentence.length + 1);
  if (typedText) typedText.textContent = sentence.slice(0, index);
}, 85);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const bg = document.getElementById("bg");
if (bg) {
  for (let i = 0; i < 95; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    const size = 2 + Math.random() * 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${4 + Math.random() * 5}s`;
    particle.style.animationDelay = `${Math.random() * 4}s`;

    bg.appendChild(particle);
  }
}

/* Cursor glow + particle trail */
const glow = document.getElementById("cursorGlow");
let trailTimer = 0;

window.addEventListener("mousemove", (e) => {
  if (glow) {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }

  trailTimer++;
  if (trailTimer % 2 === 0) {
    const particle = document.createElement("div");
    particle.className = "cursor-particle";
    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;
    particle.style.background = Math.random() > 0.5 ? "rgba(34,211,238,0.9)" : "rgba(168,85,247,0.9)";
    particle.style.boxShadow = Math.random() > 0.5
      ? "0 0 14px rgba(34,211,238,0.8)"
      : "0 0 14px rgba(168,85,247,0.8)";
    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 800);
  }
});

/* Matrix rain */
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const letters = "01アイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
let columns = Math.floor(window.innerWidth / fontSize);
let drops = new Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(5, 8, 15, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = i % 2 === 0 ? "rgba(34,211,238,0.55)" : "rgba(168,85,247,0.45)";
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(() => {
  columns = Math.floor(window.innerWidth / fontSize);
  if (drops.length !== columns) {
    drops = new Array(columns).fill(1);
  }
  drawMatrix();
}, 50);

/* Modal */
const modal = document.getElementById("studyModal");
const closeModal = document.getElementById("closeModal");

function fill(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

document.querySelectorAll(".lab-card").forEach((card) => {
  card.addEventListener("click", () => {
    fill("modalTitle", card.dataset.title || "");
    fill("modalTag", card.dataset.tag || "");
    fill("modalOverview", card.dataset.overview || "");
    fill("modalProblem", card.dataset.problem || "");
    fill("modalAction", card.dataset.action || "");
    fill("modalResult", card.dataset.result || "");

    if (modal) modal.classList.add("open");
  });
});

if (closeModal) {
  closeModal.addEventListener("click", () => {
    if (modal) modal.classList.remove("open");
  });
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });
}