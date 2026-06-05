const slides = document.querySelectorAll(".slide");
const progress = document.getElementById("progress");
const counter = document.getElementById("counter");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const scoreElement = document.getElementById("score");
const noteText = document.getElementById("noteText");

const navButtons = document.querySelectorAll(".archive-nav button");

let currentSlide = 0;
let score = 0;
let isChangingSlide = false;

function updateSlide() {
  if (isChangingSlide) return;

  isChangingSlide = true;

  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide);
  });

  navButtons.forEach((button, index) => {
    button.classList.toggle("active", index === currentSlide);
  });

  if (progress) {
    progress.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
  }

  if (counter) {
    counter.textContent = `${currentSlide + 1} / ${slides.length}`;
  }

  updatePresenterNote();

  setTimeout(() => {
    isChangingSlide = false;
  }, 450);
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
  if (index < 0 || index >= slides.length) return;
  if (index === currentSlide) return;

  currentSlide = index;
  updateSlide();
}

function openModal(title, text) {
  if (!modal || !modalTitle || !modalText) return;

  modalTitle.textContent = title;
  modalText.textContent = text;

  modal.classList.add("show");
  document.body.classList.add("modal-open");
}

function closeModal() {
  if (!modal) return;

  modal.classList.remove("show");
  document.body.classList.remove("modal-open");
}

function rightAnswer(button, explanation) {
  const quiz = button.closest(".quiz");

  if (quiz && quiz.dataset.answered === "true") {
    openModal(
      "Pergunta já respondida",
      "Essa pergunta já foi respondida. Continue para a próxima interação."
    );
    return;
  }

  clearQuiz(button);

  button.classList.add("correct");

  if (quiz) {
    quiz.dataset.answered = "true";
  }

  score++;
  updateScore();

  openModal("Resposta correta!", explanation);
}

function wrongAnswer(button, explanation) {
  const quiz = button.closest(".quiz");

  if (quiz && quiz.dataset.answered === "true") {
    openModal(
      "Pergunta já respondida",
      "Essa pergunta já foi respondida. Continue para a próxima interação."
    );
    return;
  }

  clearQuiz(button);

  button.classList.add("wrong");

  if (quiz) {
    quiz.dataset.answered = "true";
  }

  openModal("Quase!", explanation);
}

function clearQuiz(button) {
  const quiz = button.closest(".quiz");

  if (!quiz) return;

  quiz.querySelectorAll("button").forEach((item) => {
    item.classList.remove("correct", "wrong");
  });
}

function updateScore() {
  if (scoreElement) {
    scoreElement.textContent = score;
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

function togglePresenter() {
  document.body.classList.toggle("presenter");
  updatePresenterNote();
}

function updatePresenterNote() {
  if (!noteText) return;

  const currentNote = slides[currentSlide]?.dataset.note;

  noteText.textContent =
    currentNote || "Sem anotação para este slide.";
}

function copyReferences() {
  const text = `Referências:
História Geral
Rússia Czarista
Revolução Russa de 1917
Primeira Guerra Mundial
Lenin e os Bolcheviques
Formação da União Soviética`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }

  openModal(
    "Referências copiadas!",
    "As referências foram copiadas para a área de transferência."
  );
}

document.addEventListener("keydown", (event) => {
  const modalIsOpen = modal?.classList.contains("show");

  if (event.key === "Escape") {
    closeModal();
    return;
  }

  if (modalIsOpen) return;

  if (event.key === "ArrowRight" || event.key === " ") {
    event.preventDefault();
    nextSlide();
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    prevSlide();
  }

  if (event.key.toLowerCase() === "f") {
    toggleFullscreen();
  }

  if (event.key.toLowerCase() === "p") {
    togglePresenter();
  }

  if (event.key.toLowerCase() === "t") {
    toggleTheme();
  }
});

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX;

  const difference = touchStartX - touchEndX;

  if (Math.abs(difference) < 60) return;

  if (difference > 0) {
    nextSlide();
  } else {
    prevSlide();
  }
});

updateSlide();