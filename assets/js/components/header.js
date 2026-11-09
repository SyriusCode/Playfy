/**
 * Carga el Header común de Playfy en el contenedor indicado.
 *
 * @param {HTMLElement} container
 * @param {boolean} isPagesPage Indica si la página actual es una página en la carpeta pages/.
 */

export function loadHeader(container, isPagesPage = false) {
    const rootPrefix = isPagesPage ? "../" : "";
    const pagesPrefix = isPagesPage ? "" : "pages/";

    container.innerHTML = `
        <div class="header-content">
        
            <a class="logo" href="${rootPrefix}index.html">
            <img 
                src="${rootPrefix}assets/img/banners/playfy_logo.png"
                alt="Playfy - Inicio"
            >
            </a>

            <nav class="header-nav" aria-label="Navegación principal">
                <a href="${rootPrefix}index.html">Inicio</a>
                <a href="${pagesPrefix}catalogo.html">Catálogo</a>
                <a href="${pagesPrefix}contacto.html">Contacto</a>
            </nav>

            <div class="header-actions">
                <a href="${pagesPrefix}carrito.html" aria-label="Carrito">
                    <img 
                        src="${rootPrefix}assets/img/icons/carrito.svg"
                        class="header-icon"
                    >
                </a>

                <a href="${pagesPrefix}login.html" aria-label="Login">
                    <img
                        src="${rootPrefix}assets/img/icons/usuario.svg"
                        class="header-icon"
                    >
                </a>
                <a href="${pagesPrefix}registro.html" class="header-register" aria-label="Registro">
                    Registrarse
                </a>
            </div>
        </div>
    `;
}

