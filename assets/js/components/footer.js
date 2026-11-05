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
            <p>Playfy</p>
            <nav aria-label="Navegación del pie de página">
                <a href="${pagesPrefix}quienes-somos.html">Quiénes somos</a>
                <a href="${pagesPrefix}contacto.html">Contacto</a>
                <a href="${pagesPrefix}privacidad.html">Política de privacidad</a>
            </nav>
            <p>&copy; 2026 Playfy. Todos los derechos reservados.</p>
        </div>
    `;
}
