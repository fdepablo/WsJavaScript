// Ejemplo 1 — Obtener los valores elegidos.
const formulario = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const juego = document.getElementById('juego');
const avisos = document.getElementById('avisos');
const observaciones = document.getElementById('observaciones');
const resumen = document.getElementById('resumen');

formulario.addEventListener('submit', (evento) => {
    // Evitamos que el formulario se envíe y la página se recargue.
    evento.preventDefault();

    // Buscamos las selecciones actuales cuando se solicita el resumen.
    const turno = formulario.querySelector('input[name="turno"]:checked');
    const actividades = formulario.querySelectorAll('input[name="actividades"]:checked');
    const nombresActividades = [];
    for (const actividad of actividades) {
        nombresActividades.push(actividad.value);
    }

    // `value` contiene el dato y `text` el texto visible de la opción.
    const opcion = juego.options[juego.selectedIndex];
    // `checked` indica si una casilla está marcada, no su propiedad `value`.
    const quiereAvisos = avisos.checked ? 'Sí' : 'No';

    resumen.textContent = `Nombre: ${nombre.value.trim() || 'Sin indicar'}
                        Juego: ${opcion.text} (valor al servidor: ${juego.value})
                        Turno: ${turno === null ? 'Sin elegir' : turno.value}
                        Actividades: ${nombresActividades.length === 0 ? 'Ninguna' : nombresActividades.join(', ')}
                        Recibir avisos: ${quiereAvisos}
                        Observaciones: ${observaciones.value.trim() || 'Sin observaciones'}`;
});
