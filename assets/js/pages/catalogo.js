import { videojuegos } from "../data/videojuegos.js";
import { actualizarContadorCarrito } from "../components/contador-carrito.js";


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

        <article class="juego-card" data-id="${juego.id}">

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

            <button type="button"
                    class="btn-carrito"
                    data-id="${juego.id}">
                Añadir al carrito
            </button>

        </article>

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
function anadirAlCarrito(id) {

    // Buscamos el videojuego por su ID
    const juego = videojuegos.find(juego => juego.id === id);

    // Si no existe, terminamos la función
    if (!juego) {
        return;
    }

    // Recuperamos el carrito del almacenamiento local
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Comprobamos si el videojuego ya está en el carrito
    const juegoExistente = carrito.find(producto => producto.id === id);

    if (juegoExistente) {

        // Aumentamos la cantidad
        juegoExistente.cantidad++;

    } else {

        // Añadimos un nuevo producto
        carrito.push({
            id: juego.id,
            nombre: juego.nombre,
            precio: juego.precio,
            imagen: juego.imagen,
            cantidad: 1
        });
    }

    // Guardamos el carrito actualizado
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Actualizarmos el contador del  nav
    actualizarContadorCarrito();
}

/* =========================================
   8. EVENTOS DE LAS TARJETAS
========================================= */

grid.addEventListener("click", evento => {

    const boton = evento.target.closest(".btn-carrito");
    const tarjeta = evento.target.closest(".juego-card");

    // Si pulsamos el botón del carrito
    if (boton) {

        anadirAlCarrito(boton.dataset.id);

        // Cambiamos temporalmente el aspecto del botón
        boton.textContent = "¡Añadido!";
        boton.classList.add("anadido");

        setTimeout(() => {
            boton.textContent = "Añadir al carrito";
            boton.classList.remove("anadido");
        }, 1500);

        return;
    }

    // Si pulsamos cualquier otra parte de la tarjeta
    if (tarjeta) {

        window.location.href =
            `detalle-producto.html?id=${tarjeta.dataset.id}`;
    }
});

// Mostramos los videojuegos al cargar la página
mostrarCatalogo();
