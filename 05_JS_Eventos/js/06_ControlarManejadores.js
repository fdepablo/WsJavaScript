// Ejemplo 1 — Activar y retirar el manejador del contador.
const contar = document.getElementById('contar');
const activar = document.getElementById('activar');
const desactivar = document.getElementById('desactivar');
const contador = document.getElementById('contador');
const estado = document.getElementById('estado');
let pulsaciones = 0;

// El contador comienza activado y mostramos su estado en verde.
estado.style.color = 'green';

function sumarPulsacion() {
    pulsaciones++;
    contador.textContent = `Pulsaciones: ${pulsaciones}`;
}

contar.addEventListener('click', sumarPulsacion);

desactivar.addEventListener('click', () => {
    // Retiramos la misma función que registramos, sin ejecutarla.
    contar.removeEventListener('click', sumarPulsacion);
    estado.textContent = 'Contador desactivado: pulsar Contar ya no suma.';
    estado.style.color = 'red';

    // Desactivamos el botón de desactivar y activamos el de activar.
    activar.disabled = false;
    desactivar.disabled = true;
});

activar.addEventListener('click', () => {
    // Registramos de nuevo la función que habíamos retirado.
    contar.addEventListener('click', sumarPulsacion);
    estado.textContent = 'Contador activado.';
    estado.style.color = 'green';
    
    // Desactivamos el botón de activar y activamos el de desactivar.
    activar.disabled = true;
    desactivar.disabled = false;
});

// Ejemplo 2 — Ejecutar un manejador una sola vez.
const regalo = document.getElementById('regalo');
const mensajeRegalo = document.getElementById('mensajeRegalo');

// `once: true` retira este manejador después de su primera ejecución.
regalo.addEventListener('click', () => {
    mensajeRegalo.textContent = '¡Has recibido un mapa mágico!';
    regalo.disabled = true;
}, { once: true });
