const WHATSAPP_NUMBER = "56934243435";
// Si la empresa confirma un correo, se puede añadir aquí y habilitar un segundo canal mailto.
const BUSINESS_EMAIL = "somosmasbienestar@gmail.com";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "✕" : "☰";
});
mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

document.querySelectorAll(".choose-service").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("masaje").value = button.dataset.service;
    document.getElementById("cotizar").scrollIntoView({behavior:"smooth"});
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const testimonialItems = [
  { name: "Experiencia de Don Matías", detail: "Quiromasaje · espalda media", code: "DXC_hZqugOC" },
  { name: "Experiencia de Johana", detail: "Quiromasaje", code: "DWzJXXrO_Qe" },
  { name: "Experiencia de Don Ignacio", detail: "Sobrecarga de trabajo", code: "DWPuO52uJ9c" },
  { name: "Experiencia de Don Tomás", detail: "Relajación física y mental", code: "DWG1fbiug0o" },
  { name: "Experiencia de Eric", detail: "Masaje descontracturante", code: "DTsJkvUjhsW" },
  { name: "Experiencia de Don Eduardo", detail: "Quiromasaje · regalo de bienestar", code: "DVOOV3jDngR" },
  { name: "Experiencia de María Arauco", detail: "Masaje de relajación · regalo sorpresa", code: "DVONT6djun6" },
  { name: "Experiencia de Marcela", detail: "Masaje de relajación en pareja · Padre Hurtado", code: "DTsKhHXjgwE" },
  { name: "Experiencia de Fernanda", detail: "Dos masajes a domicilio · Peñaflor", code: "DTdgZkIjs-H" },
  { name: "Experiencia de Karina y su esposo", detail: "Sesiones de masaje a domicilio", code: "DTG74qojgDb" },
  { name: "Jornada de bienestar para empresas", detail: "60 masajes localizados para un equipo de trabajo", code: "DS7oleKjsWH" },
  { name: "Experiencia de Catalina", detail: "Masaje con piedras calientes", code: "DRZqtr4Dv8b" },
  { name: "Recomendación de cliente", detail: "Comentario escrito compartido en Instagram", type: "text", quote: "Excelente servicio, 100% recomendado. Muy profesional, responsable y cercano." },
  { name: "Recomendación de cliente", detail: "Experiencia personal compartida en Instagram", type: "text", quote: "¡Súper recomendado! Muy profesional. Tengo fibromialgia y me alivió un montón el masaje." }
];

