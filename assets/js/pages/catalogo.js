
/* =========================================
   1. VARIABLES DE LOS FILTROS
========================================= */

let categoriaActual = "todos";
let plataformaActual = "todas";
let precioMaximo = 100;

// Número de juegos que mostraremos por página
const juegosPorPagina = 9;

// Página en la que estamos actualmente
let paginaActual = 1;


/* =========================================
   2. ELEMENTOS DEL HTML
========================================= */

// Seleccionamos los filtros de categoría
const filtrosCategoria = document.querySelectorAll(
    'input[name="categoria"]'
);

// Seleccionamos los filtros de plataforma
const filtrosPlataforma = document.querySelectorAll(
    'input[name="plataforma"]'
);

// Seleccionamos el control de precio
const filtroPrecio = document.getElementById("filtro-precio");

// Elemento donde mostraremos el precio seleccionado
const precioActual = document.getElementById("precio-actual");

// Contenedor donde aparecerán los videojuegos
const grid = document.getElementById("catalogo-grid");

// Contenedor de los botones de paginación
const paginacion = document.getElementById("paginacion");


/* =========================================
   3. ARRAY DE VIDEOJUEGOS
========================================= */


const videojuegos = [
    // ===== ACCIÓN =====
    {
        id: "gtavi",
        nombre: "GTA VI",
        precio: 79.99,
        categoria: "accion",
        plataformas: ["ps5"],
        imagen: "GTAVI.avif"
    },
    {
        id: "mw4",
        nombre: "Modern Warfare 4",
        precio: 79.99,
        categoria: "accion",
        plataformas: ["pc", "ps5"],
        imagen: "MW4.webp"
    },
    {
        id: "doom",
        nombre: "DOOM: The Dark Ages",
        precio: 69.99,
        categoria: "accion",
        plataformas: ["pc", "ps5"],
        imagen: "DOOM.webp"
    },
    {
        id: "cyberpunk",
        nombre: "Cyberpunk 2077",
        precio: 39.99,
        categoria: "accion",
        plataformas: ["pc", "ps5", "switch"],
        imagen: "Cyberpunk.webp"
    },
    {
        id: "spiderman2",
        nombre: "Marvel's Spider-Man 2",
        precio: 59.99,
        categoria: "accion",
        plataformas: ["pc", "ps5"],
        imagen: "Spiderman2.webp"
    },
    {
        id: "eldenring",
        nombre: "Elden Ring",
        precio: 49.99,
        categoria: "accion",
        plataformas: ["pc", "ps5"],
        imagen: "EldenRing.webp"
    },

    // ===== AVENTURA =====
    {
        id: "hogwarts",
        nombre: "Hogwarts Legacy",
        precio: 39.99,
        categoria: "aventura",
        plataformas: ["pc", "ps5", "switch"],
        imagen: "Hogwarts.webp"
    },
    {
        id: "zelda",
        nombre: "Zelda: Tears of the Kingdom",
        precio: 59.99,
        categoria: "aventura",
        plataformas: ["switch"],
        imagen: "Zelda.webp"
    },
    {
        id: "rdr2",
        nombre: "Red Dead Redemption 2",
        precio: 29.99,
        categoria: "aventura",
        plataformas: ["pc", "ps5"],
        imagen: "RDR2.webp"
    },
    {
        id: "uncharted",
        nombre: "Uncharted 4",
        precio: 29.99,
        categoria: "aventura",
        plataformas: ["pc", "ps5"],
        imagen: "Uncharted.webp"
    },
    {
        id: "tlou",
        nombre: "The Last of Us Part I",
        precio: 49.99,
        categoria: "aventura",
        plataformas: ["pc", "ps5"],
        imagen: "TLOU.webp"
    },
    {
        id: "marioodyssey",
        nombre: "Super Mario Odyssey",
        precio: 49.99,
        categoria: "aventura",
        plataformas: ["switch"],
        imagen: "MarioOdyssey.webp"
    },

    // ===== DEPORTES =====
    {
        id: "fc27",
        nombre: "EA Sports FC 27",
        precio: 79.99,
        categoria: "deportes",
        plataformas: ["pc", "ps5", "switch"],
        imagen: "FC27.avif"
    },
    {
        id: "nba2k26",
        nombre: "NBA 2K26",
        precio: 59.99,
        categoria: "deportes",
        plataformas: ["pc", "ps5", "switch"],
        imagen: "NBA2K26.webp"
    },
    {
        id: "f125",
        nombre: "F1 25",
        precio: 49.99,
        categoria: "deportes",
        plataformas: ["pc", "ps5"],
        imagen: "F125.webp"
    },
    {
        id: "gt7",
        nombre: "Gran Turismo 7",
        precio: 49.99,
        categoria: "deportes",
        plataformas: ["ps5"],
        imagen: "GT7.webp"
    },
    {
        id: "mariokart",
        nombre: "Mario Kart 8 Deluxe",
        precio: 49.99,
        categoria: "deportes",
        plataformas: ["switch"],
        imagen: "MarioKart.webp"
    },
    {
        id: "wwe2k26",
        nombre: "WWE 2K26",
        precio: 69.99,
        categoria: "deportes",
        plataformas: ["pc", "ps5"],
        imagen: "WWE2K26.webp"
    }
];



