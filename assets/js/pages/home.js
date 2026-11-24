import { videojuegos } from "../data/videojuegos.js";
import { actualizarContadorCarrito } from "../components/contador-carrito.js";


/* =========================================
   1. ELEMENTOS DEL HTML
========================================= */

const juegosDestacados = document.getElementById("juegos-destacados");


/* =========================================
   2. SELECCIONAR JUEGOS DESTACADOS
========================================= */

const idsDestacados = ["gtavi", "mw4", "fc27"];

const destacados = videojuegos.filter(juego =>
    idsDestacados.includes(juego.id)
);


/* =========================================
   3. MOSTRAR JUEGOS DESTACADOS
========================================= */

function mostrarDestacados() {

    juegosDestacados.innerHTML = destacados.map(juego => `

        <div class="juego-card">

            <a href="pages/detalle-producto.html?id=${juego.id}">

                <img
                    src="assets/img/products/${juego.imagen}"
                    alt="Portada de ${juego.nombre}"
                >

                <div class="juego-nombre">
                    ${juego.nombre}
                </div>

                <div class="juego-precio">
                    ${juego.precio.toFixed(2).replace(".", ",")} €
                </div>

            </a>

            <button type="button"
                    class="btn-carrito"
                    data-id="${juego.id}">
                Añadir al carrito
            </button>

        </div>

    `).join("");
}


/* =========================================
   4. AÑADIR AL CARRITO
========================================= */

function anadirAlCarrito(id) {

    const juego = videojuegos.find(juego => juego.id === id);

    if (!juego) {
        return;
    }

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const juegoExistente = carrito.find(producto =>
        producto.id === id
    );

    if (juegoExistente) {

        juegoExistente.cantidad++;

    } else {

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

    // Actualizamos el contador del navbar
    actualizarContadorCarrito();
}


/* =========================================
   5. EVENTOS DE LOS BOTONES
========================================= */

juegosDestacados.addEventListener("click", evento => {

    const boton = evento.target.closest(".btn-carrito");

    if (!boton) {
        return;
    }

    anadirAlCarrito(boton.dataset.id);

    boton.textContent = "¡Añadido!";
    boton.classList.add("anadido");

    setTimeout(() => {

        boton.textContent = "Añadir al carrito";
        boton.classList.remove("anadido");

    }, 1500);
});


/* =========================================
   6. INICIAR LA PÁGINA
========================================= */

mostrarDestacados();