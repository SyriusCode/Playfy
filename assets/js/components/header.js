/**
 * Carga el Header común de Playfy en el contenedor indicado.
 *
 * @param {HTMLElement} container
 * @param {string} pagePrefix Prefijo para las páginas ubicadas en pages/.
 */

export function loadHeader(container, isPagesPage = false) {
    const rootPrefix = isPagesPage ? "../" : "";
    const pagesPrefix = isPagesPage ? "" : "pages/";

    container.innerHTML = `
        <div class="header-content">
            <a class="logo" href="${rootPrefix}index.html">Playfy</a>

            <nav aria-label="Navegación principal">
                <a href="${rootPrefix}index.html">Inicio</a>
                <a href="${pagesPrefix}catalogo.html">Catálogo</a>
                <a href="${pagesPrefix}contacto.html">Contacto</a>
            </nav>

            <div class="header-actions">
                <a href="${pagesPrefix}carrito.html">Carrito</a>
                <a href="${pagesPrefix}login.html">Login</a>
                <a href="${pagesPrefix}registro.html">Registro</a>
            </div>
        </div>
    `;
}

