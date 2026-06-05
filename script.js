const slides = document.querySelectorAll(".slide");
const progress = document.getElementById("progress");
const counter = document.getElementById("counter");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const scoreElement = document.getElementById("score");
const noteText = document.getElementById("noteText");
const navButtons = document.querySelectorAll(".archive-nav button");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const quiz = document.getElementById("quiz");

let currentSlide = 0;
let previousSlide = 0;
let score = 0;
let lastFocusedElement = null;
const answeredRight = new Set();

function updateSlide() {
  const direction = currentSlide > previousSlide ? "forward" : "back";

  slides.forEach((slide, index) => {
    // Remove apenas a classe active imediatamente
    slide.classList.remove("active");

    // Tratamento do slide anterior (efeito de descarte)
    if (index === previousSlide && currentSlide !== previousSlide) {
      if (direction === "forward") {
        slide.classList.add("leaving-left");
      } else {
        slide.classList.add("leaving-right");
      }

      // Espera a animação terminar (850ms do CSS) para limpar as classes de descarte
      setTimeout(() => {
        slide.classList.remove("leaving-left", "leaving-right");
      }, 850);
    } else if (index !== currentSlide) {
      // Garante que slides que não estão envolvidos na transição atual fiquem limpos
      slide.classList.remove("leaving-left", "leaving-right");
    }

    // Ativa o slide atual
    if (index === currentSlide) {
      slide.classList.add("active");
    }
  });

  // Atualiza a navegação lateral
  navButtons.forEach((button, index) => {
    button.classList.toggle("active", index === currentSlide);
    button.setAttribute("aria-current", index === currentSlide ? "step" : "false");
  });

  // Barra de progresso e contador
  const percent = ((currentSlide + 1) / slides.length) * 100;
  progress.style.width = `${percent}%`;
  counter.textContent = `${currentSlide + 1} / ${slides.length}`;

  // Bloqueio de botões nos extremos
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;

  updatePresenterNote();
  previousSlide = currentSlide;
}

function nextSlide() {
  if (currentSlide >= slides.length - 1) return;
  currentSlide++;
  updateSlide();
}

function prevSlide() {
  if (currentSlide <= 0) return;
  currentSlide--;
  updateSlide();
}

function goToSlide(index) {
  if (index < 0 || index >= slides.length || index === currentSlide) return;
  currentSlide = index;
  updateSlide();
}

function openModal(title, text) {
  lastFocusedElement = document.activeElement;
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.classList.add("show");
  document.body.classList.add("modal-open");

  const closeButton = modal.querySelector(".close");
  closeButton.focus();
}

function closeModal() {
  modal.classList.remove("show");
  document.body.classList.remove("modal-open");

  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {
      openModal("Tela cheia indisponível", "O navegador bloqueou a entrada em tela cheia. Tente usar o botão novamente ou pressione F11.");
    });
    return;
  }
  document.exitFullscreen();
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("dossie-theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

function togglePresenter() {
  document.body.classList.toggle("presenter");
  updatePresenterNote();
}

function updatePresenterNote() {
  const note = slides[currentSlide].dataset.note || "Sem observação para este arquivo.";
  noteText.textContent = note;
}

async function copyReferences() {
  const text = `Referências:
História Geral
Rússia Czarista
Revolução Russa de 1917
Primeira Guerra Mundial
Lenin e os Bolcheviques
Formação da União Soviética`;

  try {
    await navigator.clipboard.writeText(text);
    openModal("Referências copiadas!", "As referências foram copiadas para a área de transferência.");
  } catch {
    openModal("Copie manualmente", text);
  }
}

function handleQuizClick(event) {
  const button = event.target.closest("button");
  if (!button || !quiz.contains(button) || button.disabled) return;

  const isRight = button.dataset.answer === "right";
  const explanation = button.dataset.explanation;

  button.classList.add(isRight ? "correct" : "wrong");
  button.disabled = true;

  if (isRight && !answeredRight.has(button)) {
    answeredRight.add(button);
    score++;
    scoreElement.textContent = score;
  }

  openModal(isRight ? "Resposta correta!" : "Quase!", explanation);
}

// Efeito de inclinação 3D (Tilt) aprimorado para fluidez máxima
function addTiltEffect() {
  const cards = document.querySelectorAll(".evidence-grid button, .suspect-grid button, .judgement-grid button, .document-card, .newspaper, .slogan");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      if (window.matchMedia("(max-width: 900px)").matches) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Calcula a rotação baseada no centro do card
      const rotateX = ((y / rect.height) - 0.5) * -12; // Aumentado levemente para maior percepção tátil
      const rotateY = ((x / rect.width) - 0.5) * 12;

      card.style.transform = `translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function loadSavedTheme() {
  if (localStorage.getItem("dossie-theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
}

// Atalhos do teclado
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const modalIsOpen = modal.classList.contains("show");

  if (key === "escape") {
    if (modalIsOpen) closeModal();
    return;
  }

  if (modalIsOpen) return;

  if (event.key === "ArrowRight" || event.key === " ") {
    event.preventDefault();
    nextSlide();
  }

  if (event.key === "ArrowLeft") prevSlide();
  if (key === "f") toggleFullscreen();
  if (key === "p") togglePresenter();
  if (key === "t") toggleTheme();
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

if (quiz) {
  quiz.addEventListener("click", handleQuizClick);
}

// Inicializadores
loadSavedTheme();
addTiltEffect();
updateSlide();