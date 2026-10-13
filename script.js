const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      menuToggle.textContent = "☰";
    });
  });
}

let cartCount = 0;
let cartTotal = 0;
const cartCountElement = document.getElementById("cart-count");
const cartTotalElement = document.getElementById("cart-total");

function formatEuro(amount) {
  return amount.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
}

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const price = Number(button.dataset.price);
    if (!Number.isFinite(price) || price <= 0) return;

    cartCount += 1;
    cartTotal += price;
    cartCountElement.textContent = `${cartCount} ${cartCount === 1 ? "botella" : "botellas"}`;
    cartTotalElement.textContent = formatEuro(cartTotal);

    const originalText = button.innerHTML;
    button.innerHTML = "Añadido a la cesta <span>✓</span>";
    button.setAttribute("aria-live", "polite");
    window.setTimeout(() => { button.innerHTML = originalText; }, 1200);
  });
});

document.getElementById("checkout-button")?.addEventListener("click", () => {
  if (cartCount === 0) {
    alert("Tu cesta está vacía. Añade algún vino antes de continuar.");
    return;
  }
  alert(`Tu cesta contiene ${cartCount} ${cartCount === 1 ? "botella" : "botellas"} por un total de ${formatEuro(cartTotal)}. Esta tienda es una demostración: aún falta conectar un sistema de pago seguro.`);
});

document.getElementById("newsletter-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = document.getElementById("newsletter-message");
  message.textContent = "¡Gracias! Este formulario es una demo y todavía no envía ni almacena suscripciones.";
  document.getElementById("email").value = "";
});

document.getElementById("year").textContent = new Date().getFullYear();
