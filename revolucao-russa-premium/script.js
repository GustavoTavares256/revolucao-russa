const modalData = {
  domingo: {
    kicker: "Evidencia previa",
    title: "Domingo Sangrento",
    body: "Em 1905, uma manifestacao pacifica em Sao Petersburgo foi reprimida pelas tropas do czar. O episodio destruiu parte da confianca popular na monarquia e antecipou a radicalizacao politica."
  },
  duma: {
    kicker: "Instituicao limitada",
    title: "Duma",
    body: "Criada apos 1905, a Duma parecia uma abertura parlamentar, mas tinha poderes controlados pelo czar. A reforma existia, mas nao entregava soberania popular real."
  },
  sovietes: {
    kicker: "Poder paralelo",
    title: "Sovietes",
    body: "Conselhos de operarios, soldados e camponeses. Em 1917, os sovietes foram mais que organizacoes: tornaram-se centros de legitimidade politica fora do Estado czarista."
  },
  autocracia: {
    kicker: "Causa estrutural",
    title: "Autocracia czarista",
    body: "A concentracao do poder impedia reformas profundas. Quando a crise social cresceu, o regime tinha pouca flexibilidade para negociar sem parecer fraco."
  },
  terra: {
    kicker: "Causa social",
    title: "Questao agraria",
    body: "A maioria da populacao vivia no campo. A fome, os impostos e a concentracao de terras transformaram a demanda por reforma agraria em pauta revolucionaria."
  },
  guerra: {
    kicker: "Causa imediata",
    title: "Primeira Guerra Mundial",
    body: "A guerra provocou mortes, desorganizacao produtiva, crise de abastecimento e desgaste militar. Ela acelerou problemas que ja existiam."
  },
  organizacao: {
    kicker: "Causa politica",
    title: "Organizacao revolucionaria",
    body: "Greves, sovietes, partidos e liderancas transformaram sofrimento difuso em estrategia politica. Sem organizacao, crise nem sempre vira revolucao."
  }
};

const mapData = {
  petrogrado: {
    title: "Petrogrado",
    body: "Centro politico das jornadas de Fevereiro e da insurreicao de Outubro. A cidade concentrou greves, filas por pao, manifestacoes e adesao de soldados.",
    bullets: ["Palacio de Inverno como simbolo do Governo Provisorio.", "Soviete de Petrogrado como polo alternativo de poder."]
  },
  moscou: {
    title: "Moscou",
    body: "Apos a consolidacao bolchevique, Moscou voltou a ser capital. Ela simboliza a reorganizacao do poder revolucionario em escala nacional.",
    bullets: ["Capital politica do novo regime.", "Ponto de articulacao administrativa e militar."]
  },
  siberia: {
    title: "Siberia",
    body: "Regiao associada a exilios politicos, deslocamentos militares e aos desafios de controlar um territorio continental durante a Guerra Civil.",
    bullets: ["Espaco de exilio e repressao.", "Territorio decisivo para logistica e controle estatal."]
  }
};

const personData = {
  nicolau: {
    portrait: "czar",
    title: "Nicolau II",
    body: "Ultimo czar da Russia. Simboliza a rigidez da autocracia diante de uma sociedade que exigia reformas, representacao e alivio economico.",
    role: "Monarquia em colapso",
    risk: "Perda de legitimidade"
  },
  lenin: {
    portrait: "lenin",
    title: "Lenin",
    body: "Lider bolchevique. Defendeu todo poder aos sovietes, saida da guerra e tomada revolucionaria do Estado quando o Governo Provisorio perdeu apoio.",
    role: "Estrategista da ruptura",
    risk: "Radicalizacao do poder"
  },
  trotsky: {
    portrait: "trotsky",
    title: "Trotsky",
    body: "Figura central no Soviete de Petrogrado e na organizacao da insurreicao. Depois, foi decisivo na estruturacao do Exercito Vermelho.",
    role: "Organizador politico-militar",
    risk: "Guerra civil prolongada"
  },
  stalin: {
    portrait: "stalin",
    title: "Stalin",
    body: "Quadro bolchevique que cresceu no aparelho partidario apos 1917. Sua trajetoria mostra como a revolucao tambem abriu disputa interna pelo controle do Estado.",
    role: "Aparelho partidario",
    risk: "Centralizacao futura"
  }
};

