// Ejemplo 1 — Mostrar y cambiar un mensaje.
const botonSaludar = document.getElementById('botonSaludar');
const botonCambiar = document.getElementById('botonCambiar');
const mensaje = document.getElementById('mensaje');

function saludar() {
    mensaje.textContent = '¡Hola! Has ejecutado una función al pulsar el botón.';
}

// Pasamos `saludar` sin paréntesis para que se ejecute cuando ocurra el clic.
botonSaludar.addEventListener('click', saludar);

// También podemos escribir una función flecha directamente.
botonCambiar.addEventListener('click', () => {
    mensaje.textContent = 'El contenido ha cambiado sin recargar la página.';
});

// Ejemplo 2 — Contar pulsaciones.
const botonContar = document.getElementById('botonContar');
const contador = document.getElementById('contador');
let pulsaciones = 0;

botonContar.addEventListener('click', () => {
    pulsaciones++;
    contador.textContent = `Pulsaciones: ${pulsaciones}`;
});
