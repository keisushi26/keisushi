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

let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');

// Função para mostrar o item atual
function showItem(index) {
  items.forEach((item, i) => {
    item.style.display = i === index ? 'block' : 'none'; // Exibe apenas o item atual
  });
}

// Função de navegação automática
function nextItem() {
  currentIndex = (currentIndex + 1) % items.length; // Avança para o próximo item
  showItem(currentIndex);
}

// Inicializa o carrossel e começa a navegação automática
showItem(currentIndex);

// Navegação automática a cada 10 segundos
setInterval(nextItem, 10000); // 10 segundos
});


const heroTrack = document.querySelector(".hero-slider-track");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroPrev = document.querySelector(".hero-prev");
const heroNext = document.querySelector(".hero-next");
const heroDotsContainer = document.querySelector(".hero-dots");

let heroIndex = 0;
let heroTimer;

heroSlides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.classList.add("hero-dot");

  if (index === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    showHeroSlide(index);
    restartHeroTimer();
  });

  heroDotsContainer.appendChild(dot);
});

const heroDots = document.querySelectorAll(".hero-dot");

function showHeroSlide(index) {
  if (index >= heroSlides.length) index = 0;
  if (index < 0) index = heroSlides.length - 1;

  heroIndex = index;

  heroTrack.style.transform = `translateX(-${heroIndex * 100}%)`;

  heroDots.forEach(dot => dot.classList.remove("active"));
  heroDots[heroIndex].classList.add("active");
}

function nextHeroSlide() {
  showHeroSlide(heroIndex + 1);
}

function prevHeroSlide() {
  showHeroSlide(heroIndex - 1);
}

function startHeroTimer() {
  heroTimer = setInterval(nextHeroSlide, 5000);
}

function restartHeroTimer() {
  clearInterval(heroTimer);
  startHeroTimer();
}

startHeroTimer();
