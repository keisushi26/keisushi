const ASSET = "assets/";

const CAROUSELS = {
  hero: [
    "15Z09FVrnXjmEoNQdqQXym8V3c.webp",
    "yE2kO77qmuBz2wZIUiF7Nt3FXo.jpg",
    "NtxpmZlKNrOvTg0mFvwzucqtepQ.jpg",
    "BbyPVSG3Ic0rKk4cuAHgb3UZc4I.jpg"
  ],

  poke: [
    "poker_1.jpeg",
    "poker_5.jpeg",
    "poker_3.jpeg",
    "poker_4.jpeg",
    "poker_6.jpeg"
  ],

  temakeria: [
    "temakaria_0.jpeg",
    "temakaria_1.jpeg",
    "temakaria_2.jpeg",
    "temakaria_3.jpeg"
  ],

  ilha: [
    "ilha_2.jpg",
    "ilha_3.jpg",
    "ilha_5.jpg",
    "ilha_1.jpg"
  ],

  pecas: [
    "entrega_1.jpg",
    "entrega_2.jpg",
    "entrega_3.jpg",
    "entrega_4.jpg",
    "entrega_5.jpg",
    "entrega_6.jpg",
    "entrega_7.jpg"
  ],

  historia: [
    "chefe_1.jpg",
    "kei_1.jpg",
    "poker_1.jpeg"
  ]
};

function createCarousel(element) {
  const key = element.dataset.carousel;
  const images = CAROUSELS[key] || [];

  if (!images.length) return;

  let index = 0;

  const track = document.createElement("div");
  track.className = "carousel-track";

  images.forEach((file) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";

    const img = document.createElement("img");
    img.src = ASSET + file;
    img.alt = "Kei Sushi";
    img.loading = "lazy";

    img.onerror = () => {
      slide.remove();
    };

    slide.appendChild(img);
    track.appendChild(slide);
  });

  const prev = document.createElement("button");
  prev.className = "carousel-btn prev";
  prev.innerHTML = "‹";

  const next = document.createElement("button");
  next.className = "carousel-btn next";
  next.innerHTML = "›";

  const dots = document.createElement("div");
  dots.className = "carousel-dots";

  images.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.addEventListener("click", () => {
      index = i;
      update();
    });
    dots.appendChild(dot);
  });

  element.appendChild(track);
  element.appendChild(prev);
  element.appendChild(next);
  element.appendChild(dots);

  function update() {
    const slides = track.querySelectorAll(".carousel-slide");
    if (!slides.length) return;

    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    track.style.transform = `translateX(-${index * 100}%)`;

    dots.querySelectorAll(".carousel-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  next.addEventListener("click", () => {
    index++;
    update();
  });

  prev.addEventListener("click", () => {
    index--;
    update();
  });

  setInterval(() => {
    index++;
    update();
  }, 5000);

  update();
}
document.querySelector('.hero-carousel').addEventListener('wheel', function (e) {
  if (e.deltaY > 0) {
    this.scrollBy({ left: 200, behavior: 'smooth' });
  } else {
    this.scrollBy({ left: -200, behavior: 'smooth' });
  }
});

document.querySelectorAll(".carousel").forEach(createCarousel);

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    button.parentElement.classList.toggle("active");
  });
});