const timelineData = {
  "1905": {
    year: "1905",
    title: "Ensaio geral revolucionario",
    body: "O Domingo Sangrento e as revoltas de 1905 revelaram que o regime era vulneravel quando crise social, rua e descontentamento politico se encontravam."
  },
  "1914": {
    year: "1914",
    title: "Entrada na Primeira Guerra Mundial",
    body: "A guerra exigiu soldados, recursos e sacrificios. O front militar passou a produzir crise economica e politica dentro do imperio."
  },
  fev1917: {
    year: "Fevereiro de 1917",
    title: "Queda do czar",
    body: "Greves, protestos e motins derrubaram Nicolau II. A monarquia terminou, mas a pergunta sobre quem governaria a Russia ficou aberta."
  },
  out1917: {
    year: "Outubro de 1917",
    title: "Insurreicao bolchevique",
    body: "Os bolcheviques tomaram pontos estrategicos de Petrogrado e derrubaram o Governo Provisorio, convertendo duplo poder em poder sovietico."
  },
  "1918": {
    year: "1918",
    title: "Guerra Civil e Brest-Litovsk",
    body: "A saida da guerra mundial veio com custo territorial. Ao mesmo tempo, vermelhos e brancos disputaram militarmente o futuro da revolucao."
  },
  "1922": {
    year: "1922",
    title: "Formacao da URSS",
    body: "A Uniao das Republicas Socialistas Sovieticas consolidou institucionalmente o projeto revolucionario em um novo Estado multinacional."
  }
};

const verdictData = {
  inevitavel: {
    title: "Parecer: ruptura altamente provavel",
    body: "A tese da inevitabilidade se sustenta quando se observa a acumulacao de autocracia, pobreza rural, crise urbana e guerra. O regime tinha baixa capacidade de absorver pressoes."
  },
  evitavel: {
    title: "Parecer: havia alternativas politicas",
    body: "A revolucao poderia ter seguido outro caminho se reformas reais, saida negociada da guerra e distribuicao de terras tivessem ocorrido antes da radicalizacao."
  },
  complexa: {
    title: "Parecer recomendado: processo multicausal",
    body: "A melhor resposta para banca e multicausal: estruturas criaram a crise; guerra acelerou o colapso; organizacao politica e escolhas de lideranca definiram o resultado."
  }
};

let quizIndex = 0;
let quizScore = 0;
let quizLocked = false;

function q(selector, root = document) {
  return root.querySelector(selector);
}

function qa(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}

function animateIn(targets, options = {}) {
  if (!window.gsap) return;
  gsap.fromTo(
    targets,
    { autoAlpha: 0, y: 26, filter: "blur(8px)" },
    { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.72, ease: "power3.out", stagger: 0.055, ...options }
  );
}

function initReveal() {
  if (!window.Reveal) return;

  Reveal.initialize({
    hash: true,
    controls: true,
    progress: true,
    center: false,
    width: 1280,
    height: 720,
    margin: 0.045,
    transition: "fade",
    backgroundTransition: "fade",
    keyboard: true,
    plugins: window.RevealNotes ? [RevealNotes] : []
  });

  Reveal.on("ready", updateDeckState);
  Reveal.on("slidechanged", updateDeckState);
}

function updateDeckState() {
  const hasReveal = Boolean(window.Reveal?.getCurrentSlide);
  const current = hasReveal ? Reveal.getCurrentSlide() : q("section");
  const total = hasReveal ? Reveal.getTotalSlides() : qa("section").length;
  const index = hasReveal ? Reveal.getSlidePastCount() + 1 : 1;
  const progress = Math.max(8, Math.round((index / total) * 100));
  const title = current?.dataset.title || "Dossie";

  q("#hudSlide").textContent = String(index).padStart(2, "0");
  q("#hudTitle").textContent = title;
  q("#hudMeter").style.width = `${progress}%`;

  animateIn(qa("h1, h2, h3, p, li, article, button, .section-kicker, .eyebrow", current));

  if (window.gsap && current?.classList.contains("slide-cover")) {
    gsap.fromTo(".hero-bg", { scale: 1.08 }, { scale: 1.035, duration: 5, ease: "power2.out" });
  }
}

function initLoader() {
  window.addEventListener("load", () => {
    setTimeout(() => {
      q("#loader")?.classList.add("is-hidden");
      updateDeckState();
    }, 950);
  });
}

function openModal(data) {
  const modal = q("#infoModal");
  if (!modal || !data) return;
  q("#modalKicker").textContent = data.kicker;
  q("#modalTitle").textContent = data.title;
  q("#modalBody").textContent = data.body;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  animateIn([q(".info-modal", modal)], { y: 12, duration: .45 });
}

function initModal() {
  const modal = q("#infoModal");
  const closeModal = () => {
    modal?.classList.remove("is-open");
    modal?.setAttribute("aria-hidden", "true");
  };

  q(".modal-close", modal)?.addEventListener("click", closeModal);

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-modal]");
    if (!trigger) return;
    openModal(modalData[trigger.dataset.modal]);
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-action='open-briefing']")) {
      openModal({
        kicker: "Briefing rapido",
        title: "Pergunta-guia",
        body: "Como a combinacao entre autocracia, guerra, fome, demandas por terra e organizacao politica derrubou um imperio e abriu caminho para um novo Estado?"
      });
    }
  });
}