/* =========================================
   4. FUNCIÓN PARA MOSTRAR EL CATÁLOGO
========================================= */

function mostrarCatalogo() {

    // Filtramos los videojuegos
    const juegosFiltrados = videojuegos.filter(juego => {

        const cumpleCategoria =
            categoriaActual === "todos" ||
            juego.categoria === categoriaActual;

        const cumplePlataforma =
            plataformaActual === "todas" ||
            juego.plataformas.includes(plataformaActual);

        const cumplePrecio =
            juego.precio <= precioMaximo;

        return cumpleCategoria &&
            cumplePlataforma &&
            cumplePrecio;
    });


    // Calculamos qué videojuegos mostrar
    const inicio = (paginaActual - 1) * juegosPorPagina;
    const fin = inicio + juegosPorPagina;

    const juegosPagina = juegosFiltrados.slice(inicio, fin);


    // Generamos el HTML de las tarjetas
    grid.innerHTML = juegosPagina.map(juego => `

        <a href="detalle-producto.html?id=${juego.id}"
           class="juego-card">

            <img
                src="../assets/img/products/${juego.imagen}"
                alt="Portada de ${juego.nombre}"
            >

            <div class="juego-nombre">
                ${juego.nombre}
            </div>

            <div class="juego-precio">
                ${juego.precio.toFixed(2).replace(".", ",")} €
            </div>

        </a>

    `).join("");


    // Si no hay resultados, mostramos un mensaje
    if (juegosFiltrados.length === 0) {
        grid.innerHTML =
            "<p>No se encontraron videojuegos con estos filtros.</p>";
    }


    // Actualizamos los botones de paginación
    mostrarPaginacion(juegosFiltrados.length);
}


/* =========================================
   5. FUNCIÓN DE PAGINACIÓN
========================================= */

function mostrarPaginacion(totalJuegos) {

    // Calculamos cuántas páginas necesitamos
    const totalPaginas = Math.ceil(
        totalJuegos / juegosPorPagina
    );

    // Borramos los botones anteriores
    paginacion.innerHTML = "";

    // Creamos un botón por cada página
    for (let i = 1; i <= totalPaginas; i++) {

        const boton = document.createElement("button");

        boton.textContent = i;
        boton.type = "button";

        // Marcamos la página actual
        if (i === paginaActual) {
            boton.classList.add("activa");
            boton.setAttribute("aria-current", "page");
        }

        // Al pulsar, cambiamos de página
        boton.addEventListener("click", () => {

            paginaActual = i;

            mostrarCatalogo();
        });

        // Añadimos el botón al HTML
        paginacion.appendChild(boton);
    }
}


/* =========================================
   6. EVENTOS DE LOS FILTROS
========================================= */

// FILTRO POR CATEGORÍA
filtrosCategoria.forEach(filtro => {

    filtro.addEventListener("change", () => {

        categoriaActual = filtro.value;

        paginaActual = 1;

        mostrarCatalogo();
    });
});


// FILTRO POR PLATAFORMA
filtrosPlataforma.forEach(filtro => {

    filtro.addEventListener("change", () => {

        plataformaActual = filtro.value;

        paginaActual = 1;

        mostrarCatalogo();
    });
});


// FILTRO POR PRECIO
filtroPrecio.addEventListener("input", () => {

    precioMaximo = Number(filtroPrecio.value);

    precioActual.textContent = precioMaximo;

    paginaActual = 1;

    mostrarCatalogo();
});


/* =========================================
   7. INICIAR EL CATÁLOGO
========================================= */

// Mostramos los videojuegos al cargar la página
mostrarCatalogo();
