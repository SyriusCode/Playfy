/* =========================================
   ACTUALIZAR CONTADOR DEL CARRITO
========================================= */

export function actualizarContadorCarrito() {

    const contador = document.getElementById("contador-carrito");

    if (!contador) {
        return;
    }

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let cantidadTotal = 0;

    carrito.forEach(juego => {
        cantidadTotal += juego.cantidad;
    });

    contador.textContent = cantidadTotal;

    if (cantidadTotal === 0) {
        contador.style.display = "none";
    } else {
        contador.hidden = false;
        contador.style.display = "flex";
    }
}