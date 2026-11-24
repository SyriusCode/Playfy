import { actualizarContadorCarrito } from "../components/contador-carrito.js";

/* =========================================
   1. RECUPERAR EL CARRITO
========================================= */

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


/* =========================================
   2. ELEMENTOS DEL HTML
========================================= */

const carritoLista = document.getElementById("carrito-lista");

const resumenProductos = document.getElementById("resumen-productos");

const carritoTotal = document.getElementById("carrito-total");

const finalizarCompra = document.getElementById("finalizar-compra");

const mensajeCompra = document.getElementById("mensaje-compra");

/* =========================================
   3. FUNCIONES AUXILIARES
========================================= */

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function formatearPrecio(precio) {
    return precio.toFixed(2).replace(".", ",") + " €";
}


/* =========================================
   4. MOSTRAR EL CARRITO
========================================= */

function mostrarCarrito() {

    // Comprobamos si el carrito está vacío
    if (carrito.length === 0) {

        carritoLista.innerHTML = `
            <div class="carrito-vacio">
                <p>Tu carrito está vacío.</p>
                <p>Explora nuestro catálogo y añade videojuegos.</p>
            </div>
        `;

    } else {

        // Generamos las tarjetas de los productos
        carritoLista.innerHTML = carrito.map(juego => `

            <article class="carrito-item"
                     data-id="${juego.id}">

                <img
                    src="../assets/img/products/${juego.imagen}"
                    alt="Portada de ${juego.nombre}"
                >

                <div class="carrito-item-info">

                    <h3 class="carrito-item-nombre">
                        ${juego.nombre}
                    </h3>

                    <p class="carrito-item-precio">
                        ${formatearPrecio(juego.precio)}
                    </p>

                    <div class="carrito-cantidad">

                        <button type="button"
                                class="btn-cantidad btn-restar"
                                aria-label="Disminuir cantidad"
                                ${juego.cantidad === 1 ? "disabled" : ""}>
                            -
                        </button>

                        <span>${juego.cantidad}</span>

                        <button type="button"
                                class="btn-cantidad btn-sumar"
                                aria-label="Aumentar cantidad">
                            +
                        </button>

                    </div>

                    <button type="button"
                            class="btn-eliminar">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        Eliminar
                    </button>

                </div>

                <div class="carrito-item-subtotal">
                    ${formatearPrecio(juego.precio * juego.cantidad)}
                </div>

            </article>

        `).join("");
    }

    // Actualizamos el resumen del pedido
    mostrarResumen();
}


/* =========================================
   5. MOSTRAR EL RESUMEN DEL PEDIDO
========================================= */

function mostrarResumen() {

    let total = 0;

    // Generamos el resumen de cada producto
    resumenProductos.innerHTML = carrito.map(juego => {

        const subtotal = juego.precio * juego.cantidad;

        total += subtotal;

        return `

            <div class="resumen-item">

                <span>
                    ${juego.nombre} x${juego.cantidad}
                </span>

                <span>
                    ${formatearPrecio(subtotal)}
                </span>

            </div>

        `;

    }).join("");

    // Mostramos el precio total
    carritoTotal.textContent = formatearPrecio(total);

    // Desactivamos la compra si no hay productos
    finalizarCompra.disabled = carrito.length === 0;
}

/* =========================================
   6. MODIFICAR CANTIDADES
========================================= */

function modificarCantidad(id, cantidad) {

    const juego = carrito.find(juego => juego.id === id);

    if (!juego) {
        return;
    }

    juego.cantidad += cantidad;

    // Evitamos cantidades inferiores a 1
    if (juego.cantidad < 1) {
        juego.cantidad = 1;
    }

    guardarCarrito();

    mostrarCarrito();
}

/* =========================================
   7. ELIMINAR PRODUCTOS
========================================= */

function eliminarProducto(id) {

    carrito = carrito.filter(juego => juego.id !== id);

    guardarCarrito();

    mostrarCarrito();
}

/* =========================================
   8. EVENTOS DEL CARRITO
========================================= */

carritoLista.addEventListener("click", evento => {

    const tarjeta = evento.target.closest(".carrito-item");

    if (!tarjeta) {
        return;
    }

    const id = tarjeta.dataset.id;

    // Aumentar cantidad
    if (evento.target.closest(".btn-sumar")) {

        modificarCantidad(id, 1);

        // Disminuir cantidad
    } else if (evento.target.closest(".btn-restar")) {

        modificarCantidad(id, -1);

        // Eliminar producto
    } else if (evento.target.closest(".btn-eliminar")) {

        eliminarProducto(id);
    }
});

/* =========================================
   9. FINALIZAR COMPRA
========================================= */

finalizarCompra.addEventListener("click", () => {

    if (carrito.length === 0) {
        return;
    }

    // Vaciamos el array
    carrito = [];

    // Eliminamos el carrito del almacenamiento local
    localStorage.removeItem("carrito");

    // Actualizamos la interfaz
    mostrarCarrito();

    // Actualizamos la notificacion del nav
    actualizarContadorCarrito();

    // Mostramos un mensaje de confirmación
    mensajeCompra.textContent =
        "¡Compra realizada correctamente! Gracias por confiar en Playfy.";
});

/* =========================================
   10. INICIAR EL CARRITO
========================================= */


mostrarCarrito();