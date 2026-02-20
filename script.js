/* =========================================
   0. LIMPEZA / CONFIG
   ========================================= */
// (REMOVIDO) Linha solta: +55 71 99260-2698  -> isso quebrava seu JS se colado no arquivo.

/* =========================================
   1. CONFIGURAÇÃO GERAL
   ========================================= */
// ✅ Apenas números (sem +, sem espaços)
const whatsappNumber = "552231900476";

// Mensagem padrão
const defaultMessage = "Olá, gostaria de iniciar meu atendimento.";

// Monta URL padrão
function buildWhatsUrl(text = defaultMessage) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

const whatsappUrl = buildWhatsUrl();

/* =========================================
   2. LOADER & INICIALIZAÇÃO
   ========================================= */
let loaderHidden = false;

function hideLoader() {
  if (loaderHidden) return;
  loaderHidden = true;

  const preloader = document.getElementById("preloader");
  if (!preloader) {
    safeInit();
    return;
  }

  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
    safeInit();
  }, 450);
}

function safeInit() {
  checkCookies();
  initScrollReveal();
  setupWhatsappLinks();
  initBackToTop();
  initSmoothAnchors();
  initSlider(); // inicia e pré-carrega
  setYear();
}

window.addEventListener("load", hideLoader);
setTimeout(hideLoader, 2500);

/* =========================================
   3. CONFIGURAÇÃO DE LINKS WHATSAPP
   ========================================= */
function setupWhatsappLinks() {
  // Seta href/target para todos
  document.querySelectorAll(".whatsapp-link").forEach((link) => {
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  // “À prova de falha”: se algum link não tiver href por qualquer motivo, resolvemos no clique
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a.whatsapp-link");
    if (!a) return;

    if (!a.href || a.getAttribute("href") === "#") {
      a.href = whatsappUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
  });
}

/* =========================================
   4. SLIDER (HERO)
   ========================================= */
const slides = [
  {
    tag: "Campanha de Vacinação",
    title: "Proteção para <br><span class='text-brandBlue-800'>toda a família.</span>",
    desc: "Vacine-se contra a gripe e proteja quem você ama. Confira os postos de atendimento.",
    img: "BANNER_1_AQUI.jpg",
    btnText: "Agendar Agora",
  },
  {
    // ✅ Troquei “Telemedicina GEAP” por algo neutro
    tag: "Telemedicina",
    title: "Médico online <br><span class='text-brandBlue-800'>24h por dia.</span>",
    desc: "Atendimento rápido sem sair de casa. Tecnologia e segurança para sua saúde.",
    img: "BANNER_2_AQUI.jpg",
    btnText: "Acessar Telemedicina",
  },
  {
    tag: "Planos e Benefícios",
    title: "Cuidado que <br><span class='text-brandBlue-800'>cabe no bolso.</span>",
    desc: "Conheça as opções disponíveis e tire dúvidas com nosso atendimento.",
    img: "BANNER_3_AQUI.jpg",
    btnText: "Consultar Opções",
  },
];

let currentSlide = 0;
let sliderTimer = null;

function preloadImages() {
  slides.forEach((s) => {
    const img = new Image();
    img.src = s.img;
  });
}

function initSlider() {
  const bgEl = document.getElementById("hero-bg");
  if (!bgEl) return;

  preloadImages();
  changeSlide(0, true);

  // pausa quando a aba fica oculta (economiza CPU)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopSlider();
    else startSlider();
  });

  startSlider();
}

function startSlider() {
  stopSlider();
  sliderTimer = setInterval(() => {
    const next = (currentSlide + 1) % slides.length;
    changeSlide(next);
  }, 6000);
}

function stopSlider() {
  if (sliderTimer) clearInterval(sliderTimer);
  sliderTimer = null;
}

function changeSlide(index, instant = false) {
  currentSlide = index;
  const slide = slides[index];

  const tagEl = document.getElementById("hero-tag");
  const titleEl = document.getElementById("hero-title");
  const descEl = document.getElementById("hero-desc");
  const btnEl = document.getElementById("hero-btn");
  const bgEl = document.getElementById("hero-bg");

  if (!tagEl || !titleEl || !descEl || !btnEl || !bgEl) return;

  const apply = () => {
    tagEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-brandRed-600 animate-pulse"></span> ${slide.tag}`;
    titleEl.innerHTML = slide.title;
    descEl.textContent = slide.desc;
    btnEl.textContent = slide.btnText;

    btnEl.href = whatsappUrl;
    btnEl.target = "_blank";
    btnEl.rel = "noopener noreferrer";

    bgEl.style.backgroundImage = `url('${slide.img}')`;
  };

  if (instant) {
    apply();
  } else {
    titleEl.style.opacity = "0";
    descEl.style.opacity = "0";
    setTimeout(() => {
      apply();
      titleEl.style.opacity = "1";
      descEl.style.opacity = "1";
    }, 200);
  }

  document.querySelectorAll(".slider-dot").forEach((dot, idx) => {
    if (idx === index) {
      dot.classList.remove("bg-brandBlue-200");
      dot.classList.add("bg-brandBlue-800", "active");
      dot.setAttribute("aria-current", "true");
    } else {
      dot.classList.add("bg-brandBlue-200");
      dot.classList.remove("bg-brandBlue-800", "active");
      dot.removeAttribute("aria-current");
    }
  });
}

/* =========================================
   5. ACESSIBILIDADE & UTILS
   ========================================= */