function initMap() {
  const brief = q("#mapBrief");
  if (!brief) return;

  document.addEventListener("click", (event) => {
    const point = event.target.closest("[data-map]");
    if (!point) return;
    const data = mapData[point.dataset.map];
    qa("[data-map]").forEach((item) => item.classList.remove("active"));
    point.classList.add("active");
    brief.innerHTML = `
      <span class="section-kicker">Ponto critico</span>
      <h3>${data.title}</h3>
      <p>${data.body}</p>
      <ul>${data.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
    `;
    animateIn(brief.children);
  });
}

function initPeople() {
  const file = q("#personFile");
  if (!file) return;

  document.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-person]");
    if (!tab) return;
    const data = personData[tab.dataset.person];
    qa("[data-person]").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    file.innerHTML = `
      <div class="person-portrait ${data.portrait}"></div>
      <div>
        <span class="section-kicker">Perfil politico</span>
        <h3>${data.title}</h3>
        <p>${data.body}</p>
        <dl><dt>Papel</dt><dd>${data.role}</dd><dt>Risco historico</dt><dd>${data.risk}</dd></dl>
      </div>
    `;
    animateIn(file.children);
  });
}

function initTimeline() {
  const timeline = q("#timeline");
  const file = q("#timelineFile");
  if (!timeline || !file) return;

  timeline.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-year]");
    if (!button) return;
    const data = timelineData[button.dataset.year];
    qa("button", timeline).forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    file.innerHTML = `<span>${data.year}</span><h3>${data.title}</h3><p>${data.body}</p>`;
    animateIn(file.children);
  });
}

function renderQuiz() {
  const questions = window.DOSSIE_QUIZ || [];
  const question = questions[quizIndex];
  const step = q("#quizStep");
  const score = q("#quizScore");
  const title = q("#quizQuestion");
  const options = q("#quizOptions");
  const feedback = q("#quizFeedback");
  const next = q("#quizNext");
  const progress = q("#quizProgress");

  progress.style.width = `${Math.min(100, (quizIndex / questions.length) * 100)}%`;

  if (!question) {
    title.textContent = "Relatorio final do interrogatorio";
    step.textContent = "Investigacao concluida";
    score.textContent = `Pontuacao: ${quizScore}/${questions.length}`;
    options.innerHTML = "";
    progress.style.width = "100%";
    feedback.textContent = quizScore >= 6
      ? "Nivel excelente: dominio suficiente para sustentar resposta oral com seguranca."
      : "Bom caminho. Reforce a relacao entre guerra, duplo poder e estrategia bolchevique.";
    next.textContent = "Reiniciar quiz";
    quizLocked = true;
    return;
  }

  quizLocked = false;
  step.textContent = `Pergunta ${quizIndex + 1}/${questions.length}`;
  score.textContent = `Pontuacao: ${quizScore}`;
  title.textContent = question.question;
  feedback.textContent = "";
  next.textContent = "Proxima evidencia";
  options.innerHTML = question.options
    .map((option, index) => `
      <button type="button" data-answer="${index}">
        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
        <span>${option}</span>
      </button>
    `)
    .join("");
  animateIn([title, ...qa("button", options)]);
}

function initQuiz() {
  const options = q("#quizOptions");
  const next = q("#quizNext");
  if (!options || !next) return;

  options.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-answer]");
    const question = (window.DOSSIE_QUIZ || [])[quizIndex];
    if (!button || !question || quizLocked) return;

    quizLocked = true;
    const selected = Number(button.dataset.answer);

    qa("button", options).forEach((item, index) => {
      item.disabled = true;
      if (index === question.answer) item.classList.add("correct");
    });

    if (selected === question.answer) {
      quizScore += 1;
      button.classList.add("correct");
      q("#quizFeedback").textContent = `Correto. ${question.dossier}`;
    } else {
      button.classList.add("wrong");
      q("#quizFeedback").textContent = `Incorreto. ${question.dossier}`;
    }

    q("#quizScore").textContent = `Pontuacao: ${quizScore}`;
  });

  next.addEventListener("click", () => {
    if (quizIndex >= (window.DOSSIE_QUIZ || []).length) {
      quizIndex = 0;
      quizScore = 0;
    } else if (quizLocked) {
      quizIndex += 1;
    }
    renderQuiz();
  });

  renderQuiz();
}

function initCourt() {
  const verdict = q("#verdictText");
  if (!verdict) return;

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-verdict]");
    if (!button) return;
    const data = verdictData[button.dataset.verdict];
    verdict.innerHTML = `<span class="section-kicker">${data.title}</span><p>${data.body}</p>`;
    animateIn(verdict.children);
  });
}

function initControls() {
  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "fullscreen") {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
    }
    if (action === "start-case" && window.Reveal) Reveal.slide(1);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "f") q("[data-action='fullscreen']")?.click();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initReveal();
  initModal();
  initMap();
  initPeople();
  initTimeline();
  initQuiz();
  initCourt();
  initControls();
});
