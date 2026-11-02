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