const testimonialFrame = document.getElementById("testimonialFrame");
if (testimonialFrame) {
  const testimonialName = document.getElementById("testimonialName");
  const testimonialDescription = document.getElementById("testimonialDescription");
  const testimonialOpen = document.getElementById("testimonialOpen");
  const testimonialCount = document.getElementById("testimonialCount");
  const dotsContainer = document.querySelector(".testimonial-selectors");
  const testimonialDots = [];
  const shuffledOrder = testimonialItems.map((_, index) => index).sort(() => Math.random() - 0.5);
  let rotationPosition = 0;
  const previousButton = document.getElementById("testimonialPrev");
  const nextButton = document.getElementById("testimonialNext");
  const pauseButton = document.getElementById("testimonialPause");
  const carousel = document.querySelector(".testimonial-carousel");
  let currentTestimonial = shuffledOrder[0];
  let rotationTimer;

  shuffledOrder.forEach((itemIndex, position) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "testimonial-dot";
    dot.dataset.testimonial = String(itemIndex);
    dot.textContent = String(position + 1);
    dot.setAttribute("aria-label", `Ver ${testimonialItems[itemIndex].name}`);
    dot.setAttribute("aria-pressed", "false");
    dotsContainer.appendChild(dot);
    testimonialDots.push(dot);
  });
  let paused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const showTestimonial = index => {
    currentTestimonial = (index + testimonialItems.length) % testimonialItems.length;
    const item = testimonialItems[currentTestimonial];
    const quoteCard = document.getElementById("testimonialQuoteCard");
    const quoteText = document.getElementById("testimonialQuote");
    if (item.type === "text") {
      testimonialFrame.hidden = true;
      quoteCard.hidden = false;
      quoteText.textContent = item.quote;
      testimonialOpen.hidden = true;
    } else {
      testimonialFrame.hidden = false;
      quoteCard.hidden = true;
      testimonialFrame.src = `https://www.instagram.com/reel/${item.code}/embed`;
      testimonialOpen.href = `https://www.instagram.com/somosmasbienestar/reel/${item.code}/`;
      testimonialOpen.hidden = false;
    }
    testimonialName.textContent = item.name;
    testimonialDescription.textContent = item.detail;
    testimonialCount.textContent = `${shuffledOrder.indexOf(currentTestimonial) + 1} / ${testimonialItems.length}`;
    testimonialDots.forEach((dot) => {
      const active = Number(dot.dataset.testimonial) === currentTestimonial;
      dot.classList.toggle("active", active);
      dot.setAttribute("aria-pressed", String(active));
    });
  };

  const stopRotation = () => window.clearInterval(rotationTimer);
  const nextRandomTestimonial = () => {
    rotationPosition = (rotationPosition + 1) % shuffledOrder.length;
    showTestimonial(shuffledOrder[rotationPosition]);
  };

  const startRotation = () => {
    stopRotation();
    if (!paused) rotationTimer = window.setInterval(nextRandomTestimonial, 7000);
  };

  previousButton.addEventListener("click", () => { rotationPosition = (rotationPosition - 1 + shuffledOrder.length) % shuffledOrder.length; showTestimonial(shuffledOrder[rotationPosition]); startRotation(); });
  nextButton.addEventListener("click", () => { rotationPosition = (rotationPosition + 1) % shuffledOrder.length; showTestimonial(shuffledOrder[rotationPosition]); startRotation(); });
  testimonialDots.forEach(dot => dot.addEventListener("click", () => {
    rotationPosition = shuffledOrder.indexOf(Number(dot.dataset.testimonial));
    showTestimonial(Number(dot.dataset.testimonial));
    startRotation();
  }));
  pauseButton.addEventListener("click", () => {
    paused = !paused;
    pauseButton.textContent = paused ? "▶" : "Ⅱ";
    pauseButton.setAttribute("aria-label", paused ? "Reanudar rotación" : "Pausar rotación");
    pauseButton.setAttribute("aria-pressed", String(paused));
    startRotation();
  });
  carousel.addEventListener("mouseenter", stopRotation);
  carousel.addEventListener("mouseleave", startRotation);
  carousel.addEventListener("focusin", stopRotation);
  carousel.addEventListener("focusout", event => {
    if (!carousel.contains(event.relatedTarget)) startRotation();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopRotation();
    else startRotation();
  });
  showTestimonial(currentTestimonial);
  startRotation();
}


document.getElementById("quoteForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const value = key => (data.get(key) || "").toString().trim();
  const lines = [
    "Hola, Somos Más Bienestar. Quiero solicitar una cotización:",
    "",
    `Nombre: ${value("nombre")}`,
    `Teléfono: ${value("telefono")}`,
    `Masaje: ${value("masaje")}`,
    `Personas: ${value("personas")}`,
    `Duración: ${value("duracion")}`,
    `Comuna: ${value("comuna")}`,
    `Fecha preferida: ${value("fecha") || "Por coordinar"}`,
    `Objetivo: ${value("objetivo") || "Por conversar"}`,
    `Información importante: ${value("antecedentes") || "No indicada"}`,
    "",
    "Quedo atento/a a la cotización y disponibilidad. ¡Gracias!"
  ];
  const message = encodeURIComponent(lines.join("\n"));
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  document.getElementById("formStatus").textContent = "Abriendo WhatsApp con tu solicitud preparada. Revisa el mensaje y presiona Enviar. También puedes enviar tu consulta por correo.";
  window.open(url, "_blank", "noopener");
});
