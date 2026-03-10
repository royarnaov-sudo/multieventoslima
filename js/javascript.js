document.addEventListener('DOMContentLoaded', () => {

/* =========================================
   MENÚ DROPDOWN RESPONSIVE
========================================= */

document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
  arrow.addEventListener('click', e => {
    if (window.innerWidth <= 991) {
      e.preventDefault();
      e.stopPropagation();

      const menu = arrow.closest('.dropdown')
                        .querySelector('.dropdown-menu');

      document.querySelectorAll('.dropdown-menu.show')
        .forEach(m => m !== menu && m.classList.remove('show'));

      menu.classList.toggle('show');
    }
  });
});


/* =========================================
   SLIDER SERVICIOS
========================================= */

const slider = document.getElementById('servicesScroll');

if (slider) {

  document.getElementById('scrollLeft')?.addEventListener('click', () =>
    slider.scrollBy({ left: -300, behavior: 'smooth' })
  );

  document.getElementById('scrollRight')?.addEventListener('click', () =>
    slider.scrollBy({ left: 300, behavior: 'smooth' })
  );

  let isDown = false, startX, scrollStart;

  slider.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX;
    scrollStart = slider.scrollLeft;
  });

  ['mouseup','mouseleave'].forEach(ev =>
    slider.addEventListener(ev, () => isDown = false)
  );

  slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    slider.scrollLeft = scrollStart - (e.pageX - startX) * 1.3;
  });

  /* Swipe móvil */
  let touchX = 0, touchScroll = 0;

  slider.addEventListener('touchstart', e => {
    touchX = e.touches[0].pageX;
    touchScroll = slider.scrollLeft;
  });

  slider.addEventListener('touchmove', e => {
    slider.scrollLeft =
      touchScroll - (e.touches[0].pageX - touchX) * 1.3;
  });
}


/* =========================================
   OBSERVER GENERAL (ANIMACIONES)
========================================= */

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {

    if (entry.intersectionRatio > 0.55)
      entry.target.classList.add('show');

    if (entry.intersectionRatio < 0.25)
      entry.target.classList.remove('show');

    if (entry.target.classList.contains('mapa-anim')) {
      if (entry.intersectionRatio > 0.6)
        entry.target.classList.add('show-map');

      if (entry.intersectionRatio < 0.3)
        entry.target.classList.remove('show-map');
    }

  });
}, {
  threshold: [0, 0.25, 0.55, 0.6, 1]
});

document.querySelectorAll(
  '.beneficio-anim, .cotizacion-anim, .mapa-anim, .vm-anim'
).forEach(el => observer.observe(el));


/* =========================================
   RESETEAR BUSCADOR
========================================= */

window.addEventListener('pageshow', () => {
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  const form = document.getElementById('searchBox');

  if (input) input.value = '';
  if (results) results.style.display = 'none';
  if (form) form.classList.remove('active');
});


/* =========================================
   BUSCADOR DINÁMICO
========================================= */

const form = document.getElementById('searchBox');
const input = document.getElementById('searchInput');
const resultsBox = document.getElementById('searchResults');
const toggle = document.getElementById('searchToggle');

if (form && input && resultsBox && toggle) {

  const services = document.querySelectorAll(
    '.nav-item.dropdown a.dropdown-item'
  );

  const normalize = text =>
    text.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

  function searchAndRedirect() {
    const value = normalize(input.value.trim());
    if (!value) return;

    const match = Array.from(services).find(service =>
      normalize(service.textContent).includes(value)
    );

    window.location.href = match
      ? match.href
      : "sin-resultados.html";
  }

  input.addEventListener('input', () => {
    const value = normalize(input.value.trim());
    resultsBox.innerHTML = '';

    if (!value) {
      resultsBox.style.display = 'none';
      return;
    }

    const matches = Array.from(services).filter(service =>
      normalize(service.textContent).includes(value)
    );

    if (!matches.length) {
      resultsBox.innerHTML =
        `<div class="no-results">No se han encontrado resultados</div>`;
      resultsBox.style.display = 'block';
      return;
    }

    matches.forEach(service => {
      const link = document.createElement('a');
      link.href = service.href;
      link.textContent = service.textContent;
      resultsBox.appendChild(link);
    });

    resultsBox.style.display = 'block';
  });

  toggle.addEventListener('click', e => {
    e.preventDefault();

    if (window.innerWidth < 768 && !form.classList.contains('active')) {
      form.classList.add('active');
      input.focus();
      return;
    }

    searchAndRedirect();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    searchAndRedirect();
  });

  document.addEventListener('click', e => {
    if (
      window.innerWidth < 768 &&
      !form.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      resultsBox.style.display = 'none';
    }
  });
}


/* =========================================
   GALERIA DE IMAGENES
========================================= */

const imagenes = [
"imagenes/galeria/1.jpeg",
"imagenes/galeria/2.jpeg",
"imagenes/galeria/3.jpeg",
"imagenes/galeria/4.jpeg",
"imagenes/galeria/5.jpeg",
"imagenes/galeria/6.jpeg",
"imagenes/galeria/7.jpeg",
"imagenes/galeria/8.jpeg",
"imagenes/galeria/9.jpeg",
"imagenes/galeria/10.jpeg",
"imagenes/galeria/11.jpeg",
"imagenes/galeria/12.jpeg",
"imagenes/galeria/13.jpeg",
"imagenes/galeria/14.jpeg",
"imagenes/galeria/15.jpeg",
"imagenes/galeria/16.jpeg",
"imagenes/galeria/17.jpeg",
"imagenes/galeria/18.jpeg",
"imagenes/galeria/19.jpeg",
"imagenes/galeria/20.jpeg",
"imagenes/galeria/21.jpeg",
"imagenes/galeria/22.jpeg",
"imagenes/galeria/23.jpeg",
"imagenes/galeria/24.jpeg",
"imagenes/galeria/25.jpeg",
"imagenes/galeria/26.jpeg"
];

let indiceActual = 0;

window.abrirLightbox = function(index){
  indiceActual = index;
  const lightbox = document.getElementById("lightbox");
  const imagen = document.getElementById("imagenGrande");

  if(lightbox && imagen){
    lightbox.classList.add("activo");
    imagen.src = imagenes[indiceActual];
  }
}

window.cerrarLightbox = function(){
  const lightbox = document.getElementById("lightbox");
  if(lightbox) lightbox.classList.remove("activo");
}

window.cambiarImagen = function(dir){
  const imagen = document.getElementById("imagenGrande");

  indiceActual += dir;

  if(indiceActual < 0)
    indiceActual = imagenes.length - 1;

  if(indiceActual >= imagenes.length)
    indiceActual = 0;

  if(imagen) imagen.src = imagenes[indiceActual];
}

const lightbox = document.getElementById("lightbox");

if(lightbox){

  lightbox.addEventListener("click", function(e){
    if(e.target === this){
      cerrarLightbox();
    }
  });

document.addEventListener("keydown", function(e){

  const lightbox = document.getElementById("lightbox");

  if(!lightbox || !lightbox.classList.contains("activo"))
    return;

  if(e.key === "Escape"){
    cerrarLightbox();
  }

  if(e.key === "ArrowRight"){
    cambiarImagen(1);
  }

  if(e.key === "ArrowLeft"){
    cambiarImagen(-1);
  }

});

}


/* =========================================
   AÑO AUTOMÁTICO
========================================= */

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

});