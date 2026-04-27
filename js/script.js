const ASSET = "assets/";

const CAROUSELS = {
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
  if (element.querySelector(".carousel-track")) {
    startExistingCarousel(element);
    return;
  }

  const key = element.dataset.carousel;
  const images = CAROUSELS[key] || [];

  if (!images.length) return;

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

  element.appendChild(track);
  startExistingCarousel(element);
}

function startExistingCarousel(element) {
  const track = element.querySelector(".carousel-track");
  if (!track) return;

  const slides = track.querySelectorAll(".carousel-slide");
  if (!slides.length) return;

  let index = 0;

  const prev = document.createElement("button");
  prev.className = "carousel-btn prev";
  prev.innerHTML = "‹";

  const next = document.createElement("button");
  next.className = "carousel-btn next";
  next.innerHTML = "›";

  const dots = document.createElement("div");
  dots.className = "carousel-dots";

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";

    dot.addEventListener("click", () => {
      index = i;
      update();
    });

    dots.appendChild(dot);
  });

  element.appendChild(prev);
  element.appendChild(next);
  element.appendChild(dots);

  function update() {
    const currentSlides = track.querySelectorAll(".carousel-slide");

    if (!currentSlides.length) return;

    if (index >= currentSlides.length) index = 0;
    if (index < 0) index = currentSlides.length - 1;

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

document.querySelectorAll(".carousel").forEach(createCarousel);

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    button.parentElement.classList.toggle("active");
  });
});

const heroSlider = document.querySelector(".hero-slider");

if (heroSlider) {
  const heroTrack = heroSlider.querySelector(".hero-slider-track");
  const heroSlides = heroTrack.querySelectorAll(":scope > .hero-slide");
  const heroDotsContainer = heroSlider.querySelector(".hero-dots");

  let heroIndex = 0;
  let heroTimer;

  heroSlides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("hero-dot");

    if (index === 0) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      showHeroSlide(index);
      restartHeroTimer();
    });

    heroDotsContainer.appendChild(dot);
  });

  const heroDots = heroDotsContainer.querySelectorAll(".hero-dot");

  function showHeroSlide(index) {
    if (index >= heroSlides.length) {
      index = 0;
    }

    if (index < 0) {
      index = heroSlides.length - 1;
    }

    heroIndex = index;

    heroTrack.style.transform = `translateX(-${heroIndex * 100}%)`;

    heroDots.forEach((dot) => dot.classList.remove("active"));
    heroDots[heroIndex].classList.add("active");
  }

  function nextHeroSlide() {
    showHeroSlide(heroIndex + 1);
  }

  function startHeroTimer() {
    heroTimer = setInterval(nextHeroSlide, 5000);
  }

  function restartHeroTimer() {
    clearInterval(heroTimer);
    startHeroTimer();
  }

  showHeroSlide(0);
  startHeroTimer();
}
