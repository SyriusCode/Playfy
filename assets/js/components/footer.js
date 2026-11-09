/**
 * Carga el Footer común de Playfy en el contenedor indicado.
 *
 * @param {HTMLElement} container
 * @param {boolean} isPagesPage Indica si la página actual es una página en la carpeta pages/.
 */

export function loadFooter(container, isPagesPage = false) {
    const rootPrefix = isPagesPage ? "../" : "";
    const pagesPrefix = isPagesPage ? "" : "pages/";

    container.innerHTML = `
        <div class="footer-content">
            <div class="footer-columns">
                <div class="footer-brand">
                    <a href="${rootPrefix}index.html" class="footer-logo">
                        <img 
                            src="${rootPrefix}assets/img/banners/playfy_logo.png" 
                            alt="Playfy - Inicio" 
                            class="footer-logo-img"
                        >
                    </a>
                    <p>Tu tienda online de videojuegos.</p>
                </div>

                <nav class="footer-section" aria-label="Navegación del pie de página">
                    <h3>Navegación</h3>
                    <a href="${rootPrefix}index.html">Inicio</a>
                    <a href="${pagesPrefix}catalogo.html">Catálogo</a>
                    <a href="${pagesPrefix}contacto.html">Contacto</a>
                </nav>

                <nav class="footer-section" aria-label="Navegación del pie de página">
                    <h3>Información</h3>
                    <a href="${pagesPrefix}quienes-somos.html">Quiénes somos</a>
                    <a href="${pagesPrefix}privacidad.html">Política de privacidad</a>
                </nav>
            
            </div>

            <div class="footer-bottom">
                    <p>&copy; 2026 Playfy. Todos los derechos reservados.</p>
            </div>
            
        </div>
    `;
}
