const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

/* =========================================================
   TEMA CLARO / ESCURO
   - aplica antes da renderização por script no <head>
   - persiste com localStorage quando disponível
   - acompanha prefers-color-scheme enquanto não houver escolha manual
========================================================= */
const THEME_KEY = "logic-theme";
const themeToggle = $("#themeToggle");
const themeMedia = window.matchMedia?.("(prefers-color-scheme: dark)");

function readTheme() {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch (_) {
    return null;
  }
}

function persistTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (_) {
    // O tema continua funcional mesmo se o navegador bloquear localStorage.
  }
}

function applyTheme(theme, persist = false) {
  const normalized = theme === "dark" ? "dark" : "light";
  const isDark = normalized === "dark";

  document.documentElement.dataset.theme = normalized;
  document.documentElement.style.colorScheme = normalized;

  if (persist) persistTheme(normalized);

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Ativar modo claro" : "Ativar modo escuro");
    themeToggle.title = isDark ? "Ativar modo claro" : "Ativar modo escuro";

    const icon = $(".theme-toggle__icon", themeToggle);
    const label = $(".theme-toggle__text", themeToggle);
    if (icon) icon.textContent = isDark ? "☀️" : "🌙";
    if (label) label.textContent = isDark ? "Claro" : "Escuro";
  }
}

applyTheme(document.documentElement.dataset.theme || readTheme() || (themeMedia?.matches ? "dark" : "light"));

themeToggle?.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next, true);
});

themeMedia?.addEventListener?.("change", event => {
  if (!readTheme()) applyTheme(event.matches ? "dark" : "light");
});

/* =========================================================
   MENU MOBILE
========================================================= */
const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");

function setMenu(open) {
  if (!mainNav || !menuToggle) return;
  mainNav.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}

menuToggle?.addEventListener("click", event => {
  event.stopPropagation();
  setMenu(!mainNav.classList.contains("is-open"));
});

$$('.nav a').forEach(link => link.addEventListener('click', () => setMenu(false)));

document.addEventListener("keydown", event => {
  if (event.key === "Escape") setMenu(false);
});

document.addEventListener("click", event => {
  if (!mainNav?.classList.contains("is-open")) return;
  if (!mainNav.contains(event.target) && !menuToggle?.contains(event.target)) setMenu(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) setMenu(false);
});

/* =========================================================
   PROGRESSO DE LEITURA
========================================================= */
const readingProgress = $("#readingProgress");

function updateReadingProgress() {
  if (!readingProgress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? (window.scrollY / max) * 100 : 0;
  readingProgress.style.width = `${Math.max(0, Math.min(100, value))}%`;
}

window.addEventListener("scroll", updateReadingProgress, { passive: true });
window.addEventListener("resize", updateReadingProgress);
updateReadingProgress();

/* =========================================================
   TOAST + COPIAR CÓDIGO COM FALLBACK PARA file://
========================================================= */
const toast = $("#toast");
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1700);
}

async function copyText(text) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  textarea.remove();
  if (!ok) throw new Error("copy-failed");
}

$$('[data-copy]').forEach(button => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copy);
    if (!target) return;
    try {
      await copyText(target.innerText);
      showToast("Código copiado!");
    } catch (_) {
      showToast("Selecione o código e copie manualmente.");
    }
  });
});

/* =========================================================
   SIMULADOR DE LISTA
========================================================= */
const productInput = $("#productInput");
const addProductButton = $("#addProduct");
const removeProductButton = $("#removeProduct");
const clearProductsButton = $("#clearProducts");
const listVisual = $("#listVisual");
const listLiveCode = $("#listLiveCode");
const products = ["Caneta", "Caderno", "Borracha"];

