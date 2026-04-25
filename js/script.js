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

const hero = document.querySelector('[data-carousel="hero"]');

hero.innerHTML = `
  <div class="carousel-track">

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="text">
          <h2>🍙 Temakeria Móvel</h2>
          <p>A Temakeria móvel combina qualidade e interatividade para encantar seu evento.</p>
          <p>Seus convidados poderão personalizar seus próprios temakis preparados na hora.</p>
          <p>Ideal para eventos corporativos, casamentos e aniversários.</p>
          <a class="btn" href="#">Solicite um orçamento</a>
        </div>
        <img src="assets/temakaria_0.jpeg">
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="text">
          <h2>🍱 Carrinho de Poke</h2>
          <p>Moderno e cheio de sabor para seu evento.</p>
          <p>Bowls personalizados com ingredientes frescos e selecionados.</p>
          <a class="btn" href="#">Solicite um orçamento</a>
        </div>
        <img src="assets/poker_1.jpeg">
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="text">
          <h2>🍣 Ilha Temática</h2>
          <p>Experiência sofisticada e completa.</p>
          <p>Peças frescas preparadas com excelência.</p>
          <a class="btn" href="#">Solicite um orçamento</a>
        </div>
        <img src="assets/ilha_3.jpg">
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="text">
          <h2>🍣 Entrega de Peças Prontas</h2>
          <p>Praticidade sem abrir mão da qualidade.</p>
          <p>Cardápio refinado para qualquer ocasião.</p>
          <a class="btn" href="#">Solicite um orçamento</a>
        </div>
        <img src="assets/entrega_5.jpg">
      </div>
    </div>

  </div>
`;
const track = hero.querySelector('.carousel-track');
const slides = hero.querySelectorAll('.carousel-slide');

let i = 0;

setInterval(() => {
  i++;

  if (i >= slides.length) i = 0;

  track.style.transform = `translateX(-${i * 100}%)`;
}, 10000);
