/* =========================================================
   PORTFÓLIO - ALICE CAROLINA
   Aqui ficam as funcionalidades do site:
   1. Ano automático no rodapé
   2. Saudação dinâmica
   3. Menu hambúrguer
   4. Modo claro/escuro
   ========================================================= */


/* ---------- 1. ANO AUTOMÁTICO ---------- */
// Pega o ano atual do computador e coloca no rodapé
const spanAno = document.getElementById("ano");
spanAno.textContent = new Date().getFullYear();


/* ---------- 2. SAUDAÇÃO DINÂMICA ---------- */
// Muda o texto de acordo com a hora do dia
const saudacao = document.getElementById("saudacao");
const hora = new Date().getHours(); // número de 0 a 23

if (hora >= 5 && hora < 12) {
  saudacao.textContent = "Bom dia!";
} else if (hora >= 12 && hora < 18) {
  saudacao.textContent = "Boa tarde!";
} else {
  saudacao.textContent = "Boa noite!";
}


/* ---------- 3. MENU HAMBÚRGUER ---------- */
const botaoMenu = document.getElementById("botaoMenu");
const menu = document.getElementById("menu");

// Abre ou fecha o menu
function alternarMenu() {
  // toggle: se a classe existe, tira; se não existe, coloca
  const aberto = menu.classList.toggle("aberto");
  botaoMenu.classList.toggle("aberto", aberto);

  // Atualiza os atributos de acessibilidade (leitores de tela)
  botaoMenu.setAttribute("aria-expanded", aberto);
  botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
}

// Fecha o menu (usado ao clicar em um link ou apertar Esc)
function fecharMenu() {
  menu.classList.remove("aberto");
  botaoMenu.classList.remove("aberto");
  botaoMenu.setAttribute("aria-expanded", "false");
  botaoMenu.setAttribute("aria-label", "Abrir menu");
}

botaoMenu.addEventListener("click", alternarMenu);

// Ao clicar em um link do menu, ele fecha sozinho
menu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", fecharMenu);
});

// Tecla Esc fecha o menu e devolve o foco para o botão
document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape" && menu.classList.contains("aberto")) {
    fecharMenu();
    botaoMenu.focus();
  }
});


/* ---------- 4. MODO CLARO / ESCURO ---------- */
const botaoTema = document.getElementById("botaoTema");
const iconeTema = document.getElementById("iconeTema");
const html = document.documentElement; // a tag <html>

// Aplica o tema na página e atualiza o botão
function aplicarTema(tema) {
  if (tema === "escuro") {
    html.setAttribute("data-tema", "escuro");
    iconeTema.textContent = "☀️";
    botaoTema.setAttribute("aria-label", "Ativar modo claro");
  } else {
    html.removeAttribute("data-tema");
    iconeTema.textContent = "🌙";
    botaoTema.setAttribute("aria-label", "Ativar modo escuro");
  }
}

// Tenta ler o tema que a pessoa escolheu da última vez
let temaSalvo = null;
try {
  temaSalvo = localStorage.getItem("tema");
} catch (erro) {
  // se o navegador bloquear o armazenamento, o site continua funcionando
}

// Se não tem tema salvo, usa o que o computador/celular da pessoa prefere
if (temaSalvo === null) {
  const preferiuEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
  temaSalvo = preferiuEscuro ? "escuro" : "claro";
}

aplicarTema(temaSalvo);

// Ao clicar no botão, troca o tema e salva a escolha
botaoTema.addEventListener("click", function () {
  const novoTema = html.getAttribute("data-tema") === "escuro" ? "claro" : "escuro";
  aplicarTema(novoTema);

  try {
    localStorage.setItem("tema", novoTema);
  } catch (erro) {
    // sem problema se não conseguir salvar
  }
});