function escapePythonString(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function renderProductList() {
  if (!listVisual || !listLiveCode) return;

  if (products.length === 0) {
    listVisual.innerHTML = '<div class="empty-state">A lista está vazia. Em Python: <code>produtos = []</code></div>';
  } else {
    listVisual.innerHTML = products.map((product, index) => `
      <div class="list-item">
        <span class="list-index">${index}</span>
        <strong>${product.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]))}</strong>
      </div>
    `).join("");
  }

  const pythonItems = products.map(item => `"${escapePythonString(item)}"`).join(", ");
  listLiveCode.textContent = `produtos = [${pythonItems}]`;
}

function addProduct() {
  if (!productInput) return;
  const value = productInput.value.trim();
  if (!value) {
    showToast("Digite um produto primeiro.");
    productInput.focus();
    return;
  }
  products.push(value);
  productInput.value = "";
  renderProductList();
  productInput.focus();
}

addProductButton?.addEventListener("click", addProduct);
productInput?.addEventListener("keydown", event => {
  if (event.key === "Enter") addProduct();
});
removeProductButton?.addEventListener("click", () => {
  if (products.length === 0) return showToast("A lista já está vazia.");
  products.pop();
  renderProductList();
});
clearProductsButton?.addEventListener("click", () => {
  products.splice(0, products.length);
  renderProductList();
});
renderProductList();

/* =========================================================
   SIMULADOR DE CLASSIFICAÇÃO
========================================================= */
const averageInput = $("#averageInput");
const classifyButton = $("#classifyAverage");
const classificationResult = $("#classificationResult");

function classifyAverage() {
  if (!averageInput || !classificationResult) return;
  const average = Number(averageInput.value);

  if (!Number.isFinite(average) || average < 0) {
    classificationResult.removeAttribute("data-level");
    classificationResult.innerHTML = '<small>Valor inválido</small><strong>—</strong><span>Informe uma média maior ou igual a zero.</span>';
    return;
  }

  let level;
  let rule;
  let key;

  if (average >= 30) {
    level = "Alto";
    rule = "média ≥ 30";
    key = "alto";
  } else if (average >= 10) {
    level = "Médio";
    rule = "média ≥ 10 e < 30";
    key = "medio";
  } else {
    level = "Baixo";
    rule = "média < 10";
    key = "baixo";
  }

  classificationResult.dataset.level = key;
  classificationResult.innerHTML = `<small>Média ${average.toFixed(1)}</small><strong>${level}</strong><span>Regra aplicada: ${rule}</span>`;
}

classifyButton?.addEventListener("click", classifyAverage);
averageInput?.addEventListener("keydown", event => {
  if (event.key === "Enter") classifyAverage();
});
classifyAverage();

/* =========================================================
   SIMULADOR DE RANKING
========================================================= */
const rankingList = $("#rankingList");
const sortRankingButton = $("#sortRanking");
const initialRanking = [
  ["Caderno", 14.0, "Médio"],
  ["Mochila", 40.0, "Alto"],
  ["Borracha", 4.5, "Baixo"],
  ["Caneta", 20.0, "Médio"]
];
let rankingData = initialRanking.map(item => [...item]);
let rankingSorted = false;

function renderRanking() {
  if (!rankingList) return;
  rankingList.innerHTML = rankingData.map((item, index) => `
    <li>
      <span class="ranking-position">${rankingSorted ? index + 1 : "•"}</span>
      <strong>${item[0]}</strong>
      <span class="ranking-score">${item[1].toFixed(1)}</span>
      <span class="ranking-level">${item[2]}</span>
    </li>
  `).join("");
  if (sortRankingButton) sortRankingButton.textContent = rankingSorted ? "Restaurar ordem" : "Ordenar ranking";
}

sortRankingButton?.addEventListener("click", () => {
  if (rankingSorted) {
    rankingData = initialRanking.map(item => [...item]);
    rankingSorted = false;
  } else {
    rankingData = [...rankingData].sort((a, b) => b[1] - a[1]);
    rankingSorted = true;
  }
  renderRanking();
});
renderRanking();

/* =========================================================
   QUIZ
========================================================= */
const quizData = [
  {
    question: "1. Qual é a principal função de uma lista em Python?",
    options: ["Guardar vários valores sob um único nome.", "Executar apenas cálculos matemáticos.", "Salvar dados permanentemente em arquivo.", "Substituir todas as estruturas condicionais."],
    answer: 0,
    explanation: "Uma lista reúne vários elementos em uma mesma estrutura e pode crescer durante a execução do programa."
  },
  {
    question: "2. Qual é o índice do primeiro elemento de uma lista Python?",
    options: ["1", "-1", "0", "Depende do tamanho da lista."],
    answer: 2,
    explanation: "Em Python, a contagem de índices começa em 0."
  },
  {
    question: "3. O que produtos.append(\"Caneta\") faz?",
    options: ["Apaga a lista.", "Adiciona 'Caneta' ao final da lista.", "Ordena a lista.", "Cria um arquivo chamado Caneta."],
    answer: 1,
    explanation: "append() adiciona um novo elemento ao final de uma lista."
  },
  {
    question: "4. Para qual operação o for é especialmente útil em um cadastro?",
    options: ["Percorrer vários itens da lista.", "Fechar o programa.", "Criar o Python.", "Transformar texto em arquivo automaticamente."],
    answer: 0,
    explanation: "O for percorre os elementos, o que permite listar, consultar e processar itens."
  },
  {
    question: "5. O que acontece com uma lista mantida apenas na memória quando o programa é encerrado?",
    options: ["Ela é enviada para a internet.", "Ela vira um arquivo automaticamente.", "Os dados são perdidos se não forem salvos.", "Nada; a lista fica permanente."],
    answer: 2,
    explanation: "Os materiais destacam que dados em memória existem apenas durante a execução, salvo quando são gravados em arquivo."
  },
  {
    question: "6. Calcular a média e classificar o resultado são...",
    options: ["A mesma operação.", "Etapas diferentes do algoritmo.", "Comandos exclusivos de arquivos.", "Operações que dispensam condicionais."],
    answer: 1,
    explanation: "Primeiro o programa calcula um valor; depois compara esse valor com critérios de classificação."
  },
  {
    question: "7. Com as regras da aula, uma média igual a 24 é classificada como...",
    options: ["Alto", "Médio", "Baixo", "Sem histórico"],
    answer: 1,
    explanation: "Médias a partir de 10 e abaixo de 30 ficam na faixa Média."
  },
  {
    question: "8. Por que organizar a lógica em funções?",
    options: ["Para evitar qualquer teste.", "Para reaproveitar tarefas e separar responsabilidades.", "Para remover todas as listas.", "Para impedir o uso de return."],
    answer: 1,
    explanation: "Funções concentram tarefas em um único lugar e permitem reutilizar a lógica em diferentes produtos."
  },
  {
    question: "9. No ranking, o que item[1] representa no exemplo usado?",
    options: ["O nome do produto.", "A posição do ranking.", "A média do produto.", "O arquivo ranking.txt."],
    answer: 2,
    explanation: "Cada item é organizado como [produto, média, desempenho], portanto a posição 1 contém a média."
  },
  {
    question: "10. Para que serve reverse=True na ordenação do ranking?",
    options: ["Colocar as maiores médias primeiro.", "Apagar resultados repetidos.", "Converter a lista em texto.", "Trocar nomes por índices."],
    answer: 0,
    explanation: "Na ordenação crescente padrão os menores vêm antes; reverse=True inverte a ordem e coloca os maiores primeiro."
  }
];

const quizList = $("#quizList");
const scoreValue = $("#scoreValue");
const scoreTotal = $("#scoreTotal");
let quizScore = 0;

function renderQuiz() {
  if (!quizList || !scoreValue || !scoreTotal) return;
  quizScore = 0;
  scoreValue.textContent = "0";
  scoreTotal.textContent = String(quizData.length);

  quizList.innerHTML = quizData.map((item, index) => `
    <article class="quiz-question" data-question="${index}">
      <h3>${item.question}</h3>
      <div class="quiz-options">
        ${item.options.map((option, optionIndex) => `<button class="quiz-option" type="button" data-option="${optionIndex}">${option}</button>`).join("")}
      </div>
      <p class="quiz-feedback" aria-live="polite"></p>
    </article>
  `).join("");

  $$(".quiz-question").forEach(card => {
    const questionIndex = Number(card.dataset.question);
    $$(".quiz-option", card).forEach(button => {
      button.addEventListener("click", () => answerQuestion(card, questionIndex, button));
    });
  });
}

function answerQuestion(card, questionIndex, selectedButton) {
  if (card.dataset.answered === "true") return;
  const item = quizData[questionIndex];
  const selected = Number(selectedButton.dataset.option);
  const buttons = $$(".quiz-option", card);
  const feedback = $(".quiz-feedback", card);
  const correct = selected === item.answer;

  card.dataset.answered = "true";
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.answer) button.classList.add("correct");
  });

  if (correct) {
    quizScore += 1;
    scoreValue.textContent = String(quizScore);
  } else {
    selectedButton.classList.add("wrong");
  }

  feedback.textContent = `${correct ? "✓ Correto. " : "✗ Revise. "}${item.explanation}`;
  feedback.classList.add("is-visible");
}

$("#resetQuiz")?.addEventListener("click", renderQuiz);
renderQuiz();
