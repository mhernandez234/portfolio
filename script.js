// Animación simple al hacer scroll
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "all 0.6s ease-out";
  observer.observe(card);
});

console.log("Portfolio de Marcos Hernández cargado correctamente.");

// Funcion del carrusel
const carousels = document.querySelectorAll(".carousel-container");

carousels.forEach((carousel) => {
  const slide = carousel.querySelector(".carousel-slide");
  const images = carousel.querySelectorAll(".carousel-slide img");
  const prevBtn = carousel.querySelector(".prev-btn");
  const nextBtn = carousel.querySelector(".next-btn");

  let counter = 0;

  function updateCarousel() {
    // Usamos item(0) o el índice actual para asegurar que el tamaño sea correcto
    const size = images[0].clientWidth;
    slide.style.transform = "translateX(" + -size * counter + "px)";
  }

  nextBtn.addEventListener("click", () => {
    if (counter >= images.length - 1) {
      counter = 0;
    } else {
      counter++;
    }
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    if (counter <= 0) {
      counter = images.length - 1;
    } else {
      counter--;
    }
    updateCarousel();
  });

  // Ajustar el carrusel cuando se cambia el tamaño de la ventana
  window.addEventListener("resize", updateCarousel);
});

// --- Animación de entrada (Intersection Observer) ---
const obsOptions = { threshold: 0.1 };

const obs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, obsOptions);

document.querySelectorAll(".card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "all 0.6s ease-out";
  obs.observe(card);
});

//Formulario de contacto
const form = document.getElementById("my-form");
const status = document.getElementById("status");

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const subjectInput = document.getElementById("email-subject");

  // Guardamos el valor original para no acumular fechas si el usuario reintenta
  const baseSubject = "Contacto desde Portfolio";

  // Creamos una marca de tiempo única (Ej: 24/2/2026, 14:30:05)
  const timestamp = new Date().toLocaleString();

  // Actualizamos el valor del input oculto antes de enviarlo
  subjectInput.value = `${baseSubject} - ID: ${timestamp}`;

  const data = new FormData(form);
  const button = form.querySelector(".btn-contact");
  const status = document.getElementById("status");

  button.innerText = "Enviando...";
  button.disabled = true;

  fetch(form.action, {
    method: form.method,
    body: data,
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML = "¡Mensaje enviado con éxito!";
        form.reset();
        // Restauramos el asunto base para el siguiente mensaje
        subjectInput.value = baseSubject;
      } else {
        status.innerHTML = "Error al enviar el mensaje.";
      }
      button.innerText = "Enviar Mensaje";
      button.disabled = false;
    })
    .catch((error) => {
      status.innerHTML = "Error de conexión.";
      button.disabled = false;
    });
}

form.addEventListener("submit", handleSubmit);
