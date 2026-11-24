import { videojuegos } from "../data/videojuegos.js";
import { actualizarContadorCarrito } from "../components/contador-carrito.js";

/* =========================================
   1. ELEMENTOS DEL HTML
========================================= */

const detalleProducto = document.getElementById("detalle-producto");
const productosSimilares = document.getElementById("productos-similares");
const similaresGrid = document.getElementById("similares-grid");


/* =========================================
   2. RECUPERAR EL PRODUCTO
========================================= */

const parametros = new URLSearchParams(window.location.search);

const idProducto = parametros.get("id");

const juego = videojuegos.find(juego => juego.id === idProducto);


/* =========================================
   3. FUNCIONES AUXILIARES
========================================= */

function formatearPrecio(precio) {
    return precio.toFixed(2).replace(".", ",") + " €";
}

const nombresPlataformas = {
    pc: "PC",
    ps5: "PlayStation 5",
    switch: "Nintendo Switch"
};

const nombresCategorias = {
    accion: "Acción",
    aventura: "Aventura",
    deportes: "Deportes"
};


/* =========================================
   4. MOSTRAR EL PRODUCTO
========================================= */

function mostrarProducto() {

    document.title = `Playfy | ${juego.nombre}`;

    detalleProducto.innerHTML = `

        <div class="detalle-imagen">

            <img
                src="../assets/img/products/${juego.imagen}"
                alt="Portada de ${juego.nombre}"
            >

        </div>

        <div class="detalle-info">

            <h1>${juego.nombre}</h1>

            <p class="detalle-categoria">
                ${nombresCategorias[juego.categoria]}
            </p>

            <p class="detalle-precio">
                ${formatearPrecio(juego.precio)}
            </p>

            <p class="detalle-descripcion">
                ${juego.descripcion}
            </p>

            <h3>Plataformas disponibles</h3>

            <div class="detalle-plataformas">

                ${juego.plataformas.map(plataforma => `

                    <span class="plataforma">
                        ${nombresPlataformas[plataforma]}
                    </span>

                `).join("")}

            </div>

            <div class="detalle-botones">

                <a href="catalogo.html" class="btn-volver">
                    Volver al catálogo
                </a>

                <button type="button"
                        class="btn-anadir"
                        id="btn-anadir">
                    Añadir a la cesta
                </button>

            </div>

        </div>
    `;

    const botonAnadir = document.getElementById("btn-anadir");

    botonAnadir.addEventListener("click", () => {

        anadirAlCarrito();

        botonAnadir.textContent = "¡Añadido!";
        botonAnadir.classList.add("anadido");

        setTimeout(() => {

            botonAnadir.textContent = "Añadir a la cesta";
            botonAnadir.classList.remove("anadido");

        }, 1500);
    });
}


/* =========================================
   5. MOSTRAR PRODUCTOS SIMILARES
========================================= */

function mostrarSimilares() {

    const similares = videojuegos.filter(producto =>

        producto.categoria === juego.categoria &&
        producto.id !== juego.id

    ).slice(0, 4);

    // Si no existen productos similares, ocultamos el aside
    if (similares.length === 0) {

        productosSimilares.style.display = "none";

        return;
    }

    similaresGrid.innerHTML = similares.map(producto => `

        <a href="detalle-producto.html?id=${producto.id}"
           class="similar-card">

            <img
                src="../assets/img/products/${producto.imagen}"
                alt="Portada de ${producto.nombre}"
            >

            <div class="similar-nombre">
                ${producto.nombre}
            </div>

            <div class="similar-precio">
                ${formatearPrecio(producto.precio)}
            </div>

        </a>

    `).join("");
}


/* =========================================
   6. AÑADIR AL CARRITO
========================================= */

function anadirAlCarrito() {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const juegoExistente = carrito.find(producto =>
        producto.id === juego.id
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

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContadorCarrito();
}


/* =========================================
   7. INICIAR LA PÁGINA
========================================= */

if (juego) {

    mostrarProducto();

    mostrarSimilares();

} else {

    detalleProducto.innerHTML = `

        <div>
            <h1>Producto no encontrado</h1>

            <p>El videojuego solicitado no está disponible.</p>

            <a href="catalogo.html" class="btn-volver">
                Volver al catálogo
            </a>
        </div>

    `;

    productosSimilares.style.display = "none";
}