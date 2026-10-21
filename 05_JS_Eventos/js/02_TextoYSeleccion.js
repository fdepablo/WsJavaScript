// Ejemplo 1 — Contar caracteres con `input`.
const observaciones = document.getElementById('observaciones');
const contador = document.getElementById('contador');

// `input` detecta los cambios de texto, también al pegar o borrar.
// El objetivo aquí es actualizar el contador de caracteres a medida que el usuario escribe.
observaciones.addEventListener('input', () => {
    contador.textContent = `${observaciones.value.length} / ${observaciones.maxLength} caracteres`;
});

// Ejemplo 2 — Elegir un destino con `change`.
const ciudad = document.getElementById('ciudad');
const resumen = document.getElementById('resumen');

// `change` nos avisa cuando cambia la opción seleccionada.
// El objetivo aquí es actualizar el campo con ID resumen con la ciudad elegida.
ciudad.addEventListener('change', () => {
    resumen.textContent = `Destino elegido: ${ciudad.value}`;
});
