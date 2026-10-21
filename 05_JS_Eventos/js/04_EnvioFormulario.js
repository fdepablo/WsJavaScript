// Ejemplo 1 — Mostrar una reserva sin recargar la página.
const formulario = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const destino = document.getElementById('destino');
const resultado = document.getElementById('resultado');

// Escuchamos el formulario para atender tanto el botón Reservar como el envío con Enter.
formulario.addEventListener('submit', (evento) => {
    // Cancelamos el envío habitual para resolver esta demostración en la página.
    evento.preventDefault();
    resultado.textContent = `Reserva de ${nombre.value} para visitar ${destino.value}. Demostración local: no se han enviado datos a un servidor.`;
});
