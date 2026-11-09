/**
 * Carga el Footer común de Playfy en el contenedor indicado.
 *
 * @param {HTMLElement} container
 * @param {boolean} isPagesPage Indica si la página actual es una página en la carpeta pages/.
 */

export function loadFooter(container, isPagesPage = false) {
    const pagesPrefix = isPagesPage ? "" : "pages/";

    container.innerHTML = `
        <div class="footer-content">
            <div class="footer-columns">
                <div class="footer-logo">
                    <a href="${pagesPrefix}index.html" class="footer-logo">
                        <img 
                            src="assets/images/logo.png" 
                            alt="Playfy - Inicio" 
                            class="footer-logo-img"
                        >
                    </a>
                    <p>Tu tienda online de videojuegos.</p>
                </div>

                <nav class="footer-section" aria-label="Navegación del pie de página">
                    <a href="${pagesPrefix}quienes-somos.html">Quiénes somos</a>
                    <a href="${pagesPrefix}privacidad.html">Política de privacidad</a>
                </nav>
                
                <p>&copy; 2026 Playfy. Todos los derechos reservados.</p>
            </div>
            
        </div>
    `;
}
