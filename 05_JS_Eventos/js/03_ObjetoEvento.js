// Ejemplo 1 — Consultar el evento al pulsar un botón.
const boton = document.getElementById('boton');
const informacion = document.getElementById('informacion');

// Función compartida por los ejemplos 1 y 2.
// El navegador entrega el objeto del evento como argumento.
const mostrarEvento = (evento) => {
    // `target` indica el origen y `currentTarget` el elemento cuyo manejador se ejecuta.
    informacion.textContent = `Resultado del evento → Evento: ${evento.type}. Origen: ${evento.target.tagName}. Manejador en: ${evento.currentTarget.tagName}.`;
};

// La misma función escrita de forma tradicional.
// function mostrarEvento(evento) {
//     informacion.textContent = `Resultado del evento → Evento: ${evento.type}. Origen: ${evento.target.tagName}. Manejador en: ${evento.currentTarget.tagName}.`;
// }

boton.addEventListener('click', mostrarEvento);

// Ejemplo 2 — Pasa el ratón por encima de este título.
const titulo = document.getElementById('titulo');

// Reutilizamos la función del ejemplo 1.
// `mouseenter` se produce cuando el ratón entra en el título.
titulo.addEventListener('mouseenter', mostrarEvento);

// Ejemplo 3 — Detectar una tecla.
const teclado = document.getElementById('teclado');
const tecla = document.getElementById('tecla');

teclado.addEventListener('keydown', (evento) => {
    tecla.textContent = `Tecla pulsada: ${evento.key}`;
    if (evento.key === 'Escape') {
        teclado.value = '';
        tecla.textContent = 'Has pulsado Escape: se ha vaciado el campo.';
    }
});

// Ejemplo 4 — Llamar a una función con argumentos.
const botonOferta = document.getElementById('botonOferta');
const oferta = document.getElementById('oferta');

function mostrarOferta(nombre, precio) {
    oferta.textContent = `${nombre}: ${precio} euros`;
}

// La flecha nos permite llamar a nuestra función con argumentos propios.
botonOferta.addEventListener('click', () => {
    mostrarOferta('Mapa mágico', 20);
});

// Ejemplo 5 — Cambiar el texto de varios botones con una misma función.
const botonCambiar = document.getElementById('botonCambiar');
const segundoBotonCambiar = document.getElementById('segundoBotonCambiar');

const cambiarTexto = (evento) => {
    // `currentTarget` es el botón cuyo manejador se está ejecutando.
    // Así la misma función cambia el texto del botón que acabamos de pulsar.
    evento.currentTarget.textContent = '¡Has pulsado el botón!';
    // También podríamos escribir lo siguiente para cambiar siempre el primer botón.
    // botonCambiar.textContent = '¡Has pulsado el botón!';
    // Con `currentTarget` no dependemos de una variable de un botón concreto.
};

botonCambiar.addEventListener('click', cambiarTexto);
segundoBotonCambiar.addEventListener('click', cambiarTexto);
