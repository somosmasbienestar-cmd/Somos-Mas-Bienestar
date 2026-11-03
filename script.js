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
  { name: "Experiencia de Eric", detail: "Masaje descontracturante", code: "DTsJkvUjhsW" }
];

const testimonialFrame = document.getElementById("testimonialFrame");
if (testimonialFrame) {
  const testimonialName = document.getElementById("testimonialName");
  const testimonialDescription = document.getElementById("testimonialDescription");
  const testimonialOpen = document.getElementById("testimonialOpen");
  const testimonialCount = document.getElementById("testimonialCount");
  const testimonialDots = [...document.querySelectorAll(".testimonial-dot")];
  const previousButton = document.getElementById("testimonialPrev");
  const nextButton = document.getElementById("testimonialNext");
  const pauseButton = document.getElementById("testimonialPause");
  const carousel = document.querySelector(".testimonial-carousel");
  let currentTestimonial = 0;
  let rotationTimer;
  let paused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const showTestimonial = index => {
    currentTestimonial = (index + testimonialItems.length) % testimonialItems.length;
    const item = testimonialItems[currentTestimonial];
    testimonialFrame.src = `https://www.instagram.com/reel/${item.code}/embed`;
    testimonialName.textContent = item.name;
    testimonialDescription.textContent = item.detail;
    testimonialOpen.href = `https://www.instagram.com/somosmasbienestar/reel/${item.code}/`;
    testimonialCount.textContent = `${currentTestimonial + 1} / ${testimonialItems.length}`;
    testimonialDots.forEach((dot, i) => {
      const active = i === currentTestimonial;
      dot.classList.toggle("active", active);
      dot.setAttribute("aria-pressed", String(active));
    });
  };

  const stopRotation = () => window.clearInterval(rotationTimer);
  const startRotation = () => {
    stopRotation();
    if (!paused) rotationTimer = window.setInterval(() => showTestimonial(currentTestimonial + 1), 7000);
  };

  previousButton.addEventListener("click", () => { showTestimonial(currentTestimonial - 1); startRotation(); });
  nextButton.addEventListener("click", () => { showTestimonial(currentTestimonial + 1); startRotation(); });
  testimonialDots.forEach(dot => dot.addEventListener("click", () => {
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