function mudarFonte(acao) {
  const html = document.documentElement;
  const current = parseInt(window.getComputedStyle(html).fontSize, 10);
  let next = current;

  if (acao === "aumentar" && current < 22) next = current + 2;
  if (acao === "diminuir" && current > 12) next = current - 2;

  html.style.fontSize = `${next}px`;
}

function toggleContraste() {
  document.documentElement.classList.toggle("dark");
}

function setYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerOffset = 96;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    });
  });
}

function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    const show = document.documentElement.scrollTop > 300;
    if (show) {
      btn.classList.add("show");
      btn.classList.remove("opacity-0", "pointer-events-none");
      btn.classList.add("opacity-100");
    } else {
      btn.classList.remove("show");
      btn.classList.add("opacity-0", "pointer-events-none");
      btn.classList.remove("opacity-100");
    }
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================================
   6. DADOS SERVIÇOS
   ========================================= */
const servicos = [
  { titulo: "2ª Via de Boleto", desc: "Emita seu boleto atualizado.", icone: '<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />', destaque: false },
  { titulo: "Guia Médico", desc: "Encontre médicos próximos.", icone: '<path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />', destaque: true },
  { titulo: "Carteirinha Virtual", desc: "Sua identificação no celular.", icone: '<path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />', destaque: false },
];

function renderServicos() {
  const container = document.getElementById("servicos-container");
  if (!container) return;

  const html = servicos
    .map((item) => {
      const border = item.destaque ? "border-brandRed-600" : "border-slate-100";
      const iconColor = item.destaque ? "text-brandRed-600" : "text-brandBlue-600";

      return `
        <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer"
           class="block bg-white rounded-2xl p-8 border ${border} shadow-card hover:shadow-premium transition hover:-translate-y-1 cursor-pointer group reveal">
          <div class="w-12 h-12 rounded-xl bg-slate-50 ${iconColor} flex items-center justify-center mb-4" aria-hidden="true">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              ${item.icone}
            </svg>
          </div>
          <h3 class="text-lg font-bold text-slate-800">${item.titulo}</h3>
          <p class="text-sm text-slate-500 mt-2">${item.desc}</p>
        </a>
      `;
    })
    .join("");

  container.innerHTML = html;
}

/* =========================================
   7. MODAL LOGIN & COOKIES
   ========================================= */
function toggleModal() {
  const modal = document.getElementById("login-modal");
  if (!modal) return;
  modal.classList.toggle("hidden");

  // foco no CPF quando abrir
  if (!modal.classList.contains("hidden")) {
    setTimeout(() => document.getElementById("loginCpf")?.focus(), 50);
  }
}

function maskCPF(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const parts = [];
  parts.push(digits.slice(0, 3));
  if (digits.length > 3) parts.push(digits.slice(3, 6));
  if (digits.length > 6) parts.push(digits.slice(6, 9));
  const last = digits.slice(9, 11);

  let out = parts.join(".");
  if (digits.length > 9) out += `-${last}`;
  return out;
}

function initCPFMask() {
  const cpfInput = document.getElementById("loginCpf");
  if (!cpfInput) return;

  cpfInput.addEventListener("input", () => {
    cpfInput.value = maskCPF(cpfInput.value);
  });
}

function handleLogin(e) {
  e.preventDefault();

  const btn = document.getElementById("loginBtn");
  const cpfInput = document.getElementById("loginCpf");
  if (!btn || !cpfInput) return;

  const cpfDigits = cpfInput.value.replace(/\D/g, "");
  if (cpfDigits.length !== 11) {
    cpfInput.focus();
    cpfInput.classList.add("ring-2", "ring-brandRed-600");
    setTimeout(() => cpfInput.classList.remove("ring-2", "ring-brandRed-600"), 1200);
    return;
  }

  const original = btn.innerHTML;
  btn.innerHTML = `
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Validando...
  `;
  btn.disabled = true;

  setTimeout(() => {
    const text = `Olá, gostaria de ser atendido. Meu CPF é: ${cpfInput.value}`;
    window.open(buildWhatsUrl(text), "_blank", "noopener,noreferrer");

    toggleModal();
    btn.innerHTML = original;
    btn.disabled = false;
    cpfInput.value = "";
  }, 900);
}

function checkCookies() {
  if (!localStorage.getItem("cookiesAccepted")) {
    setTimeout(() => {
      const banner = document.getElementById("cookie-banner");
      if (!banner) return;

      // Mostra (remove o translate-y-full)
      banner.classList.remove("translate-y-full");
      banner.classList.add("translate-y-0");
    }, 900);
  }
}

function acceptCookies(accepted) {
  const banner = document.getElementById("cookie-banner");
  if (banner) {
    banner.classList.add("translate-y-full");
    banner.classList.remove("translate-y-0");
  }
  if (accepted) localStorage.setItem("cookiesAccepted", "true");
}

/* =========================================
   8. SCROLL REVEAL
   ========================================= */
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach((el) => observer.observe(el));
}

/* =========================================
   9. BOOT
   ========================================= */
renderServicos();
initCPFMask();

// Exporta funções usadas pelo HTML inline
window.mudarFonte = mudarFonte;
window.toggleContraste = toggleContraste;
window.toggleModal = toggleModal;
window.handleLogin = handleLogin;
window.scrollToTop = scrollToTop;
window.changeSlide = changeSlide;
window.acceptCookies = acceptCookies;

