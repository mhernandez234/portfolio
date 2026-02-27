// --- Utilidad: Debounce ---
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// --- Carruseles ---
const carousels = document.querySelectorAll(".carousel-container");

carousels.forEach((carousel) => {
  const slide = carousel.querySelector(".carousel-slide");
  const images = carousel.querySelectorAll(".carousel-slide img");
  const prevBtn = carousel.querySelector(".prev-btn");
  const nextBtn = carousel.querySelector(".next-btn");

  let counter = 0;
  let slideWidth = images[0].clientWidth;

  function updateCarousel() {
    slide.style.transform = `translateX(${-slideWidth * counter}px)`;
  }

  nextBtn.addEventListener("click", () => {
    counter = counter >= images.length - 1 ? 0 : counter + 1;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    counter = counter <= 0 ? images.length - 1 : counter - 1;
    updateCarousel();
  });

  window.addEventListener(
    "resize",
    debounce(() => {
      slideWidth = images[0].clientWidth;
      updateCarousel();
    }, 150),
  );
});

// --- Animación de entrada con IntersectionObserver ---
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".card").forEach((card) => {
  observer.observe(card);
});

// --- Formulario de contacto ---
const form = document.getElementById("my-form");
const status = document.getElementById("status");

async function handleSubmit(event) {
  event.preventDefault();

  const subjectInput = document.getElementById("email-subject");
  const baseSubject = "Contacto desde Portfolio";
  const timestamp = new Date().toLocaleString();
  subjectInput.value = `${baseSubject} - ID: ${timestamp}`;

  const data = new FormData(form);
  const button = form.querySelector(".btn-contact");

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
        subjectInput.value = baseSubject;
      } else {
        status.innerHTML = "Error al enviar el mensaje.";
      }
      button.innerText = "Enviar Mensaje";
      button.disabled = false;
    })
    .catch(() => {
      status.innerHTML = "Error de conexión.";
      button.innerText = "Enviar Mensaje";
      button.disabled = false;
    });
}

form.addEventListener("submit", handleSubmit);
